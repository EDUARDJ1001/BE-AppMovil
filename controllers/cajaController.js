import { obtenerCajas as obtenerCajasModel } from "../models/cajaModel.js";

export const obtenerCajas = async (req, res) => {
    try {
        const vias = await obtenerCajasModel();
        res.status(200).json(vias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cajas', error});
    }
}