module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    full_name: {
      type: Sequelize.STRING,
    },
    birth_date: {
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
    rolename: {
      type: Sequelize.STRING,
    },
  })

  return user
}
