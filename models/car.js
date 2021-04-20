import mongoose from 'mongoose';

const car = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a car driver'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide a car brand'],
  },
  model: {
    type: String,
    required: [true, 'Please provide a car model'],
  },
  color: {
    type: String,
    required: [true, 'Please provide a car color'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  seats: {
    type: Number,
    default: 3,
  },
});

export default mongoose.models.Car || mongoose.model('Car', car);
