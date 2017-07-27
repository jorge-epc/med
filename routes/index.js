const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');
const appointmentController = require('../controllers/appointmentController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();


/* Register and login */
router.get('/', userController.welcome);
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login,
);
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


/* Patients */
router.get('/patients', authController.isLoggedIn, catchErrors(patientController.index));
router.get('/patients/page/:page', authController.isLoggedIn, catchErrors(patientController.index));
router.get('/patients/create', authController.isLoggedIn, patientController.patientForm);
router.post('/patients/create', authController.isLoggedIn, catchErrors(patientController.create));
router.get('/patients/:id/update', authController.isLoggedIn, catchErrors(patientController.updateForm));
router.post('/patients/create/:id', authController.isLoggedIn, catchErrors(patientController.update));
router.get('/patients/:id', authController.isLoggedIn, catchErrors(patientController.getPatientById));


/* Appointments */
router.get('/patients/:id/appointments/create', authController.isLoggedIn, appointmentController.appointmentForm);
router.post('/patients/:id/appointments/create', authController.isLoggedIn, catchErrors(appointmentController.create));
router.get('/patients/:patient/appointments/:id/update', authController.isLoggedIn, catchErrors(appointmentController.updateForm));
router.post('/patients/:patient/appointments/create/:id', authController.isLoggedIn, catchErrors(appointmentController.update));
router.get('/patients/:patient/appointments/:id', authController.isLoggedIn, catchErrors(appointmentController.getAppointmentById));


/* API */
router.get('/api/patients', authController.isLoggedIn, catchErrors(patientController.search));

module.exports = router;
