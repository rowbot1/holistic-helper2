import { client, createTCMClassIfNotExists } from './weaviateClient.ts';

export async function queryRelevantTCMKnowledge(patientData: any) {
  console.log('Querying TCM knowledge for patient data:', patientData);
  const searchQuery = `${patientData.chief_complaint} ${patientData.tcm_inspection?.tongue_color || ''}`.trim();
  
  try {
    await createTCMClassIfNotExists();
    
    const result = await client.graphql
      .get()
      .withClassName('TCMKnowledge')
      .withFields(['text', 'title', '_additional { certainty }'])
      .withWhere({
        operator: 'Or',
        operands: [
          {
            path: ['text'],
            operator: 'Like',
            valueText: searchQuery
          },
          {
            path: ['title'],
            operator: 'Like',
            valueText: searchQuery
          }
        ]
      })
      .withLimit(3)
      .do();

    console.log('Weaviate query result:', result);
    return result.data.Get.TCMKnowledge;
  } catch (error) {
    console.error('Error querying Weaviate:', error);
    throw new Error(`Failed to query TCM knowledge: ${error.message}`);
  }
}