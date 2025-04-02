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

  const registrarMultiplesBoletos = async (boletos) => {
    const connection = await connectDB();

    try {
      const idsInsertados = [];

      // Iniciamos la transacción
      await connection.query('START TRANSACTION');

      for (const boleto of boletos) {
        // Verificaciones (usando connection directamente)
        const [valorRows] = await connection.query(
          'SELECT Id FROM Valor_Boletos WHERE Id = ?',
          [boleto.valorBoletoId]
        );

        if (valorRows.length === 0) {
          throw new Error(`Valor boleto ID ${boleto.valorBoletoId} no existe`);
        }

        const [cajaRows] = await connection.query(
          'SELECT Id FROM Cajas WHERE Id = ?',
          [boleto.cajaId]
        );

        if (cajaRows.length === 0) {
          throw new Error(`Caja ID ${boleto.cajaId} no existe`);
        }

        // Inserción
        const [result] = await connection.query(
          'INSERT INTO Conteo_Boletos SET ?',
          {
            Valor_Boleto_Id: boleto.valorBoletoId,
            Caja_Id: boleto.cajaId,
            Cantidad: boleto.cantidad,
            Total: boleto.total
          }
        );

        idsInsertados.push(result.insertId);
      }

      await connection.query('COMMIT');
      return idsInsertados;

    } catch (err) {
      await connection.query('ROLLBACK');
      console.error('Error al registrar múltiples boletos:', err);
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
    registrarMultiplesBoletos,
    obtenerConteoActual,
    reiniciarConteo,
    obtenerHistorial
  };
};

export default crearModeloConteoBoletos;