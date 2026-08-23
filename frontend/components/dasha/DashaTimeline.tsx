'use client';

import React, { useState } from 'react';
import { VimshottariDashaResponse, DashaMaha } from '../../types/jyotish';
import { PLANETARY_GLYPHS } from '../../lib/constants';
import { Clock, ChevronDown, ChevronRight, Activity, Calendar, Sparkles } from 'lucide-react';

interface DashaTimelineProps {
  dasha: VimshottariDashaResponse;
}

const PLANET_DASHA_COLORS: Record<string, { bg: string; border: string; text: string; glow: string; bar: string }> = {
  Sun: { bg: 'bg-amber-500/[0.06]', border: 'border-amber-500/30', text: 'text-amber-300', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]', bar: 'bg-amber-400' },
  Moon: { bg: 'bg-sky-500/[0.06]', border: 'border-sky-500/30', text: 'text-sky-300', glow: 'shadow-[0_0_20px_rgba(56,189,248,0.25)]', bar: 'bg-sky-400' },
  Mars: { bg: 'bg-rose-500/[0.06]', border: 'border-rose-500/30', text: 'text-rose-300', glow: 'shadow-[0_0_20px_rgba(244,63,94,0.25)]', bar: 'bg-rose-500' },
  Rahu: { bg: 'bg-purple-500/[0.06]', border: 'border-purple-500/30', text: 'text-purple-300', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.25)]', bar: 'bg-purple-500' },
  Jupiter: { bg: 'bg-yellow-500/[0.06]', border: 'border-yellow-500/30', text: 'text-yellow-300', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.25)]', bar: 'bg-yellow-400' },
  Saturn: { bg: 'bg-blue-500/[0.06]', border: 'border-blue-500/30', text: 'text-blue-300', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.25)]', bar: 'bg-blue-500' },
  Mercury: { bg: 'bg-emerald-500/[0.06]', border: 'border-emerald-500/30', text: 'text-emerald-300', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.25)]', bar: 'bg-emerald-400' },
  Ketu: { bg: 'bg-pink-500/[0.06]', border: 'border-pink-500/30', text: 'text-pink-300', glow: 'shadow-[0_0_20px_rgba(236,72,153,0.25)]', bar: 'bg-pink-500' },
  Venus: { bg: 'bg-amber-300/[0.06]', border: 'border-amber-300/30', text: 'text-amber-200', glow: 'shadow-[0_0_20px_rgba(252,211,77,0.25)]', bar: 'bg-amber-300' },
};

