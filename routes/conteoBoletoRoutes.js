import express from "express";
import crearControladorConteoBoletos from "../controllers/conteoBoletoController.js";
import crearModeloContador from "../models/conteoBoletoModel.js";

const router = express.Router();

// Crear instancias del modelo y controlador
const modelo = crearModeloContador("Cajas"); // "Cajas" es el nombre de la tabla
const controlador = crearControladorConteoBoletos(modelo);

// Definir las rutas
router.get("/conteo-boletos", controlador.obtenerConteoBoletos); // Obtener el contador actual
router.post("/actualizar-conteo", controlador.actualizarConteoBoletos); // Actualizar el contador
router.post("/limpiar-conteo", controlador.limpiarConteoBoletos); // Reiniciar el contador
router.get("/ultimo-ticket", controlador.obtenerUltimoTicket); // Obtener el último contador

export default router;