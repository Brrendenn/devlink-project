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
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test endpoint working' });
});

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', profileRoutes);

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

export default app;