import { printer as ThermalPrinter, PrinterTypes, CharacterSet } from "node-thermal-printer";
import connectDB from "../config/db.js";

export const printTicket = async (req, res) => {
  try {
    const connection = await connectDB();
    const { ticketNumber, descripcion, Valor } = req.body;

    let printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: 'TCP://192.168.1.11',
      options: { timeout: 5000 },
      characterSet: CharacterSet.PC852_LATIN2,
    });

    let isConnected = await printer.isPrinterConnected();
    if (!isConnected) {
      return res.status(500).json({ error: "La impresora no está conectada" });
    }

    printer.alignCenter();
    printer.bold(true);
    printer.println("MUNICIPALIDAD DE PUERTO CORTES");
    printer.println("RTN 03019000044953");
    printer.println("Estacion: PUERTO CORTES");
    printer.println("Via #1");
    printer.newLine();
    printer.println(`Ticket No. ${ticketNumber}`);
    printer.println(`Fecha ${new Date().toLocaleString()}`);
    printer.println(`Vehiculo: ${descripcion}`);
    printer.println(`Total: L. ${Number(Valor).toFixed(2)}`);
    printer.newLine();
    printer.println("Contribucion por mejoras");
    printer.newLine();
    printer.cut();

    let execute = await printer.execute();
    if (execute) {
      return res.json({ message: "Impresión enviada correctamente" });
    } else {
      return res.status(500).json({ error: "Error al imprimir el ticket" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno", details: error.message });
  }
};