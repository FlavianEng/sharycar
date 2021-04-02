import mongoose from 'mongoose';

async function dbConnect() {
  console.log('inDbConnect');
  if (mongoose.connection.readyState >= 1) {
    console.log('Connected using old connection');
    return;
  }

  console.log('Connected using new connection');
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

export default dbConnect;
