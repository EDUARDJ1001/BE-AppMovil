import connectDB from "../config/db.js";

const crearModeloContador = (nombreTabla) => {
  const actualizarContador = async () => {
    try {
      const connection = await connectDB();

      // 1. Obtener el último valor de Contador
      const queryUltimoContador = `SELECT Contador FROM ${nombreTabla} ORDER BY Id DESC LIMIT 1`;
      const [rows] = await connection.query(queryUltimoContador);

      let nuevoContador = 1; // Valor por defecto si no hay registros

      if (rows.length > 0) {
        nuevoContador = rows[0].Contador + 1; // Incrementar el contador
      }

      // 2. Actualizar el campo Contador
      const queryActualizarContador = `UPDATE ${nombreTabla} SET Contador = ? ORDER BY Id DESC LIMIT 1`;
      await connection.query(queryActualizarContador, [nuevoContador]);

      console.log(`Contador actualizado en ${nombreTabla}: ${nuevoContador}`);
      return nuevoContador;
    } catch (err) {
      console.error(`Error al actualizar el contador en ${nombreTabla}:`, err);
      throw err;
    }
  };

  const obtenerUltimoContador = async () => {
    try {
      const connection = await connectDB();
      const queryUltimoContador = `SELECT Contador FROM ${nombreTabla} ORDER BY Id DESC LIMIT 1`;
      const [rows] = await connection.query(queryUltimoContador);

      if (rows.length === 0) {
        throw new Error("No se encontraron registros en la tabla.");
      }

      const ultimoContador = rows[0].Contador;
      console.log(`Último contador obtenido de ${nombreTabla}: ${ultimoContador}`);
      return ultimoContador;
    } catch (err) {
      console.error(`Error al obtener el último contador de ${nombreTabla}:`, err);
      throw err;
    }
  };

  return {
    actualizarContador,
    obtenerUltimoContador,
  };
};

export default crearModeloContador;