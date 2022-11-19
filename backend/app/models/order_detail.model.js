module.exports = (sequelize, Sequelize) => {
  const order_detail = sequelize.define('order_detail', {
    orderId: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    productOptionId: {
      type: Sequelize.INTEGER,
    },
  })
  return order_detail
}
