import React, { useState } from 'react';
import { Search, Activity, User, Sparkles, Globe, Compass, BookOpen, Volume2, ShieldCheck } from 'lucide-react';
import { MCPHealthResponse } from '../types';

interface HeaderProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  activeView: 'feed' | 'ai-summary' | 'compare' | 'dots';
  onSelectView: (view: 'feed' | 'ai-summary' | 'compare' | 'dots') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPerformSearch: (query: string) => void;
  mcpHealth: MCPHealthResponse | null;
  onOpenMcpModal: () => void;
  onOpenSubscribeModal: () => void;
  onOpenProfileModal: () => void;
  onTriggerPodcastPlay: () => void;
  recentSearches: string[];
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  activeView,
  onSelectView,
  searchQuery,
  onSearchChange,
  onPerformSearch,
  mcpHealth,
  onOpenMcpModal,
  onOpenSubscribeModal,
  onOpenProfileModal,
  onTriggerPodcastPlay,
  recentSearches,
}) => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const categories = [
    { id: 'latest', label: 'LATEST' },
    { id: 'world', label: 'WORLD' },
    { id: 'sports', label: 'SPORTS' },
    { id: 'culture', label: 'CULTURE' },
    { id: 'wellness', label: 'WELLNESS' },
    { id: 'economy', label: 'ECONOMY' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onPerformSearch(searchQuery.trim());
      setShowSearchDropdown(false);
    }
  };

  const isMcpHealthy = mcpHealth?.status === 'ok';

  return (
    <header className="w-full bg-[#FAF8F5] border-b border-stone-200 sticky top-0 z-40 transition-colors">
      {/* Top Utility & Masthead Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-3 flex items-center justify-between gap-4">
        {/* Left: Search Bar with typical user search memory */}
        <div className="relative w-64 md:w-72">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
              placeholder="Search news, topics, Singapore..."
              className="w-full bg-white border border-stone-300 rounded-md pl-9 pr-8 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600 transition-shadow"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  onSearchChange('');
                  onPerformSearch('');
                }}
                className="absolute right-2 text-stone-400 hover:text-stone-700 text-xs px-1"
              >
                ✕
              </button>
            )}
          </form>

          {/* Quick search memory dropdown */}
          {showSearchDropdown && recentSearches.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-stone-200 rounded-md shadow-lg py-1.5 z-50">
              <div className="px-3 py-1 text-[10px] font-semibold tracking-wider text-stone-400 uppercase">
                Recent Typical Searches
              </div>
              {recentSearches.slice(0, 5).map((term, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseDown={() => {
                    onSearchChange(term);
                    onPerformSearch(term);
                    setShowSearchDropdown(false);
                  }}
                  className="w-full text-left px-3 py-1 text-xs text-stone-700 hover:bg-stone-100 flex items-center justify-between"
                >
                  <span className="truncate">{term}</span>
                  <span className="text-[10px] text-stone-400">Search</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Brand Masthead */}
        <div className="text-center">
          <button
            onClick={() => {
              onSelectCategory('latest');
              onSelectView('feed');
              onPerformSearch('');
            }}
            className="group cursor-pointer"
          >
            <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
              the news dispatch.
            </h1>
          </button>
          <div className="hidden md:flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 mt-0.5">
            <span>Cross-Border Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Singapore & The World</span>
          </div>
        </div>

        {/* Right Actions: MCP Health Status, Sign in, Subscribe */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* MCP Health Link / Indicator */}
          <button
            onClick={onOpenMcpModal}
            title={`MCP Server Health: ${isMcpHealthy ? 'Healthy / Operational' : 'Amber / Degradation'}`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-stone-300 bg-white hover:bg-stone-50 transition-colors text-xs text-stone-700 cursor-pointer shadow-2xs"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isMcpHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-bounce'
              }`}
            />
            <span className="hidden sm:inline font-mono text-[11px] font-medium">
              MCP: {isMcpHealthy ? 'OK' : 'AMBER'}
            </span>
          </button>

          {/* Profile / Preferences */}
          <button
            onClick={onOpenProfileModal}
            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors cursor-pointer"
            title="Profile & Customise Feed"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Sign In text link */}
          <button
            onClick={onOpenProfileModal}
            className="hidden sm:inline text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            Sign in
          </button>

          {/* Subscribe Button (Matches Miro board blue/accent CTA) */}
          <button
            onClick={onOpenSubscribeModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-3.5 py-1.5 rounded transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Primary Category and Feature Navigation Ribbon */}
      <div className="border-t border-stone-200/90 bg-[#FAF8F5]/80 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto scrollbar-none py-1.5 gap-4">
          {/* Main Editorial Categories */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {categories.map((cat) => {
              const isActive = activeView === 'feed' && currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onSelectView('feed');
                  }}
                  className={`px-3 py-1 text-xs font-semibold tracking-wider transition-colors uppercase whitespace-nowrap cursor-pointer rounded-xs ${
                    isActive
                      ? 'text-stone-950 border-b-2 border-stone-900 font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Intelligent Features Navigation (From Miro Board) */}
          <div className="flex items-center gap-1 sm:gap-2 pl-4 border-l border-stone-300">
            {/* AI Summary Tab */}
            <button
              onClick={() => onSelectView('ai-summary')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'ai-summary'
                  ? 'bg-amber-100 text-amber-900 font-semibold border border-amber-300'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
              title="High level AI summary of today's latest news"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>AI Summary</span>
            </button>

            {/* Singapore vs World Perspective Tab */}
            <button
              onClick={() => onSelectView('compare')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'compare'
                  ? 'bg-blue-100 text-blue-900 font-semibold border border-blue-300'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
              title="Singapore vs The World comparative analysis"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden md:inline">Singapore vs The World</span>
              <span className="md:hidden">SG vs World</span>
            </button>

            {/* Connect the Dots Tab */}
            <button
              onClick={() => onSelectView('dots')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'dots'
                  ? 'bg-emerald-100 text-emerald-900 font-semibold border border-emerald-300'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
              title="Connect the Dots - Emerging themes clustering"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Connect Dots</span>
            </button>

            {/* AI Readout / Podcast trigger */}
            <button
              onClick={onTriggerPodcastPlay}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-stone-700 bg-stone-200/60 hover:bg-stone-300/80 transition-colors whitespace-nowrap cursor-pointer"
              title="Listen to Daily Minute Audio Podcast"
            >
              <Volume2 className="w-3.5 h-3.5 text-stone-800" />
              <span className="hidden sm:inline">AI Readout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
