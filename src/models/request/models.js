"use strict";
// this allows for additional items other clothes for use to allow admins to add another model, doesn't adds but allows for user response.

const requestsModel = (sequelize, DataTypes) =>
  sequelize.define("Requests", {
    item: { type: DataTypes.STRING, required: true },
    description: { type: DataTypes.STRING, required: true },
  });

module.exports = requestsModel;


