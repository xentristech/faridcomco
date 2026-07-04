import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";

// Crea las tablas e inserta el seed directamente con mysql2 (desde el servidor,
// donde localhost SÍ resuelve). Protegido con ADMIN_SECRET.
//   GET https://farid.com.co/api/admin/migrate?secret=TU_ADMIN_SECRET
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATEMENTS: string[] = [
  `CREATE TABLE IF NOT EXISTS \`projects\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`name\` VARCHAR(255) NOT NULL,
    \`tag\` VARCHAR(100) NOT NULL,
    \`desc\` TEXT NOT NULL,
    \`seed\` VARCHAR(255) NOT NULL,
    \`active\` TINYINT(1) DEFAULT 1,
    \`order\` INT DEFAULT 0,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS \`services\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`title\` VARCHAR(255) NOT NULL,
    \`desc\` TEXT NOT NULL,
    \`icon\` VARCHAR(100) NOT NULL,
    \`active\` TINYINT(1) DEFAULT 1,
    \`order\` INT DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS \`leads\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`name\` VARCHAR(255) NOT NULL,
    \`email\` VARCHAR(255) NOT NULL,
    \`message\` TEXT NOT NULL,
    \`attended\` TINYINT(1) DEFAULT 0,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS \`comments\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`slug\` VARCHAR(255) NOT NULL,
    \`name\` VARCHAR(120) NOT NULL,
    \`body\` TEXT NOT NULL,
    \`approved\` TINYINT(1) DEFAULT 0,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX \`idx_slug_approved\` (\`slug\`, \`approved\`)
  )`,
  `INSERT IGNORE INTO \`projects\` (\`name\`, \`tag\`, \`desc\`, \`seed\`, \`active\`, \`order\`) VALUES
    ('Xentris.tech', 'Plataforma', 'Producto tecnológico construido sobre IA y automatización.', 'xentris-ai-platform-blue', 1, 1),
    ('Neona.Tech', 'Plataforma', 'Solución digital con núcleo de datos e inteligencia.', 'neona-tech-neural-violet', 1, 2),
    ('Trading Pro GPT', 'Agente IA', 'Asistente de análisis de mercados potenciado por modelos de lenguaje.', 'trading-pro-gpt-chart-cyan', 1, 3),
    ('Bots con IA', 'Automatización', 'Bots conversacionales que atienden, califican y resuelven.', 'ai-bots-conversation-blue', 1, 4),
    ('Automatizaciones empresariales', 'Operaciones', 'Flujos que eliminan trabajo manual y errores repetitivos.', 'enterprise-automation-flow', 1, 5),
    ('Dashboards de datos', 'Analytics', 'Tableros en vivo que vuelven legibles los números del negocio.', 'data-dashboards-analytics', 1, 6),
    ('Integraciones con APIs', 'Infraestructura', 'Puentes entre plataformas, pagos, CRMs y modelos de IA.', 'api-integrations-network', 1, 7)`,
  `INSERT IGNORE INTO \`services\` (\`title\`, \`desc\`, \`icon\`, \`active\`, \`order\`) VALUES
    ('Inteligencia Artificial', 'Modelos, LLMs y copilotos integrados a tu operación real.', 'Brain', 1, 1),
    ('Data Science', 'De datos crudos a hallazgos que cambian decisiones.', 'ChartLineUp', 1, 2),
    ('Machine Learning', 'Modelos predictivos entrenados para tu caso de uso.', 'Graph', 1, 3),
    ('Automatización', 'Procesos repetitivos convertidos en flujos que corren solos.', 'Gear', 1, 4),
    ('Integración de APIs', 'Conecto sistemas, servicios y modelos que antes no se hablaban.', 'PlugsConnected', 1, 5),
    ('Desarrollo Full Stack', 'Producto completo: del backend a la interfaz que se usa.', 'Code', 1, 6),
    ('Agentes IA', 'Agentes que razonan, usan herramientas y ejecutan tareas.', 'Robot', 1, 7),
    ('Dashboards inteligentes', 'Tableros que no solo muestran datos, los explican.', 'ChartBar', 1, 8)`,
];

async function handle(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { error: "ADMIN_SECRET no está configurado en el servidor." },
      { status: 401 }
    );
  }
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { error: "secret incorrecto (es sensible a mayúsculas/minúsculas)." },
      { status: 401 }
    );
  }

  try {
    const pool = getPool();
    for (const sql of STATEMENTS) {
      await pool.query(sql);
    }
    const [[p]] = (await pool.query(
      "SELECT COUNT(*) AS n FROM `projects`"
    )) as unknown as [{ n: number }[]];
    const [[s]] = (await pool.query(
      "SELECT COUNT(*) AS n FROM `services`"
    )) as unknown as [{ n: number }[]];
    const [[l]] = (await pool.query(
      "SELECT COUNT(*) AS n FROM `leads`"
    )) as unknown as [{ n: number }[]];
    const [[c]] = (await pool.query(
      "SELECT COUNT(*) AS n FROM `comments`"
    )) as unknown as [{ n: number }[]];

    return NextResponse.json({
      ok: true,
      message: "Tablas creadas y seed insertado correctamente.",
      counts: { projects: p.n, services: s.n, leads: l.n, comments: c.n },
    });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : String(e),
        code: (e as { code?: string })?.code,
      },
      { status: 500 }
    );
  }
}

export const GET = handle;
export const POST = handle;
