import express from 'express';
import { obtenerGeneros } from '../controllers/generoController.js';

const router = express.Router();

router.get('/', obtenerGeneros);

export default router;