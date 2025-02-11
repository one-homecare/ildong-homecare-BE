import express from 'express';
import * as careReportController from '../controllers/careReportController';

const router = express.Router();

router.post('/api/care-report', careReportController.createCareReport);
router.get('/api/care-status', careReportController.getAllCareStatus);
router.get('/api/care-report', careReportController.getAllCareReport);

export default router;
