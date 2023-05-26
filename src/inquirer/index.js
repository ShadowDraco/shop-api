"use strict";
const colors = require("colors");

const GetVRoute = require("./getVRoute");
const AddToCartRoute = require("./AddToCart");
const chooseRoute = require("./choosePath");

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

const doAddToCartRoute = async () => {
  console.log("Add to your cart!".blue);
  // pass the token and update it if they use v2.
  const data = await AddToCartRoute(token);

  console.table(data);
};

console.log("<--- GO ON A SHOPPING SPREE --->".america);

const shop = async () => {
  const [route, newToken] = await chooseRoute(token);

  updateToken(newToken);

  if (route === "api") {
    await doGetVRoute();
  } else {
    await doAddToCartRoute();
  }

  shop();
};

shop();

module.exports = { updateToken };
