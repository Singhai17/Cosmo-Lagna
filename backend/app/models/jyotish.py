"""
Classical Vedic Astrology (Jyotish) Constants and Data Structures.
Based on Brihat Parashara Hora Shastra (BPHS), Phaladeepika, and Saravali.
"""
from typing import Dict, List, Tuple
from enum import Enum

class ZodiacSign(str, Enum):
    ARIES = "Aries"
    TAURUS = "Taurus"
    GEMINI = "Gemini"
    CANCER = "Cancer"
    LEO = "Leo"
    VIRGO = "Virgo"
    LIBRA = "Libra"
    SCORPIO = "Scorpio"
    SAGITTARIUS = "Sagittarius"
    CAPRICORN = "Capricorn"
    AQUARIUS = "Aquarius"
    PISCES = "Pisces"

ZODIAC_SIGNS: List[Dict[str, any]] = [
    {"id": 1, "name": "Aries", "sanskrit": "Mesha", "lord": "Mars", "element": "Fire", "modality": "Movable", "symbol": "Ram"},
    {"id": 2, "name": "Taurus", "sanskrit": "Vrishabha", "lord": "Venus", "element": "Earth", "modality": "Fixed", "symbol": "Bull"},
    {"id": 3, "name": "Gemini", "sanskrit": "Mithuna", "lord": "Mercury", "element": "Air", "modality": "Dual", "symbol": "Twins"},
    {"id": 4, "name": "Cancer", "sanskrit": "Karka", "lord": "Moon", "element": "Water", "modality": "Movable", "symbol": "Crab"},
    {"id": 5, "name": "Leo", "sanskrit": "Simha", "lord": "Sun", "element": "Fire", "modality": "Fixed", "symbol": "Lion"},
    {"id": 6, "name": "Virgo", "sanskrit": "Kanya", "lord": "Mercury", "element": "Earth", "modality": "Dual", "symbol": "Virgin"},
    {"id": 7, "name": "Libra", "sanskrit": "Tula", "lord": "Venus", "element": "Air", "modality": "Movable", "symbol": "Scales"},
    {"id": 8, "name": "Scorpio", "sanskrit": "Vrischika", "lord": "Mars", "element": "Water", "modality": "Fixed", "symbol": "Scorpion"},
    {"id": 9, "name": "Sagittarius", "sanskrit": "Dhanu", "lord": "Jupiter", "element": "Fire", "modality": "Dual", "symbol": "Archer"},
    {"id": 10, "name": "Capricorn", "sanskrit": "Makara", "lord": "Saturn", "element": "Earth", "modality": "Movable", "symbol": "Sea-Monster"},
    {"id": 11, "name": "Aquarius", "sanskrit": "Kumbha", "lord": "Saturn", "element": "Air", "modality": "Fixed", "symbol": "Water-Bearer"},
    {"id": 12, "name": "Pisces", "sanskrit": "Meena", "lord": "Jupiter", "element": "Water", "modality": "Dual", "symbol": "Two Fish"},
]

