import { obtenerValorBoletos as obtenerValorBoletosModel } from "../models/valorBoletoModel.js";

export const obtenerValorBoletos = async (req, res) => {
    try {
        const valor_Boletos = await obtenerValorBoletosModel();
        res.status(200).json(valor_Boletos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener valores de boletos', error});
    }
}
