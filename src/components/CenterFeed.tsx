import React from 'react';
import { Article, ClusterTheme, ComparisonData } from '../types';
import { Volume2, Sparkles, Globe, Compass, ArrowUpRight, Clock, Bookmark, Share2, RefreshCw } from 'lucide-react';
import summerReadsImg from '../assets/images/news_summer_reads_1791434938423.jpg';
import footballVictoryImg from '../assets/images/news_football_victory_1791434951062.jpg';
import singaporeSkylineImg from '../assets/images/news_singapore_skyline_1791434965221.jpg';

interface CenterFeedProps {
  articles: Article[];
  isLoading: boolean;
  activeView: 'feed' | 'ai-summary' | 'compare' | 'dots';
  onSelectArticle: (article: Article) => void;
  onReadAloud: (text: string, title: string) => void;
  onCompareTopic: (topic: string) => void;
  aiSummaryData: { summary: string; keyTakeaways: string[] } | null;
  isLoadingAiSummary: boolean;
  onRefreshAiSummary: () => void;
  comparisonData: ComparisonData | null;
  isLoadingComparison: boolean;
  clusterThemes: ClusterTheme[];
  selectedCluster: string | null;
  onSelectCluster: (cluster: string | null) => void;
}

export const CenterFeed: React.FC<CenterFeedProps> = ({
  articles,
  isLoading,
  activeView,
  onSelectArticle,
  onReadAloud,
  onCompareTopic,
  aiSummaryData,
  isLoadingAiSummary,
  onRefreshAiSummary,
  comparisonData,
  isLoadingComparison,
  clusterThemes,
  selectedCluster,
  onSelectCluster,
}) => {
  // Find lead article or use default cultural feature
  const leadArticle: Article = articles[0] || {
    id: 'lead-default',
    title: 'Best summer reads for your vacation',
    source: 'The News Dispatch Culture',
    url: '#',
    publishedAt: new Date().toISOString(),
    summary:
      "Summer is the perfect time to indulge in some leisurely reading, whether it's lying on the beach or lounging in the park. So if you're looking for a way to unwind this summer, why not pick up a few books and escape into some compelling new worlds.",
    category: 'CULTURE',
    readTime: '4 min read',
    imageUrl: summerReadsImg,
  };

  const sportsArticle: Article = articles.find((a) => a.category === 'SPORTS') || {
    id: 'sports-default',
    title: 'Footballer leads Argentina to victory',
    source: 'Sports Dispatch · FRED WALLER',
    url: '#',
    publishedAt: '14 June 2026',
    summary: 'A commanding second-half midfield masterclass steered the squad through tense extra time into continental glory.',
    category: 'SPORTS',
    readTime: '3 min read',
    imageUrl: footballVictoryImg,
  };

  const singaporeArticle: Article = articles.find((a) => a.category === 'SINGAPORE' || a.category === 'ECONOMY') || {
    id: 'sg-default',
    title: 'Singapore Cross-Border Supply Corridor Expands Maritime Gateway',
    source: 'The Straits Times & Maritime Hub',
    url: '#',
    publishedAt: new Date().toISOString(),
    summary: 'Automated deep-sea terminal operations at Tuas Port enhance transit speeds across ASEAN and European trade corridors.',
    category: 'WORLD',
    readTime: '5 min read',
    imageUrl: singaporeSkylineImg,
  };

  const remainingArticles = articles.slice(1);

  // VIEW 1: AI Executive Summary View
  if (activeView === 'ai-summary') {
    return (
      <div className="flex-1 space-y-6">
        <div className="bg-white border border-amber-200 rounded-lg p-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <div>
                <h2 className="font-editorial text-2xl font-semibold text-stone-900">
                  Today's AI Executive Briefing
                </h2>
                <p className="text-xs text-stone-500">
                  High-level synthesis generated across all cross-border aggregators
                </p>
              </div>
            </div>
            <button
              onClick={onRefreshAiSummary}
              disabled={isLoadingAiSummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAiSummary ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>
          </div>

          {isLoadingAiSummary ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-stone-500 font-editorial italic">
                Synthesizing global and Singapore headlines with Gemini intelligence...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="prose prose-stone max-w-none font-editorial text-stone-800 text-base leading-relaxed">
                <p className="first-letter:text-4xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-stone-900 leading-relaxed whitespace-pre-line">
                  {aiSummaryData?.summary ||
                    'Today\'s global dispatch reflects key developments in high-tech trade corridors, regional fiscal discussions across ASEAN, and vibrant cultural initiatives. Cross-border aggregators highlight steady supply chain stabilization alongside evolving multilateral dialogues.'}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-md p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-2.5">
                  Strategic Key Takeaways
                </h4>
                <ul className="space-y-2 text-xs text-stone-700">
                  {aiSummaryData?.keyTakeaways?.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  )) || (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                        <span>Southeast Asian economic hubs reinforce digital connectivity agreements.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                        <span>Global technology markets adjust expectations around next-generation computing infrastructure.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                        <span>Singapore maintains strong bilateral momentum ahead of upcoming holiday festivals.</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Read Aloud Summary CTA */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() =>
                    onReadAloud(
                      aiSummaryData?.summary || 'Executive briefing of today\'s headlines.',
                      'Executive AI Briefing'
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen to Executive Summary</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // VIEW 2: Singapore vs The World Perspective (Miro Board Page 2)
  if (activeView === 'compare') {
    return (
      <div className="flex-1 space-y-6">
        <div className="bg-white border border-blue-200 rounded-lg p-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="font-editorial text-2xl font-semibold text-stone-900">
                  Singapore vs The World Perspective
                </h2>
                <p className="text-xs text-stone-500">
                  Dual-lens comparative analysis: Domestic policy & stability vs Global multilateral currents
                </p>
              </div>
            </div>
          </div>

          {isLoadingComparison ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-stone-500 font-editorial italic">
                Comparing strategic viewpoints between Singapore and international institutions...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-3 bg-stone-100 rounded text-xs text-stone-700 flex items-center justify-between">
                <div>
                  <span className="font-medium text-stone-500 uppercase text-[10px] block">Analyzed Subject:</span>
                  <span className="font-serif font-medium text-stone-900 text-sm">
                    {comparisonData?.topic || 'Global Macroeconomic Shifts, Tech Supply Chains & Regional Security'}
                  </span>
                </div>
              </div>

              {/* Side-by-side Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Singapore Perspective */}
                <div className="border border-red-200 bg-red-50/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-red-200/60">
                    <span className="text-base">🇸🇬</span>
                    <h3 className="font-serif font-semibold text-sm text-red-950">
                      {comparisonData?.singaporePerspective?.angle || 'Singapore National Focus'}
                    </h3>
                  </div>
                  <p className="font-editorial text-xs text-stone-700 leading-relaxed mb-3">
                    {comparisonData?.singaporePerspective?.viewpoint ||
                      'As a small, highly open island economy and ASEAN anchor, Singapore emphasizes strategic neutrality, long-term reserves, workforce adaptability, and dependable maritime infrastructure.'}
                  </p>
                  <div className="bg-white/80 p-2.5 rounded border border-red-100 text-[11px] text-red-900">
                    <strong>Local Impact:</strong>{' '}
                    {comparisonData?.singaporePerspective?.impact ||
                      'Insulates resident purchasing power while maintaining prime gateway status for multilateral enterprise headquarters.'}
                  </div>
                </div>

                {/* World Perspective */}
                <div className="border border-blue-200 bg-blue-50/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-blue-200/60">
                    <span className="text-base">🌐</span>
                    <h3 className="font-serif font-semibold text-sm text-blue-950">
                      {comparisonData?.worldPerspective?.angle || 'Global & Multilateral Lens'}
                    </h3>
                  </div>
                  <p className="font-editorial text-xs text-stone-700 leading-relaxed mb-3">
                    {comparisonData?.worldPerspective?.viewpoint ||
                      'Major powers (US, EU, China) are navigating sovereign industrial subsidies, tariff adjustments, and multi-currency settlement mechanisms amidst shifting diplomatic blocs.'}
                  </p>
                  <div className="bg-white/80 p-2.5 rounded border border-blue-100 text-[11px] text-blue-900">
                    <strong>Global Impact:</strong>{' '}
                    {comparisonData?.worldPerspective?.impact ||
                      'Accelerates multi-polar trade regionalization and fragmented regulatory environments.'}
                  </div>
                </div>
              </div>

              {/* Synthesis Bridge */}
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Analytical Synthesis
                </h4>
                <p className="font-editorial text-xs text-stone-800 leading-relaxed">
                  {comparisonData?.synthesis ||
                    'While global markets endure structural realignments and sovereign frictions, Singapore functions as a stable, predictable conduit that bridges Eastern and Western capital flows.'}
                </p>
              </div>

              {/* Quick topic test buttons */}
              <div className="pt-2">
                <span className="text-[11px] text-stone-500 font-medium block mb-2">Compare Another Topic:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'AI Sovereign Regulation',
                    'Semiconductor Supply Chains',
                    'Green Energy Grids & Carbon Tax',
                    'Inflation & Central Bank Interest Rates',
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => onCompareTopic(t)}
                      className="px-2.5 py-1 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 rounded transition-colors cursor-pointer"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // VIEW 3: Connect the Dots View
  if (activeView === 'dots') {
    return (
      <div className="flex-1 space-y-6">
        <div className="bg-white border border-emerald-200 rounded-lg p-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              <div>
                <h2 className="font-editorial text-2xl font-semibold text-stone-900">
                  Connect the Dots: Emerging Themes
                </h2>
                <p className="text-xs text-stone-500">
                  AI detected clusters identifying covert connections between disparate global stories
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clusterThemes.map((cluster) => {
              const isSelected = selectedCluster === cluster.name;
              return (
                <div
                  key={cluster.name}
                  onClick={() => onSelectCluster(isSelected ? null : cluster.name)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-500'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif font-semibold text-stone-900 text-sm">
                      {cluster.name}
                    </h3>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {cluster.articleCount} interconnected wires
                    </span>
                  </div>
                  <p className="font-editorial text-xs text-stone-600 leading-relaxed mb-3">
                    {cluster.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cluster.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 bg-white border border-stone-200 rounded text-stone-600"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT VIEW: Curated Front-Page (Directly styled after Miro Board Uizard Template)
  return (
    <main className="flex-1 min-w-0 space-y-8">
      {/* Lead Story Hero (Matches Miro "Best summer reads for your vacation") */}
      <article className="bg-white border border-stone-200/90 rounded-lg overflow-hidden shadow-2xs group">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Main Visual */}
          <div className="md:col-span-7 relative aspect-16/10 md:aspect-auto overflow-hidden bg-stone-100 min-h-[260px] md:min-h-[360px]">
            <img
              src={leadArticle.imageUrl || summerReadsImg}
              alt={leadArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            {/* Category badge - quiet editorial style */}
            <div className="absolute top-4 left-4 bg-stone-900/85 backdrop-blur-xs text-white text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded">
              {leadArticle.category}
            </div>
          </div>

          {/* Lead Story Copy */}
          <div className="md:col-span-5 p-5 md:p-6 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="font-semibold text-stone-800">{leadArticle.source}</span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.readTime}</span>
              </div>

              <h2
                onClick={() => onSelectArticle(leadArticle)}
                className="font-editorial text-2xl lg:text-3xl font-semibold text-stone-900 leading-tight mb-3 cursor-pointer hover:text-stone-700 transition-colors"
              >
                {leadArticle.title}
              </h2>

              <p className="font-editorial text-sm text-stone-600 leading-relaxed line-clamp-4 mb-4">
                {leadArticle.summary}
              </p>
            </div>

            {/* Actions: Read Article, Read Aloud (TTS), Compare */}
            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2">
              <button
                onClick={() => onSelectArticle(leadArticle)}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors cursor-pointer"
              >
                Read Dispatch
              </button>
              <button
                onClick={() => onReadAloud(leadArticle.summary, leadArticle.title)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded transition-colors cursor-pointer"
                title="Listen with AI Voice Readout"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
              <button
                onClick={() => onCompareTopic(leadArticle.title)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-stone-500 hover:text-blue-700 text-xs transition-colors cursor-pointer"
                title="Compare Singapore vs World perspective"
              >
                <Globe className="w-3 h-3 text-blue-600" />
                <span className="hidden sm:inline">SG vs World</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Secondary Features Grid (Sports & Singapore Skyline - Matches Miro Board Right & Center columns) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Secondary Story 1: Sports Feature */}
        <article
          onClick={() => onSelectArticle(sportsArticle)}
          className="bg-white border border-stone-200/90 rounded-lg overflow-hidden shadow-2xs group cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
              <img
                src={sportsArticle.imageUrl || footballVictoryImg}
                alt={sportsArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-red-700 text-white text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded">
                SPORTS
              </span>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1.5">
                <span className="font-semibold text-stone-800">{sportsArticle.source}</span>
                <span aria-hidden="true">·</span>
                <span>{sportsArticle.publishedAt}</span>
              </div>
              <h3 className="font-editorial text-lg font-semibold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">
                {sportsArticle.title}
              </h3>
              <p className="font-editorial text-xs text-stone-600 leading-relaxed line-clamp-2 mt-2">
                {sportsArticle.summary}
              </p>
            </div>
          </div>

          <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>{sportsArticle.readTime}</span>
            <span className="text-stone-900 group-hover:translate-x-1 transition-transform">
              Full story →
            </span>
          </div>
        </article>

        {/* Secondary Story 2: Regional / Singapore Headline */}
        <article
          onClick={() => onSelectArticle(singaporeArticle)}
          className="bg-white border border-stone-200/90 rounded-lg overflow-hidden shadow-2xs group cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
              <img
                src={singaporeArticle.imageUrl || singaporeSkylineImg}
                alt={singaporeArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-blue-700 text-white text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded">
                SINGAPORE & ASIA
              </span>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1.5">
                <span className="font-semibold text-stone-800">{singaporeArticle.source}</span>
                <span aria-hidden="true">·</span>
                <span>{singaporeArticle.readTime}</span>
              </div>
              <h3 className="font-editorial text-lg font-semibold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">
                {singaporeArticle.title}
              </h3>
              <p className="font-editorial text-xs text-stone-600 leading-relaxed line-clamp-2 mt-2">
                {singaporeArticle.summary}
              </p>
            </div>
          </div>

          <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>{singaporeArticle.readTime}</span>
            <span className="text-stone-900 group-hover:translate-x-1 transition-transform">
              Full story →
            </span>
          </div>
        </article>
      </section>

      {/* Remaining Curated Articles Feed */}
      <section className="bg-white border border-stone-200/90 rounded-lg p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
          <h3 className="font-editorial text-lg font-semibold text-stone-900">
            {selectedCluster ? `Filtered by Cluster: "${selectedCluster}"` : 'Continuous Wire Feed'}
          </h3>
          <span className="text-xs text-stone-400 font-mono">
            {remainingArticles.length} Wires Aggregated
          </span>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-xs text-stone-400">
            Refreshing cross-border wires...
          </div>
        ) : remainingArticles.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-400">
            No matching dispatches found for this category or filter.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {remainingArticles.map((article) => (
              <div
                key={article.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1">
                    <span className="font-semibold text-stone-800">{article.source}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase text-[10px] text-stone-600 font-medium">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h4
                    onClick={() => onSelectArticle(article)}
                    className="font-editorial text-base sm:text-lg font-medium text-stone-900 leading-snug cursor-pointer group-hover:text-blue-700 transition-colors"
                  >
                    {article.title}
                  </h4>

                  <p className="font-editorial text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-2">
                  <button
                    onClick={() => onReadAloud(article.summary, article.title)}
                    className="p-1.5 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    title="Read aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onCompareTopic(article.title)}
                    className="p-1.5 rounded hover:bg-stone-100 text-stone-500 hover:text-blue-600 transition-colors cursor-pointer"
                    title="Compare SG vs World"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSelectArticle(article)}
                    className="text-xs text-stone-700 font-medium hover:underline cursor-pointer"
                  >
                    Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
