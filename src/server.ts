import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import logger from './config/logger.js';
import authRoutes from './routes/auth.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';

const app = express();
const PORT = 3000;

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/inventory', inventoryRoutes);

app.listen(PORT, () => {
  logger.info(`Servidor iniciado na porta ${PORT}`);
});
