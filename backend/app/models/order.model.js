module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define('order', {
    total_price: {
      type: Sequelize.INTEGER,
    },
    delivery_cost: {
      type: Sequelize.INTEGER,
    },
    coupons_id: {
      type: Sequelize.INTEGER,
    },
    discount_value: {
      type: Sequelize.INTEGER,
    },
    status_id: {
      type: Sequelize.INTEGER,
    },
    shop_name: {
      type: Sequelize.STRING,
    },
    shop_phone: {
      type: Sequelize.STRING,
    },
    shop_address: {
      type: Sequelize.STRING,
    },
    customer_id: {
      type: Sequelize.INTEGER,
    },
    customer_name: {
      type: Sequelize.STRING,
    },
    customer_phone: {
      type: Sequelize.STRING,
    },
    customer_address: {
      type: Sequelize.STRING,
    },
  })
  return order
}
