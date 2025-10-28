import { getStore } from '@netlify/blobs';

/**
 * Edge Function для работы с Netlify Blobs из браузера
 * Обходит проблему с прямым доступом к Blobs API
 */
export default async (request, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    // Получаем store
    const store = getStore({
      name: 'learning-progress',
      siteID: Netlify.env.get('VITE_NETLIFY_SITE_ID'),
      token: Netlify.env.get('VITE_NETLIFY_BLOBS_TOKEN')
    });

    const url = new URL(request.url);
    const key = url.searchParams.get('key') || 'topics';
    const method = request.method;

    // GET - получить данные
    if (method === 'GET') {
      const data = await store.get(key, { type: 'text' });
      
      return new Response(JSON.stringify({
        success: true,
        data: data || null
      }), {
        status: 200,
        headers
      });
    }

    // POST/PUT - сохранить данные
    if (method === 'POST' || method === 'PUT') {
      const body = await request.json();
      await store.set(key, body.data);
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Data saved'
      }), {
        status: 200,
        headers
      });
    }

    // DELETE - удалить данные
    if (method === 'DELETE') {
      await store.delete(key);
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Data deleted'
      }), {
        status: 200,
        headers
      });
    }

    return new Response(JSON.stringify({
      success: false,
      error: 'Method not allowed'
    }), {
      status: 405,
      headers
    });

  } catch (error) {
    console.error('Blobs API Error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers
    });
  }
};

export const config = {
  path: '/api/blobs'
};

