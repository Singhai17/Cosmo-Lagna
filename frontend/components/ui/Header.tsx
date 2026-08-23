'use client';

import React from 'react';
import { FullAstrologicalResponse } from '../../types/jyotish';
import { Moon, Sun, Hash, SlidersHorizontal, Sparkles } from 'lucide-react';

interface HeaderProps {
  data?: FullAstrologicalResponse | null;
  onOpenBirthModal?: () => void;
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ data, onOpenBirthModal, onReset }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-obsidian-950/90 backdrop-blur-2xl border-b border-white/[0.08] transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left Side: ॐ Emblem & Grand Brand Header (Equal distance from left edge) */}
        <div className="flex items-center space-x-3.5 sm:space-x-4 shrink-0">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center space-x-3.5 sm:space-x-4 text-left group cursor-pointer"
            title="Reset to Home"
          >
            {/* Celestial ॐ Emblem with Ambient Halo */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400 rounded-2xl sm:rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition duration-500 group-hover:scale-105" />
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-obsidian-950 border border-white/[0.2] group-hover:border-amber-400/50 flex items-center justify-center text-amber-200 font-serif font-bold text-2xl sm:text-3xl transition-all shadow-[inset_0_0_15px_rgba(251,191,36,0.15)] group-hover:shadow-[inset_0_0_20px_rgba(251,191,36,0.3)]">
                ॐ
              </div>
            </div>

            {/* Prominent Brand Title & Tagline */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-2.5 whitespace-nowrap">
                <span className="text-lg sm:text-2xl lg:text-2xl font-serif font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent group-hover:to-sky-200 transition-all drop-shadow-sm">
                  COSMO LAGNA
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-sky-300 bg-sky-500/15 px-2.5 py-0.5 sm:py-1 rounded-full border border-sky-400/30 font-bold hidden md:inline font-mono shadow-sm">
                  Sidereal 2.0
                </span>
              </div>
              <span className="text-xs sm:text-sm text-slate-300/90 font-sans tracking-wide hidden sm:block mt-0.5 whitespace-nowrap">
                Precision Ephemeris & Cosmic Intelligence
              </span>
            </div>
          </button>
        </div>

        {/* Right Side: High-End Telemetry Bar & Coordinates (Equal distance from right edge) */}
        {data ? (
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Unified Segmented Telemetry Glass Capsule */}
            <div className="flex items-center bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.1] rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 transition-all shadow-inner backdrop-blur-xl gap-3 sm:gap-4 shrink-0 whitespace-nowrap">
              {/* 1. Lagna Segment */}
              <div className="flex items-center space-x-2 shrink-0 whitespace-nowrap">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shadow-sm shrink-0">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="flex flex-col leading-tight whitespace-nowrap">
                  <span className="text-[9.5px] uppercase tracking-wider text-amber-400/80 font-mono font-semibold">
                    Lagna
                  </span>
                  <span className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide">
                    {data.ascendant.sign_name}{' '}
                    <span className="text-amber-200/70 font-mono text-[11px] font-normal">
                      ({data.ascendant.degrees_in_sign.toFixed(1)}°)
                    </span>
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-7 w-px bg-white/[0.1] shrink-0" />

              {/* 2. Dasha Segment */}
              <div className="hidden sm:flex items-center space-x-2 shrink-0 whitespace-nowrap">
                <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shadow-sm shrink-0">
                  <Moon className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <div className="flex flex-col leading-tight whitespace-nowrap">
                  <span className="text-[9.5px] uppercase tracking-wider text-sky-400/80 font-mono font-semibold">
                    Active Dasha
                  </span>
                  <span className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide">
                    {data.vimshottari_dasha.active_period_string}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block h-7 w-px bg-white/[0.1] shrink-0" />

              {/* 3. Numerology (Driver / Destiny) Segment */}
              <div className="hidden lg:flex items-center space-x-2 shrink-0 whitespace-nowrap">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shadow-sm shrink-0">
                  <Hash className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="flex flex-col leading-tight whitespace-nowrap">
                  <span className="text-[9.5px] uppercase tracking-wider text-purple-400/80 font-mono font-semibold">
                    Driver / Destiny
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-mono font-bold whitespace-nowrap">
                    <span className="text-white">{data.numerology.mulank}</span>
                    <span className="text-purple-400/60 font-normal">/</span>
                    <span className="text-purple-300">{data.numerology.bhagyank}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Luxury Coordinates Action Pill */}
            {onOpenBirthModal && (
              <button
                type="button"
                onClick={onOpenBirthModal}
                className="group relative flex items-center space-x-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 hover:from-sky-500/25 hover:to-purple-500/25 border border-sky-400/30 hover:border-sky-400/60 text-white text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:scale-103 active:scale-97 shrink-0"
                title="Edit Birth Chart Coordinates"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300 group-hover:rotate-90 transition-transform duration-300 shrink-0" />
                <span className="tracking-wide">Coordinates</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-slate-300 bg-white/[0.04] px-4 py-2 sm:py-2.5 rounded-2xl border border-white/[0.1] shadow-inner backdrop-blur-md shrink-0 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)] shrink-0" />
            <span className="font-semibold text-slate-200 tracking-wider font-mono text-xs sm:text-sm">
              Ephemeris Ready
            </span>
          </div>
        )}
      </div>

      {/* Mobile Sub-strip when active */}
      {data && (
        <div className="sm:hidden flex items-center overflow-x-auto no-scrollbar justify-between px-4 py-2 border-t border-white/[0.08] bg-obsidian-950/98 text-xs gap-2">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 shrink-0 whitespace-nowrap">
            <Sun className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="text-[10px] text-amber-400/80 font-mono">LAGNA:</span>
            <span className="font-bold text-white text-xs">{data.ascendant.sign_name}</span>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-200 shrink-0 whitespace-nowrap">
            <Moon className="w-3 h-3 text-sky-400 shrink-0" />
            <span className="text-[10px] text-sky-400/80 font-mono">DASHA:</span>
            <span className="font-bold text-white text-xs truncate max-w-[130px]">
              {data.vimshottari_dasha.active_period_string}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-200 shrink-0 whitespace-nowrap">
            <Hash className="w-3 h-3 text-purple-400 shrink-0" />
            <span className="font-bold text-white text-xs font-mono">
              {data.numerology.mulank} / {data.numerology.bhagyank}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
