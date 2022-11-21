module.exports = (app) => {
  const district = require('../controllers/district.controller')
  var router = require('express').Router()
  // Create new district
  router.post('/add', district.create)
  // Retrieve all district
  router.get('/getall', district.findAll)
  // Retrieve a single district with id
  router.get('/getOne/:id', district.findOne)
  // Update a district with id
  router.put('/update/:id', district.update)
  // Delete a district with id
  router.delete('/delete/:id', district.delete)

  app.use('/api/district', router)
}
