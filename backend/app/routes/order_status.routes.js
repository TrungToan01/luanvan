module.exports = (app) => {
  const order_status = require('../controllers/order_status.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create new order_status
  router.post('/add', verify, order_status.create)
  // Retrieve all order_status
  router.get('/getall', verify, order_status.findAll)
  // Retrieve a single order_status with id
  router.get('/getOne/:id', verify, order_status.findOne)
  // Update a order_status with id
  router.put('/update/:id', verify, order_status.update)
  // Delete a order_status with id
  router.delete('/delete/:id', verify, order_status.delete)

  app.use('/api/order_status', router)
}
