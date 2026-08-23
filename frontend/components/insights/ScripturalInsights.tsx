'use client';

import React, { useState } from 'react';
import { ScripturalPrediction } from '../../types/jyotish';
import { BookOpen, Sparkles, Shield, Bookmark, Quote, CheckCircle2 } from 'lucide-react';

interface ScripturalInsightsProps {
  insights: ScripturalPrediction[];
}

export const ScripturalInsights: React.FC<ScripturalInsightsProps> = ({ insights }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!insights || insights.length === 0) return null;

  const categories = ['all', ...Array.from(new Set(insights.map((i) => i.category)))];

  const filteredInsights =
    selectedCategory === 'all'
      ? insights
      : insights.filter((i) => i.category === selectedCategory);

  const getCategoryTheme = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'spirituality':
      case 'dharma':
        return {
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          border: 'border-amber-500/25 hover:border-amber-500/50',
          bg: 'bg-amber-500/[0.03]',
          iconColor: 'text-amber-400',
        };
      case 'career':
      case 'karma':
      case 'profession':
        return {
          badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
          border: 'border-sky-500/25 hover:border-sky-500/50',
          bg: 'bg-sky-500/[0.03]',
          iconColor: 'text-sky-400',
        };
      case 'wealth':
      case 'finance':
      case 'prosperity':
        return {
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          border: 'border-emerald-500/25 hover:border-emerald-500/50',
          bg: 'bg-emerald-500/[0.03]',
          iconColor: 'text-emerald-400',
        };
      default:
        return {
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          border: 'border-purple-500/25 hover:border-purple-500/50',
          bg: 'bg-purple-500/[0.03]',
          iconColor: 'text-purple-400',
        };
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
      {/* Header & Category Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
              Classical Scriptural Insights & Hermeneutics
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed font-light">
            Synthesized philosophical readings derived verbatim from <strong>Brihat Parashara Hora Shastra</strong>, <strong>Phaladeepika</strong>, <strong>Saravali</strong>, and <strong>Jataka Parijata</strong>.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-105'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Insight Editorial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInsights.map((insight, idx) => {
          const theme = getCategoryTheme(insight.category);
          return (
            <div
              key={idx}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between space-y-4 shadow-sm hover:scale-[1.01] ${theme.bg} ${theme.border}`}
            >
              <div className="space-y-3">
                {/* Category & Classical Source */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-full border font-bold ${theme.badge}`}>
                    {insight.category}
                  </span>
                  <span className="text-xs text-amber-300/80 font-serif italic">
                    {insight.classical_source}
                  </span>
                </div>

                {/* Insight Title */}
                <h3 className="text-base font-bold text-white font-serif tracking-wide">
                  {insight.title}
                </h3>

                {/* Classical Quote Body */}
                <div className="p-3.5 rounded-2xl bg-obsidian-950/70 border border-white/[0.06] text-xs text-slate-200 leading-relaxed font-light relative shadow-inner">
                  <Quote className="w-3.5 h-3.5 text-amber-400/40 absolute top-2.5 right-2.5" />
                  <p className="italic">{insight.text}</p>
                </div>
              </div>

              {/* Empowering Takeaway & Remedial Action */}
              <div className="space-y-2.5 pt-3 border-t border-white/[0.06]">
                <div className="text-xs text-slate-200">
                  <strong className="text-emerald-300 font-semibold block mb-0.5">Empowering Takeaway:</strong>
                  <p className="text-slate-300 font-light leading-relaxed">{insight.empowering_takeaway}</p>
                </div>

                {insight.remedial_measures && insight.remedial_measures.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                      Prescribed Upaya:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {insight.remedial_measures.map((rem, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-obsidian-950/80 border border-emerald-500/25 text-[11px] text-slate-200"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{rem}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
