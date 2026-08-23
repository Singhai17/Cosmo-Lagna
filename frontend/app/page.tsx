'use client';

import React, { useState } from 'react';
import { FullAstrologicalResponse, PlanetPosition, BirthDataRequest } from '../types/jyotish';
import { fetchHoroscope } from '../lib/api';
import { StarfieldBackground } from '../components/cosmos/StarfieldBackground';
import { Header } from '../components/ui/Header';
import { BirthInputForm } from '../components/ui/BirthInputForm';
import { CosmicSolarSystem3D } from '../components/solarsystem/CosmicSolarSystem3D';
import { VedicChartViewer } from '../components/charts/VedicChartViewer';
import { ShadbalaRadar } from '../components/charts/ShadbalaRadar';
import { LifeAspectsMatrix } from '../components/houses/LifeAspectsMatrix';
import { GocharPanel } from '../components/transits/GocharPanel';
import { ChoghadiyaPanel } from '../components/transits/ChoghadiyaPanel';
import { RajaYogasPanel } from '../components/rajyogas/RajaYogasPanel';
import { DashaTimeline } from '../components/dasha/DashaTimeline';
import { AshtakavargaTable } from '../components/charts/AshtakavargaTable';
import { NumerologyMatrix } from '../components/numerology/NumerologyMatrix';
import { SadeSatiPanel } from '../components/transits/SadeSatiPanel';
import { KaalSarpPanel } from '../components/transits/KaalSarpPanel';
import { ScripturalInsights } from '../components/insights/ScripturalInsights';
import { PlanetModal } from '../components/ui/PlanetModal';
import {
  Orbit,
  Crown,
  ShieldCheck,
  Compass,
  Grid,
  Clock,
  Hash,
  BookOpen,
  Sparkles,
  SlidersHorizontal,
  Sun,
  ShieldAlert,
  Activity,
} from 'lucide-react';

type TabType =
  | 'solarsystem'
  | 'charts'
  | 'houses'
  | 'gochar'
  | 'rajyogas'
  | 'dasha'
  | 'ashtakavarga'
  | 'numerology'
  | 'sadesati'
  | 'kaalsarp'
  | 'insights';

