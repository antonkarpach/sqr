module.exports = (sequelize, type) => sequelize.define('company', {
  name: type.STRING,
  speciality: type.TINYINT,
  about: type.STRING,
  tags: type.STRING,
  text: type.TEXT,
  ratings: {
    type : type.STRING,
    defaultValue: '{}'
  },
  rating: type.FLOAT
});