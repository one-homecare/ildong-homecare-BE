import express from 'express';
import * as buildingController from '../controllers/buildingController';

const router = express.Router();

router.post('/api/building/create', buildingController.createBuilding);

export default router;