# 27 Classical Nakshatras with Vimshottari Lords, Deities, and Symbols
NAKSHATRAS: List[Dict[str, any]] = [
    {"id": 1, "name": "Ashwini", "lord": "Ketu", "deity": "Ashvini Kumaras", "symbol": "Horse's Head", "start_deg": 0.0, "end_deg": 13.333333},
    {"id": 2, "name": "Bharani", "lord": "Venus", "deity": "Yama", "symbol": "Yoni (Vessel)", "start_deg": 13.333333, "end_deg": 26.666667},
    {"id": 3, "name": "Krittika", "lord": "Sun", "deity": "Agni", "symbol": "Razor / Flame", "start_deg": 26.666667, "end_deg": 40.0},
    {"id": 4, "name": "Rohini", "lord": "Moon", "deity": "Brahma / Prajapati", "symbol": "Chariot / Cart", "start_deg": 40.0, "end_deg": 53.333333},
    {"id": 5, "name": "Mrigashira", "lord": "Mars", "deity": "Soma (Moon God)", "symbol": "Deer's Head", "start_deg": 53.333333, "end_deg": 66.666667},
    {"id": 6, "name": "Ardra", "lord": "Rahu", "deity": "Rudra", "symbol": "Teardrop / Diamond", "start_deg": 66.666667, "end_deg": 80.0},
    {"id": 7, "name": "Punarvasu", "lord": "Jupiter", "deity": "Aditi", "symbol": "Bow & Quiver", "start_deg": 80.0, "end_deg": 93.333333},
    {"id": 8, "name": "Pushya", "lord": "Saturn", "deity": "Brihaspati", "symbol": "Cow's Udder / Lotus", "start_deg": 93.333333, "end_deg": 106.666667},
    {"id": 9, "name": "Ashlesha", "lord": "Mercury", "deity": "Nagas (Serpent Gods)", "symbol": "Coiled Serpent", "start_deg": 106.666667, "end_deg": 120.0},
    {"id": 10, "name": "Magha", "lord": "Ketu", "deity": "Pitris (Ancestors)", "symbol": "Royal Throne", "start_deg": 120.0, "end_deg": 133.333333},
    {"id": 11, "name": "Purva Phalguni", "lord": "Venus", "deity": "Bhaga (Prosperity)", "symbol": "Front Legs of Bed", "start_deg": 133.333333, "end_deg": 146.666667},
    {"id": 12, "name": "Uttara Phalguni", "lord": "Sun", "deity": "Aryaman (Friendship)", "symbol": "Back Legs of Bed", "start_deg": 146.666667, "end_deg": 160.0},
    {"id": 13, "name": "Hasta", "lord": "Moon", "deity": "Savitr (Sun God)", "symbol": "Open Hand / Fist", "start_deg": 160.0, "end_deg": 173.333333},
    {"id": 14, "name": "Chitra", "lord": "Mars", "deity": "Tvashtar (Divine Architect)", "symbol": "Bright Jewel / Pearl", "start_deg": 173.333333, "end_deg": 186.666667},
    {"id": 15, "name": "Swati", "lord": "Rahu", "deity": "Vayu (Wind God)", "symbol": "Young Shoot / Coral", "start_deg": 186.666667, "end_deg": 200.0},
    {"id": 16, "name": "Vishakha", "lord": "Jupiter", "deity": "Indragni (Indra & Agni)", "symbol": "Triumphal Arch", "start_deg": 200.0, "end_deg": 213.333333},
    {"id": 17, "name": "Anuradha", "lord": "Saturn", "deity": "Mitra (Devotion)", "symbol": "Lotus / Triumphal Staff", "start_deg": 213.333333, "end_deg": 226.666667},
    {"id": 18, "name": "Jyeshtha", "lord": "Mercury", "deity": "Indra (King of Gods)", "symbol": "Circular Amulet / Umbrella", "start_deg": 226.666667, "end_deg": 240.0},
    {"id": 19, "name": "Mula", "lord": "Ketu", "deity": "Nirriti (Dissolution)", "symbol": "Tied Bundle of Roots", "start_deg": 240.0, "end_deg": 253.333333},
    {"id": 20, "name": "Purva Ashadha", "lord": "Venus", "deity": "Apas (Water Goddess)", "symbol": "Elephant's Tusk", "start_deg": 253.333333, "end_deg": 266.666667},
    {"id": 21, "name": "Uttara Ashadha", "lord": "Sun", "deity": "Vishvadevas (Universal Gods)", "symbol": "Small Bed / Elephant Tusk", "start_deg": 266.666667, "end_deg": 280.0},
    {"id": 22, "name": "Shravana", "lord": "Moon", "deity": "Vishnu (Preserver)", "symbol": "Three Footprints / Ear", "start_deg": 280.0, "end_deg": 293.333333},
    {"id": 23, "name": "Dhanishta", "lord": "Mars", "deity": "Eight Vasus", "symbol": "Mridangam Drum / Flute", "start_deg": 293.333333, "end_deg": 306.666667},
    {"id": 24, "name": "Shatabhisha", "lord": "Rahu", "deity": "Varuna (Cosmic Ocean)", "symbol": "Empty Circle / 100 Healers", "start_deg": 306.666667, "end_deg": 320.0},
    {"id": 25, "name": "Purva Bhadrapada", "lord": "Jupiter", "deity": "Aja Ekapada", "symbol": "Front of Funeral Bed / Swords", "start_deg": 320.0, "end_deg": 333.333333},
    {"id": 26, "name": "Uttara Bhadrapada", "lord": "Saturn", "deity": "Ahirbudhnya", "symbol": "Back of Funeral Bed / Twins", "start_deg": 333.333333, "end_deg": 346.666667},
    {"id": 27, "name": "Revati", "lord": "Mercury", "deity": "Pushan (Nourisher)", "symbol": "Fish / Pair of Fish", "start_deg": 346.666667, "end_deg": 360.0},
]

# Vimshottari Dasha planetary sequence and durations (Years) - Total 120 years
VIMSHOTTARI_DASHA_ORDER: List[Tuple[str, float]] = [
    ("Ketu", 7.0),
    ("Venus", 20.0),
    ("Sun", 6.0),
    ("Moon", 10.0),
    ("Mars", 7.0),
    ("Rahu", 18.0),
    ("Jupiter", 16.0),
    ("Saturn", 19.0),
    ("Mercury", 17.0),
]

