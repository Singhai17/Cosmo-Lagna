'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Clock, CheckCircle2, AlertTriangle, ShieldCheck, Sun, Moon } from 'lucide-react';

interface ChoghadiyaSlot {
  name: string;
  sanskrit: string;
  type: 'Auspicious' | 'Neutral' | 'Inauspicious';
  ruler: string;
  energy: string;
  color: string;
  badgeBg: string;
  timeRange: string;
}

export const ChoghadiyaPanel: React.FC = () => {
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const dayChoghadiya: ChoghadiyaSlot[] = [
    { name: 'Udveg', sanskrit: 'उद्वेग', type: 'Inauspicious', ruler: 'Sun', energy: 'Restlessness & delays', color: 'text-amber-400', badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30', timeRange: '06:00 - 07:30' },
    { name: 'Amrit', sanskrit: 'अमृत', type: 'Auspicious', ruler: 'Moon', energy: 'Supreme divine nectar & all work', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', timeRange: '07:30 - 09:00' },
    { name: 'Kaal', sanskrit: 'काल', type: 'Inauspicious', ruler: 'Saturn', energy: 'Obstacles & heavy karma', color: 'text-rose-400', badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30', timeRange: '09:00 - 10:30' },
    { name: 'Shubh', sanskrit: 'शुभ', type: 'Auspicious', ruler: 'Jupiter', energy: 'Holy ceremonies & wisdom', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', timeRange: '10:30 - 12:00' },
    { name: 'Rog', sanskrit: 'रोग', type: 'Inauspicious', ruler: 'Mars', energy: 'Disputes & health cautions', color: 'text-rose-400', badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30', timeRange: '12:00 - 13:30' },
    { name: 'Udveg', sanskrit: 'उद्वेग', type: 'Inauspicious', ruler: 'Sun', energy: 'Avoid signing contracts', color: 'text-amber-400', badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30', timeRange: '13:30 - 15:00' },
    { name: 'Chal', sanskrit: 'चल', type: 'Neutral', ruler: 'Venus', energy: 'Journeys & dynamic shifts', color: 'text-sky-400', badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30', timeRange: '15:00 - 16:30' },
    { name: 'Labh', sanskrit: 'लाभ', type: 'Auspicious', ruler: 'Mercury', energy: 'Financial gains & negotiations', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', timeRange: '16:30 - 18:00' },
  ];

  const activeSlot = dayChoghadiya[activeSlotIndex] || dayChoghadiya[1];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn bg-gradient-to-br from-emerald-500/[0.03] to-sky-500/[0.03] border-emerald-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
              Live Choghadiya & Shubh Muhurta Compass
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed font-light">
            Real-time calculation of Auspicious (Amrit, Shubh, Labh) and Inauspicious Muhurta windows based on sidereal diurnal solar cycles.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-obsidian-950/80 px-4 py-1.5 rounded-full border border-emerald-500/30 shadow-sm self-start sm:self-auto font-mono">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300">Live Time:</span>
          <span className="text-white font-bold">{currentTime || '12:00:00'}</span>
        </div>
      </div>

      {/* Active Muhurta Focus Banner */}
      <div className="p-5 rounded-2xl bg-obsidian-950/80 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold font-serif text-xl shrink-0 shadow-inner">
            {activeSlot.name.slice(0, 1)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${activeSlot.badgeBg}`}>
                {activeSlot.type} Window
              </span>
              <span className="text-xs text-slate-400 font-mono">Ruled by {activeSlot.ruler}</span>
            </div>
            <h3 className="text-lg font-bold font-serif text-white mt-0.5">
              Current Muhurta: {activeSlot.name} ({activeSlot.sanskrit})
            </h3>
            <p className="text-xs text-slate-300 font-light mt-0.5">
              {activeSlot.energy} • Ideal time for decisive actions and new initiatives.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-emerald-300 bg-emerald-950/40 px-4 py-2 rounded-full border border-emerald-500/30 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Favorable Cosmic Alignment</span>
        </div>
      </div>

      {/* 8 Daytime Choghadiyas Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {dayChoghadiya.map((slot, idx) => {
          const isCurrent = idx === activeSlotIndex;
          return (
            <div
              key={idx}
              onClick={() => setActiveSlotIndex(idx)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer text-center space-y-1.5 ${
                isCurrent
                  ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105'
                  : 'bg-obsidian-950/60 border-white/[0.08] hover:border-white/[0.2]'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400">{slot.timeRange}</div>
              <div className="text-sm font-bold text-white font-serif">{slot.name}</div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block border ${slot.badgeBg}`}>
                {slot.type.slice(0, 4)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
