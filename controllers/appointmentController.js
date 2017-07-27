const mongoose = require('mongoose');

const Appointment = mongoose.model('Appointment');

exports.appointmentForm = (req, res) => {
  res.render('appointmentCreate', { title: 'Crear consulta', patient: req.params.id });
};

exports.create = async (req, res) => {
  req.body.patient = req.params.id;
  const appointment = await (new Appointment(req.body)).save();
  req.flash('success', 'Consulta creada correctamente');
  res.redirect(`/patients/${appointment.patient.toString()}`);
};

exports.updateForm = async (req, res) => {
  const appointment = await Appointment.findOne({ '_id': req.params.id });
  res.render('appointmentEdit', { title: 'Editar consulta', patient: req.params.patient, appointment });
};

exports.update = async (req, res) => {
  const appointment = await Appointment.findOneAndUpdate({ '_id': req.params.id }, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  req.flash('success', `Consulta actualizada correctamente. <a href="/patients/${appointment.patient.toString()}/appointments/${appointment._id}">Ver consulta</a>`);
  res.redirect(`/patients/${appointment.patient.toString()}/appointments/${appointment._id}/update`);
};

exports.getAppointmentById = async (req, res) => {
  const appointment = await Appointment.findOne({ '_id': req.params.id }).populate('patient');
  res.render('appointment', { title: 'Consulta', appointment });
};
