const { getUserByUsername } = require('../services/users');
const { HTTP_CODE_UNAUTHORIZED, SITE_DOMAIN } = require('../constants');

function loginMiddleware(req, res, next) {
  const { username } = req.body;
  const user = getUserByUsername(username);

  if (user) {
    res.cookie('user', user, { domain: SITE_DOMAIN });
    res.send(JSON.stringify(user));
  } else {
    res.clearCookie('user');
    res.sendStatus(HTTP_CODE_UNAUTHORIZED);
  }

  next();
}

module.exports = loginMiddleware;
