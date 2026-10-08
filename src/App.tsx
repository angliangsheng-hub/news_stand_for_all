/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HolidayThemeBanner } from './components/HolidayThemeBanner';
import { LeftSidebar } from './components/LeftSidebar';
import { CenterFeed } from './components/CenterFeed';
import { RightSidebar } from './components/RightSidebar';
import { MerlionMascotWidget } from './components/MerlionMascotWidget';
import { McpHealthModal } from './components/McpHealthModal';
import { ProfileModal } from './components/ProfileModal';
import { ArticleModal } from './components/ArticleModal';
import {
  Article,
  MCPHealthResponse,
  WeatherData,
  SingaporeHoliday,
  HolidayContext,
  ClusterTheme,
  ComparisonData,
  PodcastData,
  AggregatorTraffic,
  CDTSummary,
} from './types';

export default function App() {
  // Navigation & Category states
  const [currentCategory, setCurrentCategory] = useState<string>('latest');
  const [activeView, setActiveView] = useState<'feed' | 'ai-summary' | 'compare' | 'dots'>('feed');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSource, setActiveSource] = useState<string>('all');
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

  // Data states
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState<boolean>(true);
  const [mcpHealth, setMcpHealth] = useState<MCPHealthResponse | null>(null);
  const [isRefreshingHealth, setIsRefreshingHealth] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [holidayContext, setHolidayContext] = useState<HolidayContext | null>(null);
  const [selectedHolidayTheme, setSelectedHolidayTheme] = useState<string>('default');
  const [cdtStories, setCdtStories] = useState<CDTSummary[]>([]);
  const [aggregators, setAggregators] = useState<AggregatorTraffic[]>([]);

  // AI Feature states
  const [aiSummaryData, setAiSummaryData] = useState<{ summary: string; keyTakeaways: string[] } | null>(null);
  const [isLoadingAiSummary, setIsLoadingAiSummary] = useState<boolean>(false);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [isLoadingComparison, setIsLoadingComparison] = useState<boolean>(false);
  const [clusterThemes, setClusterThemes] = useState<ClusterTheme[]>([]);
  const [podcast, setPodcast] = useState<PodcastData | null>(null);

  // Audio / Podcast Player states
  const [isPlayingPodcast, setIsPlayingPodcast] = useState<boolean>(false);
  const [podcastProgress, setPodcastProgress] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const podcastIntervalRef = useRef<any>(null);

  // User Preferences & Search Memory
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Singapore Maritime Gateway',
    'AI Computing Infrastructure',
    'ASEAN Cross-Border Trade',
    'Marina Bay Cultural Exhibits',
    'Tropical Heat Island Mitigation',
  ]);
  const [userSegment, setUserSegment] = useState<string>('General');
  const [userTopics, setUserTopics] = useState<string[]>([
    'Singapore Local Affairs & Policy',
    'Technology, AI & Semiconductors',
    'Global Geopolitics & Multilateral Trade',
  ]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isMcpModalOpen, setIsMcpModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // 1. Initial Load: MCP Health, Weather, Holidays, CDT, Aggregators
  useEffect(() => {
    fetchMcpHealth();
    fetchWeatherAndHolidays();
    fetchCdtStories();
    fetchTrafficRanks();

    // Load local storage search history if available
    try {
      const savedSearches = localStorage.getItem('newsdispatch_searches');
      if (savedSearches) setRecentSearches(JSON.parse(savedSearches));
      const savedSegment = localStorage.getItem('newsdispatch_segment');
      if (savedSegment) setUserSegment(savedSegment);
    } catch (e) {
      // ignore
    }
  }, []);

  // 2. Fetch News whenever category, source, or search changes
  useEffect(() => {
    fetchNewsArticles();
  }, [currentCategory, activeSource]);

  // Fetch MCP Health
  const fetchMcpHealth = async () => {
    setIsRefreshingHealth(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setMcpHealth(data);
      }
    } catch (e) {
      setMcpHealth({
        status: 'amber',
        healthy: false,
        timestamp: new Date().toISOString(),
        uptimeSeconds: 0,
        latencyMs: 999,
        mcpDependencies: [],
      });
    } finally {
      setIsRefreshingHealth(false);
    }
  };

  // Fetch Weather & Holidays
  const fetchWeatherAndHolidays = async () => {
    try {
      const res = await fetch('/api/weather');
      if (res.ok) {
        const data = await res.json();
        setWeather(data.weather);
        setHolidayContext(data.holidays);
        // Default theme can follow active holiday
        if (data.holidays?.currentHoliday?.season) {
          setSelectedHolidayTheme(data.holidays.currentHoliday.season);
        }
      }
    } catch (e) {
      console.warn('Weather fetch failed', e);
    }
  };

  // Fetch CDT Insights
  const fetchCdtStories = async () => {
    try {
      const res = await fetch('/api/china-insights');
      if (res.ok) {
        const data = await res.json();
        setCdtStories(data.stories || []);
      }
    } catch (e) {
      console.warn('CDT fetch failed', e);
    }
  };

  // Fetch Similarweb traffic ranks
  const fetchTrafficRanks = async () => {
    try {
      const res = await fetch('/api/traffic-ranks');
      if (res.ok) {
        const data = await res.json();
        setAggregators(data.sources || []);
      }
    } catch (e) {
      console.warn('Traffic ranks fetch failed', e);
    }
  };

  // Fetch News Articles
  const fetchNewsArticles = async (queryToUse?: string) => {
    setIsLoadingArticles(true);
    const q = queryToUse !== undefined ? queryToUse : searchQuery;
    try {
      const url = `/api/news?category=${encodeURIComponent(currentCategory)}&query=${encodeURIComponent(
        q
      )}&source=${encodeURIComponent(activeSource)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const loadedArticles: Article[] = data.articles || [];
        setArticles(loadedArticles);

        // Also trigger AI background features if articles exist
        if (loadedArticles.length > 0) {
          triggerAiFeatures(loadedArticles);
        }
      }
    } catch (e) {
      console.error('Failed to fetch articles', e);
    } finally {
      setIsLoadingArticles(false);
    }
  };

  // Trigger AI Executive Summary, Clustering, and Podcast
  const triggerAiFeatures = async (loadedArticles: Article[]) => {
    const headlines = loadedArticles.map((a) => a.title);

    // AI Clusters ("Connect the Dots")
    fetch('/api/ai/cluster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headlines }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.clusters) setClusterThemes(data.clusters);
      })
      .catch((e) => console.warn(e));

    // AI Podcast ("Daily Minute")
    fetch('/api/ai/podcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headlines }),
    })
      .then((r) => r.json())
      .then((data) => {
        setPodcast(data);
      })
      .catch((e) => console.warn(e));

    // Initial AI Summary
    if (!aiSummaryData) {
      setIsLoadingAiSummary(true);
      fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headlines }),
      })
        .then((r) => r.json())
        .then((data) => setAiSummaryData(data))
        .finally(() => setIsLoadingAiSummary(false));
    }
  };

  // Handle Search Execution
  const handlePerformSearch = (term: string) => {
    setSearchQuery(term);
    if (term.trim()) {
      // Add to search history
      setRecentSearches((prev) => {
        const next = [term.trim(), ...prev.filter((t) => t !== term.trim())].slice(0, 8);
        try {
          localStorage.setItem('newsdispatch_searches', JSON.stringify(next));
        } catch (e) {}
        return next;
      });
    }
    fetchNewsArticles(term);
  };

  // Refresh AI Summary manually
  const handleRefreshAiSummary = () => {
    setIsLoadingAiSummary(true);
    const headlines = articles.map((a) => a.title);
    fetch('/api/ai/summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headlines }),
    })
      .then((r) => r.json())
      .then((data) => setAiSummaryData(data))
      .finally(() => setIsLoadingAiSummary(false));
  };

  // Handle "Singapore vs The World" comparison request
  const handleCompareTopic = (topic: string) => {
    setActiveView('compare');
    setIsLoadingComparison(true);
    fetch('/api/ai/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    })
      .then((r) => r.json())
      .then((data) => setComparisonData(data))
      .catch((e) => console.error(e))
      .finally(() => setIsLoadingComparison(false));
  };

  // Text-To-Speech / Read Aloud handler
  const handleReadAloud = (text: string, title: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${title}. ${text}`);
      utterance.rate = playbackRate;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Podcast audio playback toggle
  const handleTogglePodcast = () => {
    if (isPlayingPodcast) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      clearInterval(podcastIntervalRef.current);
      setIsPlayingPodcast(false);
    } else {
      setIsPlayingPodcast(true);
      const scriptText = podcast?.script || 'Here is your 60-second world report from The News Dispatch.';
      handleReadAloud(scriptText, podcast?.title || 'Daily Minute');

      // Progress simulator
      let elapsed = podcastProgress * 75;
      podcastIntervalRef.current = setInterval(() => {
        elapsed += 1;
        const progress = Math.min(1, elapsed / 75);
        setPodcastProgress(progress);
        if (progress >= 1) {
          clearInterval(podcastIntervalRef.current);
          setIsPlayingPodcast(false);
          setPodcastProgress(0);
        }
      }, 1000 / playbackRate);
    }
  };

  const handleSeekPodcast = (progress: number) => {
    setPodcastProgress(progress);
  };

  const handleChangePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if ('speechSynthesis' in window && isPlayingPodcast) {
      // Re-apply rate
      window.speechSynthesis.cancel();
      const scriptText = podcast?.script || '';
      handleReadAloud(scriptText, 'Daily Minute');
    }
  };

  // Filter articles based on selected cluster if any
  const displayedArticles = selectedCluster
    ? articles.filter((a) => {
        const cluster = clusterThemes.find((c) => c.name === selectedCluster);
        if (!cluster) return true;
        const matchesKeyword = cluster.keywords.some((k) =>
          a.title.toLowerCase().includes(k.toLowerCase()) ||
          a.summary.toLowerCase().includes(k.toLowerCase())
        );
        return matchesKeyword;
      })
    : articles;

  // Related articles (derived from search or category)
  const relatedArticles = articles.filter(
    (a) => a.id !== (articles[0]?.id || '') && a.id !== (selectedArticle?.id || '')
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-stone-800 selection:text-white">
      {/* Top Navigation & Masthead */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setSelectedCluster(null);
        }}
        activeView={activeView}
        onSelectView={(v) => setActiveView(v)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPerformSearch={handlePerformSearch}
        mcpHealth={mcpHealth}
        onOpenMcpModal={() => setIsMcpModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onTriggerPodcastPlay={handleTogglePodcast}
        recentSearches={recentSearches}
      />

      {/* Singapore Public Holiday Ambient Season Banner */}
      <HolidayThemeBanner
        currentHoliday={holidayContext?.currentHoliday || null}
        selectedTheme={selectedHolidayTheme}
        onSelectTheme={setSelectedHolidayTheme}
        allHolidays={holidayContext?.allHolidays || []}
      />

      {/* Three-Column Editorial Broadsheet Layout (Matches Miro Board Blueprint) */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column: AI Podcast Summary & Emerging Theme Clusters */}
          <LeftSidebar
            podcast={podcast}
            isPlayingPodcast={isPlayingPodcast}
            onTogglePodcast={handleTogglePodcast}
            podcastProgress={podcastProgress}
            onSeekPodcast={handleSeekPodcast}
            playbackRate={playbackRate}
            onChangePlaybackRate={handleChangePlaybackRate}
            clusterThemes={clusterThemes}
            selectedCluster={selectedCluster}
            onSelectCluster={setSelectedCluster}
            aggregators={aggregators}
            activeSource={activeSource}
            onSelectSource={setActiveSource}
            onOpenDotsView={() => setActiveView('dots')}
          />

          {/* Center Column: Featured Lead Story & Editorial Feed */}
          <CenterFeed
            articles={displayedArticles}
            isLoading={isLoadingArticles}
            activeView={activeView}
            onSelectArticle={setSelectedArticle}
            onReadAloud={handleReadAloud}
            onCompareTopic={handleCompareTopic}
            aiSummaryData={aiSummaryData}
            isLoadingAiSummary={isLoadingAiSummary}
            onRefreshAiSummary={handleRefreshAiSummary}
            comparisonData={comparisonData}
            isLoadingComparison={isLoadingComparison}
            clusterThemes={clusterThemes}
            selectedCluster={selectedCluster}
            onSelectCluster={setSelectedCluster}
          />

          {/* Right Column: Weather Synoptic, Search Memory & Related Wire */}
          <RightSidebar
            relatedArticles={relatedArticles}
            onSelectArticle={setSelectedArticle}
            recentSearches={recentSearches}
            onSelectSearchTag={handlePerformSearch}
            weather={weather}
            cdtStories={cdtStories}
            onOpenCdtArticle={(story) =>
              setSelectedArticle({
                id: story.id,
                title: story.title,
                source: 'China Digital Times (CDT)',
                url: story.link || 'https://chinadigitaltimes.net',
                publishedAt: story.publishedAt,
                summary: story.summary,
                category: 'CHINA FILTERED WIRE',
                readTime: '3 min read',
              })
            }
          />
        </div>
      </div>

      {/* Floating Animated Prof M Mascot Assistant */}
      <MerlionMascotWidget
        weather={weather}
        currentHoliday={holidayContext?.currentHoliday || null}
        onSelectTopic={handlePerformSearch}
      />

      {/* Full Modals */}
      <McpHealthModal
        isOpen={isMcpModalOpen}
        onClose={() => setIsMcpModalOpen(false)}
        mcpHealth={mcpHealth}
        onRefreshHealth={fetchMcpHealth}
        isRefreshing={isRefreshingHealth}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        selectedSegment={userSegment}
        onSaveSegment={(seg) => {
          setUserSegment(seg);
          localStorage.setItem('newsdispatch_segment', seg);
        }}
        selectedTopics={userTopics}
        onSaveTopics={setUserTopics}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onReadAloud={handleReadAloud}
        onCompareTopic={handleCompareTopic}
      />

      {/* Broadsheet Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-6 text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-sm font-semibold text-stone-900">the news dispatch.</span>
            <span aria-hidden="true">·</span>
            <span>Cross-Border AI Aggregator & Singapore Wire</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <span>Google News RSS</span>
            <span aria-hidden="true">·</span>
            <span>China Digital Times</span>
            <span aria-hidden="true">·</span>
            <span>NotebookLM Podcast Audio</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsMcpModalOpen(true)}
              className="text-stone-600 hover:text-stone-900 underline cursor-pointer"
            >
              MCP Diagnostics
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
