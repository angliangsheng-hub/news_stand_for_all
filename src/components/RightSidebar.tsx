import React from 'react';
import { Search, CloudSun, History, ShieldAlert, ExternalLink, Bookmark, Clock } from 'lucide-react';
import { Article, WeatherData, CDTSummary } from '../types';

interface RightSidebarProps {
  relatedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  recentSearches: string[];
  onSelectSearchTag: (tag: string) => void;
  weather: WeatherData | null;
  cdtStories: CDTSummary[];
  onOpenCdtArticle: (story: CDTSummary) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  relatedArticles,
  onSelectArticle,
  recentSearches,
  onSelectSearchTag,
  weather,
  cdtStories,
  onOpenCdtArticle,
}) => {
  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-6">
      {/* 1. Singapore Live Meteorological Synopsis (Page 1 & 2) */}
      <section className="bg-white border border-stone-200/90 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <CloudSun className="w-3.5 h-3.5 text-amber-500" />
            <span>Singapore Weather</span>
          </div>
          <span className="text-[10px] text-stone-400 font-mono">
            {weather?.updatedAt ? `Updated ${weather.updatedAt}` : 'Live NEA Synoptic'}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div>
            <div className="text-3xl font-light font-editorial text-stone-900">
              {weather?.temperature || 30}°C
            </div>
            <div className="text-xs text-stone-600 font-medium">
              {weather?.condition || 'Partly Cloudy with Afternoon Showers'}
            </div>
          </div>
          <div className="text-right text-[11px] text-stone-500">
            <div>Feels like: <strong className="text-stone-700">{weather?.feelsLike || 34}°C</strong></div>
            <div>Humidity: {weather?.humidity || '78%'}</div>
            <div>Rain chance: {weather?.precipitationChance || '45%'}</div>
          </div>
        </div>

        {/* Sub-district Station Readings */}
        {weather?.stations && (
          <div className="grid grid-cols-2 gap-1.5 mt-3 pt-2.5 border-t border-stone-100 text-[11px]">
            {weather.stations.map((station) => (
              <div key={station.area} className="p-1.5 bg-stone-50 rounded border border-stone-200/50">
                <span className="font-medium text-stone-800 block truncate">{station.area}</span>
                <span className="text-stone-500 font-mono text-[10px]">{station.temp}°C · {station.condition}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. User Typical Search News & Recent Memory (Miro Board Right Side #2) */}
      <section className="bg-white border border-stone-200/90 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <History className="w-3.5 h-3.5 text-stone-600" />
            <span>Search Memory</span>
          </div>
          <span className="text-[10px] text-stone-400">Remembered</span>
        </div>
        <p className="text-[11px] text-stone-500 mb-2.5 leading-relaxed">
          Your typical and recent news searches saved locally.
        </p>

        <div className="flex flex-wrap gap-1.5">
          {recentSearches.map((term, i) => (
            <button
              key={i}
              onClick={() => onSelectSearchTag(term)}
              className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>{term}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Related News Wire (Miro Board Right Side #1) */}
      <section className="bg-white border border-stone-200/90 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span>Related Dispatches</span>
          </div>
          <span className="text-[10px] text-stone-400 font-mono">
            {relatedArticles.length} Stories
          </span>
        </div>

        {relatedArticles.length === 0 ? (
          <p className="text-xs text-stone-400 py-3 text-center">
            Search or select an article to view related dispatches.
          </p>
        ) : (
          <div className="space-y-3 divide-y divide-stone-100">
            {relatedArticles.slice(0, 5).map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="pt-2.5 first:pt-0 cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-[10px] text-stone-500 mb-0.5">
                  <span className="font-semibold text-stone-700">{article.source}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.category}</span>
                </div>
                <h4 className="font-editorial text-sm font-medium text-stone-900 group-hover:text-blue-700 leading-snug line-clamp-2 transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1 font-mono">
                  <span>{article.readTime}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">Read →</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. China Digital Times (CDT) Insights Monitor (Miro Board Page 3 Strategy #2) */}
      <section className="bg-white border border-stone-200/90 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>China Insights (CDT)</span>
          </div>
          <span className="text-[9px] bg-rose-50 text-rose-700 border border-rose-200 px-1 py-0.5 rounded font-mono">
            Filtered Wire
          </span>
        </div>

        <p className="text-[11px] text-stone-500 mb-2.5 leading-relaxed">
          Tracking stories, deleted essays, and keywords actively filtered inside mainland China.
        </p>

        <div className="space-y-2.5">
          {cdtStories.slice(0, 3).map((story) => (
            <div
              key={story.id}
              onClick={() => onOpenCdtArticle(story)}
              className="p-2 rounded bg-stone-50 hover:bg-stone-100 border border-stone-200/60 cursor-pointer transition-colors"
            >
              <span className="text-[9px] font-mono text-rose-700 font-semibold uppercase tracking-wider block mb-0.5">
                {story.censorshipTag}
              </span>
              <h5 className="font-serif text-xs font-medium text-stone-900 line-clamp-2 leading-snug">
                {story.title}
              </h5>
              <p className="text-[10px] text-stone-500 line-clamp-2 mt-1">
                {story.summary}
              </p>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};
