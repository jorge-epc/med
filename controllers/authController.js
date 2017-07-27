const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Login incorrecto',
  successRedirect: '/',
  successFlash: 'Has iniciado sesión',
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Has cerrado sesión');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'Debes iniciar sesión');
  res.redirect('/login');
};
