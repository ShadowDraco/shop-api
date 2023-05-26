"use strict";
const colors = require("colors");

const GetVRoute = require("./getVRoute");

let token = null;

const doGetVRoute = async () => {
  console.log("Search the store!".blue);
  console.table(await GetVRoute());
};

console.log("<--- GO ON A SHOPPING SPREE --->".america);

const shop = async () => {
  await doGetVRoute();

  shop();
};

shop();

module.exports = token;
