export const getGeminiResponse = async (prompt: string) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    
    const data = await response.json();
    return data.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Backend Error:", error);
    return "I'm sorry, I couldn't connect to my brain right now. Please try again later.";
  }
};
