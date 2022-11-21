module.exports = (app) => {
  const order_detail = require('../controllers/order_detail.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create new order_detail
  router.post('/add', verify, order_detail.create)
  // Retrieve all order_detail
  router.get('/getall', verify, order_detail.findAll)
  // Retrieve a single order_detail with id
  router.get('/getOne/:id', verify, order_detail.findOne)
  // Update a order_detail with id
  router.put('/update/:id', verify, order_detail.update)
  // Delete a order_detail with id
  router.delete('/delete/:id', verify, order_detail.delete)

  app.use('/api/order_detail', router)
}
