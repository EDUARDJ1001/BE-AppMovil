import connectDB from "../config/db.js";

export const obtenerValorBoletos = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Valor_Boletos';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener valores de boletos:', err);
        throw err;
    }
};