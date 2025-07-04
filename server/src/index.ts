import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import profileRoutes from './routes/profileRoutes';

const app = express();
const PORT = process.env.PORT || 5001;
const HOST = '0.0.0.0';

const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.100.96:3000',
  'https://devlink-project-git-main-brandons-projects-00163be8.vercel.app', 
  'https://devlink-project.vercel.app', 
  'https://devlink-project-production.up.railway.app', 
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      console.log(msg); 
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', profileRoutes);

app.listen(Number(PORT), HOST, () => {
  console.log(`Server is listening on port ${PORT}`);
});