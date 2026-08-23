'use client';

import React from 'react';
import { SarvashtakavargaResponse } from '../../types/jyotish';
import { ZODIAC_SIGNS_METADATA } from '../../lib/constants';
import { Grid, Flame } from 'lucide-react';

interface AshtakavargaTableProps {
  sav: SarvashtakavargaResponse;
  ascendantSignId: number;
}

export const AshtakavargaTable: React.FC<AshtakavargaTableProps> = ({
  sav,
  ascendantSignId,
}) => {
  const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
        <div className="flex items-center space-x-2.5">
          <Grid className="w-5 h-5 text-sky-400" />
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
            Sarvashtakavarga (SAV) Matrix
          </h2>
        </div>
        <div className="text-xs bg-white/[0.04] text-slate-200 px-3.5 py-1.5 rounded-full border border-white/[0.08] font-mono">
          Total Bindus: <strong className="text-white font-bold">{sav.total_bindus}</strong> / 337
        </div>
      </div>

      {/* 12 House Heatmap Bar */}
      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5 font-mono">
          <Flame className="w-3.5 h-3.5 text-sky-400" />
          <span>House Strength Distribution (Parashari Benchmark ≥ 28 Bindus)</span>
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((houseNum) => {
            const score = sav.house_scores[houseNum] || 0;
            const signIdx = (ascendantSignId - 1 + (houseNum - 1)) % 12;
            const signMeta = ZODIAC_SIGNS_METADATA[signIdx];
            const isStrong = score >= 28;
            const isExceptional = score >= 32;

            return (
              <div
                key={houseNum}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  isExceptional
                    ? 'bg-sky-500/15 border-sky-400/40'
                    : isStrong
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-white/[0.02] border-white/[0.06]'
                }`}
              >
                <span className="text-[10px] text-slate-500 font-mono">H{houseNum}</span>
                <span
                  className={`text-base font-bold my-0.5 font-mono ${
                    isExceptional
                      ? 'text-sky-300'
                      : isStrong
                      ? 'text-emerald-300'
                      : 'text-slate-300'
                  }`}
                >
                  {score}
                </span>
                <span className="text-[9px] text-slate-500">{signMeta.name.slice(0, 3)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Planet BAV Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08] text-slate-400 font-mono text-[11px]">
              <th className="py-2.5 px-3 font-medium">Graha</th>
              {ZODIAC_SIGNS_METADATA.map((s) => (
                <th key={s.id} className="py-2.5 px-2 text-center font-medium">
                  {s.name.slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {planets.map((planetName) => {
              const bavRow = sav.planet_bav[planetName] || [];
              return (
                <tr key={planetName} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-200 font-serif">{planetName}</td>
                  {Array.from({ length: 12 }, (_, signIdx) => {
                    const val = bavRow[signIdx] || 0;
                    return (
                      <td
                        key={signIdx}
                        className={`py-2.5 px-2 text-center font-mono font-medium ${
                          val >= 5 ? 'text-emerald-300 font-bold' : val <= 2 ? 'text-rose-400' : 'text-slate-400'
                        }`}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
