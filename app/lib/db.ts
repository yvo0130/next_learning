import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('POSTGRES_URL is not configured.');
}

const globalForDb = globalThis as unknown as {
  sql?: ReturnType<typeof postgres>;
};

export const sql =
  globalForDb.sql ??
  postgres(connectionString, {
    ssl: 'require',
    max: 1,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.sql = sql;
}

