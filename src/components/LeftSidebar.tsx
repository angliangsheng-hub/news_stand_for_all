import React, { useState } from 'react';
import { Play, Pause, Volume2, Sparkles, Layers, SlidersHorizontal, RefreshCw, BarChart2, Radio } from 'lucide-react';
import { PodcastData, ClusterTheme, AggregatorTraffic } from '../types';

interface LeftSidebarProps {
  podcast: PodcastData | null;
  isPlayingPodcast: boolean;
  onTogglePodcast: () => void;
  podcastProgress: number;
  onSeekPodcast: (progress: number) => void;
  playbackRate: number;
  onChangePlaybackRate: (rate: number) => void;
  clusterThemes: ClusterTheme[];
  selectedCluster: string | null;
  onSelectCluster: (cluster: string | null) => void;
  aggregators: AggregatorTraffic[];
  activeSource: string;
  onSelectSource: (sourceId: string) => void;
  onOpenDotsView: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  podcast,
  isPlayingPodcast,
  onTogglePodcast,
  podcastProgress,
  onSeekPodcast,
  playbackRate,
  onChangePlaybackRate,
  clusterThemes,
  selectedCluster,
  onSelectCluster,
  aggregators,
  activeSource,
  onSelectSource,
  onOpenDotsView,
}) => {
  const [showScript, setShowScript] = useState(false);
  const [showAllAggregators, setShowAllAggregators] = useState(false);

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-6">
      {/* 1. AI Podcast Summary Module (Matches Miro Board Left Column) */}
      <section className="bg-white border border-stone-200/90 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>Podcast Episodes</span>
          </div>
          <span className="text-[10px] font-mono text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">
            NotebookLM Style
          </span>
        </div>

        <h3 className="font-editorial text-lg font-medium text-stone-900 leading-snug">
          {podcast?.title || 'Daily Minute: Reports from around the world'}
        </h3>

        {/* Media Player Controls */}
        <div className="mt-3 bg-stone-50 border border-stone-200/70 rounded-md p-3">
          <div className="flex items-center gap-3">
            {/* Play / Pause circular button (Matches Miro red play icon) */}
            <button
              onClick={onTogglePodcast}
              className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shrink-0 shadow-xs transition-transform active:scale-95 cursor-pointer"
              title={isPlayingPodcast ? 'Pause AI Dispatch' : 'Play AI Dispatch'}
            >
              {isPlayingPodcast ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white ml-0.5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                <span className="truncate font-medium text-stone-800">
                  {podcast?.speaker || 'Nicole Schulz & Prof M'}
                </span>
                <span className="font-mono text-stone-400">
                  {isPlayingPodcast ? `${Math.floor(podcastProgress * 60)}s` : podcast?.durationFormatted || '01:15'}
                </span>
              </div>

              {/* Progress track */}
              <div
                className="w-full h-1.5 bg-stone-200 rounded-full cursor-pointer relative overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  onSeekPodcast(Math.max(0, Math.min(1, pct)));
                }}
              >
                <div
                  className="h-full bg-red-600 transition-all duration-150 rounded-full"
                  style={{ width: `${podcastProgress * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Speed & Script Controls */}
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-stone-200/60 text-[11px]">
            <div className="flex items-center gap-1 text-stone-500">
              <span>Speed:</span>
              {[1, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => onChangePlaybackRate(speed)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    playbackRate === speed
                      ? 'bg-stone-800 text-white font-medium'
                      : 'hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowScript(!showScript)}
              className="text-stone-600 hover:text-stone-900 font-medium underline cursor-pointer"
            >
              {showScript ? 'Hide Script' : 'View Script'}
            </button>
          </div>

          {/* Expandable Podcast Script */}
          {showScript && podcast?.script && (
            <div className="mt-2.5 pt-2 border-t border-stone-200 text-xs text-stone-700 leading-relaxed font-serif bg-white p-2.5 rounded border border-stone-100 max-h-40 overflow-y-auto">
              <p className="italic text-stone-500 text-[11px] mb-1">Host Readout Transcript:</p>
              {podcast.script}
            </div>
          )}
        </div>
      </section>

      {/* 2. Cluster of Emerging Themes ("Connect the Dots" - Miro Board Left Column) */}
      <section className="bg-white border border-stone-200/90 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Emerging Themes</span>
          </div>
          <button
            onClick={onOpenDotsView}
            className="text-[11px] text-emerald-700 hover:text-emerald-900 font-medium cursor-pointer"
          >
            Connect Dots →
          </button>
        </div>

        <p className="text-xs text-stone-500 mb-3 leading-relaxed">
          AI clusters synthesized from multi-source cross-border wires.
        </p>

        {clusterThemes.length === 0 ? (
          <div className="py-4 text-center text-xs text-stone-400">
            Synthesizing emerging clusters...
          </div>
        ) : (
          <div className="space-y-2">
            {clusterThemes.map((cluster) => {
              const isSelected = selectedCluster === cluster.name;
              return (
                <div
                  key={cluster.name}
                  onClick={() => onSelectCluster(isSelected ? null : cluster.name)}
                  className={`p-2.5 rounded-md border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                      : 'border-stone-200/80 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-xs text-stone-900 leading-tight">
                      {cluster.name}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                      {cluster.articleCount} wires
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                    {cluster.description}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {cluster.keywords.slice(0, 3).map((kw, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedCluster && (
          <button
            onClick={() => onSelectCluster(null)}
            className="mt-2.5 w-full text-center py-1 text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
          >
            Clear cluster filter
          </button>
        )}
      </section>

      {/* 3. Cross-Border Aggregators & Traffic Rankings (Miro Board Page 1 & 3 & 9) */}
      <section className="bg-white border border-stone-200/90 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Source Aggregators</span>
          </div>
          <span className="text-[10px] text-stone-400 font-mono">Similarweb</span>
        </div>

        <p className="text-[11px] text-stone-500 mb-2.5 leading-relaxed">
          Interactive selection re-ranked dynamically by global monthly traffic.
        </p>

        {/* Aggregator sources list */}
        <div className="space-y-1.5">
          {(showAllAggregators ? aggregators : aggregators.slice(0, 5)).map((agg) => {
            const isSelected = activeSource === agg.id;
            return (
              <button
                key={agg.id}
                onClick={() => onSelectSource(isSelected ? 'all' : agg.id)}
                className={`w-full flex items-center justify-between p-2 rounded text-xs transition-colors cursor-pointer text-left ${
                  isSelected
                    ? 'bg-blue-50 border border-blue-300 text-blue-950 font-medium'
                    : 'hover:bg-stone-50 border border-transparent text-stone-700'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="truncate">{agg.name}</span>
                  </div>
                  <span className="text-[10px] text-stone-400 block">{agg.type}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-[11px] text-stone-800 font-semibold block">
                    {agg.monthlyVisits}
                  </span>
                  <span className="text-[9px] text-stone-400 font-mono">
                    Rank #{agg.globalRank}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowAllAggregators(!showAllAggregators)}
          className="mt-2 w-full text-center text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer py-1"
        >
          {showAllAggregators ? 'Show Less' : `View All ${aggregators.length} Sources`}
        </button>
      </section>
    </aside>
  );
};
