import generoRoutes from './generoRoutes.js';
import cargoRoutes from './cargoRoutes.js';
import empleadoRoutes from './empleadoRoutes.js';
import cajaRoutes from './cajaRoutes.js';
import valorBoletoRoutes from './valorBoletoRoutes.js';
import valorBilleteRoutes from './valorBilleteRoutes.js';
import authRoutes from './authRoutes.js';

const registerRoutes = (app) => {
    app.use('/api/generos', generoRoutes);
    app.use('/api/cargos', cargoRoutes);
    app.use('/api/cajas', cajaRoutes);
    app.use('/api/valorBoletos', valorBoletoRoutes);
    app.use('/api/valorBilletes', valorBilleteRoutes);
    app.use('/api/empleados', empleadoRoutes);
    
    app.use('/api/auth', authRoutes);
};

export default registerRoutes;