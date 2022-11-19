const multer = require('multer')

const storage = multer.diskStorage({
  destination: 'images/avatars',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-nttoan-${file.originalname}`)
  },
})

const uploadAvatar = multer({ storage: storage })
module.exports = (app) => {
  const user = require('../controllers/users.controller')
  var router = require('express').Router()
  const verify = require('../middleware/verifyToken')
  //create
  router.post('/add', verify, uploadAvatar.single('avatar'), user.create)
  // Retrieve all user
  router.get('/getall', verify, user.findAll)
  // Retrieve a single user with id
  router.get('/getOne/:id', verify, user.findOne)
  // Update a user with id
  router.put('/update/:id', verify, uploadAvatar.single('avatar'), user.update)
  // Delete a user with id
  router.delete('/delete/:id', verify, user.delete)

  app.use('/api/users', router)
}