# Deep Exaltation & Debilitation Degrees & Comprehensive Parashari Metadata
PLANETARY_DIGNITIES = {
    "Sun": {
        "sanskrit": "Surya",
        "exaltation_sign": 1, "exaltation_sign_name": "Aries (Mesha)", "exaltation_deg": 10.0,
        "debilitation_sign": 7, "debilitation_sign_name": "Libra (Tula)", "debilitation_deg": 10.0,
        "own_signs": [5], "own_signs_names": ["Leo (Simha)"],
        "moolatrikona_sign": 5, "moolatrikona_sign_name": "Leo (Simha)", "moolatrikona_range": (0.0, 20.0),
        "friends": ["Moon", "Mars", "Jupiter"],
        "neutrals": ["Mercury"],
        "enemies": ["Venus", "Saturn", "Rahu", "Ketu"],
        "karaka": "Atmakaraka (Soul), Father, King, Vitality, Leadership, Dignity",
        "nature": "Kshatriya (Sovereign / Fiery Benefic / Malefic when afflicted)",
        "metal": "Gold / Copper",
        "color": "#F59E0B",
        "gemstone": "Ruby (Manikya)",
        "chakra": "Manipura (Solar Plexus)",
        "mantra": "Om Hram Hreem Hroum Sah Suryaya Namaha",
        "deity": "Lord Surya / Lord Shiva",
        "bphs_phala": "Sun governs the soul, self-confidence, royal favors, bone structure, and eyes. Exalted in Aries (10°), it grants commanding sovereignty, unwavering truth, and vibrant health."
    },
    "Moon": {
        "sanskrit": "Chandra",
        "exaltation_sign": 2, "exaltation_sign_name": "Taurus (Vrishabha)", "exaltation_deg": 3.0,
        "debilitation_sign": 8, "debilitation_sign_name": "Scorpio (Vrischika)", "debilitation_deg": 3.0,
        "own_signs": [4], "own_signs_names": ["Cancer (Karka)"],
        "moolatrikona_sign": 2, "moolatrikona_sign_name": "Taurus (Vrishabha)", "moolatrikona_range": (3.0, 30.0),
        "friends": ["Sun", "Mercury"],
        "neutrals": ["Mars", "Jupiter", "Venus", "Saturn"],
        "enemies": ["Rahu", "Ketu"],
        "karaka": "Manas (Mind), Mother, Emotions, Memory, Liquid Elements, Public Appeal",
        "nature": "Vaishya (Watery Benefic)",
        "metal": "Silver / White Gold",
        "color": "#E2E8F0",
        "gemstone": "Natural Pearl (Mukta) / Moonstone",
        "chakra": "Ajna / Swadhisthana",
        "mantra": "Om Shram Shreem Shroum Sah Chandraya Namaha",
        "deity": "Goddess Parvati / Lord Shiva",
        "bphs_phala": "Moon rules mind (Manas), peace, nurturing, fluids, and subconscious memory. Exalted in Taurus (3°), it produces extraordinary emotional stability, prosperity, aesthetic sensitivity, and popular charm."
    },
    "Mars": {
        "sanskrit": "Mangala",
        "exaltation_sign": 10, "exaltation_sign_name": "Capricorn (Makara)", "exaltation_deg": 28.0,
        "debilitation_sign": 4, "debilitation_sign_name": "Cancer (Karka)", "debilitation_deg": 28.0,
        "own_signs": [1, 8], "own_signs_names": ["Aries (Mesha)", "Scorpio (Vrischika)"],
        "moolatrikona_sign": 1, "moolatrikona_sign_name": "Aries (Mesha)", "moolatrikona_range": (0.0, 12.0),
        "friends": ["Sun", "Moon", "Jupiter"],
        "neutrals": ["Venus", "Saturn"],
        "enemies": ["Mercury", "Rahu", "Ketu"],
        "karaka": "Bhratri (Siblings), Energy, Courage, Land, Engineering, Martial Force, Surgery",
        "nature": "Kshatriya (Fiery Warrior)",
        "metal": "Copper / Brass",
        "color": "#EF4444",
        "gemstone": "Red Coral (Moonga)",
        "chakra": "Muladhara (Root)",
        "mantra": "Om Kram Kreem Kroum Sah Bhaumaya Namaha",
        "deity": "Lord Kartikeya / Lord Hanuman",
        "bphs_phala": "Mars bestows valor, strategic initiative, real estate wealth, and technical acumen. Exalted in Capricorn (28°), it produces invincible executive drive, disciplined fortitude, and triumph over obstacles."
    },
    "Mercury": {
        "sanskrit": "Budha",
        "exaltation_sign": 6, "exaltation_sign_name": "Virgo (Kanya)", "exaltation_deg": 15.0,
        "debilitation_sign": 12, "debilitation_sign_name": "Pisces (Meena)", "debilitation_deg": 15.0,
        "own_signs": [3, 6], "own_signs_names": ["Gemini (Mithuna)", "Virgo (Kanya)"],
        "moolatrikona_sign": 6, "moolatrikona_sign_name": "Virgo (Kanya)", "moolatrikona_range": (15.0, 20.0),
        "friends": ["Sun", "Venus"],
        "neutrals": ["Mars", "Jupiter", "Saturn"],
        "enemies": ["Moon", "Rahu", "Ketu"],
        "karaka": "Buddhi (Intellect), Speech, Commerce, Mathematics, Astrology, Communication",
        "nature": "Vaishya (Earthy & Airy Adaptable Benefic)",
        "metal": "Bronze / Quicksilver",
        "color": "#10B981",
        "gemstone": "Emerald (Panna)",
        "chakra": "Vishuddha (Throat)",
        "mantra": "Om Bram Breem Broum Sah Budhaya Namaha",
        "deity": "Lord Vishnu / Budha Deva",
        "bphs_phala": "Mercury commands intellect, dialectics, commerce, humor, and analytical depth. Exalted in Virgo (15°), it yields genius-level calculation, literary brilliance, and commercial mastery."
    },
    "Jupiter": {
        "sanskrit": "Guru / Brihaspati",
        "exaltation_sign": 4, "exaltation_sign_name": "Cancer (Karka)", "exaltation_deg": 5.0,
        "debilitation_sign": 10, "debilitation_sign_name": "Capricorn (Makara)", "debilitation_deg": 5.0,
        "own_signs": [9, 12], "own_signs_names": ["Sagittarius (Dhanu)", "Pisces (Meena)"],
        "moolatrikona_sign": 9, "moolatrikona_sign_name": "Sagittarius (Dhanu)", "moolatrikona_range": (0.0, 10.0),
        "friends": ["Sun", "Moon", "Mars"],
        "neutrals": ["Saturn"],
        "enemies": ["Mercury", "Venus", "Rahu", "Ketu"],
        "karaka": "Jnana (Wisdom), Dharma, Children, Wealth (Dhana), Counsel, Guru, Spirituality",
        "nature": "Brahmin (Supreme Benefic / Ether)",
        "metal": "Pure Gold",
        "color": "#FBBF24",
        "gemstone": "Yellow Sapphire (Pukhraj) / Yellow Topaz",
        "chakra": "Ajna / Sahasrara",
        "mantra": "Om Gram Greem Groum Sah Gurave Namaha",
        "deity": "Lord Brihaspati / Lord Shiva / Dakshinamurthy",
        "bphs_phala": "Jupiter is the Great Benefic, dispenser of divine grace, righteousness, children, and spiritual wisdom. Exalted in Cancer (5°), it confers divine protection (Hamsa Yoga), ethical preeminence, and boundless fortune."
    },
    "Venus": {
        "sanskrit": "Shukra",
        "exaltation_sign": 12, "exaltation_sign_name": "Pisces (Meena)", "exaltation_deg": 27.0,
        "debilitation_sign": 6, "debilitation_sign_name": "Virgo (Kanya)", "debilitation_deg": 27.0,
        "own_signs": [2, 7], "own_signs_names": ["Taurus (Vrishabha)", "Libra (Tula)"],
        "moolatrikona_sign": 7, "moolatrikona_sign_name": "Libra (Tula)", "moolatrikona_range": (0.0, 15.0),
        "friends": ["Mercury", "Saturn", "Rahu", "Ketu"],
        "neutrals": ["Mars", "Jupiter"],
        "enemies": ["Sun", "Moon"],
        "karaka": "Kalatra (Spouse), Love, Art, Vehicles (Vahana), Luxury, Devotion (Bhakti), Ojas",
        "nature": "Brahmin (Watery Benefic / Master of Sanjivani Vidya)",
        "metal": "Silver / Platinum",
        "color": "#EC4899",
        "gemstone": "Diamond (Heera) / White Zircon",
        "chakra": "Anahata (Heart)",
        "mantra": "Om Dram Dreem Droum Sah Shukraya Namaha",
        "deity": "Goddess Lakshmi / Maharishi Shukracharya",
        "bphs_phala": "Venus rules unconditional love, esoteric refinement, aesthetics, vehicles, and devotion. Exalted in Pisces (27°), it bestows transcendent devotion (Malavya Yoga), magnetic charm, opulence, and marital bliss."
    },
    "Saturn": {
        "sanskrit": "Shani",
        "exaltation_sign": 7, "exaltation_sign_name": "Libra (Tula)", "exaltation_deg": 20.0,
        "debilitation_sign": 1, "debilitation_sign_name": "Aries (Mesha)", "debilitation_deg": 20.0,
        "own_signs": [10, 11], "own_signs_names": ["Capricorn (Makara)", "Aquarius (Kumbha)"],
        "moolatrikona_sign": 11, "moolatrikona_sign_name": "Aquarius (Kumbha)", "moolatrikona_range": (0.0, 20.0),
        "friends": ["Mercury", "Venus", "Rahu", "Ketu"],
        "neutrals": ["Jupiter"],
        "enemies": ["Sun", "Moon", "Mars"],
        "karaka": "Ayus (Longevity), Karma, Discipline, Humility, Renunciation, Labor, Realization",
        "nature": "Shudra / Yogic Hermit (Airy Karmic Dispenser)",
        "metal": "Iron / Lead",
        "color": "#6366F1",
        "gemstone": "Blue Sapphire (Neelam) / Amethyst",
        "chakra": "Muladhara / Ajna",
        "mantra": "Om Pram Preem Proum Sah Shanaishcharaya Namaha",
        "deity": "Lord Shani / Lord Hanuman / Lord Shiva",
        "bphs_phala": "Saturn is the Karmic Arbiter, testing through discipline, patience, and humility. Exalted in Libra (20°), it creates Shasha Mahapurusha Yoga—granting enduring legacy, judicial integrity, mass leadership, and spiritual liberation."
    },
    "Rahu": {
        "sanskrit": "Rahu (North Node / Dragon's Head)",
        "exaltation_sign": 2, "exaltation_sign_name": "Taurus (Vrishabha) / Gemini", "exaltation_deg": 20.0,
        "debilitation_sign": 8, "debilitation_sign_name": "Scorpio (Vrischika) / Sagittarius", "debilitation_deg": 20.0,
        "own_signs": [11], "own_signs_names": ["Aquarius (Kumbha) - Co-Lord"],
        "moolatrikona_sign": 3, "moolatrikona_sign_name": "Gemini (Mithuna)", "moolatrikona_range": (0.0, 30.0),
        "friends": ["Venus", "Saturn", "Mercury"],
        "neutrals": ["Jupiter"],
        "enemies": ["Sun", "Moon", "Mars"],
        "karaka": "Worldly Desires, Foreign Travel, Innovation, AI & Technology, Illusion (Maya), Breakthroughs",
        "nature": "Chandal / Outcaste Shadow (Smoky & Electric Air)",
        "metal": "Mixed Alloys (Ashtadhatu)",
        "color": "#8B5CF6",
        "gemstone": "Hessonite Garnet (Gomed)",
        "chakra": "Sahasrara (Crown Shadow)",
        "mantra": "Om Bhram Bhreem Bhroum Sah Rahave Namaha",
        "deity": "Goddess Durga / Goddess Saraswati",
        "bphs_phala": "Rahu intensifies worldly hunger, unconventional strategy, tech frontiers, and foreign mastery. Well-placed in Taurus or Gemini, it grants sudden windfalls, extraordinary fame, and unprecedented innovative breakthroughs."
    },
    "Ketu": {
        "sanskrit": "Ketu (South Node / Dragon's Tail)",
        "exaltation_sign": 8, "exaltation_sign_name": "Scorpio (Vrischika) / Sagittarius", "exaltation_deg": 20.0,
        "debilitation_sign": 2, "debilitation_sign_name": "Taurus (Vrishabha) / Gemini", "debilitation_deg": 20.0,
        "own_signs": [8], "own_signs_names": ["Scorpio (Vrischika) - Co-Lord"],
        "moolatrikona_sign": 9, "moolatrikona_sign_name": "Sagittarius (Dhanu)", "moolatrikona_range": (0.0, 30.0),
        "friends": ["Mars", "Venus", "Saturn"],
        "neutrals": ["Mercury", "Jupiter"],
        "enemies": ["Sun", "Moon"],
        "karaka": "Moksha (Liberation), Detachment, Occult Sciences, Intuitive Wisdom, Kundalini",
        "nature": "Moksha Karaka / Fiery Ascetic",
        "metal": "Sea Iron / Turquoise",
        "color": "#D946EF",
        "gemstone": "Cat's Eye Chrysoberyl (Lehsunia)",
        "chakra": "Muladhara (Root Liberation)",
        "mantra": "Om Stram Streem Stroum Sah Ketave Namaha",
        "deity": "Lord Ganesha / Lord Matsya",
        "bphs_phala": "Ketu is the supreme Moksha Karaka (significator of enlightenment), cutting through worldly illusion. Well-placed in Scorpio or Sagittarius, it unlocks profound psychic perception, mastery over subtle energies, and spiritual awakening."
    }
}

