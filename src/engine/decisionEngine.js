
import { calculateTrueCost } from "./trueCost";
import { analyzeConnection } from "./connectionAnalyzer";
import { explainScore } from "./explainScore";

export function buildDecision(offer, allOffers, extras={}) {
  const trueCost = calculateTrueCost(offer, extras);
  const connection = analyzeConnection(offer);
  const reasons = explainScore(offer, allOffers);

  const fareFlex = (offer.refundable ? 5 : 0) + (offer.changeable ? 5 : 0);
  const baggage = Math.min(10, (offer.baggageKg || 0) / 3);
  const priceRank = [...allOffers].sort((a,b)=>a.price-b.price).findIndex(x=>x.id===offer.id);
  const priceComponent = Math.max(0, 20 - Math.max(0,priceRank)*5);

  const decisionScore = Math.round(Math.min(100,
    (offer.score || 70) * .55 +
    connection.score * .15 +
    baggage +
    fareFlex +
    priceComponent
  ));

  let verdict = decisionScore >= 88 ? "EXCELLENT CHOICE"
    : decisionScore >= 78 ? "STRONG CHOICE"
    : decisionScore >= 68 ? "GOOD ALTERNATIVE"
    : "TRADE-OFF OPTION";

  return { ...offer, trueCost, connection, reasons, decisionScore, verdict };
}

export function compareOffers(offers, extras={}) {
  return offers.map(o=>buildDecision(o,offers,extras)).sort((a,b)=>b.decisionScore-a.decisionScore);
}
