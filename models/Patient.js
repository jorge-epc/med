const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Por favor ingresa un nombre',
  },
  identification: {
    type: String,
    trim: true,
  },
  birth_date: Date,
  birth_place: String,
  gender: {
    type: String,
    required: 'Por favor ingresa un género',
  },
  status: String,
  blood_type: String,
  location: {
    address: {
      type: String,
      required: 'Por favor ingresa una dirección',
    },
    city: {
      type: String,
      required: 'Por favor ingresa una ciudad',
    },
  },
  phone: String,
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  job: String,
  pathological_record: String,
  family_pathological_record: String,
  created: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

patientSchema.index({
  name: 'text',
  identification: 'text',
});

patientSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'patient',
});

module.exports = mongoose.model('Patient', patientSchema);
