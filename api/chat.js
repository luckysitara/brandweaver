import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Set CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Health check for debugging
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: "alive", 
      env_key_detected: !!process.env.GEMINI_API_KEY,
      node_version: process.version
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing in environment variables");
    return res.status(500).json({ 
      error: "Server configuration error", 
      message: "GEMINI_API_KEY is not defined in the server environment. Please add it to Vercel environment variables." 
    });
  }

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt in request body" });
    }

    const genAI = new GoogleGenAI(apiKey);
    // Use gemini-1.5-flash as default
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.status(200).json({ text });
  } catch (error) {
    console.error("Gemini API Detail Error:", error);
    res.status(500).json({ 
      error: "Gemini API Execution Error", 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
