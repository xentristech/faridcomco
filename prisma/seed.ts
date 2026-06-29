// Seed: vuelca los datos actuales de lib/profile.ts a la DB.
// Se ejecuta EN EL SERVIDOR (la DB es localhost en Hostinger):
//   npx prisma db seed
import { PrismaClient } from "@prisma/client";
import { projects, services } from "../lib/profile";

const prisma = new PrismaClient();

async function main() {
  console.log("→ Sembrando proyectos…");
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    await prisma.project.upsert({
      where: { id: i + 1 },
      update: { name: p.name, tag: p.tag, desc: p.desc, seed: p.seed, order: i },
      create: {
        id: i + 1,
        name: p.name,
        tag: p.tag,
        desc: p.desc,
        seed: p.seed,
        order: i,
      },
    });
  }

  console.log("→ Sembrando servicios…");
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    await prisma.service.upsert({
      where: { id: i + 1 },
      update: { title: s.title, desc: s.desc, icon: s.icon, order: i },
      create: {
        id: i + 1,
        title: s.title,
        desc: s.desc,
        icon: s.icon,
        order: i,
      },
    });
  }

  console.log("✓ Seed completo.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
