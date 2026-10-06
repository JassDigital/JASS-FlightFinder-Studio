
export function explainScore(offer, allOffers) {
  const prices = allOffers.map(x=>x.price);
  const times = allOffers.map(x=>x.durationMin);
  const minPrice = Math.min(...prices), minTime = Math.min(...times);
  const reasons = [];
  if (offer.price === minPrice) reasons.push("lowest available fare");
  if (offer.durationMin === minTime) reasons.push("fastest journey");
  if (offer.stops === 0) reasons.push("non-stop");
  if ((offer.baggageKg || 0) >= 30) reasons.push("strong checked-baggage allowance");
  if (offer.emissionsKg != null && offer.emissionsKg === Math.min(...allOffers.filter(x=>x.emissionsKg!=null).map(x=>x.emissionsKg)))
    reasons.push("lowest emissions in this result set");
  return reasons.length ? reasons : ["balanced price, time and travel conditions"];
}
