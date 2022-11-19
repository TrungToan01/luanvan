module.exports = (app) => {
  const order_tracking = require('../controllers/order_tracking.controller')
  var router = require('express').Router()
  // Create new order_tracking
  router.post('/create', order_tracking.create)
  // Retrieve all order_tracking
  router.get('/getall', order_tracking.findAll)
  // Retrieve a single order_tracking with id
  router.get('/getOne/:id', order_tracking.findOne)
  // Update a order_tracking with id
  router.put('/update/:id', order_tracking.update)
  // Delete a order_tracking with id
  router.delete('/delete/:id', order_tracking.delete)

  app.use('/api/order_tracking', router)
}
