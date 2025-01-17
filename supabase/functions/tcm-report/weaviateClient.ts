import weaviate, { ApiKey } from 'npm:weaviate-ts-client';

const WEAVIATE_URL = Deno.env.get('WEAVIATE_URL') || "2thnljoisdy8xfn23vue1a.c0.europe-west3.gcp.weaviate.cloud";
const WEAVIATE_API_KEY = Deno.env.get('WEAVIATE_API_KEY');

export const client = weaviate.client({
  scheme: 'https',
  host: WEAVIATE_URL,
  apiKey: new ApiKey(WEAVIATE_API_KEY),
});

export async function createTCMClassIfNotExists() {
  try {
    const schema = await client.schema.getter().do();
    const tcmClass = schema.classes?.find(c => c.class === 'TCMKnowledge');
    
    if (!tcmClass) {
      console.log('Creating TCMKnowledge class in Weaviate...');
      await client.schema
        .classCreator()
        .withClass({
          class: 'TCMKnowledge',
          description: 'Traditional Chinese Medicine knowledge base',
          vectorizer: "text2vec-transformers",
          moduleConfig: {
            "text2vec-transformers": {
              vectorizeClassName: true
            }
          },
          properties: [
            {
              name: 'text',
              dataType: ['text'],
              description: 'The content of the TCM knowledge',
              moduleConfig: {
                "text2vec-transformers": {
                  skip: false,
                  vectorizePropertyName: false
                }
              }
            },
            {
              name: 'title',
              dataType: ['text'],
              description: 'The title or category of the TCM knowledge',
              moduleConfig: {
                "text2vec-transformers": {
                  skip: false,
                  vectorizePropertyName: false
                }
              }
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