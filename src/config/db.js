import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa la base de datos.');

    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');
    
  } catch (error) {
    console.error('Fallo en la conexión a la base de datos:', error);
  }
}