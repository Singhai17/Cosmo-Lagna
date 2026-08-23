"""
Pydantic Schemas for Vedic Astrology and Numerology Platform.
Includes rigorous validation, serialization, and OpenAPI documentation.
"""
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field, field_validator
from datetime import datetime, date, time

class BirthDataRequest(BaseModel):
    name: str = Field(default="Seeker", description="Full Name of the native")
    birth_date: str = Field(..., description="Birth Date formatted as YYYY-MM-DD (e.g. 1995-05-15)")
    birth_time: str = Field(..., description="Birth Time formatted as HH:MM or HH:MM:SS (24-hour format, e.g. 14:30:00)")
    latitude: float = Field(..., ge=-90.0, le=90.0, description="Geographic Latitude in decimal degrees (-90 to +90)")
    longitude: float = Field(..., ge=-180.0, le=180.0, description="Geographic Longitude in decimal degrees (-180 to +180)")
    timezone: float = Field(default=5.5, ge=-12.0, le=14.0, description="Timezone offset from UTC in hours (e.g. +5.5 for IST, -5.0 for EST)")
    city: Optional[str] = Field(default="Custom Location", description="City name or descriptive birthplace")
    gender: Optional[str] = Field(default="male", description="Gender of the native: male, female, or other (used for Maha Bhagya Yoga)")

    @field_validator("birth_date")
    @classmethod
    def validate_date(cls, v: str) -> str:
        try:
            datetime.strptime(v, "%Y-%m-%d")
            return v
        except ValueError:
            raise ValueError("birth_date must be in YYYY-MM-DD format")

    @field_validator("birth_time")
    @classmethod
    def validate_time(cls, v: str) -> str:
        for fmt in ("%H:%M:%S", "%H:%M"):
            try:
                datetime.strptime(v, fmt)
                return v
            except ValueError:
                pass
        raise ValueError("birth_time must be in HH:MM or HH:MM:SS 24-hour format")

class NumerologyRequest(BaseModel):
    name: str = Field(..., min_length=1, description="Full Name for Chaldean calculation")
    birth_date: str = Field(..., description="Birth Date in YYYY-MM-DD format")

class PlanetPosition(BaseModel):
    name: str
    sanskrit: str
    longitude: float = Field(..., description="Absolute Sidereal Longitude in degrees (0-360)")
    sign_id: int = Field(..., ge=1, le=12, description="Zodiac Sign index (1=Aries to 12=Pisces)")
    sign_name: str
    sign_sanskrit: str
    house: int = Field(..., ge=1, le=12, description="House placement in D1 chart (1 to 12)")
    degrees_in_sign: float = Field(..., description="Degrees within current zodiac sign (0-30)")
    formatted_dms: str = Field(..., description="Degrees, Minutes, Seconds formatted (e.g. 14° 22' 10'')")
    is_retrograde: bool = Field(default=False, description="True if Graha is in Vakri (retrograde) motion")
    is_combust: bool = Field(default=False, description="True if Graha is combust (Asta) by solar proximity")
    speed: float = Field(default=0.0, description="Daily angular speed in degrees/day")
    nakshatra_id: int = Field(..., ge=1, le=27, description="Nakshatra index (1=Ashwini to 27=Revati)")
    nakshatra_name: str
    nakshatra_pada: int = Field(..., ge=1, le=4, description="Quarter/Pada (1 to 4)")
    nakshatra_lord: str
    nakshatra_deity: str
    dignity: str = Field(..., description="Classical Dignity: Exalted, Moolatrikona, Own Sign, Great Friend, Friend, Neutral, Enemy, Great Enemy, Debilitated")
    is_vargottama: bool = Field(default=False, description="True if occupying identical sign in D1 (Rashi) and D9 (Navamsha)")
    color: str
    gemstone: str
    chakra: Optional[str] = None
    exaltation_sign_name: Optional[str] = None
    exaltation_deg: Optional[float] = None
    debilitation_sign_name: Optional[str] = None
    debilitation_deg: Optional[float] = None
    moolatrikona_sign_name: Optional[str] = None
    moolatrikona_range: Optional[List[float]] = None
    own_signs_names: Optional[List[str]] = None
    karaka: Optional[str] = None
    nature: Optional[str] = None
    metal: Optional[str] = None
    mantra: Optional[str] = None
    deity: Optional[str] = None
    bphs_phala: Optional[str] = None

class AscendantInfo(BaseModel):
    longitude: float
    sign_id: int
    sign_name: str
    sign_sanskrit: str
    degrees_in_sign: float
    formatted_dms: str
    nakshatra_id: int
    nakshatra_name: str
    nakshatra_pada: int
    nakshatra_lord: str

