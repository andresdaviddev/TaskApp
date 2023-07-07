import { connect } from 'mongoose';

const url = 'mongodb://127.0.0.1:27017/taskAppDB';

const connectDB = async () => {
  try {
    await connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
};

export default connectDB;
