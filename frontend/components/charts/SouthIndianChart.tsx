'use client';

import React, { useState } from 'react';
import { VargaChart, PlanetPosition } from '../../types/jyotish';
import { PLANETARY_GLYPHS, ZODIAC_SIGNS_METADATA } from '../../lib/constants';
import { calculatePlanetaryAspects, AspectRay } from '../../lib/drishti';
import { Eye } from 'lucide-react';

interface SouthIndianChartProps {
  chart: VargaChart;
  allPlanets: PlanetPosition[];
  onSelectPlanet?: (planet: PlanetPosition) => void;
}

export const SouthIndianChart: React.FC<SouthIndianChartProps> = ({
  chart,
  allPlanets,
  onSelectPlanet,
}) => {
  const size = 400;
  const cellSize = size / 4;

  const [hoveredPlanetName, setHoveredPlanetName] = useState<string | null>(null);
  const [showAllDrishti, setShowAllDrishti] = useState<boolean>(false);

  // South Indian Sign Index to Grid (row, col)
  const signToGrid: Record<number, { r: number; c: number }> = {
    12: { r: 0, c: 0 }, // Pisces
    1: { r: 0, c: 1 },  // Aries
    2: { r: 0, c: 2 },  // Taurus
    3: { r: 0, c: 3 },  // Gemini
    4: { r: 1, c: 3 },  // Cancer
    5: { r: 2, c: 3 },  // Leo
    6: { r: 3, c: 3 },  // Virgo
    7: { r: 3, c: 2 },  // Libra
    8: { r: 3, c: 1 },  // Scorpio
    9: { r: 3, c: 0 },  // Sagittarius
    10: { r: 2, c: 0 }, // Capricorn
    11: { r: 1, c: 0 }, // Aquarius
  };

  const getPlanetMeta = (name: string): PlanetPosition | undefined => {
    return allPlanets.find((p) => p.name === name);
  };

  // Find which sign has house 1 (Lagna)
  const lagnaHouse = chart.houses.find((h) => h.house_number === 1);
  const lagnaSignId = lagnaHouse?.sign_id || 1;

  // Active Drishti Rays
  const activeAspects: AspectRay[] = calculatePlanetaryAspects(
    allPlanets,
    hoveredPlanetName || (showAllDrishti ? null : 'Sun')
  );

  const getHouseCenter = (houseNum: number) => {
    const hObj = chart.houses.find((h) => h.house_number === houseNum);
    if (!hObj) return null;
    const grid = signToGrid[hObj.sign_id];
    if (!grid) return null;
    return {
      x: grid.c * cellSize + cellSize / 2,
      y: grid.r * cellSize + cellSize / 2,
    };
  };

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
            <linearGradient id="southChartBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c0d16" />
              <stop offset="100%" stopColor="#06060a" />
            </linearGradient>
          </defs>

          {/* Outer Box */}
          <rect
            x="1"
            y="1"
            width={size - 2}
            height={size - 2}
            fill="url(#southChartBg)"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.5"
            rx="16"
          />

          {/* Central Square (Empty Core in South Indian Chart) */}
          <rect
            x={cellSize}
            y={cellSize}
            width={cellSize * 2}
            height={cellSize * 2}
            fill="#040407"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1"
          />

          {/* Inner Grid Dividers */}
          <g stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1">
            {/* Horizontal lines */}
            <line x1="0" y1={cellSize} x2={size} y2={cellSize} />
            <line x1="0" y1={cellSize * 2} x2={cellSize} y2={cellSize * 2} />
            <line x1={cellSize * 3} y1={cellSize * 2} x2={size} y2={cellSize * 2} />
            <line x1="0" y1={cellSize * 3} x2={size} y2={cellSize * 3} />

            {/* Vertical lines */}
            <line x1={cellSize} y1="0" x2={cellSize} y2={size} />
            <line x1={cellSize * 2} y1="0" x2={cellSize * 2} y2={cellSize} />
            <line x1={cellSize * 2} y1={cellSize * 3} x2={cellSize * 2} y2={size} />
            <line x1={cellSize * 3} y1="0" x2={cellSize * 3} y2={size} />
          </g>

          {/* Center Label in Core Box */}
          <text
            x={size / 2}
            y={size / 2 - 8}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="13"
            fontFamily="'Cinzel', serif"
            fontWeight="bold"
            letterSpacing="0.05em"
          >
            {chart.title}
          </text>
          <text
            x={size / 2}
            y={size / 2 + 12}
            textAnchor="middle"
            fill="rgba(148, 163, 184, 0.7)"
            fontSize="10"
            fontFamily="'Inter', sans-serif"
          >
            {chart.sanskrit_name}
          </text>

          {/* Glowing Parashari Drishti Laser Rays */}
          {(hoveredPlanetName || showAllDrishti) && (
            <g className="pointer-events-none">
              {activeAspects.map((asp, aIdx) => {
                const src = getHouseCenter(asp.sourceHouse);
                const tgt = getHouseCenter(asp.targetHouse);
                if (!src || !tgt) return null;

                const midX = (src.x + tgt.x) / 2 + (Math.sin(aIdx) * 12);
                const midY = (src.y + tgt.y) / 2 + (Math.cos(aIdx) * 12);

                return (
                  <g key={`${asp.planetName}-${aIdx}`} className="animate-fadeIn">
                    <path
                      d={`M ${src.x} ${src.y} Q ${midX} ${midY} ${tgt.x} ${tgt.y}`}
                      fill="none"
                      stroke={asp.planetColor}
                      strokeWidth="2.5"
                      strokeOpacity="0.45"
                      strokeDasharray="4 3"
                    />
                    <path
                      d={`M ${src.x} ${src.y} Q ${midX} ${midY} ${tgt.x} ${tgt.y}`}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="0.8"
                      strokeOpacity="0.85"
                    />
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

          {/* 12 Fixed Rashi Cells */}
          {Object.entries(signToGrid).map(([signIdStr, grid]) => {
            const sId = parseInt(signIdStr, 10);
            const cellX = grid.c * cellSize;
            const cellY = grid.r * cellSize;
            const signMeta = ZODIAC_SIGNS_METADATA.find((s) => s.id === sId);

            // Find house assigned to this sign
            const house = chart.houses.find((h) => h.sign_id === sId);
            const isLagna = sId === lagnaSignId;

            return (
              <g key={sId}>
                {/* Lagna Diagonal Stripe Marker */}
                {isLagna && (
                  <line
                    x1={cellX}
                    y1={cellY}
                    x2={cellX + cellSize}
                    y2={cellY + cellSize}
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                    strokeDasharray="3, 3"
                  />
                )}

                {/* Rashi Name Tag (Fixed position in South Indian) */}
                <text
                  x={cellX + 8}
                  y={cellY + 16}
                  fill="rgba(148, 163, 184, 0.6)"
                  fontSize="9"
                  fontFamily="'Inter', sans-serif"
                  fontWeight="500"
                >
                  {signMeta?.name.slice(0, 3)}
                </text>

                {/* House Number Tag */}
                {house && (
                  <text
                    x={cellX + cellSize - 8}
                    y={cellY + 16}
                    textAnchor="end"
                    fill="rgba(148, 163, 184, 0.5)"
                    fontSize="9"
                    fontFamily="'Inter', monospace"
                    fontWeight="bold"
                  >
                    H{house.house_number}
                  </text>
                )}

                {/* Occupying Planets */}
                {house && (
                  <g transform={`translate(${cellX + cellSize / 2}, ${cellY + cellSize / 2 + 6})`}>
                    {house.planets.map((pName, pIdx) => {
                      const pMeta = getPlanetMeta(pName);
                      const glyph = PLANETARY_GLYPHS[pName] || pName.slice(0, 2);
                      const isVargottama = pMeta?.is_vargottama;
                      const pColor = pMeta?.color || '#ffffff';
                      const isHovered = hoveredPlanetName === pName;

                      const row = Math.floor(pIdx / 2);
                      const col = pIdx % 2;
                      const offsetX = (col - 0.5) * 24;
                      const offsetY = (row - (house.planets.length > 2 ? 0.5 : 0)) * 18;

                      return (
                        <g
                          key={pName}
                          transform={`translate(${offsetX}, ${offsetY})`}
                          onMouseEnter={() => setHoveredPlanetName(pName)}
                          onMouseLeave={() => setHoveredPlanetName(null)}
                          onClick={() => pMeta && onSelectPlanet?.(pMeta)}
                          className="cursor-pointer group"
                        >
                          <rect
                            x="-12"
                            y="-9"
                            width="24"
                            height="18"
                            rx="6"
                            fill={pColor}
                            fillOpacity={isHovered ? 0.4 : 0.14}
                            stroke={pColor}
                            strokeWidth={isHovered ? 1.5 : 0.85}
                            strokeOpacity={isHovered ? 1 : 0.5}
                            className="transition-all"
                          />
                          <text
                            x="0"
                            y="1"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="bold"
                            fontFamily="'Cinzel', serif"
                          >
                            {glyph}
                          </text>
                          {isVargottama && (
                            <circle cx="9" cy="-7" r="2.5" fill="#facc15" />
                          )}
                        </g>
                      );
                    })}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
