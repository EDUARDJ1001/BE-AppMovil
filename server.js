import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import registerRoutes from './routes/index.js';
import printerRoutes from './routes/printRoutes.js';

dotenv.config();

const app = express();

app.use(cors({}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Backend APP MOVIL</title>
            </head>
            <body>
                <h1>Conexión a la base de datos establecida correctamente</h1>
            </body>
        </html>
    `);
});


app.use('/api', printerRoutes);

registerRoutes(app);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, async () => {
    try {
        await connectDB();
        console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
    } catch (err) {
        console.error('Error al conectar la base de datos al iniciar el servidor:', err);
    }
});
