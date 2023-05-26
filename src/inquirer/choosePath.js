require("dotenv").config();

const validateUser = require("./validateUser");
/*
  //* This prompt guides the user through requesting data from /api/{1/2} /
*/

const { input, select } = require("@inquirer/prompts");
const { Separator } = require("@inquirer/select");

const chooseRoute = async (token) => {
  let answer = await select({
    message: "\n\nSelect a route",
    choices: [
      {
        name: "Cart",
        value: "cart",
        description: "Update your cart",
      },
      {
        name: "Shop",
        value: "api",
        description: "Search the store!",
      },
      new Separator(),
    ],
  });

  //! If the user has not validated their login at least once on this 'shopping spree' make them.
  //* Token is passed through function because requiring it causes circular dependency error */
  if (!token && answer === "cart") {
    const username = await input({ message: "Enter your username:" });
    const password = await input({ message: "Enter your password:" });
    token = await validateUser(username, password);
  }

  if (answer === "cart") {
    const viewOrAdd = await select({
      message: "\n\nView or add to cart?",
      choices: [
        {
          name: "View",
          value: "view",
          description: "View your cart",
        },
        {
          name: "Add",
          value: "add",
          description: "Add to your cart",
        },
        new Separator(),
      ],
    });
    answer = `${viewOrAdd}-${answer}`;
  }

  return [answer, token];
};

module.exports = chooseRoute;
