import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import fs from 'fs';

dotenv.config();

let pool;

const connectDB = async () => {
    if (!pool) {
        try {
            pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT,
                ssl: {
                    ca: fs.readFileSync(process.env.DB_SSL_CA) 
                },
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });

            console.log('Conexión exitosa al pool de base de datos.');
        } catch (err) {
            console.error('Error al conectar al pool de base de datos:', err);
            throw err;
        }
    }
    return pool;
};

export default connectDB;
