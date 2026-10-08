import React, { useState } from 'react';
import { SingaporeHoliday, HolidayContext } from '../types';
import { Sparkles, Calendar, Flame, ChevronRight, X, Compass, Globe } from 'lucide-react';

interface HolidayThemeBannerProps {
  currentHoliday: SingaporeHoliday | null;
  selectedTheme: string;
  onSelectTheme: (theme: string) => void;
  allHolidays: SingaporeHoliday[];
  onExploreFestiveNews: (keyword: string) => void;
}

export const HolidayThemeBanner: React.FC<HolidayThemeBannerProps> = ({
  currentHoliday,
  selectedTheme,
  onSelectTheme,
  allHolidays,
  onExploreFestiveNews,
}) => {
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  // Deepavali and other Singapore festive theme configurations
  const getThemeDetails = (theme: string) => {
    switch (theme) {
      case 'deepavali':
        return {
          title: 'Singapore Deepavali Festival of Lights',
          tagline: 'Happy Deepavali · Shubh Diwali (दीपावली)',
          greeting: 'May the Divine Lights illuminate your home with joy, wisdom, and good health across Singapore.',
          culturalHighlight: 'Little India street light-up along Serangoon Road & Campbell Lane festive bazaar active.',
          dateInfo: 'Sunday, 8 November 2026 · Public Holiday in-lieu on Monday 9 Nov (3-Day Long Weekend!)',
          bgClass: 'bg-gradient-to-r from-amber-950 via-orange-950 to-red-950 text-amber-100 border-b-2 border-amber-500/50 shadow-md',
          accentBadge: 'bg-amber-500/25 text-amber-300 border border-amber-400/40',
          buttonClass: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-semibold shadow-xs',
          icon: '🪔',
          searchKeyword: 'Deepavali Singapore Little India',
        };
      case 'cny':
        return {
          title: 'Singapore Chinese New Year Season',
          tagline: 'Gong Xi Fa Cai · Year of the Horse (农历新年)',
          greeting: 'Wishing prosperity, vibrant health, and flourishing fortune to all families in the Lion City.',
          culturalHighlight: 'Chinatown street festive lights, River Hongbao at Gardens by the Bay, and festive bazaars.',
          dateInfo: 'Tuesday, 17 February 2026 & Wednesday 18 Feb (Gazetted 2-Day Public Holiday)',
          bgClass: 'bg-gradient-to-r from-red-950 via-red-900 to-amber-950 text-amber-100 border-b-2 border-amber-600/40 shadow-md',
          accentBadge: 'bg-red-500/25 text-amber-300 border border-amber-500/40',
          buttonClass: 'bg-amber-400 hover:bg-amber-300 text-red-950 font-semibold shadow-xs',
          icon: '🏮',
          searchKeyword: 'Chinese New Year Singapore',
        };
      case 'hariraya':
      case 'harirayahaji':
        return {
          title: 'Hari Raya Aidilfitri Festive Season',
          tagline: 'Selamat Hari Raya Aidilfitri · Maaf Zahir dan Batin',
          greeting: 'Peace, forgiveness, and warm communal blessings to all observing in Singapore.',
          culturalHighlight: 'Geylang Serai Ramadan Bazaar, Kampong Glam heritage lights, and ketupat decorations.',
          dateInfo: 'Saturday, 21 March 2026 (Gazetted Public Holiday)',
          bgClass: 'bg-gradient-to-r from-emerald-950 via-teal-950 to-green-950 text-emerald-100 border-b-2 border-emerald-500/40 shadow-md',
          accentBadge: 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40',
          buttonClass: 'bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-semibold shadow-xs',
          icon: '🌙',
          searchKeyword: 'Hari Raya Singapore Geylang',
        };
      case 'nationalday':
        return {
          title: 'Singapore 61st National Day Season',
          tagline: 'Majulah Singapura · One United People',
          greeting: 'Celebrating Singapore\'s independence, diversity, resilience, and forward journey.',
          culturalHighlight: 'National Day Parade (NDP) at the Padang, Red Lions parachutists, and heartland celebrations.',
          dateInfo: 'Sunday, 9 August 2026 · Public holiday in-lieu Monday 10 Aug (3-Day Long Weekend)',
          bgClass: 'bg-gradient-to-r from-red-900 via-stone-900 to-red-950 text-white border-b-2 border-red-500/50 shadow-md',
          accentBadge: 'bg-red-500/30 text-red-200 border border-red-400/40',
          buttonClass: 'bg-white hover:bg-red-50 text-red-900 font-semibold shadow-xs',
          icon: '🇸🇬',
          searchKeyword: 'Singapore National Day NDP',
        };
      case 'christmas':
        return {
          title: 'Christmas & Year-End Holiday Season',
          tagline: 'Merry Christmas & Joyous Year-End',
          greeting: 'Festive warmth, twinkling city lights, and celebrations across the tropics.',
          culturalHighlight: 'Christmas on A Great Street along Orchard Road & Christmas Wonderland at Gardens by the Bay.',
          dateInfo: 'Friday, 25 December 2026 (3-Day Long Weekend Friday–Sunday)',
          bgClass: 'bg-gradient-to-r from-emerald-950 via-stone-900 to-red-950 text-white border-b-2 border-amber-400/40 shadow-md',
          accentBadge: 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/40',
          buttonClass: 'bg-amber-300 hover:bg-amber-200 text-stone-950 font-semibold shadow-xs',
          icon: '🎄',
          searchKeyword: 'Christmas Singapore Orchard',
        };
      default:
        return null;
    }
  };

  const activeTheme = selectedTheme === 'default' ? 'deepavali' : selectedTheme;
  const themeInfo = getThemeDetails(activeTheme);

  return (
    <div className="w-full">
      {/* 1. Main Prominent Festive Season Banner */}
      {!isBannerDismissed && themeInfo && (
        <div className={`relative px-4 sm:px-6 py-3.5 transition-all duration-300 ${themeInfo.bgClass}`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Left: Festive Icon & Greetings */}
            <div className="flex items-start gap-3.5 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl shrink-0 shadow-inner">
                {themeInfo.icon}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${themeInfo.accentBadge}`}>
                    Singapore Festive Season
                  </span>
                  <h3 className="font-editorial text-base sm:text-lg font-bold tracking-tight text-white">
                    {themeInfo.tagline}
                  </h3>
                </div>

                <p className="font-editorial italic text-xs sm:text-sm text-stone-200 leading-snug">
                  {themeInfo.greeting}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-300 mt-1 opacity-90">
                  <span className="font-semibold text-white/90">{themeInfo.dateInfo}</span>
                  <span aria-hidden="true" className="opacity-50">·</span>
                  <span className="hidden sm:inline">{themeInfo.culturalHighlight}</span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
              <button
                onClick={() => onExploreFestiveNews(themeInfo.searchKeyword)}
                className={`px-3 py-1.5 rounded-md text-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5 ${themeInfo.buttonClass}`}
              >
                <span>Explore Festive Stories</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsBannerDismissed(true)}
                className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="Dismiss Banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Compact Singapore Festive Mood & Calendar Selector Bar */}
      <div className="bg-stone-100/95 border-b border-stone-200/90 px-4 py-1.5 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-medium text-stone-800">Singapore Festive Theme:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  onSelectTheme('deepavali');
                  setIsBannerDismissed(false);
                }}
                className={`px-2.5 py-0.5 rounded text-[11px] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  selectedTheme === 'deepavali'
                    ? 'bg-amber-600 text-white font-semibold shadow-2xs'
                    : 'hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>🪔 Deepavali</span>
              </button>
              <button
                onClick={() => {
                  onSelectTheme('cny');
                  setIsBannerDismissed(false);
                }}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  selectedTheme === 'cny'
                    ? 'bg-red-800 text-white font-semibold shadow-2xs'
                    : 'hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>🏮 CNY</span>
              </button>
              <button
                onClick={() => {
                  onSelectTheme('hariraya');
                  setIsBannerDismissed(false);
                }}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  selectedTheme === 'hariraya'
                    ? 'bg-emerald-800 text-white font-semibold shadow-2xs'
                    : 'hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>🌙 Hari Raya</span>
              </button>
              <button
                onClick={() => {
                  onSelectTheme('nationalday');
                  setIsBannerDismissed(false);
                }}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  selectedTheme === 'nationalday'
                    ? 'bg-red-700 text-white font-semibold shadow-2xs'
                    : 'hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>🇸🇬 National Day</span>
              </button>
              <button
                onClick={() => {
                  onSelectTheme('christmas');
                  setIsBannerDismissed(false);
                }}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  selectedTheme === 'christmas'
                    ? 'bg-green-800 text-white font-semibold shadow-2xs'
                    : 'hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>🎄 Christmas</span>
              </button>
              <button
                onClick={() => {
                  onSelectTheme('default');
                }}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer whitespace-nowrap ${
                  selectedTheme === 'default'
                    ? 'bg-stone-800 text-white font-semibold shadow-2xs'
                    : 'hover:bg-stone-200 text-stone-500'
                }`}
              >
                Standard Broadsheet
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2.5 text-[11px] text-stone-500 whitespace-nowrap font-mono">
            <span>Gazetted SG Holiday: <strong className="text-stone-800">{currentHoliday?.name || 'Deepavali'}</strong></span>
            <span aria-hidden="true">·</span>
            <span>{currentHoliday?.date}</span>
            {currentHoliday?.daysUntil !== undefined && (
              <span className="bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-sans text-[10px] font-medium">
                {currentHoliday.daysUntil > 0 ? `in ${currentHoliday.daysUntil} days` : 'Today'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
