module.exports = (app) => {
  const order_tracking = require('../controllers/order_tracking.controller')
  const verify = require('../middleware/verifyToken')
  var router = require('express').Router()
  // Create new order_tracking
  router.post('/add', verify, order_tracking.create)
  // Retrieve all order_tracking
  router.get('/getall', verify, order_tracking.findAll)
  // Retrieve a single order_tracking with id
  router.get('/getOne/:id', verify, order_tracking.findOne)
  // Update a order_tracking with id
  router.put('/update/:id', verify, order_tracking.update)
  // Delete a order_tracking with id
  router.delete('/delete/:id', verify, order_tracking.delete)

  app.use('/api/order_tracking', router)
}
