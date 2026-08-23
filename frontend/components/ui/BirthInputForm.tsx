'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BirthDataRequest } from '../../types/jyotish';
import { CITY_PRESETS, TIMEZONE_OPTIONS } from '../../lib/constants';
import { searchGlobalCitiesInternet, CityResult } from '../../lib/citySearch';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Globe,
  User,
  Sliders,
  Compass,
  CheckCircle2,
  Users,
  Search,
  Loader2,
} from 'lucide-react';

interface BirthInputFormProps {
  initialData?: BirthDataRequest | null;
  onSubmit: (data: BirthDataRequest) => void;
  isLoading: boolean;
  isInitialIntake?: boolean;
}

export const BirthInputForm: React.FC<BirthInputFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  isInitialIntake = false,
}) => {
  const [formData, setFormData] = useState<BirthDataRequest>({
    name: initialData?.name || '',
    gender: initialData?.gender || 'male',
    birth_date: initialData?.birth_date || '',
    birth_time: initialData?.birth_time || '',
    latitude: initialData?.latitude !== undefined ? initialData.latitude : ('' as any),
    longitude: initialData?.longitude !== undefined ? initialData.longitude : ('' as any),
    timezone: initialData?.timezone !== undefined ? initialData.timezone : 5.5,
    city: initialData?.city || '',
  });

  const [citySearchQuery, setCitySearchQuery] = useState<string>(initialData?.city || '');
  const [searchResults, setSearchResults] = useState<CityResult[]>([]);
  const [isSearchingCity, setIsSearchingCity] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live Debounced Internet City Search
  const handleCityInput = (val: string) => {
    setCitySearchQuery(val);
    setFormData((prev) => ({ ...prev, city: val }));

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!val || val.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    // Instant local matches first
    const qLower = val.toLowerCase();
    const localMatches: CityResult[] = CITY_PRESETS.filter((c) =>
      c.name.toLowerCase().includes(qLower)
    ).map((c) => ({
      name: c.name,
      city: c.name.split(',')[0],
      country: c.name.split(',').pop()?.trim() || '',
      lat: c.lat,
      lon: c.lon,
      tz: c.tz,
    }));

    setSearchResults(localMatches);
    setShowDropdown(true);

    // Debounce live internet geocoding fetch
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearchingCity(true);
      try {
        const liveResults = await searchGlobalCitiesInternet(val);
        if (liveResults && liveResults.length > 0) {
          // Combine local + live results without duplicates
          const combined = [...liveResults];
          localMatches.forEach((loc) => {
            if (!combined.some((r) => Math.abs(r.lat - loc.lat) < 0.05 && Math.abs(r.lon - loc.lon) < 0.05)) {
              combined.push(loc);
            }
          });
          setSearchResults(combined);
          setShowDropdown(true);
        }
      } catch (err) {
        console.warn('City search query failed:', err);
      } finally {
        setIsSearchingCity(false);
      }
    }, 280);
  };

  const handleSelectCity = (res: CityResult) => {
    setCitySearchQuery(res.name);
    setFormData((prev) => ({
      ...prev,
      city: res.name,
      latitude: res.lat,
      longitude: res.lon,
      timezone: res.tz,
    }));
    setShowDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter your full name.');
      return;
    }
    if (!formData.birth_date) {
      alert('Please specify your date of birth.');
      return;
    }
    if (!formData.birth_time) {
      alert('Please specify your exact birth time.');
      return;
    }
    if (formData.latitude === ('' as any) || isNaN(Number(formData.latitude))) {
      alert('Please enter or select a city with latitude coordinates.');
      return;
    }
    if (formData.longitude === ('' as any) || isNaN(Number(formData.longitude))) {
      alert('Please enter or select a city with longitude coordinates.');
      return;
    }

    const payload: BirthDataRequest = {
      ...formData,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      timezone: Number(formData.timezone),
    };

    onSubmit(payload);
  };

  const currentGender = formData.gender || 'male';

  return (
    <form
      onSubmit={handleSubmit}
      className={`glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn ${
        isInitialIntake ? 'max-w-3xl mx-auto' : ''
      }`}
    >
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white font-serif font-bold text-xl shrink-0 shadow-inner">
            ॐ
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-serif text-white tracking-wide">
              {isInitialIntake ? 'Ephemeris Natal Coordinates' : 'Edit Birth Parameters'}
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Swiss Ephemeris • Sidereal Lahiri Ayanamsa • Global Live Geocoding
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <span className="text-[11px] text-slate-300 font-mono bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.08] font-medium whitespace-nowrap">
            Lahiri (Chitra Paksha)
          </span>
        </div>
      </div>

      {/* 2. Primary Inputs Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center space-x-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>Full Name:</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            className="w-full h-11 bg-white/[0.03] border border-white/[0.1] focus:border-sky-400 rounded-2xl px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors shadow-inner"
          />
        </div>

        {/* Gender Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center space-x-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Gender:</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5 h-11 p-1 bg-white/[0.03] border border-white/[0.1] rounded-2xl">
            {(['male', 'female', 'other'] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setFormData({ ...formData, gender: g })}
                className={`rounded-xl text-xs font-medium transition-all capitalize cursor-pointer ${
                  currentGender === g
                    ? 'bg-white text-obsidian-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Birth Date Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Date of Birth:</span>
          </label>
          <input
            type="date"
            required
            value={formData.birth_date}
            onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
            className="w-full h-11 bg-white/[0.03] border border-white/[0.1] focus:border-sky-400 rounded-2xl px-3.5 text-xs text-white focus:outline-none transition-colors shadow-inner font-mono"
          />
        </div>

        {/* Birth Time Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Exact Birth Time (HH:MM:SS):</span>
          </label>
          <input
            type="time"
            step="1"
            required
            value={formData.birth_time}
            onChange={(e) => setFormData({ ...formData, birth_time: e.target.value })}
            className="w-full h-11 bg-white/[0.03] border border-white/[0.1] focus:border-sky-400 rounded-2xl px-3.5 text-xs text-white focus:outline-none transition-colors shadow-inner font-mono"
          />
        </div>
      </div>

      {/* 3. Geographic Coordinate Matrix with Live Internet Geocoding */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Globe className="w-3 h-3 text-sky-400" />
            <span>Birth Place & Geographic Coordinates</span>
          </div>
          {formData.latitude !== ('' as any) && formData.longitude !== ('' as any) && (
            <span className="text-[10px] text-sky-300 font-mono">
              {Number(formData.latitude).toFixed(4)}° N, {Number(formData.longitude).toFixed(4)}° E
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Live Global Internet Search Input */}
          <div className="space-y-1 sm:col-span-3 relative" ref={dropdownRef}>
            <label className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Search Any City in the World:</span>
              {isSearchingCity && (
                <span className="text-[10px] text-sky-400 flex items-center space-x-1 font-mono">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Searching global internet directory...</span>
                </span>
              )}
            </label>

            <div className="relative">
              <input
                type="text"
                value={citySearchQuery}
                onChange={(e) => handleCityInput(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setShowDropdown(true);
                }}
                placeholder="Type any city, town, or village (e.g. Pune, London, Austin, Varanasi, Tokyo)..."
                className="w-full h-11 bg-white/[0.03] border border-white/[0.1] focus:border-sky-400 rounded-2xl pl-10 pr-4 text-xs text-white focus:outline-none transition-colors shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            {/* Live Autocomplete Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto rounded-2xl bg-obsidian-900/95 backdrop-blur-2xl border border-white/[0.15] shadow-2xl divide-y divide-white/[0.06] animate-fadeIn">
                {searchResults.map((res, idx) => (
                  <button
                    key={`${res.name}-${idx}`}
                    type="button"
                    onClick={() => handleSelectCity(res)}
                    className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-white/[0.08] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
                      <div className="truncate">
                        <div className="text-xs font-semibold text-white group-hover:text-sky-200">
                          {res.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {res.lat}° N, {res.lon}° E
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 shrink-0 ml-2">
                      UTC {res.tz >= 0 ? `+${res.tz}` : res.tz}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Latitude */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400">Latitude (Decimal):</label>
            <input
              type="number"
              step="0.0001"
              required
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value === '' ? ('' as any) : parseFloat(e.target.value) })}
              placeholder="e.g. 28.6139"
              className="w-full h-10 bg-white/[0.03] border border-white/[0.1] focus:border-sky-400 rounded-xl px-3 text-xs text-white focus:outline-none font-mono"
            />
          </div>

          {/* Longitude */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400">Longitude (Decimal):</label>
            <input
              type="number"
              step="0.0001"
              required
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value === '' ? ('' as any) : parseFloat(e.target.value) })}
              placeholder="e.g. 77.2090"
              className="w-full h-10 bg-white/[0.03] border border-white/[0.1] focus:border-sky-400 rounded-xl px-3 text-xs text-white focus:outline-none font-mono"
            />
          </div>

          {/* Timezone */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400">Timezone Offset:</label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: parseFloat(e.target.value) || 0 })}
              className="w-full h-10 bg-obsidian-900 border border-white/[0.1] focus:border-sky-400 rounded-xl px-2.5 text-xs text-white focus:outline-none"
            >
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 4. Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/[0.06]">
        <div className="text-xs text-slate-400 flex items-center space-x-2">
          <MapPin className="w-3.5 h-3.5 text-sky-400" />
          <span className="truncate max-w-[280px]">
            {formData.city || (formData.latitude !== ('' as any) ? `${formData.latitude}°, ${formData.longitude}°` : 'Coordinates')}
          </span>
          <span className="text-slate-600">•</span>
          <span className="font-mono text-slate-300">UTC {formData.timezone >= 0 ? `+${formData.timezone}` : formData.timezone}</span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto btn-luxury-primary px-8 py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
              <span>Calculating Precision Ephemeris...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cast Sidereal Kundali & Cosmic Model</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
