module.exports = (app) => {
  const order = require('../controllers/order.controller')
  var router = require('express').Router()
  // Create new order
  router.post('/create', order.create)
  // Retrieve all order
  router.get('/getall', order.findAll)
  // Retrieve a single order with id
  router.get('/getOne/:id', order.findOne)
  // Update a order with id
  router.put('/update/:id', order.update)
  // Delete a order with id
  router.delete('/delete/:id', order.delete)

  app.use('/api/order', router)
}
