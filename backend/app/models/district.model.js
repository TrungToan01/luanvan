module.exports = (sequelize, Sequelize) => {
  const district = sequelize.define('district', {
    name: {
      type: Sequelize.STRING,
    },
    idname: {
      type: Sequelize.STRING,
    },
    provinceId: {
      type: Sequelize.INTEGER,
    },
  })
  return district
}
