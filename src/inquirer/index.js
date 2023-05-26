"use strict";
const colors = require("colors");

const GetVRoute = require("./getVRoute");

// create a token 'state'
let token = null;

// allow token to be updated
const updateToken = (newToken) => {
  token = token;
};

const doGetVRoute = async () => {
  console.log("Search the store!".blue);
  console.table(await GetVRoute(token, updateToken));
};

console.log("<--- GO ON A SHOPPING SPREE --->".america);

const shop = async () => {
  await doGetVRoute();

  shop();
};

shop();

module.exports = { updateToken };
