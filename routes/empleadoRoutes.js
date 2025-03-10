import express from 'express';
import { 
    obtenerEmpleados, 
    registrarEmpleadoController, 
    obtenerOpcionesParaEmpleado, 
    actualizarEmpleadoController, 
    eliminarEmpleadoController, 
    obtenerEmpleadoPorIdController
} from '../controllers/empleadoController.js';

const router = express.Router();

// Middleware para validar el ID antes de pasarlo al controlador
router.param("id", (req, res, next, id) => {
    if (isNaN(id)) {
        return res.status(400).json({ message: "El ID debe ser un número válido." });
    }
    next();
});

// Rutas
router.get("/", obtenerEmpleados);
router.get("/opciones", obtenerOpcionesParaEmpleado);
router.get("/:id", obtenerEmpleadoPorIdController);
router.post("/", registrarEmpleadoController);
router.put("/:id", actualizarEmpleadoController);
router.delete("/:id", eliminarEmpleadoController);

export default router;
