const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

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
      console.error('DeepSeek API error response:', errorText);
      throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('DeepSeek response received successfully');
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw new Error(`Failed to generate report: ${error.message}`);
  }
}