
export function scoreOffer(offer, allOffers) {
  const prices = allOffers.map(x=>x.price);
  const times = allOffers.map(x=>x.durationMin);
  const priceMin = Math.min(...prices), priceMax = Math.max(...prices);
  const timeMin = Math.min(...times), timeMax = Math.max(...times);

  const priceScore = priceMax === priceMin ? 100 : 100 - ((offer.price-priceMin)/(priceMax-priceMin))*35;
  const timeScore = timeMax === timeMin ? 100 : 100 - ((offer.durationMin-timeMin)/(timeMax-timeMin))*25;
  const stopScore = offer.stops === 0 ? 25 : offer.stops === 1 ? 17 : 8;
  const baggageScore = Math.min(10, (offer.baggageKg || 0) / 3);
  const carbonScore = offer.carbonKg ? Math.max(0, 10 - offer.carbonKg / 200) : 5;

  const total = Math.round(Math.max(0, Math.min(100,
    priceScore*.35 + timeScore*.25 + stopScore + baggageScore + carbonScore
  )));
  return {...offer, score: total, priceScore:Math.round(priceScore), timeScore:Math.round(timeScore)};
}

export function rankOffers(offers) {
  return offers.map(x=>scoreOffer(x,offers)).sort((a,b)=>b.score-a.score);
}
