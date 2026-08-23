import { PlanetPosition } from '../types/jyotish';

export interface AspectRay {
  sourceHouse: number;
  targetHouse: number;
  planetName: string;
  planetColor: string;
  aspectType: string;
  drishtiStrength: number; // 100% for full, 75% for special
  description: string;
}

// Classical Parashari Drishti (Aspect) Rules
export function calculatePlanetaryAspects(
  planets: PlanetPosition[],
  selectedPlanetName?: string | null
): AspectRay[] {
  const rays: AspectRay[] = [];

  const targetPlanets = selectedPlanetName
    ? planets.filter((p) => p.name === selectedPlanetName)
    : planets;

  targetPlanets.forEach((p) => {
    const fromHouse = p.house;
    if (!fromHouse) return;

    const addAspect = (offset: number, aspectType: string, strength: number, desc: string) => {
      let toHouse = (fromHouse + offset - 1) % 12;
      if (toHouse <= 0) toHouse += 12;
      rays.push({
        sourceHouse: fromHouse,
        targetHouse: toHouse,
        planetName: p.name,
        planetColor: p.color,
        aspectType,
        drishtiStrength: strength,
        description: desc,
      });
    };

    // Standard 7th House Full Aspect (Purna Drishti) for all Grahas
    addAspect(7, '7th House Aspect (Purna Drishti)', 100, 'Direct opposing house illumination');

    // Special Aspects (Vishesha Drishti)
    if (p.name === 'Mars') {
      addAspect(4, '4th House Special Aspect (Chaturtha Drishti)', 100, 'Aggressive protection and property focus');
      addAspect(8, '8th House Special Aspect (Ashtama Drishti)', 100, 'Transformational and longevity oversight');
    } else if (p.name === 'Jupiter') {
      addAspect(5, '5th House Divine Aspect (Panchama Guru Drishti)', 100, 'Intellect, progeny, and past merit benediction');
      addAspect(9, '9th House Divine Aspect (Navama Guru Drishti)', 100, 'Dharma, fortune, and spiritual wisdom grace');
    } else if (p.name === 'Saturn') {
      addAspect(3, '3rd House Special Aspect (Tritiya Shani Drishti)', 100, 'Discipline, courage, and perseverance pressure');
      addAspect(10, '10th House Special Aspect (Dashama Shani Drishti)', 100, 'Karmic duty, authority, and career endurance');
    } else if (p.name === 'Rahu' || p.name === 'Ketu') {
      addAspect(5, '5th House Nodal Aspect (Trikona Drishti)', 75, 'Subtle karmic obsession/detachment projection');
      addAspect(9, '9th House Nodal Aspect (Trikona Drishti)', 75, 'Philosophical and destiny alignment');
    }
  });

  return rays;
}
