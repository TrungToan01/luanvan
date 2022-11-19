module.exports = (sequelize, Sequelize) => {
  const color_option = sequelize.define('color_option', {
    name: {
      type: Sequelize.STRING,
    },
  })
  return color_option;
}
