
export function dateRange(centerDate, days=3) {
  const d = new Date(centerDate + "T00:00:00");
  const out = [];
  for(let i=-days;i<=days;i++){
    const x = new Date(d); x.setDate(d.getDate()+i);
    out.push(x.toISOString().slice(0,10));
  }
  return out;
}

export function estimateFlexibleFare(base, offset) {
  const multipliers = { "-3":1.09,"-2":1.04,"-1":0.98,"0":1,"1":0.95,"2":0.92,"3":0.97 };
  return Math.round(base * (multipliers[String(offset)] || 1));
}
