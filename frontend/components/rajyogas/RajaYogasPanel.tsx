'use client';

import React, { useState } from 'react';
import { RajaYogasResponse, PlanetPosition, RajaYogaItem } from '../../types/jyotish';
import { PLANETARY_GLYPHS } from '../../lib/constants';
import {
  Crown,
  Sparkles,
  Search,
  Award,
} from 'lucide-react';

interface RajaYogasPanelProps {
  rajyogas?: RajaYogasResponse | null;
  allPlanets: PlanetPosition[];
  onSelectPlanet: (planet: PlanetPosition) => void;
}

type YogaCategoryFilter =
  | 'all'
  | 'mahapurusha'
  | 'stelliums'
  | 'conjunctions'
  | 'dharma_karma'
  | 'dhana'
  | 'lunar_solar'
  | 'viparita';

export const RajaYogasPanel: React.FC<RajaYogasPanelProps> = ({
  rajyogas,
  allPlanets,
  onSelectPlanet,
}) => {
  const [activeFilter, setActiveFilter] = useState<YogaCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!rajyogas || !rajyogas.yogas || rajyogas.yogas.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-8 text-center space-y-3">
        <Crown className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
        <h3 className="text-lg font-bold font-serif text-white">
          Raja Yoga & Royal Combinations
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto font-light">
          No classical Raja Yogas active for this chart configuration. Individual house strengths and Nakshatra lords govern life trajectory.
        </p>
      </div>
    );
  }

  const activeYogas = rajyogas.yogas;

  const filteredActiveYogas = activeYogas.filter((y) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        y.name.toLowerCase().includes(q) ||
        y.sanskrit.toLowerCase().includes(q) ||
        y.participating_planets.some((p) => p.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    if (activeFilter === 'all') return true;
    if (activeFilter === 'mahapurusha') return y.category.includes('Pancha Mahapurusha');
    if (activeFilter === 'stelliums') return y.category.includes('Stellium') || y.participating_planets.length >= 3;
    if (activeFilter === 'conjunctions') return y.category.includes('2-Planet') || y.category.includes('Conjunction');
    if (activeFilter === 'dharma_karma') return y.category.includes('Kendra-Trikona') || y.category.includes('Dharma-Karma') || y.category.includes('Yogakaraka') || y.category.includes('Maha');
    if (activeFilter === 'dhana') return y.category.includes('Dhana') || y.category.includes('Prosperity') || y.name.includes('Lakshmi') || y.name.includes('Vasumathi');
    if (activeFilter === 'lunar_solar') return y.category.includes('Lunar') || y.category.includes('Solar');
    if (activeFilter === 'viparita') return y.category.includes('Viparita');
    return true;
  });

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn relative overflow-hidden">
      {/* Subtle gold ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5 z-10">
        <div>
          <div className="flex items-center space-x-3.5">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl blur-xs opacity-60 animate-pulse" />
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 flex items-center justify-center text-obsidian-950 font-bold shadow-lg shrink-0">
                <Crown className="w-6 h-6 text-obsidian-950" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Sovereignty & Royal Combinations
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                Active Raja Yogas in Your Kundali
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl font-light">
                Classical Royal Combinations, Planetary Stelliums & Yutis detected per <strong>BPHS</strong>, <strong>Phaladeepika</strong>, and <strong>Saravali</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Summary Metrics */}
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          <div className="px-4 py-2 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25 text-right shadow-sm">
            <span className="text-[10px] text-amber-300 uppercase tracking-wider block font-mono">
              Active Yogas
            </span>
            <span className="text-lg font-bold font-mono text-amber-200">
              {activeYogas.length} Detected
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 z-10">
        {/* Category Pills */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
          {[
            { id: 'all', label: `All (${activeYogas.length})` },
            { id: 'mahapurusha', label: 'Mahapurusha' },
            { id: 'stelliums', label: 'Stelliums' },
            { id: 'conjunctions', label: 'Conjunctions' },
            { id: 'dharma_karma', label: 'Dharma-Karma' },
            { id: 'dhana', label: 'Dhana Yogas' },
            { id: 'lunar_solar', label: 'Lunar / Solar' },
            { id: 'viparita', label: 'Viparita' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id as YogaCategoryFilter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-amber-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-105'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Raja Yogas..."
            className="w-full h-9 bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-full pl-9 pr-3.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Yogas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 z-10">
        {filteredActiveYogas.map((yoga, idx) => (
          <div
            key={idx}
            className="rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-amber-500/[0.04] to-transparent hover:from-amber-500/[0.08] border border-amber-500/20 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:scale-[1.01]"
          >
            <div>
              {/* Category & Potency Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
                  {yoga.category}
                </span>

                {/* Potency Meter */}
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-1.5 bg-white/[0.1] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
                      style={{ width: `${Math.min(100, yoga.potency)}%` }}
                    />
                  </div>
                  <span className="text-emerald-300 text-xs font-mono font-bold">
                    {yoga.potency}%
                  </span>
                </div>
              </div>

              {/* Yoga Title */}
              <h3 className="text-base font-bold text-white font-serif tracking-wide">
                {yoga.name} <span className="text-amber-300 text-xs font-normal">({yoga.sanskrit})</span>
              </h3>

              {/* Classical Phala */}
              <p className="text-xs text-slate-200 mt-2 leading-relaxed font-light">
                {yoga.effects || yoga.description}
              </p>
            </div>

            {/* Bottom Row: Participating Planets & Classical Source */}
            <div className="space-y-2.5 pt-3 border-t border-amber-500/15">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold text-slate-400 font-mono">
                  Participating Grahas:
                </span>
                <span className="text-[10px] text-amber-300/80 italic font-serif">
                  {yoga.scripture || 'Brihat Parashara Hora Shastra'}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {yoga.participating_planets.map((pName) => {
                  const pMeta = allPlanets.find((p) => p.name === pName);
                  const pColor = pMeta?.color || '#ffffff';
                  return (
                    <button
                      key={pName}
                      type="button"
                      onClick={() => pMeta && onSelectPlanet(pMeta)}
                      className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all hover:scale-105 cursor-pointer shadow-sm"
                      style={{
                        backgroundColor: `${pColor}20`,
                        color: pColor,
                        borderColor: `${pColor}50`,
                      }}
                    >
                      <span>{PLANETARY_GLYPHS[pName] || '★'}</span>
                      <span className="text-white">{pName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
