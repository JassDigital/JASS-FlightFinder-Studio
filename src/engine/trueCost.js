
export function calculateTrueCost(offer, extras={}) {
  const baggage = Number(extras.baggage || 0);
  const seat = Number(extras.seat || 0);
  const meal = Number(extras.meal || 0);
  const transfer = Number(extras.transfer || 0);
  return {
    baseFare: offer.price,
    baggage,
    seat,
    meal,
    transfer,
    total: offer.price + baggage + seat + meal + transfer
  };
}
