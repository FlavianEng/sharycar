import mongoose from 'mongoose';

const emailRegex = new RegExp(
  "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
);
const phoneRegex = new RegExp(
  '(\\+?( |-|\\.)?\\d{1,2}( |-|\\.)?)?(\\(?\\d{3}\\)?|\\d{3})( |-|\\.)?(\\d{3}( |-|\\.)?\\d{4})'
);

const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name'],
  },
  gender: {
    type: String,
    required: [true, 'Please provide your gender'],
    enum: ['Man', 'Woman', 'Neither'],
  },
  birthday: {
    type: Date,
    required: false,
  },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        return emailRegex.test(value);
      },
      message: (props) =>
        `${JSON.stringify(props.value)} is not a valid email`,
    },
    required: [true, 'Please provide your company email'],
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return phoneRegex.test(value.trim());
      },
      message: (props) =>
        `${JSON.stringify(props.value)} is not a valid phone number`,
    },
    required: [true, 'Please provide your phone number'],
  },
  companyId: {
    type: mongoose.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  role: {
    type: String,
    enum: ['User', 'Company'],
    default: 'User',
  },
  addressId: {
    type: mongoose.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
});

export default mongoose.models.User || mongoose.model('User', user);
