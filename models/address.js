import mongoose from 'mongoose';

const address = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name to your address'],
  },
  street: {
    type: String,
    required: [true, 'Please provide a street'],
  },
  city: { type: String, required: [true, 'Please provide a city'] },
  country: {
    type: String,
    required: [true, 'Please provide a country'],
  },
});

export default mongoose.models.Address ||
  mongoose.model('Address', address);
