import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Read GEMINI_API_KEY from Vercel environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  const { message, history } = req.body || {};

  const systemInstruction = `You are Prof M, the adorable, wise, and scholarly Singapore Merlion Professor mascot for "The News Dispatch" news app.
Your persona:
- Scholarly yet cheerful, polite, highly well-informed news guide with a friendly Singaporean lion-fish professor mascot spirit.
- Knowledgeable about international news, ASEAN trade, Singapore public holidays, local weather, and food culture.
- You weave in current Singapore weather (~30°C partly cloudy with tropical showers) and Deepavali / festive calendar cheer.
- Keep answers helpful, concise, well-formatted, and encouraging. Use friendly emojis like 🦁, 🌊, 🇸🇬, 📚, ☕.`;

  if (!apiKey) {
    return res.status(200).json({
      reply: 'Greetings! 🦁 I am Prof M, your Singapore news scholar. Today in Singapore it is a warm 30°C with passing tropical showers around Marina Bay! With Deepavali approaching, feel free to ask me to analyse any breaking world wire or Singapore policy story! 🦁📚',
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map((h) => `${h.role === 'user' ? 'User' : 'Prof M'}: ${h.text}`).join('\n')
      : '';

    const fullPrompt = `${formattedHistory ? `Conversation so far:\n${formattedHistory}\n\n` : ''}User Question: ${message}\n\nPlease respond in character as Prof M.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      reply: response.text || 'Greetings! I am reviewing the latest wires right now—ask me anything about Singapore or global events! 🦁🌊',
    });
  } catch (error) {
    console.error('Prof M chat error on Vercel:', error);
    return res.status(200).json({
      reply: 'Greetings! The sea currents are momentarily quiet on my wire, but I recommend exploring our regional trade and culture briefings! 🦁🌊',
    });
  }
}
