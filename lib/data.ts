import { prisma } from "./prisma";
import {
  projects as fallbackProjects,
  services as fallbackServices,
} from "./profile";

export type ProjectDTO = {
  id?: number;
  name: string;
  tag: string;
  desc: string;
  seed: string;
};

export type ServiceDTO = {
  id?: number;
  title: string;
  desc: string;
  icon: string;
};

// Lee de la DB; si falla (DB caída / sin seed) cae a los datos de profile.ts
// para que el sitio nunca se rompa. Misma filosofía que /api/ask.
export async function getProjects(): Promise<ProjectDTO[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return fallbackProjectsDTO();
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      tag: r.tag,
      desc: r.desc,
      seed: r.seed,
    }));
  } catch {
    return fallbackProjectsDTO();
  }
}

export async function getServices(): Promise<ServiceDTO[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return fallbackServicesDTO();
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      desc: r.desc,
      icon: r.icon,
    }));
  } catch {
    return fallbackServicesDTO();
  }
}

function fallbackProjectsDTO(): ProjectDTO[] {
  return fallbackProjects.map((p) => ({
    name: p.name,
    tag: p.tag,
    desc: p.desc,
    seed: p.seed,
  }));
}

function fallbackServicesDTO(): ServiceDTO[] {
  return fallbackServices.map((s) => ({
    title: s.title,
    desc: s.desc,
    icon: s.icon,
  }));
}
