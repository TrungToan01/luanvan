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
    published: {
      type: Sequelize.BOOLEAN,
    },
    brand_id: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
  })
  return products
}
