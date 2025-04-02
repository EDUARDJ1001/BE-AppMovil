const crearControladorConteoBoletos = (modelo) => {
  const registrarBoleto = async (req, res) => {
    try {
      const { valorBoletoId, cajaId, cantidad, total } = req.body;
      
      if (!valorBoletoId || !cajaId || !cantidad || !total) {
        return res.status(400).json({ 
          message: 'Todos los campos son requeridos (valorBoletoId, cajaId, cantidad, total)' 
        });
      }
      
      const id = await modelo.insertarBoleto(valorBoletoId, cajaId, cantidad, total);
      
      res.status(201).json({ 
        success: true,
        message: 'Boleto registrado correctamente',
        id
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Error al registrar boleto',
        error: error.message
      });
    }
  };

  const registrarMultiplesBoletos = async (req, res) => {
    try {
      const { boletos } = req.body;
      
      // Validación básica
      if (!boletos || !Array.isArray(boletos) || boletos.length === 0) {
        return res.status(400).json({ 
          success: false,
          message: 'Se requiere un array de boletos no vacío en el cuerpo de la solicitud'
        });
      }
      
      // Validación detallada
      const errores = [];
      boletos.forEach((boleto, index) => {
        if (!boleto.valorBoletoId || !boleto.cajaId || !boleto.cantidad || !boleto.total) {
          errores.push(`Boleto en posición ${index} no tiene todos los campos requeridos`);
        }
      });
      
      if (errores.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Errores de validación en los boletos',
          errors: errores
        });
      }
      
      const idsInsertados = await modelo.registrarMultiplesBoletos(boletos);
      
      res.status(201).json({ 
        success: true,
        message: `Se registraron ${idsInsertados.length} boletos correctamente`,
        ids: idsInsertados
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Error al registrar múltiples boletos',
        error: error.message
      });
    }
  };

  const obtenerConteoActual = async (req, res) => {
    try {
      const { cajaId } = req.params;
      
      if (!cajaId) {
        return res.status(400).json({ 
          message: 'El ID de la caja es requerido' 
        });
      }
      
      const conteo = await modelo.obtenerConteoActual(cajaId);
      
      if (!conteo) {
        return res.status(404).json({ 
          message: 'No se encontró registro para esta caja' 
        });
      }
      
      res.status(200).json(conteo);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener conteo actual',
        error: error.message
      });
    }
  };

  const reiniciarConteo = async (req, res) => {
    try {
      const { cajaId } = req.body;
      
      if (!cajaId) {
        return res.status(400).json({ 
          message: 'El ID de la caja es requerido' 
        });
      }
      
      await modelo.reiniciarConteo(cajaId);
      
      res.status(200).json({ 
        success: true,
        message: 'Conteo reiniciado correctamente'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Error al reiniciar conteo',
        error: error.message
      });
    }
  };

  const obtenerHistorial = async (req, res) => {
    try {
      const { cajaId } = req.params;
      const { limite } = req.query;
      
      if (!cajaId) {
        return res.status(400).json({ 
          message: 'El ID de la caja es requerido' 
        });
      }
      
      const historial = await modelo.obtenerHistorial(cajaId, limite || 10);
      
      res.status(200).json(historial);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener historial',
        error: error.message
      });
    }
  };

  return {
    registrarBoleto,
    registrarMultiplesBoletos,
    obtenerConteoActual,
    reiniciarConteo,
    obtenerHistorial
  };
};

export default crearControladorConteoBoletos;