module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
    },
    birthdate: {
      type: Sequelize.DATE,
    },
    gender: {
      type: Sequelize.BOOLEAN,
    },
    phone: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    avatar: {
      type: Sequelize.STRING,
    },
    userRoleId: {
      type: Sequelize.INTEGER,
    },
  })

  return user
}
