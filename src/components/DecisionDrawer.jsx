
import React from "react";
import {X,CheckCircle2,AlertTriangle,ShieldCheck,Luggage,Clock3,IndianRupee,Sparkles} from "lucide-react";
import {fareSummary} from "../engine/fareRules";

export default function DecisionDrawer({offer,onClose}) {
  if(!offer) return null;
  const fare=fareSummary(offer);
  return <div className="drawerOverlay" onClick={onClose}>
    <aside className="decisionDrawer" onClick={e=>e.stopPropagation()}>
      <header><div><small>JASS TRAVEL DECISION</small><h2>{offer.airline}</h2><p>{offer.route?.join(" → ")}</p></div><button onClick={onClose}><X/></button></header>

      <section className="decisionHero">
        <div><span>JASS DECISION SCORE</span><strong>{offer.decisionScore}<small>/100</small></strong><b>{offer.verdict}</b></div>
        <div className="recommend"><Sparkles/> Recommended based on total value</div>
      </section>

      <section className="costBox">
        <h3>True Trip Cost</h3>
        <div><span>Ticket fare</span><b>₹{offer.trueCost.baseFare.toLocaleString("en-IN")}</b></div>
        <div><span>Baggage allowance</span><b>{offer.trueCost.baggage ? "₹"+offer.trueCost.baggage.toLocaleString("en-IN") : "Included / estimated"}</b></div>
        <div><span>Seat / meal / transfer</span><b>₹{(offer.trueCost.seat+offer.trueCost.meal+offer.trueCost.transfer).toLocaleString("en-IN")}</b></div>
        <hr/><div className="total"><span>Estimated true cost</span><strong>₹{offer.trueCost.total.toLocaleString("en-IN")}</strong></div>
      </section>

      <section className="metrics">
        <div><Luggage/><span>Baggage</span><b>{offer.baggageKg || "—"} kg</b></div>
        <div><Clock3/><span>Journey</span><b>{offer.duration}</b></div>
        <div><ShieldCheck/><span>Connection</span><b>{offer.connection.risk} risk</b></div>
        <div><IndianRupee/><span>Fare</span><b>{fare.refundability}</b></div>
      </section>

      <section className="why">
        <h3><Sparkles/> Why JASS recommends it</h3>
        <ul>{offer.reasons.map((r,i)=><li key={i}><CheckCircle2/>{r}</li>)}</ul>
      </section>

      <section className="rules">
        <h3>Fare & flexibility</h3>
        <p><b>{fare.refundability}</b> · {fare.changes}</p>
        <p>{fare.baggage}</p>
        {fare.warning&&<div className="warning"><AlertTriangle/>{fare.warning}</div>}
      </section>

      <section className="connectionBox">
        <h3>Connection analysis</h3>
        <div className="riskMeter"><span style={{width:`${offer.connection.score}%`}}/></div>
        <p><b>{offer.connection.risk} risk</b> · {offer.connection.note}</p>
      </section>

      <button className="bookButton">Continue to Provider</button>
    </aside>
  </div>
}
