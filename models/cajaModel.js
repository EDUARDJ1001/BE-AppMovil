import connectDB from "../config/db.js";

export const obtenerCajas = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Cajas';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener cajas:', err);
        throw err;
    }
};