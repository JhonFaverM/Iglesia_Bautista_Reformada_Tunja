const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_SRV;
//const username = process.env.MONGO_USER;
//const password = process.env.MONGO_PASSWORD;
//const host = process.env.MONGO_HOST;
//const port = process.env.MONGO_PORT;
//const dbName = process.env.MONGO_DATABASE;

class DatabaseConexion {
  static instance;
  
  constructor() {
    if (!!DatabaseConexion.instance) {
      return DatabaseConexion.instance;
    }
    this.isConnected = false;
    DatabaseConexion.instance = this;
  }

  async connect() {
    try {
      if (!this.isConnected) {
        //const uri = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
        console.log(`Intentando conectar a MongoDB en: ${mongoUri}`);
        mongoose.set('debug', true);
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.isConnected = true;
        console.log('Conexión exitosa a MongoDB Atlas');
      } else {
        console.log('Ya está conectado a MongoDB');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  }

  disconnect() {
    if (this.isConnected) {
      mongoose.disconnect();
      this.isConnected = false;
      console.log('Desconexión exitosa');
    } else {
      console.log('No hay conexión activa a MongoDB para desconectar');
    }
  }
}

module.exports = DatabaseConexion;