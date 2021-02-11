const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    let token = req.get('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.body.token = decoded;
    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};
