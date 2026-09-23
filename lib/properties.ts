export type Property = {
  id: string;
  slug: string;
  title: string;
  purpose: "Venda" | "Arrendamento";
  category: "Casa" | "Apartamento" | "Terreno" | "Comercial";
  price: number;
  location: string;
  city: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  description: string;
  features: string[];
  image: string;
};

export const properties: Property[] = [
  { id:"1", slug:"moradia-t4-moderna-sommerschield", title:"Moradia T4 moderna", purpose:"Venda", category:"Casa", price:3850000, location:"Sommerschield, Maputo", city:"Maputo", bedrooms:4, bathrooms:3, area:420, description:"Moradia moderna, espaçosa e bem localizada, ideal para família. Área social ampla, cozinha equipada e espaço exterior.", features:["Estacionamento","Jardim","Cozinha equipada","Segurança"], image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
  { id:"2", slug:"apartamento-t3-mobilado-polana", title:"Apartamento T3 mobilado", purpose:"Arrendamento", category:"Apartamento", price:75000, location:"Polana, Maputo", city:"Maputo", bedrooms:3, bathrooms:2, area:180, description:"Apartamento mobilado em zona central, próximo de serviços, restaurantes e comércio.", features:["Mobilado","Elevador","Estacionamento","Segurança 24h"], image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" },
  { id:"3", slug:"terreno-construcao-matola-rio", title:"Terreno para construção", purpose:"Venda", category:"Terreno", price:1200000, location:"Matola Rio, Maputo", city:"Matola", area:1000, description:"Terreno com boa área para construção residencial ou pequeno empreendimento.", features:["1.000 m²","Acesso rodoviário","Zona em expansão","Documentação"], image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80" },
  { id:"4", slug:"casa-t3-matola", title:"Casa T3 familiar", purpose:"Venda", category:"Casa", price:2450000, location:"Matola, Maputo", city:"Matola", bedrooms:3, bathrooms:2, area:280, description:"Casa familiar com quintal e estacionamento, numa zona residencial.", features:["Quintal","Estacionamento","Muro","Água"], image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80" }
];

export function formatPrice(value: number, purpose: Property["purpose"]) {
  return new Intl.NumberFormat("pt-MZ").format(value) + " MT" + (purpose === "Arrendamento" ? " / mês" : "");
}
