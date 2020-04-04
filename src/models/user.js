const bcrypt = require('bcrypt');
module.exports = (sequelize, type) => sequelize.define('user', {
  authType: type.TINYINT,
  outsideUserId: type.BIGINT,

  username: type.STRING,
  password: type.STRING,
  email: type.STRING,
  isAdmin: type.BOOLEAN,
  isActive: {
    type: type.BOOLEAN,
    defaultValue: true
  },
  isConfirmed: type.BOOLEAN,

  firstName: type.STRING,
  secondName: type.STRING,
  sex: type.STRING,
  about: type.TEXT,
  lang: type.TINYINT
}, {
  hooks: { beforeCreate: user => user.password && (user.password = bcrypt.hashSync(user.password, 10))
}});