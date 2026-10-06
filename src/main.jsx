
import React,{useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import DecisionDrawer from "./components/DecisionDrawer";
import {buildDecision} from "./engine/decisionEngine";
import {
 Plane,Search,Bell,Bookmark,MapPin,CalendarDays,Users,SlidersHorizontal,
 ArrowRight,Clock3,Luggage,Sparkles,TrendingDown,Zap,Trophy,ChevronDown,
 Settings,LayoutDashboard,GitCompare,Heart,Plus,Trash2,Navigation,
 CheckCircle2, X, RotateCcw, Globe2
} from "lucide-react";
import airports from "./data/airports.json";
import {airportMatches,nearbyAirports} from "./utils/airportSearch";
import "./styles.css";

const flights=[
{id:"JA-001",airline:"JASS Air Demo",code:"JA",dep:"14:10",arr:"18:35",day:"+1",durationMin:1075,duration:"17h 55m",stops:1,price:65420,baggageKg:30,route:["DEL","DXB","YYZ"],carbonKg:920,score:91,tag:"BEST VALUE"},
{id:"GW-002",airline:"Global Wings",code:"GW",dep:"21:50",arr:"14:20",day:"+1",durationMin:1200,duration:"20h 00m",stops:1,price:61200,baggageKg:23,route:["DEL","DOH","YYZ"],carbonKg:1010,score:86,tag:"CHEAPEST"},
{id:"NS-003",airline:"NorthStar",code:"NS",dep:"02:15",arr:"07:40",day:"+1",durationMin:835,duration:"13h 55m",stops:0,price:74200,baggageKg:30,route:["DEL","YYZ"],carbonKg:1210,score:90,tag:"FASTEST"},
{id:"HA-004",airline:"Heritage Air",code:"HA",dep:"01:30",arr:"13:45",day:"+1",durationMin:1125,duration:"18h 45m",stops:1,price:68150,baggageKg:30,route:["DEL","FRA","YYZ"],carbonKg:860,score:88,tag:"LOW CO₂"},
{id:"SA-005",airline:"SkyAsia",code:"SA",dep:"09:20",arr:"16:30",day:"+1",durationMin:1450,duration:"24h 10m",stops:2,price:58900,baggageKg:20,route:["DEL","SIN","YVR","YYZ"],carbonKg:1150,score:79,tag:"LOWEST PRICE"}
];
const money=n=>"₹"+n.toLocaleString("en-IN");
const prettyDate=d=>new Date(d+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});

function AirportBox({label,value,onChange,onSelect}){
 const [open,setOpen]=useState(false);
 const matches=useMemo(()=>airportMatches(airports,value),[value]);
 return <div className="airportBox">
   <label>{label}</label>
   <div className="airportInput"><MapPin size={17}/><input value={value} onFocus={()=>setOpen(true)} onChange={e=>{onChange(e.target.value.toUpperCase());setOpen(true)}} placeholder="City or airport"/></div>
   {open&&<><div className="backdrop" onClick={()=>setOpen(false)}/><div className="suggestions">
    {matches.map(a=><button key={a.iata} onClick={()=>{onSelect(a);setOpen(false)}}><b>{a.iata}</b><span>{a.city} · {a.name}</span><small>{a.country}</small></button>)}
   </div></>}
 </div>
}

