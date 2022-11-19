module.exports = (sequelize, Sequelize) => {
  const order_status = sequelize.define('order_status', {
    name: {
      type: Sequelize.STRING,
    },
  })
  return order_status
}
