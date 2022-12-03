module.exports = (sequelize, Sequelize) => {
  const banner = sequelize.define('banner', {
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  })
  return banner
}
