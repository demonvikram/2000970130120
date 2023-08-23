const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not provided' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not provided' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
