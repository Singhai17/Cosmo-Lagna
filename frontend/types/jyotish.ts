export interface BirthDataRequest {
  name: string;
  birth_date: string;
  birth_time: string;
  latitude: number;
  longitude: number;
  timezone: number;
  city?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface NumerologyRequest {
  name: string;
  birth_date: string;
}

export interface PlanetPosition {
  name: string;
  sanskrit: string;
  longitude: number;
  sign_id: number;
  sign_name: string;
  sign_sanskrit: string;
  house: number;
  degrees_in_sign: number;
  formatted_dms: string;
  is_retrograde: boolean;
  is_combust: boolean;
  speed: number;
  nakshatra_id: number;
  nakshatra_name: string;
  nakshatra_pada: number;
  nakshatra_lord: string;
  nakshatra_deity: string;
  nakshatra_symbol?: string;
  dignity: string;
  is_vargottama: boolean;
  d9_sign_id?: number;
  d10_sign_id?: number;
  color: string;
  gemstone: string;
  chakra?: string;
  exaltation_sign_name?: string;
  exaltation_deg?: number;
  debilitation_sign_name?: string;
  debilitation_deg?: number;
  moolatrikona_sign_name?: string;
  moolatrikona_range?: [number, number];
  own_signs_names?: string[];
  karaka?: string;
  nature?: string;
  metal?: string;
  mantra?: string;
  deity?: string;
  bphs_phala?: string;
}

export interface AscendantInfo {
  longitude: number;
  sign_id: number;
  sign_name: string;
  sign_sanskrit: string;
  degrees_in_sign: number;
  formatted_dms: string;
  nakshatra_id: number;
  nakshatra_name: string;
  nakshatra_pada: number;
  nakshatra_lord: string;
}

export interface HousePlacement {
  house_number: number;
  sign_id: number;
  sign_name: string;
  sign_sanskrit: string;
  lord: string;
  planets: string[];
  sav_bindus?: number;
}

export interface VargaChart {
  varga_code: string;
  title: string;
  sanskrit_name: string;
  description: string;
  houses: HousePlacement[];
  planet_positions: Record<string, { sign_id: number; sign_name: string }>;
}

export interface DashaPratyantar {
  planet: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  is_active: boolean;
}

export interface DashaAntar {
  planet: string;
  start_date: string;
  end_date: string;
  duration_months: number;
  is_active: boolean;
  pratyantardashas: DashaPratyantar[];
}

export interface DashaMaha {
  planet: string;
  start_date: string;
  end_date: string;
  duration_years: number;
  is_active: boolean;
  antardashas: DashaAntar[];
}

export interface VimshottariDashaResponse {
  starting_balance: {
    nakshatra: string;
    nakshatra_lord: string;
    balance_years: number;
    fraction_remaining: number;
    deg_in_nakshatra: number;
  };
  active_mahadasha: string;
  active_antardasha: string;
  active_pratyantardasha: string;
  active_period_string: string;
  mahadashas: DashaMaha[];
}

export interface SarvashtakavargaResponse {
  total_bindus: number;
  house_scores: Record<number, number>;
  planet_bav: Record<string, number[]>;
  strongest_houses: number[];
  karmic_focus_houses: number[];
}

export interface NumerologyProfile {
  number: number;
  planet: string;
  nature: string;
  element: string;
  friendly_numbers: number[];
  neutral_numbers: number[];
  enemy_numbers: number[];
  lucky_colors: string[];
  gemstone: string;
  mantra: string;
  deity: string;
}

export interface ChaldeanLetterValue {
  letter: string;
  value: number;
}

export interface VedicNumerologyResponse {
  name: string;
  birth_date: string;
  mulank: number;
  mulank_compound?: number;
  mulank_compound_name?: string;
  mulank_compound_meaning?: string;
  mulank_profile: NumerologyProfile;
  bhagyank: number;
  bhagyank_compound?: number;
  bhagyank_compound_name?: string;
  bhagyank_compound_meaning?: string;
  bhagyank_profile: NumerologyProfile;
  namank: number;
  namank_compound: number;
  namank_compound_name?: string;
  namank_compound_meaning?: string;
  namank_profile: NumerologyProfile;
  chaldean_breakdown: ChaldeanLetterValue[];
  synergy_score: number;
  synergy_analysis: string;
}

export interface ScripturalPrediction {
  category: string;
  title: string;
  classical_source: string;
  text: string;
  empowering_takeaway: string;
  remedial_measures: string[];
}

export interface HouseAspectDetail {
  planet: string;
  planet_sanskrit: string;
  planet_house: number;
  aspect_type: string;
  is_benefic: boolean;
  dignity: string;
  color: string;
}

export interface DetailedHouseAnalysis {
  house_number: number;
  name: string;
  sanskrit: string;
  category: string;
  life_aspect: string;
  significations: string;
  primary_karaka: string;
  sign_id: number;
  sign_name: string;
  sign_sanskrit: string;
  sign_element: string;
  sign_modality: string;
  sign_symbol: string;
  lord: string;
  lord_placement_house: number;
  lord_dignity: string;
  occupying_planets: PlanetPosition[];
  occupying_summary: string;
  aspecting_planets: HouseAspectDetail[];
  aspects_summary: string;
  sav_bindus: number;
  strength_score: number;
  stars: number;
  has_guru_drishti: boolean;
  protection_status: string;
  protection_level: string;
}

export interface RajaYogaItem {
  name: string;
  sanskrit: string;
  category: string;
  potency: number;
  participating_planets: string[];
  participating_houses: number[];
  fructification_period: string;
  scripture: string;
  description: string;
  effects: string;
  is_active: boolean;
}

export interface UniversalYogaItem {
  id: string;
  name: string;
  sanskrit: string;
  category: string;
  planets_required: string[];
  scripture: string;
  rule: string;
  effects: string;
  is_active: boolean;
}

export interface RajaYogasResponse {
  total_rajyogas: number;
  maha_yogas_count: number;
  overall_potency_score: number;
  primary_rajayoga: string;
  yogas: RajaYogaItem[];
  universal_catalog?: UniversalYogaItem[];
}

export interface TransitPlanet {
  name: string;
  sanskrit: string;
  glyph: string;
  longitude: number;
  sign_id: number;
  sign_name: string;
  sign_sanskrit: string;
  sign_lord: string;
  degrees_in_sign: number;
  formatted_dms: string;
  nakshatra_name: string;
  nakshatra_pada: number;
  nakshatra_lord: string;
  is_retrograde: boolean;
  house_from_moon: number;
  house_from_lagna: number;
  is_benefic_house: boolean;
  is_obstructed: boolean;
  obstructing_planet?: string | null;
  transit_status: string;
  status_color: string;
  prediction: string;
}

export interface GocharResponse {
  timestamp_utc: string;
  natal_moon_sign_name: string;
  natal_lagna_sign_name: string;
  auspicious_transits_count: number;
  total_transits_count: number;
  benefic_transit_percentage: number;
  overall_transit_summary: string;
  planets: TransitPlanet[];
}

export interface SadeSatiCycle {
  cycle_number: number;
  phase_type: string;
  start_year: number;
  end_year: number;
  sign_name: string;
  house_from_moon: number;
  status: string;
  description: string;
}

export interface SadeSatiResponse {
  is_sade_sati_active: boolean;
  is_dhaiya_active: boolean;
  active_phase_name: string;
  current_saturn_sign_name: string;
  current_saturn_house_from_moon: number;
  current_saturn_is_retrograde: boolean;
  natal_moon_sign_name: string;
  phase_details: {
    title: string;
    duration: string;
    description: string;
    key_impacts: string[];
  };
  timeline_cycles: SadeSatiCycle[];
  remedies: Array<{
    title: string;
    description: string;
    category: string;
  }>;
}

export interface KaalSarpResponse {
  dosha_status: string;
  is_purna: boolean;
  is_anshik: boolean;
  is_present: boolean;
  type_id: string;
  type_name: string;
  type_sanskrit: string;
  rahu_house: number;
  ketu_house: number;
  axis_description: string;
  flow_direction: string;
  enclosed_planets: string[];
  outside_planets: string[];
  is_yoga_elevated: boolean;
  yoga_elevation_status: string;
  elevation_factors: string[];
  classical_effects: string;
  specific_remedy: string;
  universal_remedies: Array<{
    title: string;
    mantra: string;
    description: string;
    category: string;
  }>;
  all_12_types_catalog: Array<{
    id: string;
    name: string;
    sanskrit: string;
    rahu_house: number;
    ketu_house: number;
    axis: string;
    classical_effects: string;
    remedy: string;
  }>;
}

export interface FullAstrologicalResponse {
  birth_data: BirthDataRequest;
  calculation_engine: string;
  ayanamsa_name: string;
  ayanamsa_deg: number;
  ayanamsa_formatted: string;
  julian_day_ut: number;
  ascendant: AscendantInfo;
  planets: PlanetPosition[];
  vargas: Record<string, VargaChart>;
  vargottama_planets: string[];
  sarvashtakavarga: SarvashtakavargaResponse;
  houses_detailed: DetailedHouseAnalysis[];
  rajyogas?: RajaYogasResponse;
  gochar?: GocharResponse;
  sade_sati?: SadeSatiResponse;
  kaal_sarp?: KaalSarpResponse;
  vimshottari_dasha: VimshottariDashaResponse;
  numerology: VedicNumerologyResponse;
  scriptural_insights: ScripturalPrediction[];
  generated_at: string;
}
