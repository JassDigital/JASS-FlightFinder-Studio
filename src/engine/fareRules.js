
export function fareSummary(offer) {
  return {
    refundability: offer.refundable ? "Refundable" : "Non-refundable",
    changes: offer.changeable ? "Changes permitted (fee may apply)" : "Changes restricted",
    baggage: offer.baggageKg ? `${offer.baggageKg} kg checked baggage` : "Baggage not confirmed",
    cabin: offer.cabin || "Economy",
    warning: !offer.refundable && !offer.changeable
      ? "Low flexibility fare — verify restrictions before booking."
      : null
  };
}