# Chaldean Numerology letter values (1 to 8; 9 is sacred and excluded from alphabet mapping)
CHALDEAN_MAP: Dict[str, int] = {
    'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
    'B': 2, 'K': 2, 'R': 2,
    'C': 3, 'G': 3, 'L': 3, 'S': 3,
    'D': 4, 'M': 4, 'T': 4,
    'E': 5, 'H': 5, 'N': 5, 'X': 5,
    'U': 6, 'V': 6, 'W': 6,
    'O': 7, 'Z': 7,
    'F': 8, 'P': 8
}

NUMEROLOGY_PROFILES: Dict[int, Dict[str, any]] = {
    1: {
        "planet": "Sun (Surya)",
        "nature": "Leadership, Sovereign Willpower, Executive Independence, Solar Vitality",
        "element": "Fire",
        "friendly_numbers": [1, 2, 3, 9],
        "neutral_numbers": [4, 7],
        "enemy_numbers": [6, 8],
        "lucky_colors": ["Gold", "Orange", "Yellow", "Copper"],
        "gemstone": "Ruby (Manikya)",
        "mantra": "Om Suryaya Namaha",
        "deity": "Lord Surya / Shiva"
    },
    2: {
        "planet": "Moon (Chandra)",
        "nature": "Intuition, Harmony, Empathy, Creative Receptivity, Emotional Grace",
        "element": "Water",
        "friendly_numbers": [1, 2, 3, 5],
        "neutral_numbers": [6, 7],
        "enemy_numbers": [4, 8, 9],
        "lucky_colors": ["Pearl White", "Silver", "Cream", "Sea Green"],
        "gemstone": "Pearl / Moonstone",
        "mantra": "Om Chandraya Namaha",
        "deity": "Goddess Parvati / Chandra"
    },
    3: {
        "planet": "Jupiter (Guru)",
        "nature": "Wisdom, Spiritual Expansion, Higher Learning, Mentorship, Optimism",
        "element": "Ether / Fire",
        "friendly_numbers": [1, 2, 3, 9],
        "neutral_numbers": [5, 7],
        "enemy_numbers": [6],
        "lucky_colors": ["Yellow", "Saffron", "Golden Amber"],
        "gemstone": "Yellow Sapphire (Pukhraj)",
        "mantra": "Om Brihaspataye Namaha",
        "deity": "Lord Brihaspati / Vishnu"
    },
    4: {
        "planet": "Rahu (North Node)",
        "nature": "Innovation, Breakthroughs, Unconventional Vision, High Strategy",
        "element": "Air / Shadow",
        "friendly_numbers": [1, 4, 5, 6, 7],
        "neutral_numbers": [3],
        "enemy_numbers": [2, 8, 9],
        "lucky_colors": ["Electric Blue", "Grey", "Smoky Violet"],
        "gemstone": "Hessonite Garnet (Gomed)",
        "mantra": "Om Rahave Namaha",
        "deity": "Goddess Durga / Saraswati"
    },
    5: {
        "planet": "Mercury (Budha)",
        "nature": "Intellect, Communication, Commerce, Agility, Analytical Mastery",
        "element": "Earth / Air",
        "friendly_numbers": [1, 5, 6],
        "neutral_numbers": [3, 4, 7, 8, 9],
        "enemy_numbers": [2],
        "lucky_colors": ["Emerald Green", "Turquoise", "Mint"],
        "gemstone": "Emerald (Panna)",
        "mantra": "Om Budhaya Namaha",
        "deity": "Lord Vishnu / Budha"
    },
    6: {
        "planet": "Venus (Shukra)",
        "nature": "Aesthetics, Grace, Luxury, Diplomacy, Artistry, Devotion",
        "element": "Water / Earth",
        "friendly_numbers": [4, 5, 6, 7, 8],
        "neutral_numbers": [2, 3],
        "enemy_numbers": [1, 9],
        "lucky_colors": ["White", "Pastel Pink", "Sky Blue"],
        "gemstone": "Diamond / White Sapphire",
        "mantra": "Om Shukraya Namaha",
        "deity": "Goddess Lakshmi / Shukracharya"
    },
    7: {
        "planet": "Ketu (South Node)",
        "nature": "Mysticism, Deep Analysis, Spiritual Liberation, Intuitive Research",
        "element": "Fire / Ether",
        "friendly_numbers": [1, 4, 5, 6, 7],
        "neutral_numbers": [2, 3],
        "enemy_numbers": [8, 9],
        "lucky_colors": ["Smoky Grey", "Lavender", "White"],
        "gemstone": "Cat's Eye (Lehsunia)",
        "mantra": "Om Ketave Namaha",
        "deity": "Lord Ganesha"
    },
    8: {
        "planet": "Saturn (Shani)",
        "nature": "Discipline, Endurance, Karmic Realization, Structural Mastery, Longevity",
        "element": "Air / Earth",
        "friendly_numbers": [3, 5, 6, 7],
        "neutral_numbers": [4],
        "enemy_numbers": [1, 2, 9],
        "lucky_colors": ["Dark Blue", "Black", "Deep Purple"],
        "gemstone": "Blue Sapphire / Amethyst",
        "mantra": "Om Sham Shanaishcharaya Namaha",
        "deity": "Lord Hanuman / Shiva"
    },
    9: {
        "planet": "Mars (Mangala)",
        "nature": "Courage, Passion, Protective Valor, Dynamic Action, Engineering",
        "element": "Fire",
        "friendly_numbers": [1, 2, 3],
        "neutral_numbers": [5],
        "enemy_numbers": [4, 6, 8],
        "lucky_colors": ["Crimson Red", "Coral", "Maroon"],
        "gemstone": "Red Coral (Moonga)",
        "mantra": "Om Kram Kreem Kroum Sah Bhaumaya Namaha",
        "deity": "Lord Kartikeya / Hanuman"
    }
}

