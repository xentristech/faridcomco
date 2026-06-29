import mysql from "mysql2/promise";

// Conexión mysql2 con variables INDIVIDUALES (DB_HOST/DB_USER/DB_PASS…), que
// evitan codificar caracteres especiales como en DATABASE_URL. Si no existen,
// parsea DATABASE_URL como respaldo. Pool reutilizable por proceso.
let pool: mysql.Pool | null = null;

export function dbConfig(): mysql.PoolOptions {
  if (process.env.DB_HOST && process.env.DB_USER) {
    return {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASS ?? "",
      database: process.env.DB_NAME,
    };
  }

  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error("Faltan DB_HOST/DB_USER y DATABASE_URL");
  const u = new URL(raw);
  return {
    host: u.hostname,
    port: Number(u.port || 3306),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
  };
}

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig(),
      waitForConnections: true,
      connectionLimit: 5,
      connectTimeout: 8000,
    });
  }
  return pool;
}

// Helper de consulta tipado. Lanza si la DB no responde → el llamador hace fallback.
export async function query<T = Record<string, unknown>>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  const [rows] = await getPool().query(sql, params);
  return rows as T[];
}
