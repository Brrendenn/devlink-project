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

// ... THE REST OF YOUR FILE ...