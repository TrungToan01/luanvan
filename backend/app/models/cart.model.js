module.exports = (sequelize, Sequelize) => {
  const cart = sequelize.define('cart', {
    userId: {
      type: Sequelize.INTEGER,
    },
    productOptionId: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
  })
  return cart
}
