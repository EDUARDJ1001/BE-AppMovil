import express from 'express';
import { obtenerCajas } from '../controllers/cajaController.js';

const router = express.Router();

router.get('/', obtenerCajas);

export default router;