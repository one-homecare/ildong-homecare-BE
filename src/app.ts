import express from 'express';
import cors from 'cors';
import buildingRoutes from './routes/buildingRoute';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', buildingRoutes);

export default app;
