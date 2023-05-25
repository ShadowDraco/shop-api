'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/models.js');
const Collection = require('./data-collection.js');
const userModel = require('../auth/models/users.js');
const requestModel = require('./request/models.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const requests = requestModel(sequelize, DataTypes);

const sequelize = new Sequelize(DATABASE_URL);
const clothes = clothesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes),
  userModule: new Collection (sequelize, DataTypes),
  requests: new Collection(requests),
};
