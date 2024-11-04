const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', reviewRoutes);
app.use('/api', searchRoutes);

const db = mysql.createConnection({
  host: 'db',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
