const mongoose = require('mongoose');
const promisify = require('es6-promisify');

const User = mongoose.model('User');

exports.welcome = (req, res) => {
  res.render('index', { title: 'Bienvenido' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Registro' });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'Por favor ingresa un nombre').notEmpty();
  req.checkBody('email', 'Email no válido').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remote_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Por favor ingresa una contraseña').notEmpty();
  req.checkBody('password-confirm', 'Por favor confirma tu contraseña').notEmpty();
  req.checkBody('password-confirm', 'Las contraseñas no coinciden').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { title: 'Registro', body: req.body, flashes: req.flash() });
    return;
  }

  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};
