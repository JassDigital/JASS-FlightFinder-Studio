
export function normalizeOffer(raw, provider) {
  return {
    id: raw.id,
    provider,
    airline: raw.airline,
    flightNumber: raw.flightNumber || "",
    origin: raw.origin,
    destination: raw.destination,
    departure: raw.departure,
    arrival: raw.arrival,
    durationMin: raw.durationMin || 0,
    stops: raw.stops ?? 0,
    price: raw.price || 0,
    currency: raw.currency || "INR",
    baggageKg: raw.baggageKg ?? null,
    cabin: raw.cabin || "Economy",
    refundable: !!raw.refundable,
    changeable: !!raw.changeable,
    emissionsKg: raw.emissionsKg ?? null,
    segments: raw.segments || [],
    deepLink: raw.deepLink || null,
    rawProviderData: raw.rawProviderData || null
  };
}
