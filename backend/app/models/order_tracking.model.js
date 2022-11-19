module.exports = (sequelize, Sequelize) => {
  const order_tracking = sequelize.define('order_tracking', {
    statusId: {
      type: Sequelize.INTEGER,
    },
    orderId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  })
  return order_tracking
}