class HousePlacement(BaseModel):
    house_number: int = Field(..., ge=1, le=12)
    sign_id: int = Field(..., ge=1, le=12)
    sign_name: str
    sign_sanskrit: str
    lord: str
    planets: List[str] = Field(default_factory=list)
    sav_bindus: Optional[int] = Field(default=0, description="Sarvashtakavarga benefic points for this house")

class VargaChart(BaseModel):
    varga_code: str = Field(..., description="D1, D9, or D10")
    title: str
    sanskrit_name: str
    description: str
    houses: List[HousePlacement]
    planet_positions: Dict[str, Dict[str, Any]]

class DashaPratyantar(BaseModel):
    planet: str
    start_date: str
    end_date: str
    duration_days: float
    is_active: bool = False

class DashaAntar(BaseModel):
    planet: str
    start_date: str
    end_date: str
    duration_months: float
    is_active: bool = False
    pratyantardashas: List[DashaPratyantar] = Field(default_factory=list)

class DashaMaha(BaseModel):
    planet: str
    start_date: str
    end_date: str
    duration_years: float
    is_active: bool = False
    antardashas: List[DashaAntar] = Field(default_factory=list)

class VimshottariDashaResponse(BaseModel):
    starting_balance: Dict[str, Any]
    active_mahadasha: str
    active_antardasha: str
    active_pratyantardasha: str
    active_period_string: str
    mahadashas: List[DashaMaha]

class SarvashtakavargaResponse(BaseModel):
    total_bindus: int = 337
    house_scores: Dict[int, int] = Field(..., description="House 1-12 Sarvashtakavarga score")
    planet_bav: Dict[str, List[int]] = Field(..., description="Bhinna Ashtakavarga points for 7 Grahas and Lagna across 12 signs")
    strongest_houses: List[int]
    karmic_focus_houses: List[int]

class NumerologyProfile(BaseModel):
    number: int
    planet: str
    nature: str
    element: str
    friendly_numbers: List[int]
    neutral_numbers: List[int]
    enemy_numbers: List[int]
    lucky_colors: List[str]
    gemstone: str
    mantra: str
    deity: str

class ChaldeanLetterValue(BaseModel):
    letter: str
    value: int

class VedicNumerologyResponse(BaseModel):
    name: str
    birth_date: str
    mulank: int = Field(..., ge=1, le=9, description="Driver / Radical Number (Birth Day reduced 1-9)")
    mulank_compound: int = Field(default=0, description="Birth Day compound number (1-31)")
    mulank_compound_name: str = Field(default="", description="Canonical Chaldean name for Mulank compound")
    mulank_compound_meaning: str = Field(default="", description="Occult signification for Mulank compound")
    mulank_profile: NumerologyProfile
    bhagyank: int = Field(..., ge=1, le=9, description="Destiny / Life Path Number (Full Date reduced 1-9)")
    bhagyank_compound: int = Field(default=0, description="Full date sum before reduction")
    bhagyank_compound_name: str = Field(default="", description="Canonical Chaldean name for Bhagyank compound")
    bhagyank_compound_meaning: str = Field(default="", description="Occult signification for Bhagyank compound")
    bhagyank_profile: NumerologyProfile
    namank: int = Field(..., ge=1, le=9, description="Name Number (Chaldean matrix reduced 1-9)")
    namank_compound: int = Field(..., description="Chaldean compound sum before reduction")
    namank_compound_name: str = Field(default="", description="Canonical Chaldean name for Namank compound (e.g., Star of the Magi)")
    namank_compound_meaning: str = Field(default="", description="Occult signification for Namank compound")
    namank_profile: NumerologyProfile
    chaldean_breakdown: List[ChaldeanLetterValue]
    synergy_score: int = Field(..., ge=0, le=100, description="Synergy percentage between Driver, Destiny, and Name numbers")
    synergy_analysis: str

class ScripturalPrediction(BaseModel):
    category: str = Field(..., description="Dharma, Artha, Kama, Moksha, Dasha, Health, Remedies")
    title: str
    classical_source: str = Field(..., description="BPHS, Phaladeepika, Saravali, or Sankhya Shastra")
    text: str
    empowering_takeaway: str
    remedial_measures: List[str] = Field(default_factory=list)

class HouseAspectDetail(BaseModel):
    planet: str
    planet_sanskrit: str
    planet_house: int
    aspect_type: str
    is_benefic: bool
    dignity: str
    color: str

class DetailedHouseAnalysis(BaseModel):
    house_number: int
    name: str
    sanskrit: str
    category: str
    life_aspect: str
    significations: str
    primary_karaka: str
    sign_id: int
    sign_name: str
    sign_sanskrit: str
    sign_element: str
    sign_modality: str
    sign_symbol: str
    lord: str
    lord_placement_house: int
    lord_dignity: str
    occupying_planets: List[Dict[str, Any]] = Field(default_factory=list)
    occupying_summary: str
    aspecting_planets: List[HouseAspectDetail] = Field(default_factory=list)
    aspects_summary: str
    sav_bindus: int
    strength_score: float
    stars: int
    has_guru_drishti: bool
    protection_status: str
    protection_level: str

