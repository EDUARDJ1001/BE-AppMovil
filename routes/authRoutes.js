import express from 'express';
import { login, logoutCaja1, logoutCaja2, logoutCaja3, logoutCaja4, updateSelectedCaja } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/updateSelectedCaja', updateSelectedCaja);
router.post('/logoutCaja1', logoutCaja1);
router.post('/logoutCaja2', logoutCaja2);
router.post('/logoutCaja3', logoutCaja3);
router.post('/logoutCaja4', logoutCaja4);

export default router;
