module.exports = (app) => {
  const ram_option = require('../controllers/ram.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create a new ram_option
  router.post('/add', verify, ram_option.create)
  // Retrieve all ram_option
  router.get('/getall', ram_option.findAll)
  // Retrieve a single ram_option with id
  router.get('/getOne/:id', ram_option.findOne)
  // Update a ram_option with id
  router.put('/update/:id', verify, ram_option.update)
  // Delete a ram_option with id
  router.delete('/delete/:id', verify, ram_option.delete)
  app.use('/api/ram', router)
}
