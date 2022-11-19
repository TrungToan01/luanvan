module.exports = (sequelize, Sequelize) => {
  const product_option = sequelize.define('product_option', {
    productId: {
      type: Sequelize.INTEGER,
    },
    ramId: {
      type: Sequelize.INTEGER,
    },
    romId: {
      type: Sequelize.INTEGER,
    },
    colorId: {
      type: Sequelize.INTEGER,
    },
    original_price: {
      type: Sequelize.INTEGER,
    },
    sale_price: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    sold_quantity: {
      type: Sequelize.INTEGER,
    },
  })
  return product_option
}
