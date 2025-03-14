const crearControladorConteoBoletos = (modelo) => {
    const obtenerConteoBoletos = async (req, res) => {
      try {
        const ultimoContador = await modelo.obtenerUltimoContador();
        res.status(200).json({ contador: ultimoContador });
      } catch (error) {
        res.status(500).json({ message: 'Error al obtener el contador de boletos', error });
      }
    };
  
    const actualizarConteoBoletos = async (req, res) => {
      try {
        // Actualiza el contador y obtiene el nuevo valor
        const nuevoContador = await modelo.actualizarContador();
        res.status(200).json({ message: "Contador actualizado con éxito", contador: nuevoContador });
      } catch (error) {
        console.error("Error al actualizar el contador de boletos:", error);
        res.status(500).json({ message: "Error al actualizar el contador de boletos", error });
      }
    };
  
    const limpiarConteoBoletos = async (req, res) => {
      try {
        // Reinicia el contador a 0
        const connection = await modelo.obtenerConexion(); // Asume que el modelo tiene un método para obtener la conexión
        await connection.query(`UPDATE Cajas SET Contador = 0`);
        res.status(200).json({ message: 'Contador reiniciado exitosamente.' });
      } catch (error) {
        console.error('Error al reiniciar el contador:', error);
        res.status(500).json({ message: 'Error al reiniciar el contador.', error });
      }
    };
  
    const obtenerUltimoTicket = async (req, res) => {
      try {
        const ultimoContador = await modelo.obtenerUltimoContador();
        if (ultimoContador !== null) {
          res.status(200).json({ contador: ultimoContador });
        } else {
          res.status(404).json({ message: "No se encontró un contador" });
        }
      } catch (error) {
        res.status(500).json({ message: "Error al obtener el último contador", error });
      }
    };
  
    return {
      obtenerConteoBoletos,
      actualizarConteoBoletos,
      limpiarConteoBoletos,
      obtenerUltimoTicket,
    };
  };
  
  export default crearControladorConteoBoletos;