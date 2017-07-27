const mongoose = require('mongoose');

const Patient = mongoose.model('Patient');

exports.index = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = (page * limit) - limit;

  const patientsPromise = Patient
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ name: 'asc' });

  const countPromise = Patient.count();

  const [patients, count] = await Promise.all([patientsPromise, countPromise]);

  const pages = Math.ceil(count / limit);

  if (!patients.length && skip) {
    req.flash('info', `Solicitaste la página ${page}. Pero no existe. Has sido redireccionado a la página ${pages}`);
    res.redirect(`/patient/page/${pages}`);
    return;
  }

  res.render('patientIndex', { title: 'Pacientes', patients, page, pages, count });
};

exports.patientForm = (req, res) => {
  res.render('patientCreate', { title: 'Crear paciente' });
};

exports.create = async (req, res) => {
  const patient = await (new Patient(req.body)).save();
  req.flash('success', `Paciente ${patient.name} creado correctamente`);
  res.redirect(`/patients/${patient._id}`);
};

exports.updateForm = async (req, res) => {
  const patient = await Patient.findOne({ _id: req.params.id });
  res.render('patientEdit', { title: `Editar ${patient.name}`, patient });
};

exports.update = async (req, res) => {
  const patient = await Patient.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  req.flash('success', `Paciente ${patient.name} actualizado correctamente. <a href="/patients/${patient._id}">Ver paciente</a>`);
  res.redirect(`/patients/${patient._id}/update`);
};

exports.getPatientById = async (req, res) => {
  const patient = await Patient.findOne({ _id: req.params.id }).populate('appointments');
  res.render('patient', { title: patient.name, patient });
};

exports.search = async (req, res) => {
  const patients = await Patient
    .find({
      $text: { $search: req.query.q },
    }, {
      score: { $meta: 'textScore' },
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(10);
  res.json(patients);
};
