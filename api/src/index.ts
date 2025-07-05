// api/src/index.ts

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import profileRoutes from './routes/profileRoutes';

const app = express();
const HOST = '0.0.0.0';

// We define the allowed origins based on your environment variables
const allowedOrigins = [
  'http://localhost:3000', // For local development
  process.env.FRONTEND_URL,  // For your live Vercel site
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// --- This is the key change ---
// Use CORS as the VERY FIRST middleware. This will ensure it handles
// the preflight OPTIONS request for all routes.
app.use(cors(corsOptions));

// Now, use the other middleware
app.use(express.json());

// Add debug logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Test endpoint to verify server is working
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test endpoint working' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', profileRoutes);

// Catch-all route for debugging
app.use('*', (req, res) => {
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    message: 'Route not found',
    method: req.method,
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 5001;

app.listen(Number(PORT), HOST, () => {
  console.log(`Server is listening on port ${PORT}`);
});