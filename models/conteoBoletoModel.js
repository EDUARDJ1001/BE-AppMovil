import connectDB from "../config/db.js";

const crearModeloConteoBoletos = () => {
  const insertarBoleto = async (valorBoletoId, cajaId, cantidad, total) => {
    try {
      const connection = await connectDB();
      
      // Verificar que exista el valor del boleto
      const [valorRows] = await connection.query(
        'SELECT Id FROM Valor_Boletos WHERE Id = ?',
        [valorBoletoId]
      );
      
      if (valorRows.length === 0) {
        throw new Error("El valor del boleto no existe");
      }
      
      // Verificar que exista la caja
      const [cajaRows] = await connection.query(
        'SELECT Id FROM Cajas WHERE Id = ?',
        [cajaId]
      );
      
      if (cajaRows.length === 0) {
        throw new Error("La caja no existe");
      }
      
      // Insertar el registro
      const [result] = await connection.query(
        'INSERT INTO Conteo_Boletos (Valor_Boleto_Id, Caja_Id, Cantidad, Total) VALUES (?, ?, ?, ?)',
        [valorBoletoId, cajaId, cantidad, total]
      );
      
      return result.insertId;
    } catch (err) {
      console.error('Error al insertar boleto:', err);
      throw err;
    }
  };

  const obtenerConteoActual = async (cajaId) => {
    try {
      const connection = await connectDB();
      
      const [rows] = await connection.query(
        `SELECT 
          cb.Id,
          vb.Valor,
          cb.Cantidad,
          cb.Total,
          cb.Caja_Id
        FROM Conteo_Boletos cb
        JOIN Valor_Boletos vb ON cb.Valor_Boleto_Id = vb.Id
        WHERE cb.Caja_Id = ?
        ORDER BY cb.Id DESC
        LIMIT 1`,
        [cajaId]
      );
      
      return rows[0] || null;
    } catch (err) {
      console.error('Error al obtener conteo actual:', err);
      throw err;
    }
  };

  const reiniciarConteo = async (cajaId) => {
    try {
      const connection = await connectDB();
      
      await connection.query(
        'DELETE FROM Conteo_Boletos WHERE Caja_Id = ?',
        [cajaId]
      );
      
      return true;
    } catch (err) {
      console.error('Error al reiniciar conteo:', err);
      throw err;
    }
  };

  const obtenerHistorial = async (cajaId, limite = 10) => {
    try {
      const connection = await connectDB();
      
      const [rows] = await connection.query(
        `SELECT 
          cb.Id,
          vb.Valor,
          cb.Cantidad,
          cb.Total,
          cb.Caja_Id,
          cb.created_at
        FROM Conteo_Boletos cb
        JOIN Valor_Boletos vb ON cb.Valor_Boleto_Id = vb.Id
        WHERE cb.Caja_Id = ?
        ORDER BY cb.Id DESC
        LIMIT ?`,
        [cajaId, limite]
      );
      
      return rows;
    } catch (err) {
      console.error('Error al obtener historial:', err);
      throw err;
    }
  };

  return {
    insertarBoleto,
    obtenerConteoActual,
    reiniciarConteo,
    obtenerHistorial
  };
};

export default crearModeloConteoBoletos;