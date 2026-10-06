
import React from "react";
import {ShieldCheck, Radio} from "lucide-react";
import {providerCatalog} from "../providers/providerConfig";

export default function ProviderStatus({provider="demo"}) {
  const p=providerCatalog[provider] || providerCatalog.demo;
  return <div className="providerStatus">
    <div><Radio size={15}/><b>{p.name}</b><span>{p.status}</span></div>
    <small>{p.requiresKey ? "Server-side credentials required" : "Local demonstration data"}</small>
    <ShieldCheck size={16}/>
  </div>
}
