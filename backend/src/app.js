import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'UP', message: 'Fitness Flow API is running' });
});

async function startServer() {
  try {
    // Verificar conexión a DB antes de arrancar
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');
    
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();