export const DashaTimeline: React.FC<DashaTimelineProps> = ({ dasha }) => {
  const [expandedMaha, setExpandedMaha] = useState<string | null>(dasha.active_mahadasha);
  const [expandedAntar, setExpandedAntar] = useState<string | null>(null);

  const toggleMaha = (planet: string) => {
    setExpandedMaha(expandedMaha === planet ? null : planet);
  };

  const toggleAntar = (key: string) => {
    setExpandedAntar(expandedAntar === key ? null : key);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center space-x-2.5">
          <Clock className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
            Vimshottari Dasha (120-Year Parashari Cycle)
          </h2>
        </div>
        <div className="text-xs text-slate-300 bg-white/[0.04] px-4 py-1.5 rounded-full border border-white/[0.08]">
          Birth Nakshatra: <span className="text-sky-300 font-bold">{dasha.starting_balance.nakshatra}</span> ({dasha.starting_balance.nakshatra_lord} balance: {dasha.starting_balance.balance_years} yrs)
        </div>
      </div>

      {/* Active Dasha Highlight Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-sky-950/30 to-obsidian-900 border border-purple-500/30 shadow-[0_0_25px_rgba(192,132,252,0.2)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/35 shadow-inner">
            <Activity className="w-5 h-5 animate-pulse text-purple-300" />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-wider uppercase text-purple-300 font-mono">
              Current Planetary Period
            </div>
            <div className="text-lg sm:text-xl font-bold text-white font-serif mt-0.5">
              {dasha.active_period_string}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-sky-300 bg-obsidian-950/80 px-4 py-2 rounded-full border border-sky-500/30 shadow-sm">
          <Calendar className="w-3.5 h-3.5" />
          <span>Active Natal Influence</span>
        </div>
      </div>

      {/* 9 Mahadashas Collapsible Tree */}
      <div className="space-y-3">
        {dasha.mahadashas.map((maha: DashaMaha) => {
          const isExpanded = expandedMaha === maha.planet;
          const isActive = maha.is_active;
          const theme = PLANET_DASHA_COLORS[maha.planet] || PLANET_DASHA_COLORS.Sun;
          const glyph = PLANETARY_GLYPHS[maha.planet] || '★';

          return (
            <div
              key={maha.planet}
              className={`rounded-2xl border transition-all ${
                isActive
                  ? `${theme.bg} ${theme.border} ${theme.glow} ring-1 ring-white/20`
                  : `${theme.bg} ${theme.border} hover:border-white/25`
              }`}
            >
              {/* Mahadasha Header Row */}
              <div
                onClick={() => toggleMaha(maha.planet)}
                className="flex items-center justify-between p-4 cursor-pointer select-none"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-slate-400">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-white" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${theme.text} bg-white/[0.05] border border-white/[0.08]`}>
                      {glyph}
                    </span>
                    <span className="font-bold text-sm text-white font-serif">
                      {maha.planet} Mahadasha
                    </span>
                    {isActive && (
                      <span className="bg-sky-400 text-obsidian-950 text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full uppercase shadow-sm">
                        CURRENT
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-300 font-mono">
                  <span className="hidden sm:inline font-sans text-slate-400">{maha.duration_years} Years</span>
                  <span className={`${isActive ? theme.text : 'text-slate-300'} font-bold`}>
                    {maha.start_date} → {maha.end_date}
                  </span>
                </div>
              </div>

              {/* Antardashas Accordion */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-2 border-t border-white/[0.06] mt-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    {maha.planet} Sub-Periods (Antardasha):
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {maha.antardashas.map((antar) => {
                      const antarKey = `${maha.planet}-${antar.planet}`;
                      const isAntarExpanded = expandedAntar === antarKey;
                      const antarTheme = PLANET_DASHA_COLORS[antar.planet] || PLANET_DASHA_COLORS.Sun;

                      return (
                        <div
                          key={antar.planet}
                          className={`p-3 rounded-xl border text-xs transition-all ${
                            antar.is_active
                              ? `${antarTheme.bg} ${antarTheme.border} text-white shadow-sm ring-1 ring-white/20`
                              : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:border-white/[0.14]'
                          }`}
                        >
                          <div
                            onClick={() => toggleAntar(antarKey)}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <span className="font-semibold text-white font-serif">
                              {maha.planet} - {antar.planet}
                            </span>
                            {antar.is_active && (
                              <span className="text-[9px] bg-white text-obsidian-950 px-2 py-0.5 rounded-full font-bold">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1 font-mono">
                            {antar.start_date} to {antar.end_date} ({antar.duration_months} mo)
                          </div>

                          {/* Pratyantardasha dropdown */}
                          {isAntarExpanded && (
                            <div className="mt-2.5 pt-2.5 border-t border-white/[0.06] space-y-1 animate-fadeIn">
                              <div className="text-[9.5px] font-mono font-bold text-slate-400 uppercase">
                                Pratyantardashas:
                              </div>
                              <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                                {antar.pratyantardashas.map((prat) => (
                                  <div
                                    key={prat.planet}
                                    className={`flex items-center justify-between p-1.5 rounded text-[10.5px] font-mono ${
                                      prat.is_active
                                        ? 'bg-sky-400/20 border border-sky-400/40 text-white font-bold'
                                        : 'text-slate-400'
                                    }`}
                                  >
                                    <span>{prat.planet}</span>
                                    <span>
                                      {prat.start_date} ({prat.duration_days}d)
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
