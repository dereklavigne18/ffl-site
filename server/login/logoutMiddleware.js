const { HTTP_CODE_OK } = require('../constants');

function logoutMiddleware(req, res, next) {
  res.clearCookie('user');
  res.sendStatus(HTTP_CODE_OK);

  next();
}

module.exports = logoutMiddleware;
