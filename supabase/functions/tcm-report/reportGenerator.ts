import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { queryRelevantTCMKnowledge } from "./knowledgeQuery.ts";

// Remove the import for `openai` since we won't be using it
// import OpenAI from 'openai';

const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

/**
 * Generates a TCM report using DeepSeek's OpenAI-compatible API.
 * This version uses a direct fetch to avoid any hardcoded .ai domain.
 */
export async function generateReportWithDeepseek(patientData: any, tcmKnowledge: any[]) {
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
5. Recommendations`;

  try {
    // Make a direct POST request to the correct DeepSeek endpoint
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an experienced TCM practitioner providing detailed diagnostic reports.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });
    console.log('DeepSeek fetch response status:', response.status);

    if (!response.ok) {
      // If the response is not 2xx, log details and throw an error
      const errorBody = await response.text();
      console.error('DeepSeek fetch error body:', errorBody);
      throw new Error(`Failed to generate report: ${response.status} ${response.statusText}`);
    }

    // Parse JSON response from DeepSeek (assuming a structure similar to OpenAI's completions)
    const data = await response.json();
    // If the response follows an OpenAI-like structure, retrieve the content
    const content = data.choices?.[0]?.message?.content || 'No content received';

    console.log('DeepSeek response received successfully');
    return content;

  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw new Error(`Failed to generate report: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
