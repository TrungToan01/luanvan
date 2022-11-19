const multer = require('multer')

module.exports = (app) => {
  const user_address = require('../controllers/user_address.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  //create
  router.post('/add', verify, user.create)
  // Retrieve all user
  router.get('/getall', verify, user.findAll)
  // Retrieve a single user with id
  router.get('/getOne/:id', verify, user.findOne)
  // Update a user with id
  router.put('/update/:id', verify, user.update)
  // Delete a user with id
  router.delete('/delete/:id', verify, user.delete)

  app.use('/api/user_address', router)
}
