import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import profileRoutes from './routes/profileRoutes';

const app = express();
const HOST = '0.0.0.0';

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL || '', 
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      console.log(msg);
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// THIS IS THE NEW LINE TO ADD
// It explicitly handles the browser's preflight 'OPTIONS' requests
app.options('*', cors(corsOptions));

app.use(cors(corsOptions));
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

// EXPORT THE APP
export default app;