import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import weaviate, { ApiKey } from 'npm:weaviate-ts-client';

const WEAVIATE_URL = Deno.env.get('WEAVIATE_URL');
const WEAVIATE_API_KEY = Deno.env.get('WEAVIATE_API_KEY');
const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

if (!WEAVIATE_URL || !WEAVIATE_API_KEY || !DEEPSEEK_API_KEY) {
  throw new Error('Missing required environment variables');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const client = weaviate.client({
  scheme: 'https',
  host: WEAVIATE_URL,
  apiKey: new ApiKey(WEAVIATE_API_KEY),
});

async function queryRelevantTCMKnowledge(patientData: any) {
  // Create a search query based on patient symptoms and conditions
  const searchQuery = `${patientData.chief_complaint} ${patientData.tongue_color || ''}`.trim();
  
  try {
    const result = await client.graphql
      .get()
      .withClassName('TCMApp')
      .withFields(['text', 'title', '_additional { certainty }'])
      .withNearText({ concepts: [searchQuery] })
      .withLimit(3) // Limit to top 3 most relevant documents
      .do();

    return result.data.Get.TCMApp;
  } catch (error) {
    console.error('Error querying Weaviate:', error);
    throw error;
  }
}

async function generateReportWithDeepseek(patientData: any, tcmKnowledge: any[]) {
  const contextText = tcmKnowledge
    .map(doc => `${doc.title ? `${doc.title}:\n` : ''}${doc.text}`)
    .join('\n\n');

  const prompt = `As a TCM practitioner, generate a comprehensive diagnostic report based on the following patient data and relevant TCM knowledge.

Patient Information:
- Chief Complaint: ${patientData.chief_complaint}
- Tongue Color: ${patientData.tongue_color || 'Not recorded'}
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
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { patientId } = await req.json();

    // Fetch patient data from Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    const patientResponse = await fetch(`${supabaseUrl}/rest/v1/patients?id=eq.${patientId}`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
    });

    if (!patientResponse.ok) {
      throw new Error('Failed to fetch patient data');
    }

    const [patientData] = await patientResponse.json();
    if (!patientData) {
      throw new Error('Patient not found');
    }

    // Query relevant TCM knowledge
    console.log('Querying TCM knowledge for patient:', patientId);
    const tcmKnowledge = await queryRelevantTCMKnowledge(patientData);

    // Generate report using DeepSeek
    console.log('Generating report with DeepSeek');
    const report = await generateReportWithDeepseek(patientData, tcmKnowledge);

    return new Response(
      JSON.stringify({ report }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in tcm-report function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});