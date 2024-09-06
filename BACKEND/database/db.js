const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_SRV;


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