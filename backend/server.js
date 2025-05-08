require('dotenv').config();
const authenticate = require('./middleware/auth');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Validate environment variables
const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'FRONTEND_URL'];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', authenticate, (req, res) => res.json({ message: 'Protected route' }));

// Start Server
const PORT = process.env.PORT || 5001;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });