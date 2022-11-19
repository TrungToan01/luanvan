module.exports = (sequelize, Sequelize) => {
  const notification = sequelize.define('notification', {
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    viewed: {
      type: Sequelize.BOOLEAN,
    },
  })
  return notification
}
