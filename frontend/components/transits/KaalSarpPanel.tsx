'use client';

import React, { useState } from 'react';
import { KaalSarpResponse } from '../../types/jyotish';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Search,
  BookOpen,
} from 'lucide-react';

interface KaalSarpPanelProps {
  kaalSarp: KaalSarpResponse;
}

export const KaalSarpPanel: React.FC<KaalSarpPanelProps> = ({ kaalSarp }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<any | null>(null);

  const isPresent = kaalSarp.is_present;
  const isPurna = kaalSarp.is_purna;

  const filteredCatalog = kaalSarp.all_12_types_catalog.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.axis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Top Diagnostic Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-rose-500/[0.04] via-transparent to-purple-500/[0.03] border-rose-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isPresent ? 'bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'bg-emerald-400'
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
                Rahu-Ketu Nodal Axis Alignment
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
              {isPresent ? kaalSarp.type_name : 'No Kaal Sarp Dosha Detected'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Nodal axis spans <strong className="text-rose-300 font-semibold">House {kaalSarp.rahu_house} (Rahu)</strong> to{' '}
              <strong className="text-purple-300 font-semibold">House {kaalSarp.ketu_house} (Ketu)</strong>. Axis direction:{' '}
              <strong className="text-slate-200 font-mono">{kaalSarp.flow_direction}</strong>.
              {kaalSarp.is_yoga_elevated && (
                <span className="text-amber-300 font-bold block mt-1">
                  ★ Elevation: {kaalSarp.yoga_elevation_status} (Dosha is neutralized into spiritual growth).
                </span>
              )}
            </p>
          </div>

          {/* Right Status Capsule */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <div className="bg-obsidian-950/80 p-4 rounded-2xl border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-center justify-between gap-4">
              <div>
                <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Dosha Diagnostic
                </div>
                <div className="text-base font-bold font-serif text-white mt-0.5">
                  {kaalSarp.dosha_status}
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold border ${
                    isPresent
                      ? isPurna
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {isPresent ? (isPurna ? 'Purna (Complete)' : 'Anshik (Partial)') : 'Nirvighna'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Detected Kaal Sarp In-Depth Breakdown */}
      {isPresent && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 bg-rose-500/[0.02] border-rose-500/25">
          <div className="border-b border-white/[0.08] pb-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-bold block">
              Active Nodal Configuration
            </span>
            <h3 className="text-lg font-bold font-serif text-white mt-0.5">
              {kaalSarp.type_name} ({kaalSarp.type_sanskrit})
            </h3>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed font-light">
            {kaalSarp.classical_effects}
          </p>

          <div className="p-3.5 rounded-2xl bg-obsidian-950/80 border border-rose-500/30 text-xs text-slate-200 font-light">
            <strong className="text-rose-300 font-semibold block mb-1">Specific Remedial Directive:</strong>
            {kaalSarp.specific_remedy}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {kaalSarp.universal_remedies?.map((rem, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-obsidian-950/70 border border-white/[0.08] flex items-start space-x-2.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white font-serif">{rem.title}</div>
                  <div className="text-slate-300 font-light mt-0.5">{rem.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. 12 Classical Kaal Sarp Types Catalog */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <h3 className="font-bold text-base text-white font-serif">
              Canonical 12 Types of Kaal Sarp (Classical Catalog)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5 font-light">
              Reference guide to all 12 Rahu-Ketu nodal axes across the 12 Bhavas
            </p>
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter 12 types..."
              className="w-full h-9 bg-white/[0.03] border border-white/[0.08] focus:border-rose-400/40 rounded-full pl-9 pr-3.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCatalog.map((item) => {
            const isChartType = item.id === kaalSarp.type_id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedType(item)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isChartType
                    ? 'bg-rose-500/[0.08] border-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.25)] scale-[1.01]'
                    : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.06] hover:border-white/[0.16]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-white font-serif">{item.name}</span>
                  {isChartType && (
                    <span className="text-[9px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full shadow-sm">
                      YOUR CHART
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-mono text-slate-300">
                  {item.axis} • {item.sanskrit}
                </div>

                <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 leading-relaxed font-light">
                  {item.classical_effects}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
