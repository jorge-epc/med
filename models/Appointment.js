const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: 'El paciente es requerido',
  },
  reason: {
    type: String,
    required: 'Por favor ingresa el motivo',
  },
  exams: String,
  vital_signs: String,
  diagnosis: {
    type: String,
    required: 'Por favor ingresa el diagnóstico',
  },
  treatment: {
    type: String,
    required: 'Por favor ingresa el tratamiento',
  },
  requested_exams: String,
  requested_appointment: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
