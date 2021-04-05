import mongoose from 'mongoose';

const company = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide an user id'],
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: [true, 'Please provide an address id'],
  },
  companyName: {
    type: String,
    required: [true, 'Please provide a company name'],
  },
  registrationNumber: {
    type: String,
    required: [true, 'Please provide a registration number'],
  },
  plan: {
    type: String,
    enum: ['free', 'partial', 'full'],
    required: [true, 'Please provide a plan'],
  },
  emailTemplate: {
    type: String,
    required: [true, 'Please provide an email template'],
  },
  companyCode: {
    type: String,
    required: [true, 'Please provide a company code'],
  },
});

export default mongoose.models.Company ||
  mongoose.model('Company', company);
