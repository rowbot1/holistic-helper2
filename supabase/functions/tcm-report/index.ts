import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { queryRelevantTCMKnowledge } from './knowledgeQuery.ts';
import { generateReportWithDeepseek } from './reportGenerator.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { patientId } = await req.json();
    console.log('Processing request for patient:', patientId);

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

    const tcmKnowledge = await queryRelevantTCMKnowledge(patientData);
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