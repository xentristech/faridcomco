import { prisma } from "./prisma";
import { projects as seedProjects, services as seedServices } from "./profile";

// Crea las tablas y siembra los datos iniciales SIN terminal: corre en la
// primera petición tras el deploy (donde la DB localhost sí es alcanzable).
// Idempotente: CREATE TABLE IF NOT EXISTS + upsert. Se cachea por proceso.
let ready: Promise<void> | null = null;

export function ensureDb(): Promise<void> {
  if (!ready) {
    ready = init().catch((e) => {
      ready = null; // permite reintentar en la siguiente petición
      throw e;
    });
  }
  return ready;
}

async function init() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(191) NOT NULL,
      tag VARCHAR(191) NOT NULL,
      description TEXT NOT NULL,
      seed VARCHAR(191) NOT NULL,
      active TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      PRIMARY KEY (id)
    ) DEFAULT CHARSET=utf8mb4;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS services (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(191) NOT NULL,
      description TEXT NOT NULL,
      icon VARCHAR(191) NOT NULL,
      active TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      PRIMARY KEY (id)
    ) DEFAULT CHARSET=utf8mb4;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS leads (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(191) NOT NULL,
      email VARCHAR(191) NOT NULL,
      message TEXT NOT NULL,
      attended TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      PRIMARY KEY (id)
    ) DEFAULT CHARSET=utf8mb4;
  `);

  // Siembra solo si las tablas están vacías.
  if ((await prisma.project.count()) === 0) {
    for (let i = 0; i < seedProjects.length; i++) {
      const p = seedProjects[i];
      await prisma.project.upsert({
        where: { id: i + 1 },
        update: {},
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
  }

  if ((await prisma.service.count()) === 0) {
    for (let i = 0; i < seedServices.length; i++) {
      const s = seedServices[i];
      await prisma.service.upsert({
        where: { id: i + 1 },
        update: {},
        create: {
          id: i + 1,
          title: s.title,
          desc: s.desc,
          icon: s.icon,
          order: i,
        },
      });
    }
  }
}
