import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/auth";
export const runtime = "nodejs";

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const { id, action } = await request.json();
    if (!id || !["approve","reject","archive"].includes(action)) return NextResponse.json({error:"Pedido inválido."},{status:400});
    const status = action === "approve" ? "PUBLISHED" : action === "reject" ? "REJECTED" : "ARCHIVED";
    const property = await prisma.property.update({where:{id},data:{status}});
    return NextResponse.json({ok:true,property:{id:property.id,status:property.status}});
  } catch(error) {
    const message=error instanceof Error?error.message:"";
    if(message==="UNAUTHENTICATED") return NextResponse.json({error:"Sessão necessária."},{status:401});
    if(message==="FORBIDDEN") return NextResponse.json({error:"Acesso reservado ao administrador."},{status:403});
    return NextResponse.json({error:"Não foi possível atualizar o anúncio."},{status:500});
  }
}