import connectDB from "../config/db.js";

const crearModeloContador = (nombreTabla) => {

  const insertNewId = async () => {
    try {
      const connection = await connectDB();
      const queryInsertContador = `INSERT INTO ${nombreTabla} () VALUES ()`;
      const [result] = await connection.query(queryInsertContador);
      const nuevoId = result.insertId;

      console.log(`Nuevo id insertado en ${nombreTabla}: ${nuevoId}`);
      return nuevoId;
    } catch (err) {
      console.error(`Error al insertar nuevo id en ${nombreTabla}:`, err);
      throw err;
    }
  };

  const obtenerUltimoId = async () => {
    try {
      const connection = await connectDB();
      const queryUltimoId = `SELECT Id FROM ${nombreTabla} ORDER BY Id DESC LIMIT 1`;
      const [rows] = await connection.query(queryUltimoId);

      if (rows.length === 0) {
        throw new Error("No se encontraron IDs en la tabla.");
      }

      const ultimoId = rows[0].Id;
      console.log(`Último id obtenido de ${nombreTabla}: ${ultimoId}`);
      return ultimoId;
    } catch (err) {
      console.error(`Error al obtener el último id de ${nombreTabla}:`, err);
      throw err;
    }
  };

  return {
    insertNewId,
    obtenerUltimoId,
  };
};

export default crearModeloContador;