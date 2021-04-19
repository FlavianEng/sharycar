import mongoose from 'mongoose';

const journey = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a driver'],
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Please provide a car'],
  },
  departure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: [true, 'Please provide a departure address'],
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: [true, 'Please provide a destination address'],
  },
  timeOfDeparture: {
    type: Date,
    required: [true, 'Please provide a time of departure'],
  },
  arrivalDate: {
    type: Date,
  },
  maxPassengers: {
    type: Number,
    required: [true, 'Please provide a number of max passengers'],
  },
  passengers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  isRestrictedToWoman: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Journey ||
  mongoose.model('Journey', journey);
