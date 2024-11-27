import * as mongoose from 'mongoose';

export const AnalystSchema = new mongoose.Schema({
  fullname: String,
  birthDay: String,
  documentNumber: String,
  gender: String,
  adress: {
    street: String,
    number: Number,
    city: String,
    state: String,
    postalCode: String,
  },
  contact: {
    phone: String,
    email: String,
    contactPreference: String,
  },
});
