module.exports = (sequelize, Sequelize) => {
  const ward = sequelize.define('ward', {
    name: {
      type: Sequelize.STRING,
    },
    district_id: {
      type: Sequelize.INTEGER,
    },
    idname: {
      type: Sequelize.STRING,
    },
  })
  return ward
}
