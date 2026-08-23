'use client';

import React, { useState } from 'react';
import { SadeSatiResponse } from '../../types/jyotish';
import {
  Clock,
  Shield,
  Sparkles,
  CheckCircle2,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

interface SadeSatiPanelProps {
  sadeSati: SadeSatiResponse;
}

export const SadeSatiPanel: React.FC<SadeSatiPanelProps> = ({ sadeSati }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredCycles =
    filterStatus === 'all'
      ? sadeSati.timeline_cycles
      : sadeSati.timeline_cycles.filter((c) => c.status.toLowerCase().includes(filterStatus));

  const isActive = sadeSati.is_sade_sati_active || sadeSati.is_dhaiya_active;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Top Hero Banner & Active Phase Radar */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-sky-500/[0.04] via-transparent to-blue-500/[0.03] border-sky-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isActive ? 'bg-sky-400 animate-ping shadow-[0_0_10px_rgba(56,189,248,0.8)]' : 'bg-emerald-400'
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
                Shani Sade Sati & Dhaiya Lifecycle
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
              {isActive ? sadeSati.active_phase_name : 'No Active Sade Sati Phase'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Evaluated against your Natal Moon sign (
              <strong className="text-sky-300 font-medium">{sadeSati.natal_moon_sign_name}</strong>). Saturn is currently transiting{' '}
              <strong className="text-slate-100 font-medium">{sadeSati.current_saturn_sign_name}</strong> (
              <strong className="text-sky-300 font-medium">House {sadeSati.current_saturn_house_from_moon}</strong> from Natal Moon
              {sadeSati.current_saturn_is_retrograde ? ', Retrograde' : ''}).
            </p>
          </div>

          {/* Right Status Capsule */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <div className="bg-obsidian-950/80 p-4 rounded-2xl border border-sky-500/30 shadow-[0_0_20px_rgba(56,189,248,0.15)] flex items-center justify-between gap-4">
              <div>
                <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Current Status
                </div>
                <div className="text-base font-bold font-serif text-white mt-0.5">
                  {sadeSati.is_sade_sati_active
                    ? '7.5-Year Sade Sati Active'
                    : sadeSati.is_dhaiya_active
                    ? '2.5-Year Small Panoti'
                    : 'Clear & Unencumbered'}
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold border ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {isActive ? 'Active Transit' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Lifetime Shani Timeline Cycles Table */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center space-x-2.5">
            <Calendar className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-base text-white font-serif">
              Lifetime Sade Sati & Dhaiya Chronology (100-Year Ephemeris)
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
            {[
              { id: 'all', label: 'All Cycles' },
              { id: 'active', label: 'Current' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'past', label: 'Past' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterStatus(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterStatus === f.id
                    ? 'bg-sky-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCycles.map((cycle, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                cycle.status === 'Current'
                  ? 'bg-sky-500/[0.08] border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.2)] scale-[1.01]'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-white font-serif">{cycle.phase_type}</span>
                {cycle.status === 'Current' && (
                  <span className="text-[9.5px] bg-sky-400 text-obsidian-950 font-bold px-2 py-0.5 rounded-full">
                    ACTIVE NOW
                  </span>
                )}
              </div>

              <div className="space-y-1 text-xs text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sign:</span>
                  <span className="text-sky-300 font-semibold font-sans">{cycle.sign_name} (H{cycle.house_from_moon})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Span:</span>
                  <span className="text-white font-bold">{cycle.start_year} → {cycle.end_year}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 mt-2.5 line-clamp-2 leading-relaxed font-light">
                {cycle.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Upayas & Shanti Guidance */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 bg-gradient-to-br from-emerald-500/[0.03] to-transparent border-emerald-500/20">
        <div className="flex items-center space-x-2.5 border-b border-white/[0.08] pb-3">
          <Shield className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-base text-white font-serif">
            Prescribed Shani Upayas & Neutralizing Remedies
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sadeSati.remedies.map((rem, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-obsidian-950/70 border border-white/[0.08] hover:border-emerald-500/40 transition-all flex items-start space-x-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white font-serif">{rem.title}</div>
                <div className="text-slate-300 font-light leading-relaxed mt-0.5">{rem.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
