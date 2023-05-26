"use strict";
const colors = require("colors");

const GetVRoute = require("./getVRoute");
const ViewCartRoute = require("./ViewCart");
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

const doViewCart = async () => {
  console.log("View your cart!".blue);
  // pass the token and update it if they use v2.
  const data = await ViewCartRoute(token);

  console.table(data);
};

const doAddToCart = async () => {
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
    if (route === "view-cart") {
      await doViewCart();
    } else if (route === "add-cart") {
      await doAddToCart();
    }
  }

  shop();
};

shop();

module.exports = { updateToken };
