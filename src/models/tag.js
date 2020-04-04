module.exports = (sequelize, type) => sequelize.define('tag', {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  text: type.STRING
});