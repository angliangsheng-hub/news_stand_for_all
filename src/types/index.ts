export interface Article {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
  category: string;
  readTime: string;
  imageUrl?: string;
  tags?: string[];
  singaporeAngle?: string;
}

export interface MCPDependency {
  name: string;
  id: string;
  status: 'healthy' | 'amber';
  latency: number;
  details: string;
}

export interface MCPHealthResponse {
  status: 'ok' | 'amber';
  healthy: boolean;
  timestamp: string;
  uptimeSeconds: number;
  latencyMs: number;
  mcpDependencies: MCPDependency[];
}

export interface WeatherStation {
  area: string;
  temp: number;
  condition: string;
}

export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  precipitationChance: string;
  humidity: string;
  uvIndex: string;
  stations: WeatherStation[];
  updatedAt: string;
}

export interface SingaporeHoliday {
  name: string;
  date: string;
  season: string;
  greeting: string;
}

export interface HolidayContext {
  today: string;
  currentHoliday: SingaporeHoliday;
  allHolidays: SingaporeHoliday[];
}

export interface ClusterTheme {
  name: string;
  sentiment: 'positive' | 'neutral' | 'caution';
  articleCount: number;
  keywords: string[];
  description: string;
}

export interface ComparisonPerspective {
  angle: string;
  viewpoint: string;
  impact: string;
}

export interface ComparisonData {
  topic: string;
  singaporePerspective: ComparisonPerspective;
  worldPerspective: ComparisonPerspective;
  synthesis: string;
}

export interface PodcastData {
  title: string;
  speaker: string;
  durationFormatted: string;
  script: string;
  audioBase64?: string | null;
  audioAvailable?: boolean;
}

export interface AggregatorTraffic {
  id: string;
  name: string;
  monthlyVisits: string;
  globalRank: number;
  type: string;
  reliability: string;
  active?: boolean;
}

export interface CDTSummary {
  id: string;
  title: string;
  link?: string;
  publishedAt: string;
  censorshipTag: string;
  summary: string;
}
