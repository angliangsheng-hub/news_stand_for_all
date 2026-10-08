export const AGGREGATOR_TRAFFIC_DATA = [
  { id: 'google_news', name: 'Google News', monthlyVisits: '390M', globalRank: 1, type: 'Aggregator', reliability: '98%' },
  { id: 'reuters', name: 'Reuters', monthlyVisits: '72M', globalRank: 4, type: 'Wire Service', reliability: '99%' },
  { id: 'bbc', name: 'BBC World News', monthlyVisits: '185M', globalRank: 2, type: 'Broadcaster', reliability: '97%' },
  { id: 'straitstimes', name: 'The Straits Times (SG)', monthlyVisits: '28M', globalRank: 12, type: 'Singapore Regional', reliability: '96%' },
  { id: 'cna', name: 'Channel NewsAsia (CNA)', monthlyVisits: '34M', globalRank: 9, type: 'Singapore Regional', reliability: '97%' },
  { id: 'cdt', name: 'China Digital Times (CDT)', monthlyVisits: '1.2M', globalRank: 85, type: 'Independent Monitor', reliability: '94%' },
  { id: 'agent_news', name: 'Agent News Network', monthlyVisits: '4.8M', globalRank: 42, type: 'Autonomous AI Aggregator', reliability: '92%' },
  { id: 'hallucination_herald', name: 'The Hallucination Herald', monthlyVisits: '850K', globalRank: 110, type: 'AI Media Lab', reliability: '90%' },
  { id: 'noozra', name: 'Noozra Unified Wire', monthlyVisits: '2.1M', globalRank: 64, type: 'Global Feed Aggregator', reliability: '93%' },
];

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    sources: AGGREGATOR_TRAFFIC_DATA,
    updated: 'October 2026 Similarweb Intelligence',
  });
}
