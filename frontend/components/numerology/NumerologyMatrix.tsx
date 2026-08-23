'use client';

import React, { useState } from 'react';
import { VedicNumerologyResponse, NumerologyProfile } from '../../types/jyotish';
import { Sparkles, Gem, Shield, Heart, Zap, Award, Star, BookOpen, Hash } from 'lucide-react';

interface NumerologyMatrixProps {
  numerology: VedicNumerologyResponse;
}

export const NumerologyMatrix: React.FC<NumerologyMatrixProps> = ({ numerology }) => {
  const [highlightedValue, setHighlightedValue] = useState<number | null>(null);

  const renderNumberCard = (
    title: string,
    role: string,
    singleDigit: number,
    compoundNumber: number | undefined,
    compoundName: string | undefined,
    compoundMeaning: string | undefined,
    profile: NumerologyProfile,
    cardBg: string,
    badgeBg: string,
    digitBg: string,
    borderColor: string
  ) => {
    return (
      <div className={`glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-sm transition-all hover:scale-[1.01] ${cardBg} ${borderColor}`}>
        <div>
          {/* Role Header & Element */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 font-mono">
              {role}
            </span>
            <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
              {profile.element}
            </span>
          </div>

          {/* Number & Ruler Identity */}
          <div className="flex items-center space-x-4 mt-3.5">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-obsidian-950 font-extrabold font-serif text-3xl shrink-0 shadow-lg ${digitBg}`}>
              {singleDigit}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serif">{title}</h3>
              <p className="text-xs text-slate-200 font-medium">{profile.planet}</p>
              {compoundNumber && compoundNumber !== singleDigit && (
                <div className="text-[11px] font-mono text-sky-300 mt-0.5 font-bold">
                  Compound: {compoundNumber}
                </div>
              )}
            </div>
          </div>

          {/* Canonical Chaldean Compound Title (e.g., "The Star of the Magi") */}
          {compoundName && (
            <div className="mt-3.5 p-3.5 rounded-2xl bg-obsidian-950/80 border border-amber-500/30 space-y-1 shadow-inner">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300 font-serif">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                <span>Compound {compoundNumber}: &quot;{compoundName}&quot;</span>
              </div>
              {compoundMeaning && (
                <p className="text-[11px] text-slate-300 leading-relaxed font-light italic">
                  {compoundMeaning}
                </p>
              )}
            </div>
          )}

          {/* Planetary Nature */}
          <p className="text-xs text-slate-200 mt-3 leading-relaxed font-light">
            {profile.nature}
          </p>
        </div>

        {/* Sacred Correspondences */}
        <div className="space-y-2 pt-3.5 border-t border-white/[0.08] text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center space-x-1.5">
              <Gem className="w-3.5 h-3.5 text-amber-400" />
              <span>Gemstone:</span>
            </span>
            <span className="text-white font-medium">{profile.gemstone}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Lucky Colors:</span>
            </span>
            <span className="text-white font-medium">{profile.lucky_colors?.join(', ')}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Root Mantra:</span>
            </span>
            <span className="text-sky-300 font-mono text-[10.5px] select-all font-semibold">{profile.mantra}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 3 Core Numbers Grid with Vibrant Jewel Tones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {renderNumberCard(
          'Mulank (Driver)',
          'Day of Birth Vibration',
          numerology.mulank,
          numerology.mulank_compound,
          numerology.mulank_compound_name,
          numerology.mulank_compound_meaning,
          numerology.mulank_profile,
          'bg-purple-500/[0.04]',
          'bg-purple-500/20 text-purple-300 border-purple-500/40',
          'bg-gradient-to-br from-purple-400 via-fuchsia-400 to-indigo-500 shadow-[0_0_20px_rgba(192,132,252,0.4)]',
          'border-purple-500/25 hover:border-purple-500/50'
        )}
        {renderNumberCard(
          'Bhagyank (Destiny)',
          'Evolutionary Life Path',
          numerology.bhagyank,
          numerology.bhagyank_compound,
          numerology.bhagyank_compound_name,
          numerology.bhagyank_compound_meaning,
          numerology.bhagyank_profile,
          'bg-sky-500/[0.04]',
          'bg-sky-500/20 text-sky-300 border-sky-500/40',
          'bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(56,189,248,0.4)]',
          'border-sky-500/25 hover:border-sky-500/50'
        )}
        {renderNumberCard(
          'Namank (Expression)',
          `Chaldean Compound: ${numerology.namank_compound}`,
          numerology.namank,
          numerology.namank_compound,
          numerology.namank_compound_name,
          numerology.namank_compound_meaning,
          numerology.namank_profile,
          'bg-amber-500/[0.04]',
          'bg-amber-500/20 text-amber-300 border-amber-500/40',
          'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 shadow-[0_0_20px_rgba(250,204,21,0.4)]',
          'border-amber-500/25 hover:border-amber-500/50'
        )}
      </div>

      {/* Chaldean Name Letter-by-Letter Matrix (Interactive) */}
      {numerology.chaldean_breakdown && numerology.chaldean_breakdown.length > 0 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              <h3 className="font-bold text-base text-white font-serif">
                Interactive Chaldean Name Matrix: <span className="text-white font-mono tracking-widest">{numerology.name.toUpperCase()}</span>
              </h3>
            </div>
            <div className="text-xs text-slate-300 font-mono">
              Compound Sum: <strong className="text-amber-300 text-sm">{numerology.namank_compound}</strong> → Single Root: <strong className="text-sky-300 text-sm">{numerology.namank}</strong>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-light">
            Click any letter chip below to highlight all letters sharing that harmonic vibration:
          </p>

          <div className="flex flex-wrap gap-2">
            {numerology.chaldean_breakdown.map((item, idx) => {
              const isHighlighted = highlightedValue === item.value;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setHighlightedValue(highlightedValue === item.value ? null : item.value)}
                  className={`flex flex-col items-center justify-center w-12 h-14 rounded-2xl transition-all cursor-pointer ${
                    isHighlighted
                      ? 'bg-gradient-to-b from-sky-400 to-blue-600 text-obsidian-950 scale-110 shadow-[0_0_20px_rgba(56,189,248,0.5)] ring-2 ring-sky-300 font-extrabold'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] text-white hover:scale-105'
                  }`}
                >
                  <span className={`text-sm font-bold font-serif ${isHighlighted ? 'text-obsidian-950' : 'text-white'}`}>
                    {item.letter}
                  </span>
                  <span className={`text-xs font-mono font-bold ${isHighlighted ? 'text-obsidian-950' : 'text-sky-400'}`}>
                    {item.value}
                  </span>
                </button>
              );
            })}
          </div>

          {numerology.namank_compound_name && (
            <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/25 text-xs text-slate-200 flex items-start space-x-3 shadow-inner">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="font-bold text-amber-300 text-sm font-serif">
                  Compound {numerology.namank_compound}: &quot;{numerology.namank_compound_name}&quot;
                </div>
                <p className="leading-relaxed text-slate-300 font-light">
                  {numerology.namank_compound_meaning}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Trifold Resonance Synergy & Harmonic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Synergy Score Card */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between space-y-4 bg-emerald-500/[0.03] border-emerald-500/25">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-base text-white font-serif">
                Vibrational Synergy
              </h3>
            </div>
            <div className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40 font-mono shadow-sm">
              {numerology.synergy_score}/100
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed font-light">
            {numerology.synergy_analysis}
          </p>

          <div className="p-3 rounded-2xl bg-obsidian-950/60 border border-emerald-500/20 text-xs text-slate-300 font-mono">
            Harmonic balance: Driver <strong className="text-purple-300">{numerology.mulank}</strong> & Destiny <strong className="text-sky-300">{numerology.bhagyank}</strong>.
          </div>
        </div>

        {/* Harmonic Vibrations Matrix */}
        <div className="glass-panel rounded-3xl p-6 space-y-3 bg-purple-500/[0.03] border-purple-500/25">
          <h3 className="font-bold text-base text-white font-serif flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Harmonic Vibrations</span>
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
              <span className="text-slate-400">Friendly Numbers:</span>
              <span className="text-emerald-300 font-bold">
                {numerology.mulank_profile.friendly_numbers?.join(', ') || '1, 3, 5, 6'}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
              <span className="text-slate-400">Neutral Numbers:</span>
              <span className="text-amber-300 font-medium">
                {numerology.mulank_profile.neutral_numbers?.join(', ') || '7, 8'}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Chaldean Compound:</span>
              <span className="text-purple-300 font-bold">{numerology.namank_compound}</span>
            </div>
          </div>
        </div>

        {/* Life Purpose Guidance */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between space-y-3 bg-sky-500/[0.03] border-sky-500/25">
          <div>
            <h3 className="font-bold text-base text-white font-serif flex items-center space-x-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Sankhya Shastra Alignment</span>
            </h3>
            <p className="text-xs text-slate-200 mt-2 leading-relaxed font-light">
              Destiny number {numerology.bhagyank} ruled by {numerology.bhagyank_profile.planet} directs you towards structured mastery, disciplined ambition, and enduring societal contributions.
            </p>
          </div>
          <div className="text-[11px] text-slate-400 italic">
            Classical Vedic & Chaldean Numerology Siddhanta
          </div>
        </div>
      </div>
    </div>
  );
};
