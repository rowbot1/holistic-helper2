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

    // Log configuration (excluding sensitive values)
    console.log('Configuration:', {
      url: supabaseUrl,
      hasKey: !!supabaseKey,
      patientEndpoint: `${supabaseUrl}/rest/v1/patients?select=*&id=eq.${patientId}`
    });

    const patientResponse = await fetch(`${supabaseUrl}/rest/v1/patients?select=*&id=eq.${patientId}`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.pgrst.object+json'
      },
    });

    // Log response details
    const responseDetails = {
      status: patientResponse.status,
      statusText: patientResponse.statusText,
      headers: Object.fromEntries(patientResponse.headers.entries())
    };
    console.log('Patient response details:', JSON.stringify(responseDetails, null, 2));
    
    const responseText = await patientResponse.text();
    console.log('Patient response text:', responseText);

    if (!patientResponse.ok) {
      const errorDetails = {
        status: patientResponse.status,
        statusText: patientResponse.statusText,
        responseText: responseText,
        timestamp: new Date().toISOString(),
        requestDetails: {
          url: `${supabaseUrl}/rest/v1/patients?select=*&id=eq.${patientId}`,
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.pgrst.object+json'
          }
        }
      };
      
      // Log error details
      console.error('API Error:', JSON.stringify(errorDetails, null, 2));
      
      // Return error details in response
      return new Response(
        JSON.stringify({
          error: 'Failed to fetch patient data',
          details: errorDetails,
          fullResponse: responseText,
          requestUrl: `${supabaseUrl}/rest/v1/patients?select=*&id=eq.${patientId}`,
          requestHeaders: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.pgrst.object+json'
          }
        }),
        {
          status: 200, // Return 200 to allow error details in the response body
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    const patientData = JSON.parse(responseText)[0];
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
      JSON.stringify({ 
        error: error.message,
        details: error.stack,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    );
  }
  console.log("Forcing a redeploy to clear potential cache.");
});
