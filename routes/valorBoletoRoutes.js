import express from 'express';
import { obtenerValorBoletos } from '../controllers/valorBoletoController.js';

const router = express.Router();

router.get('/', obtenerValorBoletos);

export default router;