"use strict";
const colors = require("colors");

const GetVRoute = require("./getVRoute");

// create a token 'state'
let token = null;

// allow token to be updated
const updateToken = (newToken) => {
  token = newToken;
};

const doGetVRoute = async () => {
  console.log("Search the store!".blue);
  // pass the token and update it if they use v2.

  const [data, newToken] = await GetVRoute(token);

  updateToken(newToken);
  console.table(data);
};

console.log("<--- GO ON A SHOPPING SPREE --->".america);

const shop = async () => {
  await doGetVRoute();

  shop();
};

shop();

module.exports = { updateToken };
