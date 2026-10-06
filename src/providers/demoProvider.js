
import { FlightProvider } from "./flightProvider";

const offers = [
  {id:"JA-001",airline:"JASS Air Demo",code:"JA",flightNumber:"JA101",dep:"14:10",arr:"18:35",durationMin:1075,duration:"17h 55m",stops:1,price:65420,baggageKg:30,cabin:"Economy",refundable:false,changeable:true,emissionsKg:920,route:["DEL","DXB","YYZ"],segments:[
    {departure:"2026-11-15T14:10:00",arrival:"2026-11-15T23:00:00"},
    {departure:"2026-11-16T01:00:00",arrival:"2026-11-16T18:35:00"}]},
  {id:"GW-002",airline:"Global Wings",code:"GW",flightNumber:"GW202",dep:"21:50",arr:"14:20",durationMin:1200,duration:"20h 00m",stops:1,price:61200,baggageKg:23,cabin:"Economy",refundable:true,changeable:true,emissionsKg:1010,route:["DEL","DOH","YYZ"],segments:[
    {departure:"2026-11-15T21:50:00",arrival:"2026-11-16T04:30:00"},
    {departure:"2026-11-16T06:00:00",arrival:"2026-11-16T14:20:00"}]},
  {id:"NS-003",airline:"NorthStar",code:"NS",flightNumber:"NS303",dep:"02:15",arr:"07:40",durationMin:835,duration:"13h 55m",stops:0,price:74200,baggageKg:30,cabin:"Economy",refundable:false,changeable:false,emissionsKg:1210,route:["DEL","YYZ"],segments:[
    {departure:"2026-11-15T02:15:00",arrival:"2026-11-15T07:40:00"}]},
  {id:"HA-004",airline:"Heritage Air",code:"HA",flightNumber:"HA404",dep:"01:30",arr:"13:45",durationMin:1125,duration:"18h 45m",stops:1,price:68150,baggageKg:30,cabin:"Economy",refundable:true,changeable:true,emissionsKg:860,route:["DEL","FRA","YYZ"],segments:[
    {departure:"2026-11-15T01:30:00",arrival:"2026-11-15T09:00:00"},
    {departure:"2026-11-15T10:30:00",arrival:"2026-11-15T13:45:00"}]}
];

export class DemoFlightProvider extends FlightProvider {
  constructor(){super("Demo Flight Provider")}
  async search(criteria){
    await new Promise(r=>setTimeout(r,200));
    return offers.map(x=>({...x,origin:criteria.origin,destination:criteria.destination,date:criteria.date,returnDate:criteria.returnDate}));
  }
  async getOffer(id){return offers.find(x=>x.id===id)||null}
}
