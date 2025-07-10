import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('sistema_de_votaciones', 'root', 'dataPassword123', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa la base de datos.');

    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados con la base de datos.');
    
  } catch (error) {
    console.error('Fallo en la conexión a la base de datos:', error);
  }
}