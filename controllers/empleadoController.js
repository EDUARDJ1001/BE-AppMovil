import { registrarEmpleado } from "../models/empleadoModel.js";
import { obtenerCargos as obtenerCargosModel } from "../models/cargoModel.js";
import { obtenerGeneros as obtenerGenerosModel } from "../models/generoModel.js";
import { obtenerEmpleados as obtenerEmpleadosModel } from "../models/empleadoModel.js";
import { obtenerEmpleadoPorId } from "../models/empleadoModel.js";
import { actualizarEmpleado as actualizarEmpleadoModel } from "../models/empleadoModel.js";
import { eliminarEmpleado} from "../models/empleadoModel.js";
import { obtenerEmpleadoPorUsername } from "../models/empleadoModel.js";

export const obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await obtenerEmpleadosModel();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleados', error});
    }
}

export const obtenerOpcionesParaEmpleado = async (req, res) => {
    try {
        const cargos = await obtenerCargosModel();
        const generos = await obtenerGenerosModel();
        res.status(200).json({ cargos, generos });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener opciones.", error });
    }
};


export const obtenerEmpleadoPorIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const empleado = await obtenerEmpleadoPorId(id);

        if (empleado) {
            res.status(200).json(empleado);
        } else {
            res.status(404).json({ message: "Empleado no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener empleado.", error });
    }
};

export const registrarEmpleadoController = async (req, res) => {
    try {
        const { nombre, apellido, identidad, cargoId, generoId, username, password } = req.body;

        if (!nombre || !apellido || !identidad || !cargoId || !generoId || !username || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres." });
        }

        // Verificar si el username ya existe
        const usuarioExistente = await obtenerEmpleadoPorUsername(username);
        if (usuarioExistente) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
        }

        await registrarEmpleado(nombre, apellido, identidad, cargoId, generoId, username, password);

        res.status(201).json({ message: "Empleado registrado correctamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar empleado.", error });
    }
};

export const actualizarEmpleadoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { cargoId, password } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: "El ID proporcionado no es válido." });
        }

        // Obtener datos actuales del empleado
        const empleadoActual = await obtenerEmpleadoPorId(id);
        if (!empleadoActual) {
            return res.status(404).json({ message: "Empleado no encontrado." });
        }

        // Mantener los valores actuales si no se envían en la solicitud
        const datosActualizados = {
            cargoId: cargoId ?? empleadoActual.Cargo_Id,
            password: password ?? undefined, // Solo actualizar si se proporciona
        };

        const result = await actualizarEmpleadoModel(id, datosActualizados);

        if (result === 0) {
            return res.status(400).json({ message: "No hubo cambios en los datos del empleado." });
        }

        res.status(200).json({ message: "Empleado actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar empleado:", error);
        res.status(500).json({ message: "Error al actualizar empleado.", error });
    }
};

export const eliminarEmpleadoController = async (req, res) => {
    const { id } = req.params;

    try {
        const success = await eliminarEmpleado(id);

        if (success) {
            res.status(200).json({ message: "Empleado eliminado correctamente." });
        } else {
            res.status(404).json({ message: "Empleado no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar empleado.", error });
    }
};