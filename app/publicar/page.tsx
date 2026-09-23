"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublicarPage() {
  const router = useRouter();
  const [sent,setSent]=useState(false);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/imoveis",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || "Não foi possível enviar o anúncio.");
      setSent(true);
    } catch(err) { setError(err instanceof Error ? err.message : "Ocorreu um erro."); }
    finally { setLoading(false); }
  }

  if(sent) return <main className="form-page"><div className="form-card success"><div className="success-icon">✓</div><h1>Imóvel enviado</h1><p className="muted">O anúncio foi guardado e está pendente de revisão. Depois da aprovação, ficará disponível no marketplace.</p><button className="btn btn-primary" onClick={()=>router.push("/dashboard")}>Ir para o meu painel</button></div></main>;

  return <main className="form-page"><div className="form-card"><div className="eyebrow dark">Para proprietários e agentes</div><h1>Publicar imóvel</h1><p className="muted">Preencha os dados principais. O anúncio será revisto antes de ficar público.</p>
    <form onSubmit={submit} className="publish-form">
      <label>Título do anúncio<input name="title" required placeholder="Ex.: Moradia T4 moderna em Maputo" /></label>
      <div className="two"><label>Finalidade<select name="purpose" required><option>Venda</option><option>Arrendamento</option></select></label><label>Tipo<select name="category" required><option>Casa</option><option>Apartamento</option><option>Terreno</option><option>Comercial</option></select></label></div>
      <div className="two"><label>Preço (MT)<input name="price" required type="number" min="1" placeholder="0" /></label><label>Área (m²)<input name="area" required type="number" min="1" placeholder="0" /></label></div>
      <div className="two"><label>Cidade<input name="city" required placeholder="Maputo" /></label><label>Localização<input name="location" required placeholder="Polana, Maputo" /></label></div>
      <label>Descrição<textarea name="description" required rows={5} placeholder="Descreva o imóvel, localização e condições..." /></label>
      <label>Contacto do anunciante<input name="contact" required placeholder="+258 8x xxx xxxx" /></label>
      {error && <div className="form-error">{error}</div>}
      <button className="btn btn-primary submit" disabled={loading} type="submit">{loading ? "A guardar..." : "Enviar anúncio para revisão"}</button>
    </form></div></main>;
}
