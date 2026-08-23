"""
LLM Scriptural Synthesis Engine for Canonical Jyotish Predictions.
Cites Brihat Parashara Hora Shastra (BPHS), Phaladeepika, and Saravali.
Produces structured, non-fatalistic, empowering spiritual and practical insights.
Integrates with Google Gemini API when available with a deep classical Parashari fallback engine.
"""
import os
import json
import logging
from typing import Dict, List, Any, Optional

logger = logging.getLogger("jyotish.llm")

def build_classical_scriptural_insights(context: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Deterministic classical Jyotish synthesis based on BPHS, Phaladeepika, and Saravali.
    Constructs empowering, non-fatalistic predictions across all major life pillars.
    """
    asc = context.get("ascendant", {})
    planets = {p["name"]: p for p in context.get("planets", [])}
    vargas = context.get("vargas", {})
    dasha = context.get("vimshottari_dasha", {})
    numerology = context.get("numerology", {})
    vargottama = context.get("vargottama_planets", [])
    
    asc_sign = asc.get("sign_name", "Aries")
    asc_sanskrit = asc.get("sign_sanskrit", "Mesha")
    asc_nakshatra = asc.get("nakshatra_name", "Ashwini")
    asc_lord = asc.get("nakshatra_lord", "Ketu")
    
    sun = planets.get("Sun", {})
    moon = planets.get("Moon", {})
    jupiter = planets.get("Jupiter", {})
    saturn = planets.get("Saturn", {})
    
    active_dasha_str = dasha.get("active_period_string", "Sun - Moon - Mars")
    active_maha = dasha.get("active_mahadasha", "Jupiter")
    
    insights: List[Dict[str, Any]] = []
    
    # 1. Dharma (Life Purpose & Core Identity)
    vargottama_mention = ""
    if vargottama:
        vargottama_mention = f" Notable planetary strength is conferred by Vargottama {', '.join(vargottama)}, indicating unwavering karmic resilience."
        
    insights.append({
        "category": "Dharma",
        "title": f"Soul Blueprint: {asc_sanskrit} Lagna ({asc_sign}) & {asc_nakshatra} Nakshatra",
        "classical_source": "Brihat Parashara Hora Shastra (Ch. 12: Tanu Bhava Phala)",
        "text": (
            f"With your Ascendant rising in {asc_sign} ({asc_sanskrit}) governed through {asc_nakshatra} Nakshatra, "
            f"BPHS describes your constitution as inherently oriented toward principled action, self-sovereignty, and truth. "
            f"Your Sun placed in {sun.get('sign_name', 'Aries')} (House {sun.get('house', 1)}) bestows radiant vital force and an instinctive drive to illuminate your surroundings.{vargottama_mention} "
            f"Your consciousness functions as a bridge between high visionary ideals and pragmatic worldly duty."
        ),
        "empowering_takeaway": "Step into your sovereign authority without fear; your natural authenticity is your greatest karmic shield.",
        "remedial_measures": [
            f"Chant the Gayatri Mantra or Aditya Hridaya Stotram at sunrise to strengthen solar prana.",
            f"Honor your birth Nakshatra deity ({asc.get('nakshatra_lord', 'Ketu')}) through conscious gratitude and mindfulness meditation."
        ]
    })
    
    # 2. Artha (Career, Wealth & Public Influence - D10 Dashamsha)
    d10 = vargas.get("D10", {})
    d10_10th_house = next((h for h in d10.get("houses", []) if h["house_number"] == 10), {})
    d10_10th_sign = d10_10th_house.get("sign_name", "Capricorn")
    d10_planets = d10_10th_house.get("planets", [])
    
    d10_text = (
        f"In your Dashamsha (D10 chart of professional power), the 10th House of Karma falls in {d10_10th_sign}."
    )
    if d10_planets:
        d10_text += f" The auspicious placement of {', '.join(d10_planets)} in your 10th harmonic indicates decisive leadership, organizational mastery, and recognized mastery in your field."
    else:
        d10_text += f" Under the stewardship of its lord {d10_10th_house.get('lord', 'Saturn')}, Saravali notes that long-term strategic execution and building enduring institutional value will yield highest honors."
        
    insights.append({
        "category": "Artha",
        "title": "Professional Mastery & Public Power (D10 Dashamsha)",
        "classical_source": "Saravali of Kalyanavarma (Ch. 32: Karma Bhava Yoga)",
        "text": (
            f"{d10_text} Your financial stability expands when you integrate ethical stewardship with innovative execution. "
            f"Jupiter's position in {jupiter.get('sign_name', 'Cancer')} (House {jupiter.get('house', 4)}) grants natural counsel, discernment, and capacity to elevate institutions and communities."
        ),
        "empowering_takeaway": "Align your career not merely with transient gain, but with building lasting architectural legacy.",
        "remedial_measures": [
            "Support education, scholarly publications, or mentorship programs on Thursdays.",
            "Maintain clean, uncluttered northern and eastern sectors in your workspace to enhance prosperity flow."
        ]
    })
    
    # 3. Kama (Harmonious Relationships & Social Dynamics)
    insights.append({
        "category": "Kama",
        "title": "Sacred Union & Relational Harmony (D9 Navamsha Synthesis)",
        "classical_source": "Phaladeepika by Mantreswara (Ch. 14: Kalatra Bhava)",
        "text": (
            f"Your Moon placed in {moon.get('sign_name', 'Taurus')} ({moon.get('nakshatra_name', 'Rohini')} Nakshatra) gives emotional depth, "
            f"aesthetic refinement, and a profound desire for soulful connection. "
            f"Phaladeepika teaches that partnerships flourish when mutual spiritual freedom and emotional safety are nurtured above rigid expectations. "
            f"Your relational karmic axis encourages open dialogue, gentle patience, and shared creative aspirations."
        ),
        "empowering_takeaway": "True partnership is a sacred mirror for mutual spiritual evolution; communicate with unconditional empathy.",
        "remedial_measures": [
            "Practice Shukra (Venus) reverence on Fridays by wearing clean pastel or white garments and expressing gratitude to loved ones.",
            "Donate milk, rice, or silver ornaments to spiritual seekers or mothers in need."
        ]
    })
    
    # 4. Active Vimshottari Dasha Guidance
    insights.append({
        "category": "Dasha",
        "title": f"Vimshottari Current Cycle: {active_dasha_str}",
        "classical_source": "Brihat Parashara Hora Shastra (Ch. 46: Vimshottari Dasha Phala)",
        "text": (
            f"You are currently traversing the active vibrational stream of {active_dasha_str}. "
            f"As the overarching ruler, {active_maha} stimulates the houses and significations it commands in your natal chart. "
            f"Parashara states that this period activates profound internal refinement, sharpening your focus on career breakthroughs, "
            f"deeper intellectual inquiries, and foundational restructuring of daily routines. "
            f"Harmonizing with this cycle requires deliberate pacing, strategic discipline, and releasing outdated attachments."
        ),
        "empowering_takeaway": f"Harness the energy of {active_maha} with focused meditation and intentional goal execution.",
        "remedial_measures": [
            f"Recite the planetary mantra for {active_maha} during its weekday rulership.",
            f"Engage in silent contemplative journaling and Seva (selfless service) to neutralize any minor malefic sub-influences."
        ]
    })
    
    # 5. Vedic Numerology (Sankhya Shastra) Integration
    mulank = numerology.get("mulank", 1)
    bhagyank = numerology.get("bhagyank", 1)
    namank = numerology.get("namank", 1)
    insights.append({
        "category": "Numerology",
        "title": f"Sankhya Shastra Vibrational Alignment (Driver {mulank} | Destiny {bhagyank} | Name {namank})",
        "classical_source": "Sankhya Shastra & Vedic Numerological Tantra",
        "text": (
            f"In the sacred science of numbers, your Driver Number {mulank} vibrates with {numerology.get('mulank_profile', {}).get('planet', 'Sun')}, "
            f"while your Destiny Number {bhagyank} aligns with {numerology.get('bhagyank_profile', {}).get('planet', 'Sun')}. "
            f"Your Chaldean Name Number {namank} channels {numerology.get('namank_profile', {}).get('planet', 'Sun')}. "
            f"{numerology.get('synergy_analysis', '')}"
        ),
        "empowering_takeaway": "Harmonize your external personal brand with your internal soul frequency.",
        "remedial_measures": [
            f"Integrate your auspicious colors ({', '.join(numerology.get('mulank_profile', {}).get('lucky_colors', ['Gold', 'White'])[:2])}) into your daily environment.",
            f"Chant your primary root mantra: '{numerology.get('mulank_profile', {}).get('mantra', 'Om Namo Narayanaya')}' 108 times."
        ]
    })
    
    return insights

async def generate_scriptural_insights(context: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Generate scriptural insights via Google Gemini API if key is configured,
    or smoothly fallback to the deterministic Parashari engine.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return build_classical_scriptural_insights(context)
        
    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        
        prompt = f"""
You are a venerable Jyotishacharya (Classical Vedic Astrologer) versed in Brihat Parashara Hora Shastra (BPHS), Phaladeepika (Mantreswara), and Saravali (Kalyanavarma).
Analyze the following comprehensive JSON birth chart context and provide a structured, non-fatalistic, deeply empowering spiritual and practical reading.

ASTROLOGICAL DATA CONTEXT:
{json.dumps(context, indent=2)}

OUTPUT FORMAT REQUIREMENTS:
Return a valid JSON array of 5 objects matching this exact JSON schema:
[
  {{
    "category": "Dharma",
    "title": "Title here",
    "classical_source": "BPHS Ch. XX or specific scripture",
    "text": "Detailed classical reading...",
    "empowering_takeaway": "Short inspirational summary",
    "remedial_measures": ["Remedy 1", "Remedy 2"]
  }},
  ... (Categories: Dharma, Artha, Kama, Dasha, Numerology)
]
Do not include markdown code fence formatting outside the JSON if possible, just the valid JSON array.
"""
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        
        cleaned_text = response.text.strip()
        if cleaned_text.startswith("```json"):
            cleaned_text = cleaned_text[7:]
        if cleaned_text.endswith("```"):
            cleaned_text = cleaned_text[:-3]
        cleaned_text = cleaned_text.strip()
        
        parsed = json.loads(cleaned_text)
        if isinstance(parsed, list) and len(parsed) > 0:
            return parsed
    except Exception as e:
        logger.warning(f"Gemini API call skipped/fallback triggered: {e}")
        
    return build_classical_scriptural_insights(context)
