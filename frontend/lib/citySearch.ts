export interface CityResult {
  name: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
  tz: number;
}

// Approximate standard timezone offset from longitude (for instant fallback)
export function estimateTimezoneFromCoordinates(lat: number, lon: number, countryCode?: string): number {
  const code = (countryCode || '').toUpperCase();
  // Standard fixed timezone countries
  if (code === 'IN' || (lat >= 8 && lat <= 37 && lon >= 68 && lon <= 97)) return 5.5; // India
  if (code === 'NP' || (lat >= 26 && lat <= 31 && lon >= 80 && lon <= 89)) return 5.75; // Nepal
  if (code === 'LK') return 5.5; // Sri Lanka
  if (code === 'PK') return 5.0; // Pakistan
  if (code === 'BD') return 6.0; // Bangladesh
  if (code === 'GB' || code === 'UK') return 0.0; // United Kingdom
  if (code === 'FR' || code === 'DE' || code === 'IT' || code === 'ES' || code === 'NL') return 1.0; // Central Europe
  if (code === 'AE' || code === 'SA') return 4.0; // Gulf
  if (code === 'SG' || code === 'MY' || code === 'HK') return 8.0; // SGT
  if (code === 'JP') return 9.0; // Japan
  if (code === 'AU') {
    if (lon < 129) return 8.0;
    if (lon < 138) return 9.5;
    return 10.0;
  }
  if (code === 'US' || code === 'CA') {
    if (lon > -75) return -5.0; // Eastern
    if (lon > -90) return -6.0; // Central
    if (lon > -105) return -7.0; // Mountain
    return -8.0; // Pacific
  }

  // Geometric longitude estimation (15 degrees = 1 hour)
  const rawOffset = lon / 15;
  return Math.round(rawOffset * 2) / 2; // round to nearest 0.5 hour
}

// Live Internet City Geocoder using free high-speed Photon (OSM) API
export async function searchGlobalCitiesInternet(query: string): Promise<CityResult[]> {
  if (!query || query.trim().length < 2) return [];

  const cleanQuery = query.trim();
  const results: CityResult[] = [];

  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQuery)}&limit=12&lang=en`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Photon status ${res.status}`);

    const data = await res.json();
    if (data && Array.isArray(data.features)) {
      data.features.forEach((feat: any) => {
        const props = feat.properties || {};
        const coords = feat.geometry?.coordinates;
        if (!coords || coords.length < 2) return;

        const lon = coords[0];
        const lat = coords[1];
        const city = props.name || props.city || props.town || props.village || props.district || cleanQuery;
        const state = props.state || props.county || '';
        const country = props.country || '';
        const countryCode = props.countrycode || '';

        const nameParts = [city];
        if (state && state !== city) nameParts.push(state);
        if (country) nameParts.push(country);

        const fullName = nameParts.join(', ');
        const tz = estimateTimezoneFromCoordinates(lat, lon, countryCode);

        // Deduplicate
        if (!results.some((r) => Math.abs(r.lat - lat) < 0.05 && Math.abs(r.lon - lon) < 0.05)) {
          results.push({
            name: fullName,
            city,
            state,
            country,
            lat: parseFloat(lat.toFixed(4)),
            lon: parseFloat(lon.toFixed(4)),
            tz,
          });
        }
      });
    }
  } catch (err) {
    console.warn('Live geocoding fallback to offline database:', err);
  }

  return results;
}
