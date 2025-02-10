import express from 'express';
import cors from 'cors';
import buildingRoute from './routes/buildingRoute';
import careReportRoute from './routes/careReportRoute';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', buildingRoute);
app.use('/', careReportRoute);

export default app;
