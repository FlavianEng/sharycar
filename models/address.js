import mongoose from 'mongoose';

const address = new mongoose.Schema({
  street: {
    type: String,
    required: [true, 'Please provide a street'],
  },
  city: { type: String, required: [true, 'Please provide a city'] },
  postCode: {
    type: String,
    required: [true, 'Please provide a postCode'],
  },
  country: {
    type: String,
    required: [true, 'Please provide a country'],
  },
});

export default mongoose.models.Address ||
  mongoose.model('Address', address);
