const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('./users.model.js')(sequelize, Sequelize)
db.user_role = require('./user_role.model')(sequelize, Sequelize)
db.user_address = require('./user_address.model')(sequelize, Sequelize)
db.supplier = require('./suppliers.model')(sequelize, Sequelize)
db.rom_option = require('./rom_option.model')(sequelize, Sequelize)
db.receipt = require('./receipt.model')(sequelize, Sequelize)
db.receipt_detail = require('./receipt_detail.model')(sequelize, Sequelize)
db.ram_option = require('./ram_option.model')(sequelize, Sequelize)
db.province = require('./province.model')(sequelize, Sequelize)
db.product_rating = require('./product_rating.model')(sequelize, Sequelize)
db.product_option = require('./product_option.model')(sequelize, Sequelize)
db.product_image = require('./product_image.model')(sequelize, Sequelize)
db.order = require('./order.model')(sequelize, Sequelize)
db.order_tracking = require('./order_tracking.model')(sequelize, Sequelize)
db.order_status = require('./order_status.model')(sequelize, Sequelize)
db.order_detail = require('./order_detail.model')(sequelize, Sequelize)
db.notification = require('./notification.model')(sequelize, Sequelize)
db.district = require('./district.model')(sequelize, Sequelize)
db.coupons = require('./coupons.model')(sequelize, Sequelize)
db.color_option = require('./color_option.model')(sequelize, Sequelize)
db.cart = require('./cart.model')(sequelize, Sequelize)
db.brand = require('./brand.model')(sequelize, Sequelize)
db.wards = require('./wards.model')(sequelize, Sequelize)
db.shop_info = require('./shopInfo.model')(sequelize, Sequelize)
module.exports = db
