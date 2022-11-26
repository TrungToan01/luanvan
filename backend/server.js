const express = require('express')
const cors = require('cors')
const db = require('./app/models/index')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')

app.use(express.static('images'))
var corsOptions = {
  origin: 'http://localhost:4200',
}
app.use(cors(corsOptions))
// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' })
})
//router
const auth = require('./app/routes/auth.route')
const userRoute = require('./app/routes/user.route')
const user_roleRoute = require('./app/routes/user_role.route')
const supplierRoute = require('./app/routes/supplier.route')
const receipt = require('./app/routes/receipt.route')
const cart = require('./app/routes/cart.route')
const brand = require('./app/routes/brand.route')
const color_option = require('./app/routes/color_option.routes')
const rom_option = require('./app/routes/rom_option.route')
const ram_option = require('./app/routes/ram_option.route.js')
const coupons = require('./app/routes/coupons.routes')
const province = require('./app/routes/province.routes')
const product_image = require('./app/routes/product_img.route')
const product_option = require('./app/routes/product_option.routes')
const district = require('./app/routes/district.routes')
const wards = require('./app/routes/ward.routes')
const notification = require('./app/routes/notification.routes')
const order_detail = require('./app/routes/order_detail.routes')
const order_tracking = require('./app/routes/order_tracking.routes')
const order_status = require('./app/routes/order_status.routes')
const shop_info = require('./app/routes/shop_info.route')
auth(app)
userRoute(app)
user_roleRoute(app)
supplierRoute(app)
receipt(app)
cart(app)
brand(app)
color_option(app)
rom_option(app)
ram_option(app)
coupons(app)
province(app)
district(app)
notification(app)
order_detail(app)
order_status(app)
order_tracking(app)
product_image(app)
product_option(app)

shop_info(app)
wards(app)

// set port, listen for requests
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
