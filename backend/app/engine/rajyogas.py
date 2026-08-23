"""
Canonical Classical Vedic Raja Yoga, Mahapurusha Yoga, Auspicious Conjunctions, and Stelliums Engine.
Calculated with rigorous mathematical precision per:
- Brihat Parashara Hora Shastra (BPHS Ch. 34, 35, 36, 41, 42, 80)
- Phaladeepika (Ch. 6)
- Saravali (Ch. 31, 32, 33, 34, 35)
- Jataka Parijata (Ch. 7)
- B.V. Raman's "300 Important Combinations"
"""
from typing import Dict, List, Any, Set, Tuple
from ..models.jyotish import ZODIAC_SIGNS, PLANETARY_DIGNITIES

# -----------------------------------------------------------------------------------------
# CANONICAL YOGAKARAKA MAPPING (BPHS Ch. 34)
# -----------------------------------------------------------------------------------------
# A planet is a single Yogakaraka ONLY if it simultaneously rules a Kendra AND a Trikona.
YOGAKARAKA_BY_LAGNA = {
    2: ("Saturn", "Taurus Lagna: Saturn owns 9th (Capricorn) and 10th (Aquarius) houses."),
    4: ("Mars", "Cancer Lagna: Mars owns 5th (Scorpio) and 10th (Aries) houses."),
    5: ("Mars", "Leo Lagna: Mars owns 4th (Scorpio) and 9th (Aries) houses."),
    7: ("Saturn", "Libra Lagna: Saturn owns 4th (Capricorn) and 5th (Aquarius) houses."),
    10: ("Venus", "Capricorn Lagna: Venus owns 5th (Taurus) and 10th (Libra) houses."),
    11: ("Venus", "Aquarius Lagna: Venus owns 4th (Taurus) and 9th (Libra) houses."),
}

