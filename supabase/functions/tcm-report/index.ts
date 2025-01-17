import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import weaviate, { ApiKey } from 'npm:weaviate-ts-client';

const WEAVIATE_URL = Deno.env.get('WEAVIATE_URL') || "2thnljoisdy8xfn23vue1a.c0.europe-west3.gcp.weaviate.cloud";
const WEAVIATE_API_KEY = Deno.env.get('WEAVIATE_API_KEY');
const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const client = weaviate.client({
  scheme: 'https',
  host: WEAVIATE_URL,
  apiKey: new ApiKey(WEAVIATE_API_KEY),
});

async function createTCMClassIfNotExists() {
  try {
    // Check if class exists
    const schema = await client.schema.getter().do();
    const tcmClass = schema.classes?.find(c => c.class === 'TCMKnowledge');
    
    if (!tcmClass) {
      console.log('Creating TCMKnowledge class in Weaviate...');
      await client.schema
        .classCreator()
        .withClass({
          class: 'TCMKnowledge',
          description: 'Traditional Chinese Medicine knowledge base',
          properties: [
            {
              name: 'text',
              dataType: ['text'],
              description: 'The content of the TCM knowledge',
            },
            {
              name: 'title',
              dataType: ['text'],
              description: 'The title or category of the TCM knowledge',
            }
          ],
        })
        .do();
      console.log('TCMKnowledge class created successfully');
    }
  } catch (error) {
    console.error('Error managing Weaviate schema:', error);
    throw new Error(`Failed to setup Weaviate schema: ${error.message}`);
  }
}

async function queryRelevantTCMKnowledge(patientData: any) {
  console.log('Querying TCM knowledge for patient data:', patientData);
  const searchQuery = `${patientData.chief_complaint} ${patientData.tcm_inspection?.tongue_color || ''}`.trim();
  
  try {
    await createTCMClassIfNotExists();
    
    const result = await client.graphql
      .get()
      .withClassName('TCMKnowledge')
      .withFields(['text', 'title', '_additional { certainty }'])
      .withNearText({ concepts: [searchQuery] })
      .withLimit(3)
      .do();

    console.log('Weaviate query result:', result);
    return result.data.Get.TCMKnowledge;
  } catch (error) {
    console.error('Error querying Weaviate:', error);
    throw new Error(`Failed to query TCM knowledge: ${error.message}`);
  }
}

async function generateReportWithDeepseek(patientData: any, tcmKnowledge: any[]) {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DeepSeek API key is not configured');
  }

  console.log('Generating report with DeepSeek for patient:', patientData.name);
  const contextText = tcmKnowledge && tcmKnowledge.length > 0
    ? tcmKnowledge
        .map(doc => `${doc.title ? `${doc.title}:\n` : ''}${doc.text}`)
        .join('\n\n')
    : 'No specific TCM knowledge found for this case.';

  const prompt = `As a TCM practitioner, generate a comprehensive diagnostic report based on the following patient data and relevant TCM knowledge.

Patient Information:
- Chief Complaint: ${patientData.chief_complaint}
- TCM Inspection: ${JSON.stringify(patientData.tcm_inspection)}
- TCM Auscultation: ${JSON.stringify(patientData.tcm_auscultation)}
- TCM Inquiry: ${JSON.stringify(patientData.tcm_inquiry)}
- TCM Palpation: ${JSON.stringify(patientData.tcm_palpation)}
- Gender: ${patientData.gender}
- Name: ${patientData.name}

Relevant TCM Knowledge:
${contextText}

Please generate a structured TCM diagnostic report with the following sections:
1. Overview
2. TCM Diagnosis
3. Pattern Identification
4. Treatment Principles
5. Recommendations

Format the response in a clear, professional manner suitable for medical documentation.`;

  try {
    const response = await fetch('https://api.deepseek.ai/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are an experienced TCM practitioner providing detailed diagnostic reports." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', errorText);
      throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('DeepSeek response received');
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw new Error(`Failed to generate report: ${error.message}`);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate required API keys
    if (!WEAVIATE_API_KEY) {
      throw new Error('Weaviate API key is not configured');
    }
    if (!DEEPSEEK_API_KEY) {
      throw new Error('DeepSeek API key is not configured');
    }

    const { patientId } = await req.json();
    console.log('Processing request for patient:', patientId);

    // Fetch patient data from Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }

    const patientResponse = await fetch(`${supabaseUrl}/rest/v1/patients?id=eq.${patientId}`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
    });

    if (!patientResponse.ok) {
      throw new Error(`Failed to fetch patient data: ${patientResponse.status}`);
    }

    const [patientData] = await patientResponse.json();
    if (!patientData) {
      throw new Error('Patient not found');
    }

    // Query relevant TCM knowledge
    const tcmKnowledge = await queryRelevantTCMKnowledge(patientData);

    // Generate report using DeepSeek
    const report = await generateReportWithDeepseek(patientData, tcmKnowledge);

    return new Response(
      JSON.stringify(report),
      { 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    );

  } catch (error: any) {
    console.error('Error in tcm-report function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    );
  }
});