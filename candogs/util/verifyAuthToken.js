const jwt = require('jsonwebtoken');
const auth0 = require('./auth0Info');

function verifyAuthToken(token) {
  if (!token || token.length === 0) {
    return false;
  }
  const secret = new Buffer(auth0.secret, 'base64');
  try {
    const decoded = jwt.verify(token, secret);
    return (decoded.iss === auth0.domain && decoded.aud === auth0.clientId);
  } catch(err) {
    return false;
  }
}

module.exports = verifyAuthToken;
