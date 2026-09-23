"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [mode,setMode]=useState<"login"|"register">("login");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setLoading(true);
    const data=Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res=await fetch(mode==="login"?"/api/auth/login":"/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
      const json=await res.json();
      if(!res.ok) throw new Error(json.error||"Não foi possível continuar.");
      router.push(json.user?.role==="ADMIN"?"/admin":"/dashboard");
      router.refresh();
    } catch(err){setError(err instanceof Error?err.message:"Ocorreu um erro.");}
    finally{setLoading(false);}
  }

  return <main className="form-page"><div className="form-card auth-card">
    <div className="eyebrow dark">Imóveis Moçambique</div><h1>{mode==="login"?"Entrar":"Criar conta"}</h1>
    <p className="muted">{mode==="login"?"Aceda ao seu painel e aos seus anúncios.":"Crie uma conta para publicar e gerir imóveis."}</p>
    <div className="auth-tabs"><button className={mode==="login"?"active":""} onClick={()=>setMode("login")} type="button">Entrar</button><button className={mode==="register"?"active":""} onClick={()=>setMode("register")} type="button">Criar conta</button></div>
    <form onSubmit={submit} className="publish-form">
      {mode==="register"&&<><label>Nome<input name="name" required placeholder="Nome completo"/></label><label>Telefone<input name="phone" placeholder="+258 8x xxx xxxx"/></label><label>Tipo de conta<select name="role"><option value="CLIENT">Quero procurar imóveis</option><option value="OWNER">Sou proprietário</option><option value="AGENT">Sou agente imobiliário</option><option value="AGENCY">Sou uma agência</option></select></label></>}
      <label>Email<input name="email" required type="email" placeholder="voce@email.com"/></label>
      <label>Palavra-passe<input name="password" required minLength={8} type="password" placeholder="Mínimo 8 caracteres"/></label>
      {error&&<div className="form-error">{error}</div>}
      <button className="btn btn-primary submit" disabled={loading}>{loading?"A processar...":mode==="login"?"Entrar":"Criar conta"}</button>
    </form>
  </div></main>;
}
