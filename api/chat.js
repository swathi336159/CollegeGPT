// api/chat.js
//
// Vercel serverless function that proxies chatbot requests to the Gemini API.
// The real Gemini API key lives ONLY here, as an environment variable on the
// server (set in Vercel dashboard, or in a local .env file that is gitignored).
// The frontend (public/index.html) never sees the key — it just calls this
// endpoint with { prompt, instruction }.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, instruction } = req.body || {};

  if (!prompt) {
    return res.status(400).json({ error: 'Missing "prompt" in request body' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in environment variables');
    return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY' });
  }

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    tools: [{ google_search: {} }],
    systemInstruction: {
      parts: [{ text: instruction || 'You are a helpful campus assistant.' }],
    },
  };

  try {
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error('Gemini API error:', geminiResponse.status, errText);
      return res.status(geminiResponse.status).json({ error: 'Gemini API request failed' });
    }

    const result = await geminiResponse.json();
    return res.status(200).json(result);
  } catch (err) {
    console.error('Error calling Gemini API:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
