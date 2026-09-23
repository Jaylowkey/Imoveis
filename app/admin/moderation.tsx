"use client";
import {useState} from "react";
type Item={id:string;title:string;city:string;location:string;price:string;createdAt:string;owner:{name:string|null;email:string;phone:string|null}};
export default function AdminModeration({items}:{items:Item[]}) {
 const [rows,setRows]=useState(items); const [busy,setBusy]=useState("");
 async function act(id:string,action:"approve"|"reject"){
   setBusy(id+action);
   const r=await fetch("/api/admin/properties",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,action})});
   const d=await r.json();
   if(r.ok) setRows(x=>x.filter(i=>i.id!==id)); else window.alert(d.error||"Erro");
   setBusy("");
 }
 if(!rows.length) return <div className="dashboard-empty"><h3>Nenhum anúncio pendente</h3><p className="muted">A fila de moderação está limpa.</p></div>;
 return <div className="moderation-list">{rows.map(p=><article className="moderation-item" key={p.id}>
   <div><h3>{p.title}</h3><p className="muted">{p.location}, {p.city} · {Number(p.price).toLocaleString("pt-MZ")} MT</p><p className="muted">Anunciante: {p.owner.name||"Sem nome"} · {p.owner.email}{p.owner.phone?" · "+p.owner.phone:""}</p><small>{new Date(p.createdAt).toLocaleString("pt-MZ")}</small></div>
   <div className="moderation-actions"><button className="btn btn-primary" disabled={!!busy} onClick={()=>act(p.id,"approve")}>{busy===p.id+"approve"?"...":"Aprovar"}</button><button className="btn btn-outline" disabled={!!busy} onClick={()=>act(p.id,"reject")}>Rejeitar</button></div>
 </article>)}</div>;
}