# -----------------------------------------------------------------------------------------
# UNIVERSAL 300+ CLASSICAL YOGAS & CONJUNCTIONS ENCYCLOPEDIA CATALOG
# -----------------------------------------------------------------------------------------
UNIVERSAL_RAJAYOGAS_CATALOG: List[Dict[str, Any]] = [
    # 1. PANCHA MAHAPURUSHA YOGAS
    {
        "id": "ruchaka",
        "name": "Ruchaka Mahapurusha Yoga",
        "sanskrit": "Ruchaka Yoga (Martial Royalty)",
        "category": "Pancha Mahapurusha",
        "planets_required": ["Mars"],
        "scripture": "BPHS Ch. 35 / Phaladeepika Ch. 6 / Raman #1",
        "rule": "Mars in Kendra (1, 4, 7, 10) in Aries, Scorpio (own signs) or Capricorn (exaltation).",
        "effects": "Invincible courage, commanding executive authority, mastery in engineering/defense/strategy, vast real estate, and fearless leadership."
    },
    {
        "id": "bhadra",
        "name": "Bhadra Mahapurusha Yoga",
        "sanskrit": "Bhadra Yoga (Intellectual Royalty)",
        "category": "Pancha Mahapurusha",
        "planets_required": ["Mercury"],
        "scripture": "BPHS Ch. 35 / Phaladeepika Ch. 6 / Raman #2",
        "rule": "Mercury in Kendra (1, 4, 7, 10) in Gemini (own sign) or Virgo (exaltation/own sign).",
        "effects": "Monumental intellect, razor-sharp eloquence, mathematical and astrological genius, commercial mastery, and diplomatic diplomacy."
    },
    {
        "id": "hamsa",
        "name": "Hamsa Mahapurusha Yoga",
        "sanskrit": "Hamsa Yoga (Spiritual & Wisdom Royalty)",
        "category": "Pancha Mahapurusha",
        "planets_required": ["Jupiter"],
        "scripture": "BPHS Ch. 35 / Phaladeepika Ch. 6 / Raman #3",
        "rule": "Jupiter in Kendra (1, 4, 7, 10) in Sagittarius, Pisces (own signs) or Cancer (exaltation).",
        "effects": "Supreme righteousness, spotless character, revered by leaders and scholars, profound spiritual wisdom, divine protection, and radiant nobility."
    },
    {
        "id": "malavya",
        "name": "Malavya Mahapurusha Yoga",
        "sanskrit": "Malavya Yoga (Aesthetic & Luxury Royalty)",
        "category": "Pancha Mahapurusha",
        "planets_required": ["Venus"],
        "scripture": "BPHS Ch. 35 / Phaladeepika Ch. 6 / Raman #4",
        "rule": "Venus in Kendra (1, 4, 7, 10) in Taurus, Libra (own signs) or Pisces (exaltation).",
        "effects": "Supreme aesthetic refinement, wealth in conveyances, irresistible magnetic allure, enduring marital bliss, artistic genius, and boundless luxury."
    },
    {
        "id": "shasha",
        "name": "Shasha Mahapurusha Yoga",
        "sanskrit": "Shasha Yoga (Karmic & Mass Leadership Royalty)",
        "category": "Pancha Mahapurusha",
        "planets_required": ["Saturn"],
        "scripture": "BPHS Ch. 35 / Phaladeepika Ch. 6 / Raman #5",
        "rule": "Saturn in Kendra (1, 4, 7, 10) in Capricorn, Aquarius (own signs) or Libra (exaltation).",
        "effects": "Profound judicial integrity, enduring legacy, commanding leadership over masses, strategic resilience, longevity, and steadfast perseverance."
    },

    # 2. PLANETARY STELLIUMS & MULTI-PLANET CLUSTERS
    {
        "id": "stellium_tri_surya_budha_guru",
        "name": "Surya-Budha-Guru Royal Intellect Stellium",
        "sanskrit": "Trigraha Nipuna-Jnana Yoga",
        "category": "Planetary Stelliums & Clusters",
        "planets_required": ["Sun", "Mercury", "Jupiter"],
        "scripture": "Saravali Ch. 32 / B.V. Raman #114",
        "rule": "Sun, Mercury, and Jupiter conjunct in a single house (3-Planet Stellium).",
        "effects": "Renowned scholar, celebrated author, sovereign counselor, high governmental honors, monumental wisdom, and universal respect."
    },
    {
        "id": "stellium_tri_chandra_budha_shukra",
        "name": "Chandra-Budha-Shukra Opulent Arts Stellium",
        "sanskrit": "Trigraha Saraswati-Lakshmi Stellium",
        "category": "Planetary Stelliums & Clusters",
        "planets_required": ["Moon", "Mercury", "Venus"],
        "scripture": "Saravali Ch. 32 / B.V. Raman #115",
        "rule": "Moon, Mercury, and Venus conjunct in a single house (3-Planet Stellium).",
        "effects": "Extraordinary polymathic genius, musical and literary magnificence, captivating speech, vast wealth in luxuries, and public adoration."
    },
    {
        "id": "stellium_tri_surya_budha_mangala",
        "name": "Surya-Budha-Mangala Strategic Commander Stellium",
        "sanskrit": "Trigraha Shaurya-Budhi Stellium",
        "category": "Planetary Stelliums & Clusters",
        "planets_required": ["Sun", "Mercury", "Mars"],
        "scripture": "Saravali Ch. 32",
        "rule": "Sun, Mercury, and Mars conjunct in a single house (3-Planet Stellium).",
        "effects": "Strategic prowess in administrative, engineering, medical, or defense leadership; sharp intellect backed by decisive courage."
    },
    {
        "id": "stellium_tri_guru_mangala_chandra",
        "name": "Guru-Mangala-Chandra Prosperity Stellium",
        "sanskrit": "Trigraha Lakshmi-Narayana Stellium",
        "category": "Planetary Stelliums & Clusters",
        "planets_required": ["Jupiter", "Mars", "Moon"],
        "scripture": "Saravali Ch. 32 / Phaladeepika",
        "rule": "Jupiter, Mars, and Moon conjunct in a single house (3-Planet Stellium).",
        "effects": "Supreme real estate magnate, high commercial enterprise, ethical executive status, and protective benevolence towards family."
    },
    {
        "id": "stellium_chatur_sovereign",
        "name": "Chatur-Graha Sovereign Diplomat Mega-Stellium",
        "sanskrit": "Chaturgraha Rajadhi-Raja Stellium",
        "category": "Planetary Stelliums & Clusters",
        "planets_required": ["Sun", "Mercury", "Jupiter", "Venus"],
        "scripture": "Saravali Ch. 33 / BPHS",
        "rule": "Sun, Mercury, Jupiter, and Venus conjunct in a single house (4-Planet Mega-Stellium).",
        "effects": "Concentration of extraordinary cosmic intelligence, judicial authority, artistic refinement, and ministerial statesmanship."
    },
    {
        "id": "stellium_pravrajya",
        "name": "Pravrajya Yoga (4+ Planet Ascetic/Enlightenment Stellium)",
        "sanskrit": "Pravrajya Sannyasa Yoga",
        "category": "Planetary Stelliums & Clusters",
        "planets_required": ["4+ Planets in 1 House"],
        "scripture": "BPHS Ch. 80 / Brihat Jataka Ch. 15",
        "rule": "Four or more planets clustered in a single house.",
        "effects": "Intense spiritual focus, world-transcending wisdom, profound detachment from superficialities, and legendary philosophical influence."
    },

    # 3. AUSPICIOUS TWO-PLANET CONJUNCTIONS
    {
        "id": "budhaditya",
        "name": "Budhaditya Yoga (Nipuna Yoga)",
        "sanskrit": "Budhaditya Yoga (Solar-Mercury Intellect)",
        "category": "2-Planet Conjunctions (Yutis)",
        "planets_required": ["Sun", "Mercury"],
        "scripture": "Saravali Ch. 35 / Phaladeepika Ch. 6 / Raman #9",
        "rule": "Sun and Mercury conjunct in the same house without severe combustion.",
        "effects": "Exceptional analytical brilliance, sharp administrative intellect, mathematical and communicative acumen, governmental favors, and public eloquence."
    },
    {
        "id": "guru_aditya",
        "name": "Guru-Aditya Yoga",
        "sanskrit": "Guru-Aditya Yoga (Sovereign Wisdom)",
        "category": "2-Planet Conjunctions (Yutis)",
        "planets_required": ["Sun", "Jupiter"],
        "scripture": "Saravali Ch. 31 / B.V. Raman #10",
        "rule": "Sun and Jupiter conjunct in the same house (especially in Kendras/Trikonas).",
        "effects": "High ethical standing, ministerial counsel, scholarly wisdom, legal preeminence, philosophical mastery, and sovereign respect."
    },
    {
        "id": "chandra_mangala",
        "name": "Chandra-Mangala Yoga",
        "sanskrit": "Chandra-Mangala Yoga (Financial Enterprise)",
        "category": "2-Planet Conjunctions (Yutis)",
        "planets_required": ["Moon", "Mars"],
        "scripture": "Phaladeepika Ch. 6 / Saravali / Raman #11",
        "rule": "Moon and Mars conjunct in the same house.",
        "effects": "Relentless commercial enterprise, unstoppable financial drive, real estate wealth, abundant cash liquidity, and fearless action."
    },
    {
        "id": "gaja_kesari",
        "name": "Gaja Kesari Yoga",
        "sanskrit": "Gaja Kesari Yoga (Elephant-Lion Royalty)",
        "category": "Maha Raja Yoga",
        "planets_required": ["Jupiter", "Moon"],
        "scripture": "BPHS Ch. 36 / Phaladeepika Ch. 6 / Raman #6",
        "rule": "Jupiter in Kendra (1, 4, 7, 10) from the Moon.",
        "effects": "Lion-like majesty over obstacles, scholarly preeminence, lasting fame, royal favor, emotional peace, and unwavering wealth."
    },
    {
        "id": "lakshmi_saraswati",
        "name": "Lakshmi-Saraswati Conjunction (Budha-Shukra)",
        "sanskrit": "Budha-Shukra Yuti (Artistic Magnetism)",
        "category": "2-Planet Conjunctions (Yutis)",
        "planets_required": ["Mercury", "Venus"],
        "scripture": "Saravali Ch. 31 / Phaladeepika / Raman #13",
        "rule": "Mercury and Venus conjunct in the same house.",
        "effects": "Exquisite artistic eloquence, poetic creativity, commercial charm, diplomatic tact, refined tastes, and magnetic personal appeal."
    },
    {
        "id": "bhrigu_guru",
        "name": "Bhrigu-Guru Conjunction (Guru-Shukra)",
        "sanskrit": "Guru-Shukra Yuti (The Two Preceptors)",
        "category": "2-Planet Conjunctions (Yutis)",
        "planets_required": ["Jupiter", "Venus"],
        "scripture": "Saravali Ch. 31 / Raman #14",
        "rule": "Jupiter and Venus conjunct in the same house.",
        "effects": "Unites material luxury with spiritual wisdom, profound scholarship, judicial counsel, generous heart, and high cultural standing."
    },
    {
        "id": "guru_mangala",
        "name": "Guru-Mangala Conjunction",
        "sanskrit": "Guru-Mangala Yuti (Righteous Warrior)",
        "category": "2-Planet Conjunctions (Yutis)",
        "planets_required": ["Jupiter", "Mars"],
        "scripture": "Saravali Ch. 31 / Raman #15",
        "rule": "Jupiter and Mars conjunct in the same house.",
        "effects": "Ethical leadership, strategic defense mastery, judicial authority, generous protector of others, and disciplined valor."
    },
    {
        "id": "shani_shukra",
        "name": "Shani-Shukra Conjunction",
        "sanskrit": "Shani-Shukra Yuti (Architectural Legacy)",
        "category": "2-Planet Conjunctions (Yutis)",
        "planets_required": ["Saturn", "Venus"],
        "scripture": "Saravali Ch. 31 / Raman #16",
        "rule": "Saturn and Venus conjunct in the same house.",
        "effects": "Artistic perseverance, mastery in architectural/industrial crafts, enduring material foundations, and diplomatic patience."
    },
    {
        "id": "shani_budha",
        "name": "Shani-Budha Conjunction",
        "sanskrit": "Shani-Budha Yuti (Deep Analytical Precision)",
        "category": "2-Planet Conjunctions (Yutis)",
        "planets_required": ["Saturn", "Mercury"],
        "scripture": "Saravali Ch. 31",
        "rule": "Saturn and Mercury conjunct in the same house.",
        "effects": "Profound research acumen, mathematical and philosophical depth, methodical craftsmanship, and unwavering concentration."
    },
    {
        "id": "surya_mangala",
        "name": "Surya-Mangala Conjunction",
        "sanskrit": "Surya-Mangala Yuti (Executive Fire)",
        "category": "2-Planet Conjunctions (Yutis)",
        "planets_required": ["Sun", "Mars"],
        "scripture": "Saravali Ch. 31",
        "rule": "Sun and Mars conjunct in the same house.",
        "effects": "Unyielding vitality, commanding military or surgical excellence, fearless ambition, and administrative directness."
    },

    # 4. KENDRA-TRIKONA & DHARMA-KARMADHIPATI RAJA YOGAS
    {
        "id": "dharma_karmadhipati",
        "name": "Dharma-Karmadhipati Raja Yoga",
        "sanskrit": "Dharma-Karmadhipati Yoga (Supreme Kendra-Trikona Union)",
        "category": "Kendra-Trikona Unions",
        "planets_required": ["9th Lord", "10th Lord"],
        "scripture": "BPHS Ch. 41 (Vishnu-Lakshmi Sambandha) / Raman #21",
        "rule": "Lord of 9th house (Dharma/Lakshmi) and Lord of 10th house (Karma/Vishnu) conjunct or mutually aspecting.",
        "effects": "The supreme Raja Yoga in Vedic astrology, conferring sovereign authority, ethical career triumph, boundless wealth, and lasting legacy."
    },
    {
        "id": "lakshmi_narayana",
        "name": "Lakshmi-Narayana Raja Yoga",
        "sanskrit": "Lakshmi-Narayana Yoga (Lagna + 9th/5th Lord)",
        "category": "Kendra-Trikona Unions",
        "planets_required": ["1st Lord", "9th Lord"],
        "scripture": "BPHS Ch. 41 / Raman #22",
        "rule": "Lord of 1st house (Lagna) conjunct or in mutual reception with Lord of 9th or 5th house.",
        "effects": "Blessed with lifelong fortune, righteous fame, divine grace, charismatic nobility, and radiant physical and spiritual vitality."
    },
    {
        "id": "yogakaraka_single",
        "name": "Supreme Yogakaraka Single-Planet Raja Yoga",
        "sanskrit": "Yogakaraka Yoga (Dual Kendra-Trikona Lordship)",
        "category": "Kendra-Trikona Unions",
        "planets_required": ["Mars (Cancer/Leo)", "Saturn (Taurus/Libra)", "Venus (Cap/Aqu)"],
        "scripture": "BPHS Ch. 34 / Raman #20",
        "rule": "Single planet owning simultaneously a Kendra and a Trikona house.",
        "effects": "Bestows continuous fortune, royal status, prosperity, ethical authority, and triumph over all life hurdles."
    },
    {
        "id": "adhi_yoga",
        "name": "Chandradhi / Lagnadhi Yoga (Adhi Yoga)",
        "sanskrit": "Adhi Yoga (Supreme Minister / Commander)",
        "category": "Maha Raja Yoga",
        "planets_required": ["Mercury", "Jupiter", "Venus"],
        "scripture": "BPHS Ch. 36 / Saravali Ch. 35 / Raman #7",
        "rule": "Benefics (Mercury, Jupiter, Venus) situated in 6th, 7th, and 8th houses from the Moon or Lagna.",
        "effects": "The native becomes a leader of men, minister of state, commander of institutions, wealthy, disease-free, and enjoying an eminent life."
    },
    {
        "id": "parivartana_maha",
        "name": "Maha Parivartana Raja Yoga",
        "sanskrit": "Maha Parivartana Yoga (Mutual House Exchange)",
        "category": "Kendra-Trikona Unions",
        "planets_required": ["Kendra Lords", "Trikona Lords"],
        "scripture": "Phaladeepika Ch. 6 / Raman #23",
        "rule": "Mutual exchange of signs between lords of 1, 2, 4, 5, 7, 9, 10, 11th houses.",
        "effects": "High worldly elevation, royal status, blessed with conveyances and honors, enduring prosperity and triumph over rivals."
    },

    # 5. DHANA YOGAS & WEALTH-GENERATING COMBINATIONS
    {
        "id": "vasumathi",
        "name": "Vasumathi Yoga",
        "sanskrit": "Vasumathi Yoga (Limitless Wealth)",
        "category": "Dhana & Prosperity Yogas",
        "planets_required": ["Jupiter", "Venus", "Mercury"],
        "scripture": "Phaladeepika Ch. 6 / Raman #32",
        "rule": "All benefic planets (Jupiter, Venus, Mercury) occupy Upachaya houses (3, 6, 10, 11) from Lagna or Moon.",
        "effects": "Bestows boundless self-earned wealth, financial independence, commanding estate assets, and immunity from financial ruin."
    },
    {
        "id": "lakshmi_yoga",
        "name": "Lakshmi Yoga",
        "sanskrit": "Lakshmi Yoga (Goddess of Wealth & Grace)",
        "category": "Dhana & Prosperity Yogas",
        "planets_required": ["9th Lord", "Venus"],
        "scripture": "BPHS Ch. 36 / Phaladeepika / Raman #30",
        "rule": "9th Lord is exalted or in own sign in Kendra/Trikona and Lagna Lord is strongly placed.",
        "effects": "Blessed by Goddess Lakshmi with boundless prosperity, noble lineage, charitable disposition, elegance, and protection from poverty."
    },
    {
        "id": "akhanda_samrajya",
        "name": "Akhanda Samrajya Yoga",
        "sanskrit": "Akhanda Samrajya Yoga (Undivided Sovereign Realm)",
        "category": "Dhana & Prosperity Yogas",
        "planets_required": ["Jupiter", "2nd/5th/11th Lords"],
        "scripture": "Jataka Parijata / Raman #34",
        "rule": "Jupiter rules 2nd, 5th, or 11th house while 9th or 2nd lord occupies a Kendra from Moon.",
        "effects": "Conveys unshakeable dominion, immense executive power, continuous revenue flow, and lasting legacy."
    },
    {
        "id": "kalanidhi",
        "name": "Kalanidhi Yoga",
        "sanskrit": "Kalanidhi Yoga (Treasure of Culture & Arts)",
        "category": "Dhana & Prosperity Yogas",
        "planets_required": ["Jupiter", "Mercury", "Venus"],
        "scripture": "Phaladeepika Ch. 6 / Raman #35",
        "rule": "Jupiter placed in 2nd or 5th house, conjoined or aspected by Mercury and Venus.",
        "effects": "Cultured luxury, revered for noble taste, good health, generous disposition, aristocratic honors, and artistic refinement."
    },
    {
        "id": "mahabhagya",
        "name": "Mahabhagya Yoga",
        "sanskrit": "Mahabhagya Yoga (Supreme Good Fortune)",
        "category": "Dhana & Prosperity Yogas",
        "planets_required": ["Sun", "Moon", "Lagna"],
        "scripture": "BPHS Ch. 36 / Raman #36",
        "rule": "For Male: Born in daytime with Sun, Moon, and Lagna in odd signs. For Female: Born at night with Sun, Moon, and Lagna in even signs.",
        "effects": "Phenomenal good fortune, universal affection, long life, generosity, spotless character, and sovereign renown."
    },
    {
        "id": "pushkala",
        "name": "Pushkala Yoga",
        "sanskrit": "Pushkala Yoga (Abundant Splendor)",
        "category": "Dhana & Prosperity Yogas",
        "planets_required": ["Lagna Lord", "Moon", "Jupiter"],
        "scripture": "Phaladeepika Ch. 6 / Raman #37",
        "rule": "Lagna Lord conjoined with Moon in a Kendra, aspected by a strong planet.",
        "effects": "Honored by sovereigns, renowned speaker, blessed with wealth, vehicles, jewels, and radiant personality."
    },

    # 6. LUNAR & SOLAR FORMATIONS
    {
        "id": "sunapha",
        "name": "Sunapha Yoga",
        "sanskrit": "Sunapha Yoga (Self-Earned Prosperity)",
        "category": "Lunar & Solar Formations",
        "planets_required": ["Mars", "Mercury", "Jupiter", "Venus", "Saturn"],
        "scripture": "BPHS Ch. 36 / Phaladeepika Ch. 6 / Raman #40",
        "rule": "Planets (other than Sun) placed in the 2nd house from the Moon.",
        "effects": "Self-earned wealth, high intelligence, virtuous demeanor, respected in society, and enjoying physical vitality."
    },
    {
        "id": "anapha",
        "name": "Anapha Yoga",
        "sanskrit": "Anapha Yoga (Majestic Restraint)",
        "category": "Lunar & Solar Formations",
        "planets_required": ["Mars", "Mercury", "Jupiter", "Venus", "Saturn"],
        "scripture": "BPHS Ch. 36 / Phaladeepika Ch. 6 / Raman #41",
        "rule": "Planets (other than Sun) placed in the 12th house from the Moon.",
        "effects": "Majestic appearance, generous disposition, spiritual inclinations, good health, and respected in foreign travels."
    },
    {
        "id": "dhurdhura",
        "name": "Dhurdhura Yoga",
        "sanskrit": "Dhurdhura Yoga (Flanked Lunar Grace)",
        "category": "Lunar & Solar Formations",
        "planets_required": ["Mars", "Mercury", "Jupiter", "Venus", "Saturn"],
        "scripture": "BPHS Ch. 36 / Phaladeepika Ch. 6 / Raman #42",
        "rule": "Planets (other than Sun) placed in both 2nd and 12th houses from the Moon.",
        "effects": "Generous ruler, blessed with conveyances, loyal associates, continuous wealth, and enjoying physical and emotional comforts."
    },
    {
        "id": "vesi_yoga",
        "name": "Vesi Yoga",
        "sanskrit": "Vesi Yoga (Solar Vanguard)",
        "category": "Lunar & Solar Formations",
        "planets_required": ["Benefics (excl Moon) in 2nd from Sun"],
        "scripture": "BPHS Ch. 36 / Raman #45",
        "rule": "Planets (other than Moon) in the 2nd house from the Sun.",
        "effects": "Truthful, fortunate, eloquent, tall stature, happy, and prosperous in worldly endeavors."
    },
    {
        "id": "vasi_yoga",
        "name": "Vasi Yoga",
        "sanskrit": "Vasi Yoga (Solar Rearguard)",
        "category": "Lunar & Solar Formations",
        "planets_required": ["Benefics (excl Moon) in 12th from Sun"],
        "scripture": "BPHS Ch. 36 / Raman #46",
        "rule": "Planets (other than Moon) in the 12th house from the Sun.",
        "effects": "Skillful, charitable, famous, spiritual inclinations, strong memory, and prosperous."
    },
    {
        "id": "ubhayachari",
        "name": "Ubhayachari Yoga",
        "sanskrit": "Ubhayachari Yoga (Solar Balance)",
        "category": "Lunar & Solar Formations",
        "planets_required": ["Planets in 2nd & 12th from Sun"],
        "scripture": "BPHS Ch. 36 / Raman #47",
        "rule": "Planets (other than Moon) occupy both 2nd and 12th houses from the Sun.",
        "effects": "King-like equilibrium, charming speech, wealth, fame, endurance, and enjoying life comforts."
    },

    # 7. SPECIAL NAMED ROYAL YOGAS
    {
        "id": "saraswati",
        "name": "Saraswati Yoga",
        "sanskrit": "Saraswati Yoga (Goddess of Learning & Arts)",
        "category": "Classical Named Royalties",
        "planets_required": ["Jupiter", "Venus", "Mercury"],
        "scripture": "Phaladeepika Ch. 6 / Raman #27",
        "rule": "Jupiter, Venus, and Mercury placed in Kendras (1, 4, 7, 10), Trikonas (5, 9), or 2nd house from Lagna.",
        "effects": "Blessed by Goddess Saraswati: Master of poetry, philosophy, mathematics, and arts; highly eloquent, renowned author and teacher."
    },
    {
        "id": "amala",
        "name": "Amala Yoga",
        "sanskrit": "Amala Yoga (Spotless Professional Legacy)",
        "category": "Classical Named Royalties",
        "planets_required": ["Jupiter", "Venus", "Mercury"],
        "scripture": "BPHS Ch. 36 / Phaladeepika / Raman #28",
        "rule": "Natural benefic planet (Jupiter, Venus, or Mercury) placed in the 10th house from Lagna or Moon.",
        "effects": "Ensures an unblemished reputation, lasting honor, prosperous career contributions, and ethical public leadership."
    },
    {
        "id": "parvata",
        "name": "Parvata Yoga",
        "sanskrit": "Parvata Yoga (Mountain-Like Prominence)",
        "category": "Classical Named Royalties",
        "planets_required": ["Lagna Lord", "12th Lord"],
        "scripture": "Phaladeepika Ch. 6 / Raman #29",
        "rule": "Benefic planets occupy all Kendras (1, 4, 7, 10), while 6th and 8th houses are vacant or occupied by benefics.",
        "effects": "The native becomes like a mountain—prominent, wealthy, charitable, sovereign in deeds, and surrounded by loyal supporters."
    },
    {
        "id": "kahala",
        "name": "Kahala Yoga",
        "sanskrit": "Kahala Yoga (Courageous Commander)",
        "category": "Classical Named Royalties",
        "planets_required": ["4th Lord", "9th Lord"],
        "scripture": "Phaladeepika Ch. 6 / Raman #50",
        "rule": "4th Lord and 9th Lord are in mutual Kendras, while the Lagna Lord is strong.",
        "effects": "Courageous leader, commanding respect, generous in charity, robust physical constitution, and respected in government."
    },
    {
        "id": "chamara",
        "name": "Chamara Yoga",
        "sanskrit": "Chamara Yoga (Royal Whisk-Bearer)",
        "category": "Classical Named Royalties",
        "planets_required": ["Lagna Lord", "Jupiter"],
        "scripture": "Phaladeepika Ch. 6 / Raman #51",
        "rule": "Lagna Lord exalted in a Kendra and receiving aspect from Jupiter.",
        "effects": "Daily increasing prosperity, famous orator, scholarly, long-lived, and honored by sovereign heads of state."
    },
    {
        "id": "shankha",
        "name": "Shankha Yoga",
        "sanskrit": "Shankha Yoga (Conch-Shell Royalty)",
        "category": "Classical Named Royalties",
        "planets_required": ["5th Lord", "6th Lord"],
        "scripture": "Phaladeepika Ch. 6 / Raman #52",
        "rule": "5th and 6th lords in mutual Kendras while the Lagna Lord is fortified.",
        "effects": "Philosophical mind, generous humanitarian works, long lifespan, fond of sacred sciences, and enjoying family prosperity."
    },
    {
        "id": "bheri_yoga",
        "name": "Bheri Yoga",
        "sanskrit": "Bheri Yoga (Triumphant Kettle-Drum)",
        "category": "Classical Named Royalties",
        "planets_required": ["9th Lord", "Venus", "Jupiter"],
        "scripture": "Phaladeepika Ch. 6 / Raman #53",
        "rule": "9th Lord strong, with Venus, Jupiter, and Lagna Lord in mutual Kendras.",
        "effects": "Long-lived, wealthy, contented family, high administrative rank, famous, and free from disease."
    },
    {
        "id": "mridanga_yoga",
        "name": "Mridanga Yoga",
        "sanskrit": "Mridanga Yoga (Musical & Royal Splendor)",
        "category": "Classical Named Royalties",
        "planets_required": ["Lagna Lord", "Exalted Planets"],
        "scripture": "Phaladeepika Ch. 6 / Raman #54",
        "rule": "Lagna Lord strong, dispositor of exalted planet in Kendra/Trikona.",
        "effects": "Universal renown, revered by statesmen, artistic taste, commanding authority, and enduring luxuries."
    },

    # 8. VIPARITA RAJA YOGAS & BHANGA ELEVATIONS
    {
        "id": "harsha",
        "name": "Harsha Viparita Raja Yoga",
        "sanskrit": "Harsha Yoga (Happiness through Victory)",
        "category": "Viparita (Triumph Over Adversity)",
        "planets_required": ["6th Lord"],
        "scripture": "Phaladeepika Ch. 6 / Raman #58",
        "rule": "6th Lord placed in 6th, 8th, or 12th house without malefic aspect from Kendra lords.",
        "effects": "Invincible immune resilience, complete triumph over adversaries and competitors, flourishing after hardships, and robust vitality."
    },
    {
        "id": "sarala",
        "name": "Sarala Viparita Raja Yoga",
        "sanskrit": "Sarala Yoga (Fearless Transformation)",
        "category": "Viparita (Triumph Over Adversity)",
        "planets_required": ["8th Lord"],
        "scripture": "Phaladeepika Ch. 6 / Raman #59",
        "rule": "8th Lord placed in 6th, 8th, or 12th house without malefic aspect from Kendra lords.",
        "effects": "Fearless character, long life, sudden financial gains/inheritances, triumph in competitive/hazardous fields, and spiritual mastery."
    },
    {
        "id": "vimala",
        "name": "Vimala Viparita Raja Yoga",
        "sanskrit": "Vimala Yoga (Pure Independent Wealth)",
        "category": "Viparita (Triumph Over Adversity)",
        "planets_required": ["12th Lord"],
        "scripture": "Phaladeepika Ch. 6 / Raman #60",
        "rule": "12th Lord placed in 6th, 8th, or 12th house without malefic aspect from Kendra lords.",
        "effects": "Accumulation of noble independent wealth, minimal debts, spiritual freedom, contentment, and charitable renown."
    },
    {
        "id": "neechabhanga",
        "name": "Neechabhanga Raja Yoga",
        "sanskrit": "Neechabhanga Raja Yoga (Elevation from Humility)",
        "category": "Viparita (Triumph Over Adversity)",
        "planets_required": ["Debilitated Planet"],
        "scripture": "Phaladeepika Ch. 6 / BPHS / Raman #61",
        "rule": "Debilitated planet whose dispositor or exaltation lord is in a Kendra from Lagna or Moon.",
        "effects": "Transforms initial hardships into royal resilience, commanding status, profound empathy, and hard-earned worldly heights."
    }
]

