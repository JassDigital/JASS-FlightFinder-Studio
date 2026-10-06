
export function analyzeConnection(offer) {
  if (!offer.segments || offer.segments.length < 2)
    return {score:100, risk:"None", note:"Non-stop itinerary"};

  const layovers = [];
  for (let i=0;i<offer.segments.length-1;i++) {
    const a = new Date(offer.segments[i].arrival);
    const b = new Date(offer.segments[i+1].departure);
    const minutes = Math.max(0, Math.round((b-a)/60000));
    layovers.push(minutes);
  }

  const min = Math.min(...layovers);
  let score = min < 75 ? 45 : min < 120 ? 70 : min < 180 ? 88 : 96;
  let risk = min < 75 ? "High" : min < 120 ? "Moderate" : "Low";
  return {score, risk, shortestLayoverMin:min, note:`Shortest connection: ${min} minutes`};
}
