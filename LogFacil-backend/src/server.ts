import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import requisicaoRoutes from './routes/requisicaoRoutes';
import { protect } from './middleware/authMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/requisicoes', protect, requisicaoRoutes);

app.listen(port, () => {
  console.log(`Backend a correr em http://localhost:${port}`);
});