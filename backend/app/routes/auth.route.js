module.exports = (app) => {
  const authController = require('../controllers/auth.controller')
  var router = require('express').Router()
  //rigister
  router.post('/register', authController.register)
  //login
  router.post('/login', authController.login)
  app.use('/api', router)
}
