'use client';

import React, { useState } from 'react';
import { GocharResponse, TransitPlanet } from '../../types/jyotish';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
} from 'lucide-react';

interface GocharPanelProps {
  gochar: GocharResponse;
}

export const GocharPanel: React.FC<GocharPanelProps> = ({ gochar }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<TransitPlanet | null>(
    gochar.planets[0] || null
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header & Summary Hero */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-teal-500/[0.03] border-emerald-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Real-Time Ephemeris Gochar Engine
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
              Live Planetary Transits (Gochar)
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Real-time sidereal positions evaluated against your Natal Moon sign (
              <strong className="text-emerald-300 font-medium">{gochar.natal_moon_sign_name}</strong>) and Natal Lagna (
              <strong className="text-sky-300 font-medium">{gochar.natal_lagna_sign_name}</strong>) per{' '}
              <em>Phaladeepika (Ch. 26)</em>, including authentic <strong>Vedha (Obstruction)</strong> analysis.
            </p>
          </div>

          {/* Right Metrics Capsule */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <div className="bg-obsidian-950/80 p-4 rounded-2xl border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-center justify-between gap-4">
              <div>
                <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Benefic Score
                </div>
                <div className="text-2xl font-extrabold font-mono text-emerald-400">
                  {gochar.benefic_transit_percentage}%
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold shadow-sm">
                  {gochar.auspicious_transits_count} / {gochar.total_transits_count} Auspicious
                </span>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  {gochar.timestamp_utc}
                </div>
              </div>
            </div>

            <div className="bg-obsidian-950/80 px-4 py-2.5 rounded-2xl border border-emerald-500/20 flex items-center space-x-2 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-200">{gochar.overall_transit_summary}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Real-Time 9 Grahas Transit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gochar.planets.map((planet) => {
          const isSelected = selectedPlanet?.name === planet.name;
          const isAuspicious = planet.transit_status.includes('Auspicious');
          const isObstructed = planet.is_obstructed;

          return (
            <div
              key={planet.name}
              onClick={() => setSelectedPlanet(planet)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-4 ${
                isSelected
                  ? isAuspicious
                    ? 'bg-emerald-950/30 border-emerald-400/60 shadow-[0_0_25px_rgba(16,185,129,0.25)] scale-[1.02]'
                    : 'bg-white/[0.08] border-white/[0.3] shadow-luxury-hover scale-[1.02]'
                  : isAuspicious
                  ? 'bg-emerald-500/[0.03] hover:bg-emerald-500/[0.07] border-emerald-500/25 hover:border-emerald-500/50 hover:scale-[1.01]'
                  : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.07] hover:border-white/[0.16] hover:scale-[1.01]'
              }`}
            >
              {/* Header: Planet Identity & Auspicious Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm font-serif shadow-inner bg-white/[0.06] border border-white/[0.12] text-white"
                  >
                    {planet.glyph || planet.name.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-serif">{planet.name}</h3>
                    <span className="text-[10.5px] text-slate-400">{planet.sanskrit}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isAuspicious
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {planet.transit_status}
                </span>
              </div>

              {/* Transit Placement Data */}
              <div className="p-3 rounded-2xl bg-obsidian-950/50 border border-white/[0.05] space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10.5px]">Transit Sign:</span>
                  <span className="font-semibold text-white">
                    {planet.sign_name} ({planet.degrees_in_sign.toFixed(1)}°)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10.5px]">From Natal Moon:</span>
                  <span className="font-bold text-emerald-300">House {planet.house_from_moon}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10.5px]">From Natal Lagna:</span>
                  <span className="font-semibold text-slate-200">House {planet.house_from_lagna}</span>
                </div>
              </div>

              {/* Vedha Status */}
              <div className="text-xs">
                {isObstructed ? (
                  <div className="flex items-center space-x-1.5 text-amber-300 bg-amber-950/30 p-2 rounded-xl border border-amber-500/30 text-[11px] font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span>Vedha Obstructed by {planet.obstructing_planet}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5 text-emerald-300 bg-emerald-950/30 p-2 rounded-xl border border-emerald-500/30 text-[11px] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span>Unobstructed Flow (Nirvedha)</span>
                  </div>
                )}
              </div>

              {/* Brief Effect */}
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed font-light">
                {planet.prediction}
              </p>
            </div>
          );
        })}
      </div>

      {/* 3. Detailed Selected Planet Transit Diagnostic Panel */}
      {selectedPlanet && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 animate-fadeIn bg-gradient-to-br from-emerald-500/[0.04] to-transparent border-emerald-500/25">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center space-x-3">
              <Compass className="w-5 h-5 text-emerald-400 animate-spin-slow" />
              <h3 className="text-lg font-bold font-serif text-white">
                Detailed Classical Transit Analysis: {selectedPlanet.name} ({selectedPlanet.sanskrit})
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-semibold">
              Phaladeepika Ch. 26
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/[0.08] space-y-2">
              <div className="font-bold text-white text-sm font-serif">
                Classical Parashari Phala & Transit Energy
              </div>
              <p className="text-slate-200 leading-relaxed font-light">
                {selectedPlanet.prediction}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/[0.08] space-y-2">
              <div className="font-bold text-white text-sm font-serif">
                Transit Vector & Obstruction Status
              </div>
              <p className="text-slate-200 leading-relaxed font-light">
                Transiting {selectedPlanet.sign_name} ({selectedPlanet.formatted_dms}) in House {selectedPlanet.house_from_moon} from Natal Moon. {selectedPlanet.is_obstructed ? `Energy is obstructed (Vedha) by ${selectedPlanet.obstructing_planet}.` : 'Direct unobstructed benefic cosmic flow (Nirvedha).'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
