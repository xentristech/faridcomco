import { query } from "./mysql";
import { withTimeout } from "./with-timeout";
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

// Lee de MySQL (mysql2). Si falla (DB caída / sin tablas) cae al fallback de
// profile.ts para que el sitio nunca se rompa.
export async function getProjects(): Promise<ProjectDTO[]> {
  try {
    const rows = await withTimeout(
      query<ProjectDTO>(
        "SELECT `id`, `name`, `tag`, `desc`, `seed` FROM `projects` WHERE `active` = 1 ORDER BY `order` ASC"
      )
    );
    if (rows.length === 0) return fallbackProjectsDTO();
    return rows;
  } catch {
    return fallbackProjectsDTO();
  }
}

export async function getServices(): Promise<ServiceDTO[]> {
  try {
    const rows = await withTimeout(
      query<ServiceDTO>(
        "SELECT `id`, `title`, `desc`, `icon` FROM `services` WHERE `active` = 1 ORDER BY `order` ASC"
      )
    );
    if (rows.length === 0) return fallbackServicesDTO();
    return rows;
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
