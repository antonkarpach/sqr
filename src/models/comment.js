module.exports = (sequelize, type) => sequelize.define('comment', {
  firstName: type.STRING,
  text: type.STRING,
  likes: {
    type : type.STRING,
    defaultValue: '[]'
  }
});