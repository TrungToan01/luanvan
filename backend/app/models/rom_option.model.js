module.exports = (sequelize, Sequelize) => {
  const rom_option = sequelize.define("rom_option", {
    name: {
      type: Sequelize.STRING
    }
  });
    return rom_option;
};