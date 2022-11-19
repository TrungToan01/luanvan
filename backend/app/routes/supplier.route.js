module.exports = (app) => {
  const supplier = require('../controllers/supplier.controller')
  const verify = require('../middleware/verifyToken')
  var router = require('express').Router()
  // Create a new supplier
  router.post('/add', verify, supplier.create)
  // Retrieve all supplier
  router.get('/getAll', verify, supplier.findAll)
  // Retrieve a single supplier with id
  router.get('/getOne/:id', verify, supplier.findOne)
  // Update a supplier with id
  router.put('/update/:id', verify, supplier.update)
  // Delete a supplier with id
  router.delete('/delete/:id', verify, supplier.delete)
  app.use('/api/supplier', router)
}
