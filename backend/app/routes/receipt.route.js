module.exports = (app) => {
  const receipt = require('../controllers/receipt.controller')
  var router = require('express').Router()
  // Create a new receipt
  router.post('/create', receipt.create)
  // Retrieve all receipt
  router.get('/getall', receipt.findAll)
  // Retrieve a single receipt with id
  router.get('/getOne/:id', receipt.findOne)
  // Update a receipt with id
  router.put('/update/:id', receipt.update)
  // Delete a receipt with id
  router.delete('/delete/:id', receipt.delete)
  app.use('/api/receipt', router)
}
