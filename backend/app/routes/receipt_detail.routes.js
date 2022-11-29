module.exports = (app) => {
  const receipt_detail = require('../controllers/receipt_detail.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create a new receipt
  router.post('/add', verify, receipt_detail.create)
  // Retrieve all receipt
  router.get('/getall', verify, receipt_detail.findAll)
  // Retrieve a single receipt with id
  router.get('/getOne/:id', verify, receipt_detail.findOne)
  // Update a receipt with id
  router.put('/update/:id', verify, receipt_detail.update)
  // Delete a receipt with id
  router.delete('/delete/:id', verify, receipt_detail.delete)
  app.use('/api/receipt_detail', router)
}
