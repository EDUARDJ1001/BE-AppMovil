import { obtenerGeneros as obtenerGenerosModel } from "../models/generoModel.js";

export const obtenerGeneros = async (req, res) => {
    try {
        const generos = await obtenerGenerosModel();
        res.status(200).json(generos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener generos', error});
    }
}