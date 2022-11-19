module.exports = (app) => {
  const notification = require('../controllers/notification.controller')
  var router = require('express').Router()
  // Create new notification
  router.post('/create', notification.create)
  // Retrieve all notification
  router.get('/getall', notification.findAll)
  // Retrieve a single notification with id
  router.get('/getOne/:id', notification.findOne)
  // Update a notification with id
  router.put('/update/:id', notification.update)
  // Delete a notification with id
  router.delete('/delete/:id', notification.delete)

  app.use('/api/notification', router)
}
