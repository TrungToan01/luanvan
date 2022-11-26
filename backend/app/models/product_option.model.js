module.exports = (sequelize, Sequelize) => {
  const product_option = sequelize.define('product_option', {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    width: {
      type: Sequelize.DOUBLE,
    },
    height: {
      type: Sequelize.DOUBLE,
    },
    weight: {
      type: Sequelize.DOUBLE,
    },
    length: {
      type: Sequelize.DOUBLE,
    },
    camera: {
      type: Sequelize.STRING,
    },
    camera_selfie: {
      type: Sequelize.STRING,
    },
    CPU: {
      type: Sequelize.STRING,
    },
    origin: {
      type: Sequelize.STRING,
    },
    core: {
      type: Sequelize.INTEGER,
    },
    warranty_time: {
      type: Sequelize.STRING,
    },
    screen: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
    brandId: {
      type: Sequelize.INTEGER,
    },
    userId: {
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
    GPU: {
      type: Sequelize.STRING,
    },
    system: {
      type: Sequelize.STRING,
    },
  })
  return product_option
}
