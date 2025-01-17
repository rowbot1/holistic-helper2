import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import weaviate, { ApiKey } from 'npm:weaviate-ts-client';

const WEAVIATE_URL = Deno.env.get('WEAVIATE_URL');
const WEAVIATE_API_KEY = Deno.env.get('WEAVIATE_API_KEY');

if (!WEAVIATE_URL || !WEAVIATE_API_KEY) {
  throw new Error('Missing Weaviate configuration');
}

const client = weaviate.client({
  scheme: 'https',
  host: WEAVIATE_URL,
  apiKey: new ApiKey(WEAVIATE_API_KEY),
});

// Schema definition for TCMApp class
const TCM_CLASS_NAME = 'TCMApp';
const tcmClassObj = {
  class: TCM_CLASS_NAME,
  vectorizer: 'text2vec-transformers',
  properties: [
    {
      name: 'text',
      dataType: ['text'],
      description: 'The main text content',
    },
    {
      name: 'title',
      dataType: ['text'],
      description: 'Optional title or source of the content',
    },
  ],
};

// Initialize schema if it doesn't exist
async function initializeSchema() {
  try {
    const schema = await client.schema.getter().do();
    const classExists = schema.classes?.some(c => c.class === TCM_CLASS_NAME);
    
    if (!classExists) {
      await client.schema.classCreator().withClass(tcmClassObj).do();
      console.log('TCMApp schema created successfully');
    }
  } catch (error) {
    console.error('Error initializing schema:', error);
    throw error;
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    await initializeSchema();

    const { action, data } = await req.json();

    if (action === 'index') {
      const { text, title = '' } = data;
      
      // Add object to Weaviate
      const result = await client.data
        .creator()
        .withClassName(TCM_CLASS_NAME)
        .withProperties({
          text,
          title,
        })
        .do();

      return new Response(
        JSON.stringify({ message: 'Text indexed successfully', id: result.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'query') {
      const { query, limit = 5 } = data;

      // Search in Weaviate
      const result = await client.graphql
        .get()
        .withClassName(TCM_CLASS_NAME)
        .withFields(['text', 'title', '_additional { certainty }'])
        .withNearText({ concepts: [query] })
        .withLimit(limit)
        .do();

      return new Response(
        JSON.stringify({ results: result.data.Get[TCM_CLASS_NAME] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});