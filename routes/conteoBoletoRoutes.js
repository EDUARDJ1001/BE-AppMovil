import express from "express";
import crearControladorConteoBoletos from "../controllers/conteoBoletoController.js";
import crearModeloConteoBoletos from "../models/conteoBoletoModel.js";

const router = express.Router();
const modelo = crearModeloConteoBoletos();
const controlador = crearControladorConteoBoletos(modelo);

// Registrar nuevo boleto
router.post("/registrar", controlador.registrarBoleto);

// Obtener conteo actual por caja
router.get("/caja/:cajaId", controlador.obtenerConteoActual);

// Reiniciar conteo de una caja
router.post("/reiniciar", controlador.reiniciarConteo);

// Obtener historial de boletos por caja
router.get("/historial/:cajaId", controlador.obtenerHistorial);

export default router;