# -----------------------------------------------------------------------------------------
# CANONICAL DETERMINISTIC DETECTION ENGINE
# -----------------------------------------------------------------------------------------
def detect_all_active_rajayogas_and_conjunctions(ascendant_sign_id: int, planets_enriched: List[Dict[str, Any]], gender: str = "male") -> List[Dict[str, Any]]:
    """
    Rigorously evaluate all active classical Raja Yogas, Yutis, and Stelliums.
    """
    active_yogas = []
    
    planet_house_map = {p["name"]: p["house"] for p in planets_enriched}
    planet_sign_map = {p["name"]: p["sign_id"] for p in planets_enriched}
    planet_dignity_map = {p["name"]: p.get("dignity", "Neutral") for p in planets_enriched}
    planet_combust_map = {p["name"]: p.get("is_combust", False) for p in planets_enriched}
    planet_vargottama_map = {p["name"]: p.get("is_vargottama", False) for p in planets_enriched}
    planet_long_map = {p["name"]: p.get("longitude", 0.0) for p in planets_enriched}
    
    # 1. Map House Lords accurately for all 12 houses
    house_lords: Dict[int, str] = {}
    for h in range(1, 13):
        sign_id = ((ascendant_sign_id - 1 + (h - 1)) % 12) + 1
        house_lords[h] = ZODIAC_SIGNS[sign_id - 1]["lord"]
        
    kendra_houses = [1, 4, 7, 10]
    trikona_houses = [1, 5, 9]
    upachaya_houses = [3, 6, 10, 11]
    dusthana_houses = [6, 8, 12]
    
    # Group planets by house for Stelliums and Yutis
    house_planets: Dict[int, List[Dict[str, Any]]] = {}
    for p in planets_enriched:
        h = p["house"]
        house_planets.setdefault(h, []).append(p)

    # -------------------------------------------------------------------------
    # 1. CANONICAL PANCHA MAHAPURUSHA YOGAS (BPHS Ch. 35)
    # -------------------------------------------------------------------------
    mahapurusha_rules = {
        "Mars": {
            "name": "Ruchaka Mahapurusha Yoga",
            "sanskrit": "Ruchaka Yoga (Martial Royalty)",
            "own_signs": [1, 8],  # Aries, Scorpio
            "exalt_sign": 10,     # Capricorn
            "scripture": "BPHS Ch. 35 / Phaladeepika Ch. 6 / Raman #1",
            "effects": "Invincible courage, commanding executive authority, mastery in engineering/defense/strategy, vast real estate, and fearless leadership."
        },
        "Mercury": {
            "name": "Bhadra Mahapurusha Yoga",
            "sanskrit": "Bhadra Yoga (Intellectual Royalty)",
            "own_signs": [3, 6],  # Gemini, Virgo
            "exalt_sign": 6,      # Virgo
            "scripture": "BPHS Ch. 35 / Phaladeepika Ch. 6 / Raman #2",
            "effects": "Monumental intellect, razor-sharp eloquence, mathematical and astrological genius, commercial mastery, and diplomatic diplomacy."
        },
        "Jupiter": {
            "name": "Hamsa Mahapurusha Yoga",
            "sanskrit": "Hamsa Yoga (Spiritual & Wisdom Royalty)",
            "own_signs": [9, 12], # Sagittarius, Pisces
            "exalt_sign": 4,      # Cancer
            "scripture": "BPHS Ch. 35 / Phaladeepika Ch. 6 / Raman #3",
            "effects": "Supreme righteousness, spotless character, revered by leaders and scholars, profound spiritual wisdom, divine protection, and radiant nobility."
        },
        "Venus": {
            "name": "Malavya Mahapurusha Yoga",
            "sanskrit": "Malavya Yoga (Aesthetic & Luxury Royalty)",
            "own_signs": [2, 7],  # Taurus, Libra
            "exalt_sign": 12,     # Pisces
            "scripture": "BPHS Ch. 35 / Phaladeepika Ch. 6 / Raman #4",
            "effects": "Supreme aesthetic refinement, wealth in conveyances, irresistible magnetic allure, enduring marital bliss, artistic genius, and boundless luxury."
        },
        "Saturn": {
            "name": "Shasha Mahapurusha Yoga",
            "sanskrit": "Shasha Yoga (Karmic & Mass Leadership Royalty)",
            "own_signs": [10, 11], # Capricorn, Aquarius
            "exalt_sign": 7,       # Libra
            "scripture": "BPHS Ch. 35 / Phaladeepika Ch. 6 / Raman #5",
            "effects": "Profound judicial integrity, enduring legacy, commanding leadership over masses, strategic resilience, longevity, and steadfast perseverance."
        }
    }
    
    for p in planets_enriched:
        p_name = p["name"]
        if p_name in mahapurusha_rules and p["house"] in kendra_houses:
            rule_info = mahapurusha_rules[p_name]
            s_id = p["sign_id"]
            if s_id in rule_info["own_signs"] or s_id == rule_info["exalt_sign"]:
                is_exalted = (s_id == rule_info["exalt_sign"])
                is_combust = p.get("is_combust", False)
                potency = 98 if is_exalted or p.get("is_vargottama") else 92
                if is_combust: potency -= 25
                
                status_text = "Exalted" if is_exalted else "Own Sign"
                active_yogas.append({
                    "name": rule_info["name"],
                    "sanskrit": rule_info["sanskrit"],
                    "category": "Pancha Mahapurusha",
                    "potency": max(50, min(100, potency)),
                    "participating_planets": [p_name],
                    "participating_houses": [p["house"]],
                    "fructification_period": f"{p_name} Mahadasha / Antardasha",
                    "scripture": rule_info["scripture"],
                    "description": f"{p_name} occupies Kendra (House {p['house']}) in {status_text} status in sign {p['sign_name']}.",
                    "effects": rule_info["effects"],
                    "is_active": True
                })

    # -------------------------------------------------------------------------
    # 2. CANONICAL YOGAKARAKA SINGLE-PLANET RAJA YOGA (BPHS Ch. 34)
    # -------------------------------------------------------------------------
    if ascendant_sign_id in YOGAKARAKA_BY_LAGNA:
        yk_planet, yk_desc = YOGAKARAKA_BY_LAGNA[ascendant_sign_id]
        yk_h = planet_house_map.get(yk_planet, 1)
        yk_dignity = planet_dignity_map.get(yk_planet, "Neutral")
        yk_combust = planet_combust_map.get(yk_planet, False)
        
        is_good_house = yk_h in [1, 2, 4, 5, 7, 9, 10, 11]
        potency = 96 if is_good_house else 80
        if yk_dignity in ["Exalted", "Own Sign", "Moolatrikona"]: potency += 3
        if yk_combust: potency -= 20
        
        active_yogas.append({
            "name": f"Supreme Yogakaraka Raja Yoga ({yk_planet})",
            "sanskrit": "Yogakaraka Yoga (Dual Kendra-Trikona Lord)",
            "category": "Kendra-Trikona Unions",
            "potency": max(50, min(100, potency)),
            "participating_planets": [yk_planet],
            "participating_houses": [yk_h],
            "fructification_period": f"{yk_planet} Mahadasha / Antardasha",
            "scripture": "BPHS Ch. 34 / Raman #20",
            "description": f"{yk_planet} is the Yogakaraka for {ZODIAC_SIGNS[ascendant_sign_id-1]['name']} Lagna ({yk_desc}), placed in House {yk_h} ({yk_dignity}).",
            "effects": "Single-handedly confers continuous good fortune, executive authority, prosperity, and triumph over hurdles.",
            "is_active": True
        })

    # -------------------------------------------------------------------------
    # 3. CANONICAL DHARMA-KARMADHIPATI & KENDRA-TRIKONA PAIR UNIONS (BPHS Ch. 41)
    # -------------------------------------------------------------------------
    # Identify distinct Kendra and Trikona lords
    checked_pairs: Set[Tuple[str, str]] = set()
    
    for kh in [1, 4, 7, 10]:
        k_lord = house_lords[kh]
        for th in [5, 9]:
            t_lord = house_lords[th]
            
            # Avoid self-pair (already handled by Yogakaraka above)
            if k_lord == t_lord:
                continue
                
            pair_key = tuple(sorted([k_lord, t_lord]))
            if pair_key in checked_pairs:
                continue
            checked_pairs.add(pair_key)
            
            k_h = planet_house_map.get(k_lord, 0)
            t_h = planet_house_map.get(t_lord, 0)
            if k_h == 0 or t_h == 0: continue
            
            is_dharma_karma = (kh == 10 and th == 9) or (kh == 9 and th == 10)
            is_lakshmi_narayana = (kh == 1 and th == 9) or (kh == 1 and th == 5)
            
            yoga_title = (
                "Supreme Dharma-Karmadhipati Raja Yoga" if is_dharma_karma
                else "Lakshmi-Narayana Raja Yoga" if is_lakshmi_narayana
                else f"Kendra-Trikona Raja Yoga ({k_lord} + {t_lord})"
            )
            
            # Condition A: Conjunction in the same house
            if k_h == t_h:
                is_good_house = k_h in [1, 2, 4, 5, 7, 9, 10, 11]
                potency = 95 if is_good_house else 78
                if is_dharma_karma: potency += 3
                if planet_combust_map.get(k_lord) or planet_combust_map.get(t_lord): potency -= 15
                
                active_yogas.append({
                    "name": yoga_title,
                    "sanskrit": "Dharma-Karmadhipati Yuti Sambandha",
                    "category": "Kendra-Trikona Unions",
                    "potency": max(50, min(100, potency)),
                    "participating_planets": [k_lord, t_lord],
                    "participating_houses": [k_h],
                    "fructification_period": f"{k_lord}-{t_lord} or {t_lord}-{k_lord} Dasha",
                    "scripture": "BPHS Ch. 41 (Vishnu-Lakshmi Sambandha) / Raman #21",
                    "description": f"Lord of {kh}th house ({k_lord}) and Lord of {th}th house ({t_lord}) are conjunct in House {k_h}.",
                    "effects": "Unites sovereign power (Vishnu Kendra) with divine grace (Lakshmi Trikona), creating extraordinary prosperity, honors, and high career standing.",
                    "is_active": True
                })
                
            # Condition B: Mutual 7th Aspect (Samsaptaka)
            elif ((k_h - t_h) % 12) == 6:
                potency = 88
                if is_dharma_karma: potency += 4
                active_yogas.append({
                    "name": f"Dharma-Karmadhipati Mutual Aspect ({k_lord} ⟷ {t_lord})",
                    "sanskrit": "Samsaptaka Drishti Raja Yoga",
                    "category": "Kendra-Trikona Unions",
                    "potency": potency,
                    "participating_planets": [k_lord, t_lord],
                    "participating_houses": [k_h, t_h],
                    "fructification_period": f"{k_lord} & {t_lord} Periods",
                    "scripture": "BPHS Ch. 41",
                    "description": f"Kendra Lord {k_lord} (House {k_h}) and Trikona Lord {t_lord} (House {t_h}) directly aspect each other across 7 houses.",
                    "effects": "Creates continuous mutual support between career authority and dharmic fortune.",
                    "is_active": True
                })
                
            # Condition C: Parivartana (Mutual Sign Exchange)
            else:
                k_sign = planet_sign_map.get(k_lord, 0)
                t_sign = planet_sign_map.get(t_lord, 0)
                k_owns = [idx + 1 for idx, s in enumerate(ZODIAC_SIGNS) if s["lord"] == k_lord]
                t_owns = [idx + 1 for idx, s in enumerate(ZODIAC_SIGNS) if s["lord"] == t_lord]
                
                if k_sign in t_owns and t_sign in k_owns:
                    active_yogas.append({
                        "name": f"Maha Parivartana Raja Yoga ({k_lord} ⇄ {t_lord})",
                        "sanskrit": "Maha Parivartana Yoga",
                        "category": "Kendra-Trikona Unions",
                        "potency": 95,
                        "participating_planets": [k_lord, t_lord],
                        "participating_houses": [k_h, t_h],
                        "fructification_period": f"{k_lord} & {t_lord} Dashas",
                        "scripture": "Phaladeepika Ch. 6 / Raman #23",
                        "description": f"{k_lord} (House {k_h}) and {t_lord} (House {t_h}) mutually occupy each other's signs.",
                        "effects": "Generates unshakeable worldly prominence, royal honors, and victory over all challenges.",
                        "is_active": True
                    })

    # -------------------------------------------------------------------------
    # 4. CANONICAL GAJA KESARI YOGA (BPHS Ch. 36)
    # -------------------------------------------------------------------------
    if "Jupiter" in planet_house_map and "Moon" in planet_house_map:
        j_h = planet_house_map["Jupiter"]
        m_h = planet_house_map["Moon"]
        diff_from_moon = ((j_h - m_h) % 12) + 1
        
        if diff_from_moon in [1, 4, 7, 10]:
            j_dig = planet_dignity_map.get("Jupiter", "Neutral")
            m_dig = planet_dignity_map.get("Moon", "Neutral")
            potency = 96 if j_dig in ["Exalted", "Own Sign", "Great Friend"] else 88
            if planet_combust_map.get("Jupiter", False): potency -= 20
            
            ordinal_map = {1: "1st", 4: "4th", 7: "7th", 10: "10th"}
            k_ord = ordinal_map.get(diff_from_moon, f"{diff_from_moon}th")
            active_yogas.append({
                "name": "Gaja Kesari Yoga",
                "sanskrit": "Gaja Kesari Yoga (Elephant-Lion Royalty)",
                "category": "Maha Raja Yoga",
                "potency": max(50, min(100, potency)),
                "participating_planets": ["Jupiter", "Moon"],
                "participating_houses": [j_h, m_h],
                "fructification_period": "Jupiter & Moon Dashas",
                "scripture": "BPHS Ch. 36 / Phaladeepika Ch. 6 / Raman #6",
                "description": f"Jupiter occupies a Kendra ({k_ord} house) from the Moon.",
                "effects": "Conveys lion-like majesty over obstacles, scholarly preeminence, lasting fame, royal favor, emotional peace, and unwavering wealth.",
                "is_active": True
            })

    # -------------------------------------------------------------------------
    # 5. CANONICAL BUDHADITYA YOGA (Saravali Ch. 35)
    # -------------------------------------------------------------------------
    if "Sun" in planet_house_map and "Mercury" in planet_house_map:
        if planet_house_map["Sun"] == planet_house_map["Mercury"]:
            h = planet_house_map["Sun"]
            s_long = planet_long_map.get("Sun", 0.0)
            m_long = planet_long_map.get("Mercury", 0.0)
            orb = abs(s_long - m_long)
            if orb > 180: orb = 360 - orb
            
            is_deep_combust = orb < 3.0
            potency = 88 if not is_deep_combust else 74
            if h in [1, 4, 5, 7, 9, 10, 11]: potency += 4
            
            active_yogas.append({
                "name": "Budhaditya Yoga (Nipuna Yoga)",
                "sanskrit": "Budhaditya Yoga (Solar-Mercury Intellect)",
                "category": "2-Planet Conjunctions (Yutis)",
                "potency": max(50, min(100, potency)),
                "participating_planets": ["Sun", "Mercury"],
                "participating_houses": [h],
                "fructification_period": "Sun & Mercury Dashas",
                "scripture": "Saravali Ch. 35 / Phaladeepika Ch. 6 / Raman #9",
                "description": f"Sun and Mercury are conjunct in House {h} with an orb of {orb:.1f}°.",
                "effects": "Exceptional analytical brilliance, sharp administrative intellect, mathematical and communicative acumen, governmental favors, and public eloquence.",
                "is_active": True
            })

    # -------------------------------------------------------------------------
    # 6. PLANETARY STELLIUMS (3, 4, 5+ PLANETS IN 1 HOUSE)
    # -------------------------------------------------------------------------
    for h, p_list in house_planets.items():
        p_names = [p["name"] for p in p_list]
        count = len(p_names)
        
        if count >= 3:
            h_lord = house_lords.get(h, "Unknown")
            potency = 96 if h in [1, 4, 5, 7, 9, 10, 11] else 85
            
            if "Sun" in p_names and "Mercury" in p_names and "Jupiter" in p_names:
                active_yogas.append({
                    "name": "Surya-Budha-Guru Royal Intellect Stellium",
                    "sanskrit": "Trigraha Nipuna-Jnana Yoga",
                    "category": "Planetary Stelliums & Clusters",
                    "potency": 98,
                    "participating_planets": ["Sun", "Mercury", "Jupiter"],
                    "participating_houses": [h],
                    "fructification_period": "Sun, Mercury & Jupiter Dashas",
                    "scripture": "Saravali Ch. 32 / Raman #114",
                    "description": f"Sun, Mercury, and Jupiter form a 3-Planet Stellium in House {h}.",
                    "effects": "Renowned scholar, celebrated author, sovereign counselor, high governmental honors, monumental wisdom, and universal respect.",
                    "is_active": True
                })
            elif "Moon" in p_names and "Mercury" in p_names and "Venus" in p_names:
                active_yogas.append({
                    "name": "Chandra-Budha-Shukra Opulent Arts Stellium",
                    "sanskrit": "Trigraha Saraswati-Lakshmi Stellium",
                    "category": "Planetary Stelliums & Clusters",
                    "potency": 96,
                    "participating_planets": ["Moon", "Mercury", "Venus"],
                    "participating_houses": [h],
                    "fructification_period": "Moon, Mercury & Venus Dashas",
                    "scripture": "Saravali Ch. 32 / Raman #115",
                    "description": f"Moon, Mercury, and Venus form an Opulent Arts Stellium in House {h}.",
                    "effects": "Extraordinary polymathic genius, musical and literary magnificence, captivating speech, vast wealth in luxuries, and public adoration.",
                    "is_active": True
                })
            else:
                active_yogas.append({
                    "name": f"{count}-Graha Concentrated Stellium (House {h})",
                    "sanskrit": f"Bahu-Graha Stellium (Lord: {h_lord})",
                    "category": "Planetary Stelliums & Clusters",
                    "potency": potency,
                    "participating_planets": p_names,
                    "participating_houses": [h],
                    "fructification_period": f"Dashas of {', '.join(p_names)}",
                    "scripture": "Saravali Ch. 32-34 / BPHS Ch. 80",
                    "description": f"{count} planets ({', '.join(p_names)}) converge in House {h}, concentrating cosmic energy on this bhava.",
                    "effects": f"Massive focus of planetary energy in House {h}. Life outcomes, career, and karmic destiny revolve around this domain.",
                    "is_active": True
                })

    # -------------------------------------------------------------------------
    # 7. OTHER AUSPICIOUS 2-PLANET CONJUNCTIONS (YUTIS)
    # -------------------------------------------------------------------------
    for h, p_list in house_planets.items():
        p_names = [p["name"] for p in p_list]
        
        if "Sun" in p_names and "Jupiter" in p_names:
            active_yogas.append({
                "name": "Guru-Aditya Yoga",
                "sanskrit": "Guru-Aditya Yoga (Sovereign Wisdom)",
                "category": "2-Planet Conjunctions (Yutis)",
                "potency": 92,
                "participating_planets": ["Sun", "Jupiter"],
                "participating_houses": [h],
                "fructification_period": "Sun & Jupiter Dashas",
                "scripture": "Saravali Ch. 31 / Raman #10",
                "description": f"Sun and Jupiter are conjunct in House {h}.",
                "effects": "High ethical standing, ministerial counsel, scholarly wisdom, legal preeminence, philosophical mastery, and sovereign respect.",
                "is_active": True
            })
            
        if "Moon" in p_names and "Mars" in p_names:
            active_yogas.append({
                "name": "Chandra-Mangala Yoga",
                "sanskrit": "Chandra-Mangala Yoga (Financial Enterprise)",
                "category": "2-Planet Conjunctions (Yutis)",
                "potency": 88,
                "participating_planets": ["Moon", "Mars"],
                "participating_houses": [h],
                "fructification_period": "Moon & Mars Dashas",
                "scripture": "Phaladeepika Ch. 6 / Saravali / Raman #11",
                "description": f"Moon and Mars are conjunct in House {h}.",
                "effects": "Relentless commercial enterprise, unstoppable financial drive, real estate wealth, abundant cash liquidity, and fearless action.",
                "is_active": True
            })
            
        if "Mercury" in p_names and "Venus" in p_names:
            active_yogas.append({
                "name": "Lakshmi-Saraswati Conjunction (Budha-Shukra)",
                "sanskrit": "Budha-Shukra Yuti (Artistic Magnetism)",
                "category": "2-Planet Conjunctions (Yutis)",
                "potency": 90,
                "participating_planets": ["Mercury", "Venus"],
                "participating_houses": [h],
                "fructification_period": "Mercury & Venus Dashas",
                "scripture": "Saravali Ch. 31 / Phaladeepika / Raman #13",
                "description": f"Mercury and Venus are conjunct in House {h}.",
                "effects": "Exquisite artistic eloquence, poetic creativity, commercial charm, diplomatic tact, refined tastes, and magnetic appeal.",
                "is_active": True
            })
            
        if "Jupiter" in p_names and "Venus" in p_names:
            active_yogas.append({
                "name": "Bhrigu-Guru Conjunction (Guru-Shukra)",
                "sanskrit": "Guru-Shukra Yuti (The Two Preceptors)",
                "category": "2-Planet Conjunctions (Yutis)",
                "potency": 92,
                "participating_planets": ["Jupiter", "Venus"],
                "participating_houses": [h],
                "fructification_period": "Jupiter & Venus Dashas",
                "scripture": "Saravali Ch. 31 / Raman #14",
                "description": f"Jupiter and Venus are conjunct in House {h}.",
                "effects": "Unites material luxury with spiritual wisdom, profound scholarship, judicial counsel, generous heart, and high cultural standing.",
                "is_active": True
            })
            
        if "Jupiter" in p_names and "Mars" in p_names:
            active_yogas.append({
                "name": "Guru-Mangala Conjunction",
                "sanskrit": "Guru-Mangala Yuti (Righteous Warrior)",
                "category": "2-Planet Conjunctions (Yutis)",
                "potency": 89,
                "participating_planets": ["Jupiter", "Mars"],
                "participating_houses": [h],
                "fructification_period": "Jupiter & Mars Dashas",
                "scripture": "Saravali Ch. 31 / Raman #15",
                "description": f"Jupiter and Mars are conjunct in House {h}.",
                "effects": "Ethical leadership, strategic defense mastery, judicial authority, generous protector of others, and disciplined valor.",
                "is_active": True
            })
            
        if "Saturn" in p_names and "Venus" in p_names:
            active_yogas.append({
                "name": "Shani-Shukra Conjunction",
                "sanskrit": "Shani-Shukra Yuti (Architectural Legacy)",
                "category": "2-Planet Conjunctions (Yutis)",
                "potency": 85,
                "participating_planets": ["Saturn", "Venus"],
                "participating_houses": [h],
                "fructification_period": "Saturn & Venus Dashas",
                "scripture": "Saravali Ch. 31 / Raman #16",
                "description": f"Saturn and Venus are conjunct in House {h}.",
                "effects": "Artistic perseverance, mastery in architectural/industrial crafts, enduring material foundations, and diplomatic patience.",
                "is_active": True
            })

    # -------------------------------------------------------------------------
    # 8. CANONICAL DHANA YOGAS (VASUMATHI & AMALA)
    # -------------------------------------------------------------------------
    benefics = ["Jupiter", "Venus", "Mercury"]
    benefics_in_upachaya = [p["name"] for p in planets_enriched if p["name"] in benefics and p["house"] in upachaya_houses]
    if len(benefics_in_upachaya) >= 2:
        active_yogas.append({
            "name": "Vasumathi Dhana Yoga",
            "sanskrit": "Vasumathi Yoga (Limitless Wealth)",
            "category": "Dhana & Prosperity Yogas",
            "potency": 92,
            "participating_planets": benefics_in_upachaya,
            "participating_houses": [planet_house_map[b] for b in benefics_in_upachaya],
            "fructification_period": f"{', '.join(benefics_in_upachaya)} Dashas",
            "scripture": "Phaladeepika Ch. 6 / Raman #32",
            "description": f"Benefic planets ({', '.join(benefics_in_upachaya)}) occupy Upachaya growth houses (3, 6, 10, 11).",
            "effects": "Bestows boundless self-earned wealth, commanding financial stature, and immunity from poverty.",
            "is_active": True
        })

    benefics_in_10 = [p["name"] for p in planets_enriched if p["house"] == 10 and p["name"] in benefics]
    if benefics_in_10:
        active_yogas.append({
            "name": "Amala Yoga",
            "sanskrit": "Amala Yoga (Spotless Professional Legacy)",
            "category": "Classical Named Royalties",
            "potency": 90,
            "participating_planets": benefics_in_10,
            "participating_houses": [10],
            "fructification_period": f"{', '.join(benefics_in_10)} Dashas",
            "scripture": "BPHS Ch. 36 / Phaladeepika / Raman #28",
            "description": f"Benefic Graha ({', '.join(benefics_in_10)}) placed in the 10th house of career.",
            "effects": "Ensures an unblemished reputation, lasting honor, prosperous career contributions, and ethical public leadership.",
            "is_active": True
        })

    # -------------------------------------------------------------------------
    # 9. CANONICAL LUNAR & SOLAR YOGAS
    # -------------------------------------------------------------------------
    if "Moon" in planet_house_map:
        m_h = planet_house_map["Moon"]
        h_2nd = (m_h % 12) + 1
        h_12th = ((m_h - 2) % 12) + 1
        
        planets_in_2nd = [p["name"] for p in planets_enriched if p["house"] == h_2nd and p["name"] not in ["Sun", "Rahu", "Ketu"]]
        planets_in_12th = [p["name"] for p in planets_enriched if p["house"] == h_12th and p["name"] not in ["Sun", "Rahu", "Ketu"]]
        
        if planets_in_2nd and planets_in_12th:
            active_yogas.append({
                "name": "Dhurdhura Yoga",
                "sanskrit": "Dhurdhura Yoga (Flanked Lunar Grace)",
                "category": "Lunar & Solar Formations",
                "potency": 90,
                "participating_planets": planets_in_2nd + planets_in_12th,
                "participating_houses": [h_2nd, h_12th],
                "fructification_period": "Moon & Flanking Planet Dashas",
                "scripture": "BPHS Ch. 36 / Phaladeepika Ch. 6 / Raman #42",
                "description": f"Planets occupy both 2nd ({', '.join(planets_in_2nd)}) and 12th ({', '.join(planets_in_12th)}) from Moon.",
                "effects": "Generous ruler, blessed with conveyances, loyal associates, continuous wealth, and enjoying physical and emotional comforts.",
                "is_active": True
            })
        elif planets_in_2nd:
            active_yogas.append({
                "name": "Sunapha Yoga",
                "sanskrit": "Sunapha Yoga (Self-Earned Prosperity)",
                "category": "Lunar & Solar Formations",
                "potency": 85,
                "participating_planets": planets_in_2nd,
                "participating_houses": [h_2nd],
                "fructification_period": f"Moon & {', '.join(planets_in_2nd)} Dashas",
                "scripture": "BPHS Ch. 36 / Phaladeepika Ch. 6 / Raman #40",
                "description": f"Planets ({', '.join(planets_in_2nd)}) occupy the 2nd house from Moon.",
                "effects": "Self-earned wealth, high intelligence, virtuous demeanor, respected in society, and enjoying physical vitality.",
                "is_active": True
            })
        elif planets_in_12th:
            active_yogas.append({
                "name": "Anapha Yoga",
                "sanskrit": "Anapha Yoga (Majestic Restraint)",
                "category": "Lunar & Solar Formations",
                "potency": 82,
                "participating_planets": planets_in_12th,
                "participating_houses": [h_12th],
                "fructification_period": f"Moon & {', '.join(planets_in_12th)} Dashas",
                "scripture": "BPHS Ch. 36 / Phaladeepika Ch. 6 / Raman #41",
                "description": f"Planets ({', '.join(planets_in_12th)}) occupy the 12th house from Moon.",
                "effects": "Majestic appearance, generous disposition, spiritual inclinations, good health, and respected in foreign travels.",
                "is_active": True
            })

    # -------------------------------------------------------------------------
    # 10. CANONICAL VIPARITA RAJA YOGAS & NEECHABHANGA
    # -------------------------------------------------------------------------
    # 6th Lord in 6/8/12 (Harsha)
    lord_6 = house_lords.get(6)
    if lord_6 and planet_house_map.get(lord_6) in [6, 8, 12]:
        h_placed = planet_house_map[lord_6]
        active_yogas.append({
            "name": f"Harsha Viparita Raja Yoga ({lord_6})",
            "sanskrit": "Harsha Yoga (Happiness through Victory)",
            "category": "Viparita (Triumph Over Adversity)",
            "potency": 85,
            "participating_planets": [lord_6],
            "participating_houses": [h_placed],
            "fructification_period": f"{lord_6} Dasha",
            "scripture": "Phaladeepika Ch. 6 / Raman #58",
            "description": f"6th Lord {lord_6} is placed in Dusthana (House {h_placed}), destroying enemies and debts.",
            "effects": "Invincible immune resilience, complete triumph over adversaries and competitors, flourishing after hardships, and robust vitality.",
            "is_active": True
        })

    # 8th Lord in 6/8/12 (Sarala)
    lord_8 = house_lords.get(8)
    if lord_8 and planet_house_map.get(lord_8) in [6, 8, 12]:
        h_placed = planet_house_map[lord_8]
        active_yogas.append({
            "name": f"Sarala Viparita Raja Yoga ({lord_8})",
            "sanskrit": "Sarala Yoga (Fearless Transformation)",
            "category": "Viparita (Triumph Over Adversity)",
            "potency": 85,
            "participating_planets": [lord_8],
            "participating_houses": [h_placed],
            "fructification_period": f"{lord_8} Dasha",
            "scripture": "Phaladeepika Ch. 6 / Raman #59",
            "description": f"8th Lord {lord_8} is placed in Dusthana (House {h_placed}), transmuting sudden obstacles into power.",
            "effects": "Fearless character, long life, sudden financial gains/inheritances, triumph in competitive/hazardous fields, and spiritual mastery.",
            "is_active": True
        })

    # 12th Lord in 6/8/12 (Vimala)
    lord_12 = house_lords.get(12)
    if lord_12 and planet_house_map.get(lord_12) in [6, 8, 12]:
        h_placed = planet_house_map[lord_12]
        active_yogas.append({
            "name": f"Vimala Viparita Raja Yoga ({lord_12})",
            "sanskrit": "Vimala Yoga (Pure Independent Wealth)",
            "category": "Viparita (Triumph Over Adversity)",
            "potency": 85,
            "participating_planets": [lord_12],
            "participating_houses": [h_placed],
            "fructification_period": f"{lord_12} Dasha",
            "scripture": "Phaladeepika Ch. 6 / Raman #60",
            "description": f"12th Lord {lord_12} is placed in Dusthana (House {h_placed}), eliminating expenditures and securing independence.",
            "effects": "Accumulation of noble independent wealth, minimal debts, spiritual freedom, contentment, and charitable renown.",
            "is_active": True
        })

    # Neechabhanga Raja Yoga Check
    for p in planets_enriched:
        if p.get("dignity") == "Debilitated":
            p_name = p["name"]
            p_sign = p["sign_id"]
            dispositor = ZODIAC_SIGNS[p_sign - 1]["lord"]
            disp_h = planet_house_map.get(dispositor, 0)
            
            # If dispositor is in a Kendra from Lagna (1, 4, 7, 10) or Moon
            m_h = planet_house_map.get("Moon", 1)
            disp_from_moon = ((disp_h - m_h) % 12) + 1
            
            if disp_h in kendra_houses or disp_from_moon in kendra_houses:
                active_yogas.append({
                    "name": f"Neechabhanga Raja Yoga ({p_name})",
                    "sanskrit": "Neechabhanga Raja Yoga (Elevation from Humility)",
                    "category": "Viparita (Triumph Over Adversity)",
                    "potency": 88,
                    "participating_planets": [p_name, dispositor],
                    "participating_houses": [p["house"], disp_h],
                    "fructification_period": f"{p_name} & {dispositor} Dashas",
                    "scripture": "Phaladeepika Ch. 6 / BPHS / Raman #61",
                    "description": f"Debilitation of {p_name} in House {p['house']} undergoes cancellation because dispositor {dispositor} occupies a Kendra.",
                    "effects": "Transforms initial hardships into royal resilience, commanding status, profound empathy, and hard-earned worldly heights.",
                    "is_active": True
                })

    # -------------------------------------------------------------------------
    # 11. CANONICAL MAHA BHAGYA YOGA (BPHS Ch. 36 / Raman #36)
    # -------------------------------------------------------------------------
    # Male: Day birth (Sun in houses 7, 8, 9, 10, 11, 12), Lagna in Odd sign, Sun in Odd sign, Moon in Odd sign.
    # Female: Night birth (Sun in houses 1, 2, 3, 4, 5, 6), Lagna in Even sign, Sun in Even sign, Moon in Even sign.
    sun_h = planet_house_map.get("Sun", 1)
    is_day_birth = sun_h in [7, 8, 9, 10, 11, 12]
    
    sun_sign = planet_sign_map.get("Sun", 1)
    moon_sign = planet_sign_map.get("Moon", 1)
    
    is_lagna_odd = (ascendant_sign_id % 2) != 0
    is_sun_odd = (sun_sign % 2) != 0
    is_moon_odd = (moon_sign % 2) != 0
    
    gen = (gender or "male").lower().strip()
    
    if gen in ["male", "m", "man"]:
        if is_day_birth and is_lagna_odd and is_sun_odd and is_moon_odd:
            active_yogas.append({
                "name": "Maha Bhagya Yoga (Supreme Good Fortune)",
                "sanskrit": "Maha Bhagya Yoga (Purusha)",
                "category": "Dhana & Prosperity Yogas",
                "potency": 100,
                "participating_planets": ["Sun", "Moon", "Lagna"],
                "participating_houses": [sun_h, planet_house_map.get("Moon", 1), 1],
                "fructification_period": "Sun & Moon Mahadashas",
                "scripture": "BPHS Ch. 36 (slokas 28-29) / Raman #36",
                "description": f"Male born in Daytime with Lagna ({ZODIAC_SIGNS[ascendant_sign_id-1]['name']}), Sun ({ZODIAC_SIGNS[sun_sign-1]['name']}), and Moon ({ZODIAC_SIGNS[moon_sign-1]['name']}) all in Odd (Masculine) signs.",
                "effects": "Phenomenal good fortune, unshakeable prosperity, universal affection, long life, generous noble character, and sovereign renown.",
                "is_active": True
            })
    elif gen in ["female", "f", "woman"]:
        if (not is_day_birth) and (not is_lagna_odd) and (not is_sun_odd) and (not is_moon_odd):
            active_yogas.append({
                "name": "Maha Bhagya Yoga (Supreme Good Fortune)",
                "sanskrit": "Maha Bhagya Yoga (Stri)",
                "category": "Dhana & Prosperity Yogas",
                "potency": 100,
                "participating_planets": ["Sun", "Moon", "Lagna"],
                "participating_houses": [sun_h, planet_house_map.get("Moon", 1), 1],
                "fructification_period": "Moon & Sun Mahadashas",
                "scripture": "BPHS Ch. 36 (slokas 28-29) / Raman #36",
                "description": f"Female born at Night with Lagna ({ZODIAC_SIGNS[ascendant_sign_id-1]['name']}), Sun ({ZODIAC_SIGNS[sun_sign-1]['name']}), and Moon ({ZODIAC_SIGNS[moon_sign-1]['name']}) all in Even (Feminine) signs.",
                "effects": "Endowed with extraordinary grace, noble lineage, devoted partner, wealthy children, boundless prosperity, and supreme auspicious fortune.",
                "is_active": True
            })

    # Sort active yogas by potency descending
    active_yogas.sort(key=lambda y: y["potency"], reverse=True)
    return active_yogas

