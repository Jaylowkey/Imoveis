import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    let user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(x => x.trim().toLowerCase()).filter(Boolean);
    if (user && adminEmails.includes(normalizedEmail) && user.role !== "ADMIN") user = await prisma.user.update({ where: { id: user.id }, data: { role: "ADMIN" } });
    if (!user?.passwordHash || !(await verifyPassword(String(password || ""), user.passwordHash))) {
      return NextResponse.json({ error: "Email ou palavra-passe incorretos." }, { status: 401 });
    }
    await createSession({ id: user.id, name: user.name, email: user.email, role: user.role });
    return NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("login error", error);
    return NextResponse.json({ error: "Não foi possível iniciar sessão." }, { status: 500 });
  }
}
