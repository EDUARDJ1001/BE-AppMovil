import connectDB from "../config/db.js";

export const obtenerValorBilletes = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Valor_Billetes';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener valores de Billetes:', err);
        throw err;
    }
};