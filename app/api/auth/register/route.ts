import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, hashPassword } from "@/lib/auth";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { name, email, phone, password, role } = await request.json();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!name || !normalizedEmail || !password) return NextResponse.json({ error: "Nome, email e palavra-passe são obrigatórios." }, { status: 400 });
    if (String(password).length < 8) return NextResponse.json({ error: "A palavra-passe deve ter pelo menos 8 caracteres." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    if (await prisma.user.findUnique({ where: { email: normalizedEmail } })) return NextResponse.json({ error: "Este email já está registado." }, { status: 409 });

    const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(x => x.trim().toLowerCase()).filter(Boolean);
    const safeRole = adminEmails.includes(normalizedEmail) ? "ADMIN" : (["OWNER", "AGENT", "AGENCY"].includes(String(role)) ? String(role) as "OWNER" | "AGENT" | "AGENCY" : "CLIENT");
    const user = await prisma.user.create({ data: { name: String(name).trim(), email: normalizedEmail, phone: phone ? String(phone).trim() : null, passwordHash: await hashPassword(String(password)), role: safeRole } });
    await createSession({ id: user.id, name: user.name, email: user.email, role: user.role });
    return NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
  } catch (error) {
    console.error("register error", error);
    return NextResponse.json({ error: "Não foi possível criar a conta." }, { status: 500 });
  }
}
