import express from 'express';
import * as buildingController from '../controllers/buildingController';

const router = express.Router();

router.post('/api/building/create', buildingController.createBuilding);
router.get('/api/building', buildingController.getAllBuilding);
router.post('/api/building/update', buildingController.updateBuilding);

export default router;
