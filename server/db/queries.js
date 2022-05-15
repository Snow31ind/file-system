import pg from 'pg';

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'file-system',
  password: 'Lyconchanhh2001',
  port: 5432,
});

export default pool;
