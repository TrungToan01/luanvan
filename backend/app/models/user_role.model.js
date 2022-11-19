module.exports = (sequelize, Sequelize) => {
  const user_role = sequelize.define('user_role', {
    role_name: {
      type: Sequelize.STRING,
    },
  })
  return user_role
}
