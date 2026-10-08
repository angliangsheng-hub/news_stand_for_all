import React from 'react';
import { SingaporeHoliday } from '../types';
import { Sparkles, Calendar, Sun, Moon, Flag, Flame, Gift } from 'lucide-react';

interface HolidayThemeBannerProps {
  currentHoliday: SingaporeHoliday | null;
  selectedTheme: string;
  onSelectTheme: (theme: string) => void;
  allHolidays: SingaporeHoliday[];
}

export const HolidayThemeBanner: React.FC<HolidayThemeBannerProps> = ({
  currentHoliday,
  selectedTheme,
  onSelectTheme,
  allHolidays,
}) => {
  // Theme styling badges & greetings
  const getThemeDetails = (theme: string) => {
    switch (theme) {
      case 'cny':
        return {
          title: 'Chinese New Year Edition',
          greeting: 'Gong Xi Fa Cai · Wishing Prosperity & Good Fortune across Singapore',
          bgClass: 'bg-gradient-to-r from-red-900/90 via-amber-900/90 to-red-950 text-amber-100 border-b border-amber-600/30',
          accentColor: 'text-amber-300',
          icon: '🏮',
        };
      case 'hariraya':
      case 'harirayahaji':
        return {
          title: 'Hari Raya Aidilfitri Season',
          greeting: 'Selamat Hari Raya Aidilfitri · Peace, Forgiveness & Community Joy',
          bgClass: 'bg-gradient-to-r from-emerald-950 via-teal-900 to-green-950 text-emerald-100 border-b border-emerald-500/30',
          accentColor: 'text-emerald-300',
          icon: '🌙',
        };
      case 'deepavali':
        return {
          title: 'Deepavali Festival of Lights',
          greeting: 'Happy Deepavali · May Light & Wisdom Triumph in Every Household',
          bgClass: 'bg-gradient-to-r from-amber-900 via-orange-950 to-purple-950 text-amber-100 border-b border-amber-500/30',
          accentColor: 'text-amber-300',
          icon: '🪔',
        };
      case 'nationalday':
        return {
          title: 'Singapore National Day (Aug 9)',
          greeting: 'Majulah Singapura · One United People, Building Our Future',
          bgClass: 'bg-gradient-to-r from-red-800 via-red-900 to-stone-900 text-white border-b border-red-500/30',
          accentColor: 'text-red-200',
          icon: '🇸🇬',
        };
      case 'christmas':
        return {
          title: 'Christmas & Year-End Holiday',
          greeting: 'Season\'s Greetings · Festive Warmth along Orchard Road & Marina Bay',
          bgClass: 'bg-gradient-to-r from-emerald-900 via-stone-900 to-red-950 text-white border-b border-stone-700',
          accentColor: 'text-red-300',
          icon: '🎄',
        };
      default:
        return null;
    }
  };

  const themeInfo = getThemeDetails(selectedTheme);

  return (
    <div className="w-full">
      {themeInfo && (
        <div className={`py-2 px-4 transition-all duration-300 flex items-center justify-between text-xs ${themeInfo.bgClass}`}>
          <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-base select-none">{themeInfo.icon}</span>
              <span className="font-semibold tracking-wide uppercase text-[11px] opacity-90">{themeInfo.title}:</span>
              <span className="hidden sm:inline font-editorial italic text-sm">{themeInfo.greeting}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="opacity-75">Festive Ambient Theme</span>
              <button
                onClick={() => onSelectTheme('default')}
                className="underline hover:opacity-100 opacity-80 cursor-pointer ml-1"
              >
                Reset to default broadsheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Season Switcher Bar */}
      <div className="bg-stone-100/90 border-b border-stone-200/80 px-4 py-1.5 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span className="font-medium text-stone-700">Singapore Festive Mood:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onSelectTheme('default')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  selectedTheme === 'default'
                    ? 'bg-stone-800 text-white font-medium shadow-xs'
                    : 'hover:bg-stone-200 text-stone-600'
                }`}
              >
                Normal Broadsheet
              </button>
              {allHolidays.slice(0, 5).map((h) => (
                <button
                  key={h.season}
                  onClick={() => onSelectTheme(h.season)}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer whitespace-nowrap ${
                    selectedTheme === h.season
                      ? 'bg-stone-800 text-white font-medium shadow-xs'
                      : 'hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {h.name}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-stone-500 whitespace-nowrap">
            <span>Next Holiday: <strong className="text-stone-700 font-semibold">{currentHoliday?.name || 'Deepavali'}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Date: {currentHoliday?.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
