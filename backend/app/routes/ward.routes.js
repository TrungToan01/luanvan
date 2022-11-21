module.exports = (app) => {
  const wards = require('../controllers/wards.controller')
  var router = require('express').Router()
  // Create a new wards
  router.post('/add', wards.create)
  // Retrieve all wards
  router.get('/getall', wards.findAll)
  // Retrieve a single wards with id
  router.get('/getOne/:id', wards.findOne)
  // Update a wards with id
  router.put('/update/:id', wards.update)
  // Delete a wards with id
  router.delete('/delete/:id', wards.delete)
  app.use('/api/wards', router)
}
