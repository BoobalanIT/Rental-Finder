require('dotenv').config();

// 👇 FIX: assign the import to a variable
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');


const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// test route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

app.get('/test-db', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json(result.rows);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});