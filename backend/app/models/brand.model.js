module.exports = (sequelize, Sequelize) => {
  const brand = sequelize.define('brand', {
    name: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  })
  return brand
}