export default function HomePage() {
  const [data, setData] = useState<FullAstrologicalResponse | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('solarsystem');
  const [showInputForm, setShowInputForm] = useState<boolean>(false);

  const handleCalculate = async (req: BirthDataRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetchHoroscope(req);
      setData(res);
      setShowInputForm(false);
    } catch (err: any) {
      console.error('Failed to load horoscope:', err);
      setError(err.message || 'Failed to calculate astrological payload');
    } finally {
      setIsLoading(false);
    }
  };

  // Nav Tabs with signature jewel colors and active styles
  const navTabs = [
    {
      id: 'solarsystem',
      label: '3D Cosmos',
      icon: Orbit,
      activeColor: 'bg-sky-400 text-obsidian-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]',
      hoverColor: 'hover:text-sky-300 hover:border-sky-400/30',
      iconColor: 'text-sky-400',
    },
    {
      id: 'charts',
      label: 'Kundali & Strengths',
      icon: Grid,
      activeColor: 'bg-blue-400 text-obsidian-950 shadow-[0_0_20px_rgba(96,165,250,0.4)]',
      hoverColor: 'hover:text-blue-300 hover:border-blue-400/30',
      iconColor: 'text-blue-400',
    },
    {
      id: 'houses',
      label: '12 Houses',
      icon: ShieldCheck,
      activeColor: 'bg-emerald-400 text-obsidian-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]',
      hoverColor: 'hover:text-emerald-300 hover:border-emerald-400/30',
      iconColor: 'text-emerald-400',
    },
    {
      id: 'gochar',
      label: 'Transits & Muhurta',
      icon: Compass,
      activeColor: 'bg-teal-400 text-obsidian-950 shadow-[0_0_20px_rgba(45,212,191,0.4)]',
      hoverColor: 'hover:text-teal-300 hover:border-teal-400/30',
      iconColor: 'text-teal-400',
    },
    {
      id: 'rajyogas',
      label: 'Raja Yogas',
      icon: Crown,
      activeColor: 'bg-amber-400 text-obsidian-950 shadow-[0_0_20px_rgba(251,191,36,0.4)]',
      hoverColor: 'hover:text-amber-300 hover:border-amber-400/30',
      iconColor: 'text-amber-400',
    },
    {
      id: 'dasha',
      label: 'Vimshottari Dasha',
      icon: Clock,
      activeColor: 'bg-purple-400 text-obsidian-950 shadow-[0_0_20px_rgba(192,132,252,0.4)]',
      hoverColor: 'hover:text-purple-300 hover:border-purple-400/30',
      iconColor: 'text-purple-400',
    },
    {
      id: 'ashtakavarga',
      label: 'Ashtakavarga',
      icon: Grid,
      activeColor: 'bg-indigo-400 text-obsidian-950 shadow-[0_0_20px_rgba(129,140,248,0.4)]',
      hoverColor: 'hover:text-indigo-300 hover:border-indigo-400/30',
      iconColor: 'text-indigo-400',
    },
    {
      id: 'numerology',
      label: 'Sankhya Shastra',
      icon: Hash,
      activeColor: 'bg-fuchsia-400 text-obsidian-950 shadow-[0_0_20px_rgba(232,121,249,0.4)]',
      hoverColor: 'hover:text-fuchsia-300 hover:border-fuchsia-400/30',
      iconColor: 'text-fuchsia-400',
    },
    {
      id: 'sadesati',
      label: 'Shani Sade Sati',
      icon: Clock,
      activeColor: 'bg-cyan-400 text-obsidian-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]',
      hoverColor: 'hover:text-cyan-300 hover:border-cyan-400/30',
      iconColor: 'text-cyan-400',
    },
    {
      id: 'kaalsarp',
      label: 'Kaal Sarp',
      icon: ShieldAlert,
      activeColor: 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]',
      hoverColor: 'hover:text-rose-300 hover:border-rose-400/30',
      iconColor: 'text-rose-400',
    },
    {
      id: 'insights',
      label: 'Scriptural Knowledge',
      icon: BookOpen,
      activeColor: 'bg-amber-300 text-obsidian-950 shadow-[0_0_20px_rgba(252,211,77,0.4)]',
      hoverColor: 'hover:text-amber-200 hover:border-amber-300/30',
      iconColor: 'text-amber-300',
    },
  ];

  return (
    <div className="relative min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-sky-500/30 selection:text-white">
      {/* Dynamic Jewel-Tone Starfield Background */}
      <StarfieldBackground />

      {/* Persistent Global Header */}
      <Header
        data={data}
        onOpenBirthModal={() => setShowInputForm(true)}
        onReset={() => {
          setData(null);
          setShowInputForm(false);
        }}
      />

      {/* Main App Container */}
      <main className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-8">
        {/* Initial Intake Screen when no chart is calculated */}
        {!data && !isLoading && (
          <div className="py-6 sm:py-16 space-y-8 sm:space-y-10 animate-fadeIn">
            {/* Minimalist Editorial Hero */}
            <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto px-1">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-amber-500/10 border border-sky-400/25 text-slate-200 text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span className="cyan-gradient-text font-bold">
                  Precision Sidereal Ephemeris & Cosmic Intelligence
                </span>
              </div>

              <h1 className="text-2xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-white leading-tight">
                Awaken Your Cosmic Kundali
              </h1>

              <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                Calculate your high-precision Sidereal Kundali (Lahiri Ayanamsa), 300+ Classical Raja Yogas, Real-Time Planetary Transits, Vimshottari Dasha cycles, and explore the interactive 3D Solar System.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium text-center max-w-xl mx-auto">
                Calculation Error: {error}
              </div>
            )}

            {/* Intake Form */}
            <BirthInputForm
              initialData={null}
              onSubmit={handleCalculate}
              isLoading={isLoading}
              isInitialIntake={true}
            />
          </div>
        )}

        {/* Loading State Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 sm:py-32 space-y-5 sm:space-y-6 animate-fadeIn">
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-sky-500/20 border-t-sky-400 rounded-full animate-spin shadow-[0_0_25px_rgba(56,189,248,0.3)]" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-serif text-base sm:text-lg font-bold">
                ॐ
              </div>
            </div>
            <div className="text-center space-y-1 px-4">
              <p className="text-xs uppercase tracking-widest text-sky-300 font-semibold font-mono">
                Calculating Sidereal Ephemeris Coordinates...
              </p>
              <p className="text-[10.5px] sm:text-[11px] text-slate-400 font-light">
                Lahiri Ayanamsa • Harmonic Vargas • Vimshottari Dasha • 3D Planetary Orbits
              </p>
            </div>
          </div>
        )}

        {/* Active Data Dashboard once calculated */}
        {data && (
          <div className="space-y-5 sm:space-y-8 animate-fadeIn">
            {/* Top Identity Capsule */}
            <div className="glass-panel rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 relative overflow-hidden">
              {/* Subtle ambient colored glow behind hero banner */}
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-sky-500/15 via-purple-500/10 to-amber-500/10 blur-3xl rounded-full pointer-events-none" />

              <div className="space-y-1.5 sm:space-y-2 max-w-2xl z-10">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
                    Natal Kundali • {data.birth_data.name}
                  </span>
                </div>
                <h1 className="text-xl sm:text-3xl font-bold font-serif text-white tracking-wide">
                  {data.ascendant.sign_name} ({data.ascendant.sign_sanskrit}) Lagna • {data.ascendant.formatted_dms}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  Born in <strong className="text-sky-300 font-medium">{data.birth_data.city || `${data.birth_data.latitude}°, ${data.birth_data.longitude}°`}</strong> on {data.birth_data.birth_date} at {data.birth_data.birth_time} (UTC {data.birth_data.timezone >= 0 ? `+${data.birth_data.timezone}` : data.birth_data.timezone}). Active period: <strong className="text-amber-300 font-medium">{data.vimshottari_dasha.active_period_string}</strong>.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto shrink-0 z-10">
                <button
                  type="button"
                  onClick={() => setShowInputForm(!showInputForm)}
                  className="w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-sky-300" />
                  <span>{showInputForm ? 'Close Coordinates' : 'Edit Birth Parameters'}</span>
                </button>
              </div>
            </div>

            {/* Birth Details Input Form (Collapsible) */}
            {showInputForm && (
              <div className="animate-fadeIn">
                <BirthInputForm
                  initialData={data.birth_data}
                  onSubmit={handleCalculate}
                  isLoading={isLoading}
                  isInitialIntake={false}
                />
              </div>
            )}

            {/* Vibrant Interactive Section Pills (Transparent on background) */}
            <div className="flex items-center overflow-x-auto no-scrollbar py-1.5 gap-2 bg-transparent">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? `${tab.activeColor} font-bold scale-[1.03]`
                        : `bg-white/[0.04] ${tab.hoverColor} text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] hover:scale-[1.01] backdrop-blur-md`
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-obsidian-950' : tab.iconColor}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents (11 Sections in exact requested sequence) */}
            <div className="animate-fadeIn space-y-6 sm:space-y-8">
              {/* 1. 3D Solar System */}
              {activeTab === 'solarsystem' && (
                <div className="space-y-8">
                  <CosmicSolarSystem3D
                    data={data}
                    onSelectPlanet={(planet) => setSelectedPlanet(planet)}
                  />

                  {/* 2. D1 / D9 / D10 Vedic Charts */}
                  <VedicChartViewer
                    data={data}
                    onSelectPlanet={(planet) => setSelectedPlanet(planet)}
                  />

                  {/* Shadbala 6-Fold Strength Radar */}
                  <ShadbalaRadar
                    planets={data.planets}
                    onSelectPlanet={(planet) => setSelectedPlanet(planet)}
                  />

                  {/* 3. 12 Houses Matrix */}
                  <LifeAspectsMatrix
                    houses={data.houses_detailed}
                    onSelectPlanet={(planet) => setSelectedPlanet(planet)}
                  />

                  {/* 4. Gochar (Transits) & Choghadiya */}
                  {data.gochar && (
                    <div className="space-y-6">
                      <GocharPanel gochar={data.gochar} />
                      <ChoghadiyaPanel />
                    </div>
                  )}

                  {/* 5. Raja Yogas */}
                  <RajaYogasPanel
                    rajyogas={data.rajyogas}
                    allPlanets={data.planets}
                    onSelectPlanet={(planet) => setSelectedPlanet(planet)}
                  />

                  {/* 6. Vimshottari Dasha */}
                  <DashaTimeline dasha={data.vimshottari_dasha} />

                  {/* 7. Sarvashtakavarga (SAV) */}
                  <AshtakavargaTable
                    sav={data.sarvashtakavarga}
                    ascendantSignId={data.ascendant.sign_id}
                  />

                  {/* 8. Sankhya Shastra (Numerology) */}
                  <NumerologyMatrix numerology={data.numerology} />

                  {/* 9. Shani Sade Sati */}
                  {data.sade_sati && <SadeSatiPanel sadeSati={data.sade_sati} />}

                  {/* 10. Kaal Sarp Dosha */}
                  {data.kaal_sarp && <KaalSarpPanel kaalSarp={data.kaal_sarp} />}

                  {/* 11. Scriptural Knowledge */}
                  <ScripturalInsights insights={data.scriptural_insights} />
                </div>
              )}

              {/* 2. Vedic Charts (D1 / D9 / D10) & Shadbala */}
              {activeTab === 'charts' && (
                <div className="space-y-6">
                  <VedicChartViewer
                    data={data}
                    onSelectPlanet={(planet) => setSelectedPlanet(planet)}
                  />
                  <ShadbalaRadar
                    planets={data.planets}
                    onSelectPlanet={(planet) => setSelectedPlanet(planet)}
                  />
                  <AshtakavargaTable
                    sav={data.sarvashtakavarga}
                    ascendantSignId={data.ascendant.sign_id}
                  />
                </div>
              )}

              {/* 3. 12 Houses Matrix */}
              {activeTab === 'houses' && (
                <LifeAspectsMatrix
                  houses={data.houses_detailed}
                  onSelectPlanet={(planet) => setSelectedPlanet(planet)}
                />
              )}

              {/* 4. Gochar (Transits) & Choghadiya */}
              {activeTab === 'gochar' && (
                <div className="space-y-6">
                  {data.gochar ? (
                    <GocharPanel gochar={data.gochar} />
                  ) : (
                    <div className="glass-panel rounded-3xl p-8 text-center space-y-2">
                      <p className="text-sm font-medium text-slate-300">Calculating Real-Time Gochar Transits...</p>
                    </div>
                  )}
                  <ChoghadiyaPanel />
                </div>
              )}

              {/* 5. Raja Yogas */}
              {activeTab === 'rajyogas' && (
                <RajaYogasPanel
                  rajyogas={data.rajyogas}
                  allPlanets={data.planets}
                  onSelectPlanet={(planet) => setSelectedPlanet(planet)}
                />
              )}

              {/* 6. Vimshottari Dasha */}
              {activeTab === 'dasha' && (
                <DashaTimeline dasha={data.vimshottari_dasha} />
              )}

              {/* 7. Sarvashtakavarga (SAV) */}
              {activeTab === 'ashtakavarga' && (
                <AshtakavargaTable
                  sav={data.sarvashtakavarga}
                  ascendantSignId={data.ascendant.sign_id}
                />
              )}

              {/* 8. Sankhya Shastra (Numerology) */}
              {activeTab === 'numerology' && (
                <NumerologyMatrix numerology={data.numerology} />
              )}

              {/* 9. Shani Sade Sati */}
              {activeTab === 'sadesati' && (
                data.sade_sati ? (
                  <SadeSatiPanel sadeSati={data.sade_sati} />
                ) : (
                  <div className="glass-panel rounded-3xl p-8 text-center space-y-2">
                    <p className="text-sm font-medium text-slate-300">Calculating Shani Sade Sati Timeline...</p>
                  </div>
                )
              )}

              {/* 10. Kaal Sarp Dosha */}
              {activeTab === 'kaalsarp' && (
                data.kaal_sarp ? (
                  <KaalSarpPanel kaalSarp={data.kaal_sarp} />
                ) : (
                  <div className="glass-panel rounded-3xl p-8 text-center space-y-2">
                    <p className="text-sm font-medium text-slate-300">Calculating Kaal Sarp Analysis...</p>
                  </div>
                )
              )}

              {/* 11. Scriptural Knowledge */}
              {activeTab === 'insights' && (
                <ScripturalInsights insights={data.scriptural_insights} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Global Interactive Planet Inspector Modal */}
      {selectedPlanet && (
        <PlanetModal
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </div>
  );
}
