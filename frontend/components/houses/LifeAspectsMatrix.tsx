'use client';

import React, { useState } from 'react';
import { DetailedHouseAnalysis, PlanetPosition } from '../../types/jyotish';
import { PLANETARY_GLYPHS } from '../../lib/constants';
import {
  ShieldCheck,
  Star,
  Compass,
  Sparkles,
} from 'lucide-react';

interface LifeAspectsMatrixProps {
  houses: DetailedHouseAnalysis[];
  onSelectPlanet: (planet: PlanetPosition) => void;
}

type HouseFilter = 'all' | 'dharma' | 'artha' | 'kama' | 'moksha' | 'protected';

export const LifeAspectsMatrix: React.FC<LifeAspectsMatrixProps> = ({
  houses,
  onSelectPlanet,
}) => {
  const [activeFilter, setActiveFilter] = useState<HouseFilter>('all');
  const [selectedHouseNumber, setSelectedHouseNumber] = useState<number | null>(null);

  if (!houses || houses.length === 0) return null;

  // Filter houses according to category
  const filteredHouses = houses.filter((h) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'dharma') return [1, 5, 9].includes(h.house_number);
    if (activeFilter === 'artha') return [2, 6, 10].includes(h.house_number);
    if (activeFilter === 'kama') return [3, 7, 11].includes(h.house_number);
    if (activeFilter === 'moksha') return [4, 8, 12].includes(h.house_number);
    if (activeFilter === 'protected') return h.has_guru_drishti || h.strength_score >= 3.8;
    return true;
  });

  const getCategoryTheme = (category: string) => {
    switch (category.toLowerCase()) {
      case 'dharma':
        return {
          border: 'border-amber-500/25 hover:border-amber-500/60',
          bg: 'bg-amber-500/[0.03] hover:bg-amber-500/[0.08]',
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          tag: 'Dharma (Righteous Path)',
        };
      case 'artha':
        return {
          border: 'border-emerald-500/25 hover:border-emerald-500/60',
          bg: 'bg-emerald-500/[0.03] hover:bg-emerald-500/[0.08]',
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          tag: 'Artha (Wealth & Resources)',
        };
      case 'kama':
        return {
          border: 'border-sky-500/25 hover:border-sky-500/60',
          bg: 'bg-sky-500/[0.03] hover:bg-sky-500/[0.08]',
          badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          tag: 'Kama (Desire & Relationships)',
        };
      case 'moksha':
        return {
          border: 'border-purple-500/25 hover:border-purple-500/60',
          bg: 'bg-purple-500/[0.03] hover:bg-purple-500/[0.08]',
          badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          tag: 'Moksha (Spiritual Liberation)',
        };
      default:
        return {
          border: 'border-white/[0.08] hover:border-white/[0.2]',
          bg: 'bg-white/[0.02] hover:bg-white/[0.06]',
          badge: 'bg-white/[0.06] text-slate-300 border-white/[0.1]',
          tag: category,
        };
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
              12 Houses (Bhavas) & Life Domains Matrix
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed font-light">
            Comprehensive analysis of every life domain: Rashi placement, house lord, occupying Grahas, Parashari aspects (Drishti), and Sarvashtakavarga strength.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white text-obsidian-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All (1–12)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('dharma')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'dharma'
                ? 'bg-amber-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'text-amber-300 hover:text-white'
            }`}
          >
            Dharma (1, 5, 9)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('artha')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'artha'
                ? 'bg-emerald-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Artha (2, 6, 10)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('kama')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'kama'
                ? 'bg-sky-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-sky-300 hover:text-white'
            }`}
          >
            Kama (3, 7, 11)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('moksha')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'moksha'
                ? 'bg-purple-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(192,132,252,0.4)]'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            Moksha (4, 8, 12)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('protected')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'protected'
                ? 'bg-emerald-400 text-obsidian-950 font-bold shadow-sm'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Guru Shielded
          </button>
        </div>
      </div>

      {/* 12-House Architectural Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHouses.map((house) => {
          const isSelected = selectedHouseNumber === house.house_number;
          const theme = getCategoryTheme(house.category);

          return (
            <div
              key={house.house_number}
              onClick={() => setSelectedHouseNumber(isSelected ? null : house.house_number)}
              className={`rounded-3xl p-5 transition-all border flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-white/[0.08] border-white/[0.3] shadow-luxury-hover scale-[1.02]'
                  : `${theme.bg} ${theme.border}`
              }`}
            >
              {/* Top Row: House Index & Category */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center font-mono font-bold text-xs text-white shrink-0 shadow-inner">
                    H{house.house_number}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-serif">
                      {house.name.split('(')[0]}
                    </h3>
                    <span className="text-[10.5px] text-slate-400 font-medium block">
                      {house.sanskrit}
                    </span>
                  </div>
                </div>

                {/* Score Rating & Category Badge */}
                <div className="flex items-center space-x-1.5 shrink-0">
                  <span className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-full border ${theme.badge}`}>
                    {house.category}
                  </span>
                  <div className="flex items-center space-x-1 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.08]">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[11px] font-bold text-white font-mono">
                      {house.strength_score.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Life Domain Headline */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-sky-200">
                  {house.life_aspect}
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-light">
                  {house.significations}
                </p>
              </div>

              {/* Sign & Lord Placement Data */}
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10.5px]">Rashi:</span>
                  <span className="font-semibold text-white">
                    {house.sign_symbol} {house.sign_name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10.5px]">House Lord:</span>
                  <span className="font-semibold text-sky-300 font-sans">
                    {house.lord} in H{house.lord_placement_house} ({house.lord_dignity})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10.5px]">SAV Bindus:</span>
                  <span
                    className={`font-bold ${
                      house.sav_bindus >= 30
                        ? 'text-emerald-300 font-extrabold'
                        : house.sav_bindus >= 26
                        ? 'text-sky-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {house.sav_bindus} Bindus
                  </span>
                </div>
              </div>

              {/* Occupying Planets */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block font-mono">
                  Occupying Grahas:
                </span>
                {house.occupying_planets.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {house.occupying_planets.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPlanet(p);
                        }}
                        className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all hover:scale-108 cursor-pointer shadow-sm"
                        style={{
                          backgroundColor: `${p.color}20`,
                          color: p.color,
                          borderColor: `${p.color}50`,
                        }}
                      >
                        <span>{PLANETARY_GLYPHS[p.name] || '★'}</span>
                        <span className="text-white">{p.name}</span>
                        {p.is_vargottama && <span className="text-amber-300 font-bold">★</span>}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-500 italic block">
                    Vacant (Ruled by {house.lord})
                  </span>
                )}
              </div>

              {/* Protection Indicator */}
              {house.has_guru_drishti && (
                <div className="flex items-center space-x-1.5 text-[10.5px] font-semibold text-emerald-300 bg-emerald-950/40 px-2.5 py-1 rounded-xl border border-emerald-500/35 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Jupiter Drishti (Guru Raksha Shield)</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
