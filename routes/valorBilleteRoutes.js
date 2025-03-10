import express from 'express';
import { obtenerValorBilletes } from '../controllers/valorBilleteController.js';

const router = express.Router();

router.get('/', obtenerValorBilletes);

export default router;