import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import logger from './config/logger.js';
import v1AuthRoutes from './routes/v1/auth.routes.js';
import v1InventoryRoutes from './routes/v1/inventory.routes.js';
import v1ItemRoutes from './routes/v1/item.routes.js';

const app = express();
const PORT = 3000;

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', v1AuthRoutes);
app.use('/api/v1/inventory', v1InventoryRoutes);
app.use('/api/v1/item', v1ItemRoutes)

app.listen(PORT, () => {
  logger.info(`Servidor iniciado na porta ${PORT}`);
});