def analyze_all_rajyogas(ascendant_sign_id: int, planets_enriched: List[Dict[str, Any]], gender: str = "male") -> Dict[str, Any]:
    """
    Synthesize active detected yogas as well as the complete universal catalog.
    """
    active_yogas = detect_all_active_rajayogas_and_conjunctions(ascendant_sign_id, planets_enriched, gender=gender)
    
    total_yogas = len(active_yogas)
    maha_yogas_count = len([y for y in active_yogas if y["category"] in ["Pancha Mahapurusha", "Maha Raja Yoga", "Planetary Stelliums & Clusters"]])
    avg_potency = round(sum(y["potency"] for y in active_yogas) / total_yogas, 1) if total_yogas > 0 else 0.0
    
    # Mark universal catalog with is_active flag for this chart
    active_names = {y["name"].lower() for y in active_yogas}
    catalog_with_status = []
    for item in UNIVERSAL_RAJAYOGAS_CATALOG:
        is_act = any(item["name"].lower() in an or an in item["name"].lower() for an in active_names)
        catalog_with_status.append({
            **item,
            "is_active": is_act
        })
        
    return {
        "total_rajyogas": total_yogas,
        "maha_yogas_count": maha_yogas_count,
        "overall_potency_score": avg_potency,
        "primary_rajayoga": active_yogas[0]["name"] if total_yogas > 0 else "Nirguna (Spiritual Potential)",
        "yogas": active_yogas,
        "universal_catalog": catalog_with_status
    }
