import { obtenerValorBilletes as obtenerValorBilletesModel } from "../models/valorBilleteModel.js";

export const obtenerValorBilletes = async (req, res) => {
    try {
        const valor_Billetes = await obtenerValorBilletesModel();
        res.status(200).json(valor_Billetes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener valores de Billetes', error});
    }
}