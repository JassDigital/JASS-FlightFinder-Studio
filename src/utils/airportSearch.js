
export function airportMatches(airports, query) {
  const q = query.trim().toLowerCase();
  if (!q) return airports.slice(0, 8);
  return airports.filter(a => {
    const hay = [a.iata, a.name, a.city, a.country, a.region, ...(a.aliases||[])].join(" ").toLowerCase();
    return hay.includes(q);
  }).slice(0, 8);
}

export function nearbyAirports(airports, iata) {
  const a = airports.find(x => x.iata === iata);
  if (!a) return [];
  return (a.nearby || []).map(code => airports.find(x => x.iata === code)).filter(Boolean);
}
