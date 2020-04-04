const config = require('../config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.mysql);

const User = require('./user')(sequelize, Sequelize);
const Company = require('./company')(sequelize, Sequelize);
const Comment = require('./comment')(sequelize, Sequelize);
const Tag = require('./tag')(sequelize, Sequelize);

User.hasMany(Company);
Company.hasMany(Comment);

module.exports = { User, Company: Company, Comment, Tag };

sequelize.sync({ force: true });
//sequelize.sync();