function App(){
 const [from,setFrom]=useState("DEL"),[to,setTo]=useState("YYZ"),[date,setDate]=useState("2026-11-15");
 const [trip,setTrip]=useState("Round Trip"),[returnDate,setReturnDate]=useState("2026-11-30");
 const [cabin,setCabin]=useState("Economy"),[adults,setAdults]=useState(1);
 const [maxStops,setMaxStops]=useState(2),[bags,setBags]=useState("Any");
 const [airline,setAirline]=useState("All Airlines"),[maxHours,setMaxHours]=useState(30);
 const [sort,setSort]=useState("best"),[showFilters,setShowFilters]=useState(false);
 const [nearby,setNearby]=useState(false),[flexible,setFlexible]=useState(false),[multi,setMulti]=useState(false);
 const [compare,setCompare]=useState([]),[saved,setSaved]=useState([]),[searched,setSearched]=useState(false),[selectedOffer,setSelectedOffer]=useState(null);
 const [legs,setLegs]=useState([{from:"DEL",to:"YYZ",date:"2026-11-15"}]);

 const selectedFrom=airports.find(a=>a.iata===from), selectedTo=airports.find(a=>a.iata===to);
 const filtered=useMemo(()=>{
   let a=[...flights].filter(f=>f.stops<=maxStops && f.durationMin<=maxHours*60);
   if(bags!=="Any") a=a.filter(f=>f.baggageKg>=Number(bags));
   if(airline!=="All Airlines") a=a.filter(f=>f.airline===airline);
   if(sort==="price")a.sort((x,y)=>x.price-y.price);
   else if(sort==="time")a.sort((x,y)=>x.durationMin-y.durationMin);
   else if(sort==="stops")a.sort((x,y)=>x.stops-y.stops||y.score-x.score);
   else a.sort((x,y)=>y.score-x.score);
   return a;
 },[maxStops,maxHours,bags,airline,sort]);

 const decisionOffers=useMemo(()=>filtered.map(f=>buildDecision(f,filtered,{baggage:0,seat:0,meal:0,transfer:0})),[filtered]);
 const toggleCompare=id=>(c=>c.includes(id)?c.filter(x=>x!==id):c.length<3?[...c,id]:c);
 const addLeg=()=>setLegs(l=>[...l,{from:"",to:"",date:"2026-11-16"}]);
 const swap=()=>{const x=from;setFrom(to);setTo(x)};
 const setOrigin=a=>setFrom(a.iata), setDestination=a=>setTo(a.iata);
 const nearbyList=selectedFrom?nearbyAirports(airports,selectedFrom.iata):[];

 return <div className="app">
 <aside className="sidebar">
  <div className="brand"><div className="brandIcon"><Plane/></div><div><b>JASS</b><span>FlightFinder Studio</span></div></div>
  <nav>
   <button className="active"><LayoutDashboard/> Search</button>
   <button><Bookmark/> Saved Flights <em>{saved.length}</em></button>
   <button><Bell/> Fare Watch</button>
   <button onClick={()=>setCompare([])}><GitCompare/> Compare <em>{compare.length}</em></button>
   <button><MapPin/> My Trips</button>
  </nav>
  <div className="sideBottom"><button><Settings/> Settings</button><div className="version">v0.3 • Search Intelligence</div></div>
 </aside>

 <main>
  <header className="topbar"><div><h1>Flight Intelligence</h1><p>Search across airports, dates and travel preferences.</p></div><div className="status"><span/> Search Engine Ready</div></header>

  <section className="searchPanel">
   <div className="tripTabs">{["Round Trip","One Way","Multi-City"].map(x=><button key={x} className={trip===x?"tabActive":""} onClick={()=>{setTrip(x);setMulti(x==="Multi-City")}}>{x}</button>)}</div>
   {!multi?<div className="searchGrid">
    <AirportBox label="FROM" value={from} onChange={setFrom} onSelect={setOrigin}/>
    <button className="swap" onClick={swap}><ArrowRight/></button>
    <AirportBox label="TO" value={to} onChange={setTo} onSelect={setDestination}/>
    <label>DEPARTURE<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
    {trip==="Round Trip"?<label>RETURN<input type="date" value={returnDate} onChange={e=>setReturnDate(e.target.value)}/></label>:<label>PASSENGERS<div className="field"><Users size={16}/><select value={adults} onChange={e=>setAdults(+e.target.value)}>{[1,2,3,4,5,6].map(n=><option key={n}>{n} Adult{n>1?"s":""}</option>)}</select></div></label>}
    <button className="searchBtn" onClick={()=>setSearched(true)}><Search/> Search</button>
   </div>:<div className="multiCity">
    {legs.map((l,i)=><div className="leg" key={i}><b>LEG {i+1}</b><input value={l.from} placeholder="From" onChange={e=>{let n=[...legs];n[i].from=e.target.value.toUpperCase();setLegs(n)}}/><ArrowRight/><input value={l.to} placeholder="To" onChange={e=>{let n=[...legs];n[i].to=e.target.value.toUpperCase();setLegs(n)}}/><input type="date" value={l.date} onChange={e=>{let n=[...legs];n[i].date=e.target.value;setLegs(n)}}/>{legs.length>1&&<button onClick={()=>setLegs(legs.filter((_,j)=>j!==i))}><Trash2/></button>}</div>)}
    <div><button className="addLeg" onClick={addLeg}><Plus/> Add flight</button><button className="searchBtn inline" onClick={()=>setSearched(true)}><Search/> Search Multi-City</button></div>
   </div>}
   <div className="options">
    <span>Cabin</span><select value={cabin} onChange={e=>setCabin(e.target.value)}><option>Economy</option><option>Premium Economy</option><option>Business</option><option>First</option></select>
    <label className="check"><input type="checkbox" checked={nearby} onChange={e=>setNearby(e.target.checked)}/> Include nearby airports</label>
    <label className="check"><input type="checkbox" checked={flexible} onChange={e=>setFlexible(e.target.checked)}/> Flexible dates ±3 days</label>
   </div>
   {nearby&&nearbyList.length>0&&<div className="nearby"><Navigation size={15}/><b>Nearby {selectedFrom?.iata} airports:</b>{nearbyList.map(a=><span key={a.iata}>{a.iata} · {a.city}</span>)}</div>}
  </section>

  <section className="insights">
   <div className="insight"><TrendingDown/><div><small>Lowest Fare</small><strong>{money(58900)}</strong></div><span>2 stops</span></div>
   <div className="insight"><Zap/><div><small>Fastest</small><strong>13h 55m</strong></div><span>Non-stop</span></div>
   <div className="insight"><Trophy/><div><small>JASS Best Value</small><strong>91 / 100</strong></div><span>Recommended</span></div>
   <div className="insight"><Globe2/><div><small>Search Area</small><strong>{nearby?"Nearby":"Selected"}</strong></div><span>{cabin}</span></div>
  </section>

  <div className="resultsHeader">
   <div><h2>{from} <ArrowRight size={20}/> {to}</h2><p>{prettyDate(date)} {trip==="Round Trip"&&"→ "+prettyDate(returnDate)} • {filtered.length} itineraries</p></div>
   <div className="actions"><button onClick={()=>setShowFilters(!showFilters)}><SlidersHorizontal/> Filters</button><select value={sort} onChange={e=>setSort(e.target.value)}><option value="best">Best Value</option><option value="price">Cheapest</option><option value="time">Fastest</option><option value="stops">Fewest Stops</option></select></div>
  </div>

  {showFilters&&<div className="filterBar">
   <b>Advanced Filters</b><label>Stops <select value={maxStops} onChange={e=>setMaxStops(+e.target.value)}><option value="0">Direct</option><option value="1">≤ 1 stop</option><option value="2">≤ 2 stops</option></select></label>
   <label>Baggage <select value={bags} onChange={e=>setBags(e.target.value)}><option>Any</option><option value="20">20+ kg</option><option value="23">23+ kg</option><option value="30">30+ kg</option></select></label>
   <label>Max journey <select value={maxHours} onChange={e=>setMaxHours(+e.target.value)}><option value="18">18h</option><option value="24">24h</option><option value="30">30h</option></select></label>
   <label>Airline <select value={airline} onChange={e=>setAirline(e.target.value)}><option>All Airlines</option>{[...new Set(flights.map(f=>f.airline))].map(a=><option key={a}>{a}</option>)}</select></label>
  </div>}

  {flexible&&<div className="dateMatrix"><b>Flexible Date Explorer</b><div>{[-3,-2,-1,0,1,2,3].map((n,i)=>{const d=new Date(date+"T00:00:00");d.setDate(d.getDate()+n);const price=Math.round(61200*([1.09,1.04,.98,1,.95,.92,.97][i]));return <button key={n} className={n===0?"today":""} onClick={()=>setDate(d.toISOString().slice(0,10))}><small>{d.toLocaleDateString("en",{weekday:"short"})}</small><b>{d.getDate()}</b><span>{money(price)}</span></button>})}</div></div>}

  <section className="cards">
   {decisionOffers.map(f=><article className="flightCard" key={f.id}>
    <div className="airline"><div className="logo">{f.code}</div><div><b>{f.airline}</b><small>{f.route.join(" → ")}</small></div></div>
    <div className="times"><strong>{f.dep}</strong><span>──── {f.duration} ────</span><strong>{f.arr}<sup>{f.day}</sup></strong><small>{f.stops===0?"Non-stop":`${f.stops} stop`}</small></div>
    <div className="details"><span><Luggage/> {f.baggageKg} kg baggage</span><span><Clock3/> Connection analysis ready</span><span>CO₂: {f.carbonKg} kg</span></div>
    <div className="score"><small>JASS VALUE</small><strong>{f.score}<sup>/100</sup></strong><b>{f.tag}</b></div>
    <div className="price"><strong>{money(f.price)}</strong><small>per adult</small><div className="buttonRow"><button onClick={()=>setSaved(s=>s.includes(f.id)?s.filter(x=>x!==f.id):[...s,f.id])} className={saved.includes(f.id)?"saved":""}>{saved.includes(f.id)?<Heart fill="currentColor"/>:<Bookmark/>}</button><button onClick={()=>toggleCompare(f.id)} className={compare.includes(f.id)?"compareOn":""}><GitCompare/></button></div><button className="view" onClick={()=>setSelectedOffer(f)}>Analyze Flight</button></div>
   </article>)}
   {filtered.length===0&&<div className="empty"><X/> No itineraries match the current filters. Try widening your search.</div>}
  </section>

  {compare.length>0&&<section className="compareBar"><div><b>Compare Flights</b><span>{compare.length}/3 selected</span></div><div className="comparePills">{compare.map(id=>{const f=flights.find(x=>x.id===id);return <button key={id} onClick={()=>toggleCompare(id)}>{f.code} {money(f.price)} <X size={13}/></button>})}</div><button className="compareAction"><GitCompare/> Compare Now</button></section>}

  <section className="advisor"><div className="advisorIcon"><Sparkles/></div><div><h3>JASS Booking Advisor</h3><p><b>{money(61200)}</b> is the lowest demo fare. <b>JASS Air Demo</b> scores 91/100 because its 30 kg baggage and shorter journey improve overall value. Flexible dates may expose lower fares.</p></div><button>Analyze All <ArrowRight/></button></section>
  <DecisionDrawer offer={selectedOffer} onClose={()=>setSelectedOffer(null)}/><footer>JASS FlightFinder Studio • V0.5 Travel Decision Engine • Provider adapters remain isolated from the UI.</footer>
 </main></div>
}
createRoot(document.getElementById("root")).render(<App/>);
