"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const Collection = require("./data-collection.js");
const userModel = require("../auth/models/users.js");
const clothesModel = require("./clothes/models.js");
const requestModel = require("./requests/models.js");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite:memory:";

const sequelize = new Sequelize(DATABASE_URL);
const clothes = clothesModel(sequelize, DataTypes);
const requests = requestModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  clothes: new Collection(clothes),
  userModule: new Collection(sequelize, DataTypes),
  requests: new Collection(requests),
  users: users,
};
