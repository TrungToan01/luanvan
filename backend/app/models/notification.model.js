module.exports = (sequelize, Sequelize) => {
  const notification = sequelize.define('notification', {
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
    viewed: {
      type: Sequelize.BOOLEAN,
    },
  })
  return notification
}
