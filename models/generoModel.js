import connectDB from "../config/db.js";

export const obtenerGeneros = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Generos';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener generos:', err);
        throw err;
    }
};