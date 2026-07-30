export const dbConfig = {
  host: "postgres-svc",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

export const host = process.env.HOST ?? "0.0.0.0";
export const port = process.env.PORT ? Number(process.env.PORT) : 3000;
