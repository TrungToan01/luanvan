module.exports = (sequelize, Sequelize) => {
  const user_role = sequelize.define('user_role', {
    name: {
      type: Sequelize.STRING,
    },
  })
  return user_role
}
