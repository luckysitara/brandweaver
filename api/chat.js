import { GoogleGenerativeAI } from "@google/generative-ai";

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

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log("Calling Gemini API with prompt:", prompt); 
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Log the raw response text received from Gemini API
    const responseText = await response.text(); 
    console.log("Gemini API raw response:", responseText.substring(0, 500)); 

    // Check if the response text is empty or potentially malformed
    if (!responseText || responseText.trim() === '') {
        console.error("Gemini API returned empty response.");
        return res.status(500).json({ 
          error: "Empty response from Gemini API", 
          message: "The Gemini API returned an empty response. Please check the prompt or API." 
        });
    }

    // Attempt to send the response back to the client as JSON
    res.status(200).json({ text: responseText });
  } catch (error) {
    console.error("Gemini API Execution Error:", error); 
    res.status(500).json({ 
      error: "Gemini API Execution Error", 
      message: error.message || "An unknown error occurred.",
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
