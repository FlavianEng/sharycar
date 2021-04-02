import mongoose from 'mongoose';

async function dbConnect() {
  console.log('inDbConnect');
  if (mongoose.connection.readyState >= 1) {
    console.log('Connected using old connection');
    return;
  }

  console.log('Connected using new connection');
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    throw new Error('Connection to Db failed', error);
  }
}

export default dbConnect;
