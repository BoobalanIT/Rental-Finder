// src/config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pool.connect()
  .then(() => console.log('DB Connected ✅'))
  .catch(err => console.error('DB Error ❌', err));

module.exports = pool;