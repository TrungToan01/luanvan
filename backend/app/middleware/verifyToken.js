const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers['token']
  jwt.verify(token, process.env.JWT_KEY, (err, data) => {
    if (err) {
      return err
    } else {
      next()
    }
  })
}
