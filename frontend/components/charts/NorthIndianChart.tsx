'use client';

import React, { useState } from 'react';
import { VargaChart, PlanetPosition } from '../../types/jyotish';
import { PLANETARY_GLYPHS } from '../../lib/constants';
import { calculatePlanetaryAspects, AspectRay } from '../../lib/drishti';
import { Sparkles, Eye } from 'lucide-react';

interface NorthIndianChartProps {
  chart: VargaChart;
  allPlanets: PlanetPosition[];
  onSelectPlanet?: (planet: PlanetPosition) => void;
}

export const NorthIndianChart: React.FC<NorthIndianChartProps> = ({
  chart,
  allPlanets,
  onSelectPlanet,
}) => {
  const size = 400;
  const half = size / 2;

  const [hoveredPlanetName, setHoveredPlanetName] = useState<string | null>(null);
  const [showAllDrishti, setShowAllDrishti] = useState<boolean>(false);

  // Diamond house centers for placing sign numbers and planets
  const houseLayouts: Record<
    number,
    {
      signPos: { x: number; y: number };
      planetPos: { x: number; y: number };
      centerPos: { x: number; y: number };
      label: string;
    }
  > = {
    1: { signPos: { x: half, y: half - 32 }, planetPos: { x: half, y: half - 68 }, centerPos: { x: half, y: half - 50 }, label: '1st House (Lagna)' },
    2: { signPos: { x: half - 52, y: 52 }, planetPos: { x: half - 78, y: 72 }, centerPos: { x: half - 70, y: 60 }, label: '2nd House (Dhana)' },
    3: { signPos: { x: 52, y: half - 52 }, planetPos: { x: 72, y: half - 78 }, centerPos: { x: 60, y: half - 70 }, label: '3rd House (Sahaja)' },
    4: { signPos: { x: half - 32, y: half }, planetPos: { x: half - 68, y: half }, centerPos: { x: half - 50, y: half }, label: '4th House (Sukha)' },
    5: { signPos: { x: 52, y: half + 52 }, planetPos: { x: 72, y: half + 78 }, centerPos: { x: 60, y: half + 70 }, label: '5th House (Putra)' },
    6: { signPos: { x: half - 52, y: size - 52 }, planetPos: { x: half - 78, y: size - 72 }, centerPos: { x: half - 70, y: size - 60 }, label: '6th House (Ripu)' },
    7: { signPos: { x: half, y: half + 32 }, planetPos: { x: half, y: half + 68 }, centerPos: { x: half, y: half + 50 }, label: '7th House (Kalatra)' },
    8: { signPos: { x: half + 52, y: size - 52 }, planetPos: { x: half + 78, y: size - 72 }, centerPos: { x: half + 70, y: size - 60 }, label: '8th House (Ayur)' },
    9: { signPos: { x: size - 52, y: half + 52 }, planetPos: { x: size - 72, y: half + 78 }, centerPos: { x: size - 60, y: half + 70 }, label: '9th House (Bhagya)' },
    10: { signPos: { x: half + 32, y: half }, planetPos: { x: half + 68, y: half }, centerPos: { x: half + 50, y: half }, label: '10th House (Karma)' },
    11: { signPos: { x: size - 52, y: half - 52 }, planetPos: { x: size - 72, y: half - 78 }, centerPos: { x: size - 60, y: half - 70 }, label: '11th House (Labha)' },
    12: { signPos: { x: half + 52, y: 52 }, planetPos: { x: half + 78, y: 72 }, centerPos: { x: half + 70, y: 60 }, label: '12th House (Vyaya)' },
  };

  const getPlanetMeta = (name: string): PlanetPosition | undefined => {
    return allPlanets.find((p) => p.name === name);
  };

  // Calculate active Drishti Rays based on hovered/selected planet
  const activeAspects: AspectRay[] = calculatePlanetaryAspects(
    allPlanets,
    hoveredPlanetName || (showAllDrishti ? null : 'Sun')
  );

  return (
    <div className="flex flex-col items-center space-y-3 w-full">
      {/* Drishti Controls Pill */}
      <div className="flex items-center justify-between w-full max-w-[420px] px-1 text-xs">
        <div className="flex items-center space-x-1.5 text-slate-300">
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[11px] font-mono">
            {hoveredPlanetName ? (
              <span className="text-sky-300 font-semibold">{hoveredPlanetName} Drishti Rays Active</span>
            ) : (
              <span className="text-slate-400">Hover any planet to cast Drishti Rays</span>
            )}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowAllDrishti(!showAllDrishti)}
          className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
            showAllDrishti
              ? 'bg-sky-400 text-obsidian-950 font-bold border-sky-300'
              : 'bg-white/[0.04] text-slate-400 hover:text-white border-white/[0.08]'
          }`}
        >
          {showAllDrishti ? 'All Rays: ON' : 'All Rays: OFF'}
        </button>
      </div>

      <div className="relative w-full max-w-[420px] aspect-square mx-auto select-none">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
        >
          <defs>
            <linearGradient id="chartBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c0d16" />
              <stop offset="100%" stopColor="#06060a" />
            </linearGradient>

            {/* Glowing endpoint marker */}
            <radialGradient id="aspectDotGlow">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Card */}
          <rect
            x="1"
            y="1"
            width={size - 2}
            height={size - 2}
            fill="url(#chartBg)"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.5"
            rx="16"
          />

          {/* Geometric Diamond & Diagonal Lines */}
          <g stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1">
            {/* Outer Diagonal X Lines */}
            <line x1="16" y1="16" x2={size - 16} y2={size - 16} />
            <line x1={size - 16} y1="16" x2="16" y2={size - 16} />

            {/* Central Diamond Kendra Line */}
            <polygon
              points={`${half},16 ${size - 16},${half} ${half},${size - 16} 16,${half}`}
              fill="rgba(255, 255, 255, 0.015)"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.2"
            />
          </g>

          {/* Glowing Parashari Drishti Laser Rays */}
          {(hoveredPlanetName || showAllDrishti) && (
            <g className="pointer-events-none">
              {activeAspects.map((asp, aIdx) => {
                const src = houseLayouts[asp.sourceHouse]?.centerPos;
                const tgt = houseLayouts[asp.targetHouse]?.centerPos;
                if (!src || !tgt) return null;

                const midX = (src.x + tgt.x) / 2 + (Math.sin(aIdx) * 15);
                const midY = (src.y + tgt.y) / 2 + (Math.cos(aIdx) * 15);

                return (
                  <g key={`${asp.planetName}-${aIdx}`} className="animate-fadeIn">
                    {/* Glowing Ray Background Path */}
                    <path
                      d={`M ${src.x} ${src.y} Q ${midX} ${midY} ${tgt.x} ${tgt.y}`}
                      fill="none"
                      stroke={asp.planetColor}
                      strokeWidth="2.5"
                      strokeOpacity="0.45"
                      strokeDasharray="4 3"
                    />

                    {/* Laser Core */}
                    <path
                      d={`M ${src.x} ${src.y} Q ${midX} ${midY} ${tgt.x} ${tgt.y}`}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="0.8"
                      strokeOpacity="0.85"
                    />

                    {/* Target House Glow Ring */}
                    <circle
                      cx={tgt.x}
                      cy={tgt.y}
                      r="9"
                      fill={asp.planetColor}
                      fillOpacity="0.25"
                      stroke={asp.planetColor}
                      strokeWidth="1.5"
                      className="animate-pulse"
                    />
                    <circle
                      cx={tgt.x}
                      cy={tgt.y}
                      r="3"
                      fill="#ffffff"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* House Content: Sign Numbers and Planets */}
          {chart.houses.map((h) => {
            const layout = houseLayouts[h.house_number];
            if (!layout) return null;

            return (
              <g key={h.house_number}>
                {/* Sign Number */}
                <text
                  x={layout.signPos.x}
                  y={layout.signPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="rgba(148, 163, 184, 0.75)"
                  fontSize="11"
                  fontFamily="'Inter', monospace"
                  fontWeight="600"
                >
                  {h.sign_id}
                </text>

                {/* Occupying Planets */}
                {h.planets.map((pName, pIdx) => {
                  const pMeta = getPlanetMeta(pName);
                  const glyph = PLANETARY_GLYPHS[pName] || pName.slice(0, 2);
                  const isVargottama = pMeta?.is_vargottama;
                  const pColor = pMeta?.color || '#ffffff';
                  const isHovered = hoveredPlanetName === pName;

                  // Offset multiple planets gracefully
                  const row = Math.floor(pIdx / 2);
                  const col = pIdx % 2;
                  const offsetX = (col - 0.5) * 24;
                  const offsetY = (row - (h.planets.length > 2 ? 0.5 : 0)) * 18;

                  return (
                    <g
                      key={pName}
                      transform={`translate(${layout.planetPos.x + offsetX}, ${layout.planetPos.y + offsetY})`}
                      onMouseEnter={() => setHoveredPlanetName(pName)}
                      onMouseLeave={() => setHoveredPlanetName(null)}
                      onClick={() => pMeta && onSelectPlanet?.(pMeta)}
                      className="cursor-pointer group"
                    >
                      {/* Hover Glow Pill */}
                      <rect
                        x="-12"
                        y="-10"
                        width="24"
                        height="20"
                        rx="7"
                        fill={pColor}
                        fillOpacity={isHovered ? 0.4 : 0.14}
                        stroke={pColor}
                        strokeWidth={isHovered ? 1.5 : 0.85}
                        strokeOpacity={isHovered ? 1 : 0.5}
                        className="transition-all"
                      />

                      {/* Glyph Symbol */}
                      <text
                        x="0"
                        y="1"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="'Cinzel', serif"
                      >
                        {glyph}
                      </text>

                      {/* Vargottama Star */}
                      {isVargottama && (
                        <circle cx="10" cy="-8" r="2.5" fill="#facc15" />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
