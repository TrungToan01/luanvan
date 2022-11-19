module.exports = (app) => {
  const user_role = require('../controllers/user_role.controller')
  var router = require('express').Router()
  // Create a new user_role
  router.post('/create', user_role.create)
  // Retrieve all user_role
  router.get('/getall', user_role.findAll)
  // Retrieve a single user_role with id
  router.get('/getOne/:id', user_role.findOne)
  // Update a user_role with id
  router.put('/update/:id', user_role.update)
  // Delete a user_role with id
  router.delete('/delete/:id', user_role.delete)
  app.use('/api/user_role', router)
}