CHALDEAN_COMPOUND_NUMBERS: Dict[int, Dict[str, str]] = {
    10: {
        "name": "The Wheel of Fortune",
        "symbolism": "Honor, Faith & Self-Confidence",
        "meaning": "Symbolizes ultimate rise to power, fluctuating fortunes that resolve into triumph, and the realization of one's plans."
    },
    11: {
        "name": "The Muzzled Lion / Clenching Hand",
        "symbolism": "Master Spiritual Intuition & Trials",
        "meaning": "A Master Number representing hidden dangers, spiritual fortitude, and trials from others that strengthen moral will."
    },
    12: {
        "name": "The Sacrifice & The Philosopher",
        "symbolism": "Spiritual Vision through Tribulation",
        "meaning": "Warns against excessive sacrifice for ungrateful associates; indicates philosophical wisdom gained through worldly surrender."
    },
    13: {
        "name": "Regeneration & The Scepter",
        "symbolism": "Power, Upheaval & Metamorphosis",
        "meaning": "Indicates power that demands wise use; brings sudden transformative changes, shattering old structures to birth new vision."
    },
    14: {
        "name": "Magnetic Movement",
        "symbolism": "Combination of Forces & Commercial Movement",
        "meaning": "Associated with movement, media, and combination of diverse forces; brings fortunate gains when managed with prudence."
    },
    15: {
        "name": "The Magician / The Alchemist",
        "symbolism": "Occult Magnetism, Eloquence & Wealth",
        "meaning": "Extremely fortunate compound number; bestows mesmerizing charisma, literary eloquence, artistic gifts, and generous favors from patrons."
    },
    16: {
        "name": "The Shattered Citadel / The Fallen Tower",
        "symbolism": "Vigilance, Humility & Transcendence",
        "meaning": "Warns of sudden unexpected downfalls caused by overconfidence or false security; calls for deep spiritual grounding and constant vigilance."
    },
    17: {
        "name": "The Star of the Magi",
        "symbolism": "Celestial Guidance, Immortality & Triumph",
        "meaning": "A supreme spiritual and fortunate number; grants divine guidance, immortality of name, and effortless victory over earthly challenges."
    },
    18: {
        "name": "Spiritual vs Material Conflict",
        "symbolism": "Internal Warfare & Disillusionment",
        "meaning": "Represents conflict between material desires and inner conscience; warns of treacherous rivalries and calls for unwavering truth."
    },
    19: {
        "name": "The Prince of Heaven",
        "symbolism": "Radiant Solar Triumph, Joy & Renown",
        "meaning": "One of the most auspicious numbers in existence; symbolizes the victorious Sun, supreme esteem, success in plans, and enduring fortune."
    },
    20: {
        "name": "The Awakening",
        "symbolism": "Spiritual Resurrection & Higher Duty",
        "meaning": "A call to higher spiritual purpose and awakening of consciousness; material ambitions may face constructive delays for spiritual maturation."
    },
    21: {
        "name": "The Crown of the Magi",
        "symbolism": "Ultimate Worldly & Spiritual Victory",
        "meaning": "Represents advancement, elevation in life, universal acclaim, and guaranteed victory in all endeavors after perseverance."
    },
    22: {
        "name": "Submission & Caution / The Master Builder",
        "symbolism": "High Vision Requiring Practical Grounding",
        "meaning": "A Master Number warning against illusions and deceitful friends; confers extraordinary visionary architect capabilities when anchored."
    },
    23: {
        "name": "The Royal Star of the Lion",
        "symbolism": "Sovereign Promise & Protected Success",
        "meaning": "A royal number of divine promise; guarantees success, protection from superiors, help from people in high office, and realization of goals."
    },
    24: {
        "name": "Love, Wealth & Creative Harmony",
        "symbolism": "Harmonious Alliances & Domestic Grace",
        "meaning": "Highly fortunate; promises assistance from people of rank, prosperity, love, artistic refinement, and enduring fruitful partnerships."
    },
    25: {
        "name": "Discrimination & Analysis",
        "symbolism": "Wisdom Earned through Experience",
        "meaning": "Represents discernment gained through intellectual discipline and trial; promises steady triumph in the second half of life."
    },
    26: {
        "name": "Partnership Foresight & Vigilance",
        "symbolism": "Prudence in Speculation & Alliances",
        "meaning": "Warns of treacherous partnerships and risky financial ventures; calls for independent mastery and strict ethical boundaries."
    },
    27: {
        "name": "The Scepter / Crown of Authority",
        "symbolism": "Commanding Intellect & Executive Might",
        "meaning": "A commanding vibration of courage, intellect, high authority, and creative leadership; bestows great worldly execution."
    },
    28: {
        "name": "The Trusting Lamb",
        "symbolism": "Great Promise Requiring Financial Caution",
        "meaning": "Indicates high intellectual ability and potential, but warns of loss through misplaced trust and co-signing for others."
    },
    29: {
        "name": "Grace Under Pressure",
        "symbolism": "Spiritual Resilience & Faith",
        "meaning": "Brings severe tests of faith and emotional uncertainty; develops supreme spiritual endurance and inner strength."
    },
    30: {
        "name": "The Luminous Mind",
        "symbolism": "Mental Superiority & Philosophic Power",
        "meaning": "A number of deep contemplation, philosophical genius, and mental supremacy over worldly pursuits."
    },
    31: {
        "name": "The Isolated Genius",
        "symbolism": "Intellectual Solitude & Independence",
        "meaning": "Represents original thinkers and inventors who work in mental solitude, indifferent to material accumulation."
    },
    32: {
        "name": "The Global Envoy",
        "symbolism": "International Communication & Magnetic Charm",
        "meaning": "Brings wide travel, diplomatic influence, persuasive speech, and success in large public organizations."
    },
    33: {
        "name": "The Master Teacher",
        "symbolism": "Universal Compassion & Spiritual Healing",
        "meaning": "A supreme Master Number of selflessness, universal healing, spiritual teaching, and elevating human consciousness."
    },
    34: {
        "name": "The Fortunate Pioneer",
        "symbolism": "Methodical Expansion & Longevity",
        "meaning": "Similar to 25; grants steady methodical rise in fortune, scientific discovery, and solid material comfort in maturity."
    },
    35: {
        "name": "Inheritance & Prudence",
        "symbolism": "Legacy Wealth & Cautious Enterprise",
        "meaning": "Indicates wealth acquired through heritage, legacy, or stable alliances; warns against erratic speculative ventures."
    },
    36: {
        "name": "The Creative Master",
        "symbolism": "Artistic Sovereignty & Hard-Won Success",
        "meaning": "A powerful vibration of artistic leadership, executive dominance, and material success built upon focused discipline."
    },
    37: {
        "name": "The Regal Scepter & Golden Alliances",
        "symbolism": "Supreme Goodwill & Harmonious Love",
        "meaning": "Extremely auspicious; promises fortunate alliances, faithful friendships, harmonious love, and protection from adversity."
    },
    38: {
        "name": "Challenging Alliances",
        "symbolism": "Independent Self-Reliance",
        "meaning": "Warns of deception in partnerships; success is attained when you trust your inner compass rather than external promises."
    },
    39: {
        "name": "The Eloquent Victor",
        "symbolism": "Oratorical Command & Health Resilience",
        "meaning": "Bestows literary brilliance, powerful public persuasion, physical vitality, and triumph over competitors."
    },
    40: {
        "name": "The Solitary Strategist",
        "symbolism": "Long-Range Planning & Fortitude",
        "meaning": "A number of deep structural endurance, architectural precision, and solitary strategic focus."
    },
    41: {
        "name": "The Dynamic Leader",
        "symbolism": "Magnetic Authority & Enterprise",
        "meaning": "Similar to 23 and 32; confers regal authority, fortunate commercial ventures, and leadership over large movements."
    },
    42: {
        "name": "The Harmonious Diplomat",
        "symbolism": "Domestic Blessing & Artistic Renown",
        "meaning": "Similar to 24; brings universal goodwill, domestic harmony, and distinguished success in arts, diplomacy, and counseling."
    },
    43: {
        "name": "The Resolute Challenger",
        "symbolism": "Revolutionary Spirit & Breakthroughs",
        "meaning": "Indicates sudden upheavals and unconventional paths that ultimately lead to breakthroughs through sheer grit."
    },
    44: {
        "name": "The Sovereign Enterprise",
        "symbolism": "Master Structural Power & Discipline",
        "meaning": "A Master Number of immense organizational scale, structural empire building, and karmic discipline."
    },
    45: {
        "name": "The Visionary Commander",
        "symbolism": "Strategic Genius & Broad Popularity",
        "meaning": "Combines dynamic enterprise with martial victory; yields strategic genius, popularity, and executive authority."
    },
    46: {
        "name": "The Crown of Ambition",
        "symbolism": "High Honors & Worldly Recognition",
        "meaning": "Similar to 37; brings high honors, fortunate connections with dignitaries, and worldly recognition."
    },
    47: {
        "name": "The Insightful Sage",
        "symbolism": "Esoteric Discovery & Intuitive Mastery",
        "meaning": "A master of deep research, esoteric discovery, and philosophical intuition; brings universal respect."
    },
    48: {
        "name": "The Structured Shield",
        "symbolism": "Technical Craftsmanship & Financial Fortitude",
        "meaning": "Disciplined craftsmanship, technical precision, and steady financial foundation built stone by stone."
    },
    49: {
        "name": "The Karmic Transmuter",
        "symbolism": "Spiritual Alchemy & Ethical Fortitude",
        "meaning": "High transformative energy; demands ethical integrity to turn trials into spiritual gold and profound wisdom."
    },
    50: {
        "name": "The Liberated Voyager",
        "symbolism": "Intellectual Freedom & Global Agility",
        "meaning": "Freedom of thought, sharp communication, international travels, and quick adaptability."
    },
    51: {
        "name": "The Warrior's Triumph",
        "symbolism": "Unstoppable Will & Rapid Ascent",
        "meaning": "Extremely potent; bestows warrior-like determination, unexpected luck, and rapid elevation in career."
    },
    52: {
        "name": "The Guardian of Mysteries",
        "symbolism": "Divine Protection & Esoteric Knowledge",
        "meaning": "Deep protective vibration; guards against hidden traps and bestows spiritual initiation."
    }
}

def get_compound_number_info(compound_num: int) -> Dict[str, str]:
    """Retrieve canonical Chaldean/Cheiro name, symbolism, and occult meaning for a compound number."""
    if compound_num in CHALDEAN_COMPOUND_NUMBERS:
        return CHALDEAN_COMPOUND_NUMBERS[compound_num]
    
    # Fallback for single digits (1-9) or higher compounds (>52)
    single_digit = compound_num
    while single_digit > 9:
        single_digit = sum(int(d) for d in str(single_digit))
        
    profile = NUMEROLOGY_PROFILES.get(single_digit, {})
    planet = profile.get("planet", "Planetary Force")
    
    return {
        "name": f"Compound Vibration {compound_num}",
        "symbolism": f"Harmonic of {planet}",
        "meaning": f"Compound {compound_num} channels the vibrational octave of {planet} (Single Digit {single_digit}), focusing its spiritual and worldly powers."
    }
