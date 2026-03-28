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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing in environment variables");
    return res.status(500).json({ error: "Server configuration error: API key missing" });
  }

  try {
    const { prompt } = req.body;
    const genAI = new GoogleGenAI(apiKey);
    // Use 1.5-flash as it's the most stable and widely available
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.status(200).json({ text });
  } catch (error) {
    console.error("Gemini API Detail Error:", error);
    res.status(500).json({ 
      error: "Failed to get AI response", 
      message: error.message 
    });
  }
}
