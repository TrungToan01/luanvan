module.exports = (sequelize, Sequelize) => {
  const products = sequelize.define('products', {
    name: {
      type: Sequelize.STRING,
    },
    specifications: {
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
  })
  return products
}
