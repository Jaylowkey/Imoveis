import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const purposeMap = { Venda: "SALE", Arrendamento: "RENT" } as const;
const categoryMap = { Casa: "HOUSE", Apartamento: "APARTMENT", Terreno: "LAND", Comercial: "COMMERCIAL" } as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, purpose, category, price, area, city, location, description, contact } = body;

    if (!title || !purpose || !category || !price || !area || !city || !location || !description || !contact) {
      return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 });
    }
    if (!(purpose in purposeMap) || !(category in categoryMap)) {
      return NextResponse.json({ error: "Finalidade ou tipo inválido." }, { status: 400 });
    }

    const email = `pending+${String(contact).replace(/\D/g, "").slice(-9)}@imoveis.local`;
    let owner = await prisma.user.findUnique({ where: { email } });
    if (!owner) owner = await prisma.user.create({ data: { email, phone: String(contact), name: "Anunciante" } });

    const baseSlug = String(title).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const property = await prisma.property.create({
      data: {
        slug: `${baseSlug || "imovel"}-${Date.now()}`,
        title: String(title), purpose: purposeMap[purpose as keyof typeof purposeMap],
        category: categoryMap[category as keyof typeof categoryMap],
        price: Number(price), area: Number(area), city: String(city), location: String(location),
        description: String(description), ownerId: owner.id, status: "PENDING"
      },
      select: { id: true, slug: true, status: true }
    });

    return NextResponse.json({ ok: true, property }, { status: 201 });
  } catch (error) {
    console.error("property publish error", error);
    return NextResponse.json({ error: "Não foi possível guardar o anúncio. Verifique a base de dados." }, { status: 500 });
  }
}
