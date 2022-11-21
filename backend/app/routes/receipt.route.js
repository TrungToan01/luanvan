module.exports = (app) => {
  const receipt = require('../controllers/receipt.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create a new receipt
  router.post('/add', verify, receipt.create)
  // Retrieve all receipt
  router.get('/getall', verify, receipt.findAll)
  // Retrieve a single receipt with id
  router.get('/getOne/:id', verify, receipt.findOne)
  // Update a receipt with id
  router.put('/update/:id', verify, receipt.update)
  // Delete a receipt with id
  router.delete('/delete/:id', verify, receipt.delete)
  app.use('/api/receipts', router)
}
