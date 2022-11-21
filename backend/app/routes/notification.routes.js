module.exports = (app) => {
  const notification = require('../controllers/notification.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  // Create new notification
  router.post('/add', verify, notification.create)
  // Retrieve all notification
  router.get('/getall', verify, notification.findAll)
  // Retrieve a single notification with id
  router.get('/getOne/:id', verify, notification.findOne)
  // Update a notification with id
  router.put('/update/:id', verify, notification.update)
  // Delete a notification with id
  router.delete('/delete/:id', verify, notification.delete)

  app.use('/api/notification', router)
}
