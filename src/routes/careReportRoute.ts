import express from 'express';
import * as careReportController from '../controllers/careReportController';

const router = express.Router();

router.post('/api/careReport/create', careReportController.createCareReport);
router.get('/api/careStatus', careReportController.getAllCareStatus);
router.get('/api/careReport', careReportController.getAllCareReport);

export default router;
