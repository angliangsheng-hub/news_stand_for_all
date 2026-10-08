import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Read GEMINI_API_KEY from Vercel environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  const { topic, headline } = req.body || {};
  const subject = topic || headline || 'Current Global Economic and Geopolitical Landscape';

  if (!apiKey) {
    return res.status(200).json({
      topic: subject,
      singaporePerspective: {
        angle: 'Singapore National Focus',
        viewpoint: 'As a global financial hub and open trading port, Singapore prioritizes stability, regional ASEAN neutrality, proactive supply-chain resilience, and forward-looking workforce upskilling.',
        impact: 'Maintains competitive maritime & tech gateway status while moderating imported inflationary pressures.',
      },
      worldPerspective: {
        angle: 'Global & Multilateral Perspective',
        viewpoint: 'Major economies are balancing interest rate trajectories, geopolitical trade realignment, and energy transition investments amidst shifting sovereign fiscal policies.',
        impact: 'Fragmented regulatory environments across North America, Europe, and Northeast Asia driving multi-polar supply diversification.',
      },
      synthesis: 'Singapore acts as a resilient neutral bridge and benchmark for stability amid wider macroeconomic fluctuations across Western and East Asian markets.',
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const prompt = `Compare how this news topic is perceived from the "Singapore Perspective" versus "The World Perspective".
Topic: "${subject}"

Respond with JSON adhering to:
{
  "topic": "${subject}",
  "singaporePerspective": {
    "angle": "Singapore Focus (policy, economy, society, strategic stance)",
    "viewpoint": "Detailed explanation of how Singapore approaches or is impacted by this",
    "impact": "Concrete societal or financial takeaway for Singaporeans"
  },
  "worldPerspective": {
    "angle": "Global / Multilateral Lens",
    "viewpoint": "How international powers (US, EU, China, Global South) view this issue",
    "impact": "Broader planetary / macro takeaway"
  },
  "synthesis": "A balanced analytical bridge explaining the contrast between Singapore's pragmatic open-economy approach and global volatility."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const result = JSON.parse(response.text || '{}');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(result);
  } catch (err) {
    console.error('Compare perspective error on Vercel:', err);
    return res.status(200).json({
      topic: subject,
      singaporePerspective: {
        angle: 'Singapore National Focus',
        viewpoint: 'Singapore emphasizes strategic neutrality, long-term reserves, and reliable trade connectivity.',
        impact: 'Protects resident purchasing power and regional competitiveness.',
      },
      worldPerspective: {
        angle: 'Global & Multilateral Lens',
        viewpoint: 'Major trade corridors navigate multi-polar supply diversification.',
        impact: 'Variable volatility across global markets.',
      },
      synthesis: 'Singapore acts as an anchor of stability amid wider global volatility.',
    });
  }
}
