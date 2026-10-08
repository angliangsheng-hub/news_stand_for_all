import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Read GEMINI_API_KEY from Vercel environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  const { headlines } = req.body || {};
  const newsContext = Array.isArray(headlines) ? headlines.slice(0, 12).join('\n') : '';

  if (!apiKey) {
    return res.status(200).json({
      clusters: [
        {
          name: 'ASEAN Digital & Trade Corridors',
          sentiment: 'positive',
          articleCount: 5,
          keywords: ['Cross-Border Payments', 'Supply Chains', 'Data Sovereign', 'Singapore Changi'],
          description: 'Strengthening regional economic partnerships and resilient transit networks.',
        },
        {
          name: 'Next-Gen Compute & AI Infrastructure',
          sentiment: 'neutral',
          articleCount: 4,
          keywords: ['Semiconductor Fabrication', 'Cloud Compute', 'Green Energy Grids', 'Edge AI'],
          description: 'Global investments in sovereign AI facilities and low-power silicon.',
        },
        {
          name: 'Urban Sustainability & Tropical Climate',
          sentiment: 'positive',
          articleCount: 3,
          keywords: ['Cooling Systems', 'Solar Canopy', 'Water Reclamation', 'Net-Zero Buildings'],
          description: 'High-density tropical city innovations addressing heat resilience.',
        },
      ],
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const prompt = `Analyze these current news headlines and discover 3 to 4 clusters of emerging interconnected themes ("Connect the Dots" feature).
Headlines:
${newsContext}

Return JSON with structure:
{
  "clusters": [
    {
      "name": "Cluster Theme Name",
      "sentiment": "positive" | "neutral" | "caution",
      "articleCount": number,
      "keywords": ["tag1", "tag2", "tag3"],
      "description": "Insightful sentence explaining how these disparate news stories connect."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Cluster generation error on Vercel:', err);
    return res.status(200).json({
      clusters: [
        {
          name: 'ASEAN Digital & Trade Corridors',
          sentiment: 'positive',
          articleCount: 4,
          keywords: ['Cross-Border Payments', 'Supply Chains', 'Singapore'],
          description: 'Strengthening regional economic partnerships and resilient logistics networks.',
        },
      ],
    });
  }
}
