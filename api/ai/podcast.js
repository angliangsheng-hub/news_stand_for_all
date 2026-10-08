import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Read GEMINI_API_KEY from Vercel environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  const { headlines } = req.body || {};
  const list = Array.isArray(headlines) ? headlines.slice(0, 5).join('; ') : '';

  if (!apiKey) {
    return res.status(200).json({
      title: 'Daily Minute: Reports from around the world',
      speaker: 'Nicole Schulz & Prof M',
      durationFormatted: '01:15',
      script: 'Good morning from The News Dispatch. Here is your 60-second world report. Southeast Asian trade corridors are registering fresh cross-border connectivity gains as Singapore deepens bilateral agreements. In global tech, next-generation computing infrastructure continues to reshape market projections. Meanwhile, communities in Singapore are preparing for festive holiday gatherings with mild afternoon showers forecast across Marina Bay. Stay curious, stay informed.',
      audioAvailable: false,
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const prompt = `Write an engaging, crisp 60-second radio podcast script for "Daily Minute: Reports from around the world" hosted by Nicole Schulz and Prof M (the scholarly Merlion news anchor).
Base it on these current headlines:
${list}

Return JSON:
{
  "title": "Daily Minute: Reports from around the world",
  "speaker": "Nicole Schulz & Prof M",
  "durationFormatted": "01:15",
  "script": "The spoken radio script (approx 120 words, energetic, warm, professional)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const podcastData = JSON.parse(response.text || '{}');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      ...podcastData,
      audioAvailable: false,
    });
  } catch (err) {
    console.error('Podcast generation error on Vercel:', err);
    return res.status(200).json({
      title: 'Daily Minute: Reports from around the world',
      speaker: 'Nicole Schulz & Prof M',
      durationFormatted: '01:15',
      script: 'Here is your 60-second world report from The News Dispatch. Trade corridors across Southeast Asia remain active with steady progress.',
      audioAvailable: false,
    });
  }
}
