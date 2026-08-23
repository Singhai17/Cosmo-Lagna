'use client';

import React, { useState } from 'react';
import { FullAstrologicalResponse, PlanetPosition } from '../../types/jyotish';
import { NorthIndianChart } from './NorthIndianChart';
import { SouthIndianChart } from './SouthIndianChart';
import { PLANETARY_GLYPHS } from '../../lib/constants';
import { Compass, Sparkles, Grid, Eye } from 'lucide-react';

interface VedicChartViewerProps {
  data: FullAstrologicalResponse;
  onSelectPlanet: (planet: PlanetPosition) => void;
}

type VargaCode = 'D1' | 'D9' | 'D10';
type ChartStyle = 'north' | 'south';

export const VedicChartViewer: React.FC<VedicChartViewerProps> = ({
  data,
  onSelectPlanet,
}) => {
  const [activeVarga, setActiveVarga] = useState<VargaCode>('D1');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('north');
  const [hoveredPlanetName, setHoveredPlanetName] = useState<string | null>(null);

  const currentChart = data.vargas[activeVarga] || data.vargas['D1'];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
      {/* Chart Viewer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <Compass className="w-5 h-5 text-sky-400 animate-spin-slow" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
              {currentChart.title} <span className="text-sky-300 text-base font-normal">({currentChart.sanskrit_name})</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed font-light">
            {currentChart.description}
          </p>
        </div>

        {/* Controls: Varga Selector & Style Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Varga Tabs */}
          <div className="flex items-center bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setActiveVarga('D1')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeVarga === 'D1'
                  ? 'bg-sky-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)] scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              D1 Rashi
            </button>
            <button
              type="button"
              onClick={() => setActiveVarga('D9')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeVarga === 'D9'
                  ? 'bg-purple-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(192,132,252,0.4)] scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              D9 Navamsha
            </button>
            <button
              type="button"
              onClick={() => setActiveVarga('D10')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeVarga === 'D10'
                  ? 'bg-amber-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              D10 Dashamsha
            </button>
          </div>

          {/* Style Toggle (North vs South) */}
          <div className="flex items-center bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setChartStyle('north')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                chartStyle === 'north'
                  ? 'bg-white text-obsidian-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Diamond (North)
            </button>
            <button
              type="button"
              onClick={() => setChartStyle('south')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                chartStyle === 'south'
                  ? 'bg-white text-obsidian-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Square (South)
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart SVG Display */}
      <div className="flex justify-center items-center py-4">
        {chartStyle === 'north' ? (
          <NorthIndianChart
            chart={currentChart}
            allPlanets={data.planets}
            onSelectPlanet={onSelectPlanet}
          />
        ) : (
          <SouthIndianChart
            chart={currentChart}
            allPlanets={data.planets}
            onSelectPlanet={onSelectPlanet}
          />
        )}
      </div>

      {/* Interactive Planet Cards Ribbon below Charts */}
      <div className="space-y-3 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Interactive 9 Grahas Telemetry (Click to Inspect):</span>
          </div>
          <span className="text-[11px] text-sky-300 font-mono font-medium">9 Classical Grahas</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-2.5">
          {data.planets.map((p) => {
            const glyph = PLANETARY_GLYPHS[p.name] || '★';
            const isHovered = hoveredPlanetName === p.name;
            return (
              <button
                key={p.name}
                type="button"
                onMouseEnter={() => setHoveredPlanetName(p.name)}
                onMouseLeave={() => setHoveredPlanetName(null)}
                onClick={() => onSelectPlanet(p)}
                className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl transition-all text-center group cursor-pointer relative overflow-hidden"
                style={{
                  backgroundColor: `${p.color}10`,
                  border: `1px solid ${isHovered ? p.color : `${p.color}35`}`,
                  boxShadow: isHovered ? `0 0 20px ${p.color}40` : 'none',
                  transform: isHovered ? 'translateY(-3px) scale(1.04)' : 'none',
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base mb-1.5 shadow-sm transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${p.color}25`,
                    color: p.color,
                    border: `1px solid ${p.color}60`,
                  }}
                >
                  {glyph}
                </div>
                <div className="text-xs font-bold text-white group-hover:text-white truncate w-full font-serif">
                  {p.name}
                </div>
                <div className="text-[10.5px] text-slate-300 truncate w-full font-mono mt-0.5">
                  {p.sign_name.slice(0, 3)} {p.degrees_in_sign.toFixed(1)}°
                </div>
                <span
                  className="text-[9.5px] font-mono px-2 py-0.5 rounded-full mt-1.5 font-semibold"
                  style={{
                    backgroundColor: `${p.color}15`,
                    color: p.color,
                  }}
                >
                  House {p.house}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