class RajaYogaItem(BaseModel):
    name: str
    sanskrit: str
    category: str = Field(..., description="Pancha Mahapurusha, Dharma-Karmadhipati, Maha Raja Yoga, Viparita, etc.")
    potency: int = Field(..., ge=0, le=100, description="Potency percentage (0-100%)")
    participating_planets: List[str] = Field(default_factory=list)
    participating_houses: List[int] = Field(default_factory=list)
    fructification_period: str
    scripture: str
    description: str
    effects: str
    is_active: bool = True

class UniversalYogaItem(BaseModel):
    id: str
    name: str
    sanskrit: str
    category: str
    planets_required: List[str] = Field(default_factory=list)
    scripture: str
    rule: str
    effects: str
    is_active: bool = False

class RajaYogasResponse(BaseModel):
    total_rajyogas: int
    maha_yogas_count: int
    overall_potency_score: float
    primary_rajayoga: str
    yogas: List[RajaYogaItem] = Field(default_factory=list)
    universal_catalog: List[UniversalYogaItem] = Field(default_factory=list)

class TransitPlanet(BaseModel):
    name: str
    sanskrit: str
    glyph: str
    longitude: float
    sign_id: int
    sign_name: str
    sign_sanskrit: str
    sign_lord: str
    degrees_in_sign: float
    formatted_dms: str
    nakshatra_name: str
    nakshatra_pada: int
    nakshatra_lord: str
    is_retrograde: bool
    house_from_moon: int
    house_from_lagna: int
    is_benefic_house: bool
    is_obstructed: bool
    obstructing_planet: Optional[str] = None
    transit_status: str
    status_color: str
    prediction: str

class GocharResponse(BaseModel):
    timestamp_utc: str
    natal_moon_sign_name: str
    natal_lagna_sign_name: str
    auspicious_transits_count: int
    total_transits_count: int
    benefic_transit_percentage: float
    overall_transit_summary: str
    planets: List[TransitPlanet] = Field(default_factory=list)

class SadeSatiCycle(BaseModel):
    cycle_number: int
    phase_type: str
    start_year: int
    end_year: int
    sign_name: str
    house_from_moon: int
    status: str
    description: str

class SadeSatiResponse(BaseModel):
    is_sade_sati_active: bool
    is_dhaiya_active: bool
    active_phase_name: str
    current_saturn_sign_name: str
    current_saturn_house_from_moon: int
    current_saturn_is_retrograde: bool
    natal_moon_sign_name: str
    phase_details: Dict[str, Any] = Field(default_factory=dict)
    timeline_cycles: List[SadeSatiCycle] = Field(default_factory=list)
    remedies: List[Dict[str, Any]] = Field(default_factory=list)

class KaalSarpResponse(BaseModel):
    dosha_status: str
    is_purna: bool
    is_anshik: bool
    is_present: bool
    type_id: str
    type_name: str
    type_sanskrit: str
    rahu_house: int
    ketu_house: int
    axis_description: str
    flow_direction: str
    enclosed_planets: List[str] = Field(default_factory=list)
    outside_planets: List[str] = Field(default_factory=list)
    is_yoga_elevated: bool
    yoga_elevation_status: str
    elevation_factors: List[str] = Field(default_factory=list)
    classical_effects: str
    specific_remedy: str
    universal_remedies: List[Dict[str, Any]] = Field(default_factory=list)
    all_12_types_catalog: List[Dict[str, Any]] = Field(default_factory=list)

class FullAstrologicalResponse(BaseModel):
    birth_data: BirthDataRequest
    calculation_engine: str = "Deterministic Sidereal Ephemeris (Lahiri / Chitra Paksha)"
    ayanamsa_name: str = "Lahiri (Chitra Paksha)"
    ayanamsa_deg: float
    ayanamsa_formatted: str
    julian_day_ut: float
    ascendant: AscendantInfo
    planets: List[PlanetPosition]
    vargas: Dict[str, VargaChart]
    vargottama_planets: List[str]
    sarvashtakavarga: SarvashtakavargaResponse
    houses_detailed: List[DetailedHouseAnalysis] = Field(default_factory=list)
    rajyogas: Optional[RajaYogasResponse] = None
    gochar: Optional[GocharResponse] = None
    sade_sati: Optional[SadeSatiResponse] = None
    kaal_sarp: Optional[KaalSarpResponse] = None
    vimshottari_dasha: VimshottariDashaResponse
    numerology: VedicNumerologyResponse
    scriptural_insights: List[ScripturalPrediction]
    generated_at: str
