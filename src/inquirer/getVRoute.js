const colors = require("colors");

const axios = require("axios");
require("dotenv").config();
const API_URL = process.env.API_URL || "http://localhost:3001";

const validateUser = require("./validateUser");
/*
  //* This prompt guides the user through requesting data from /api/{1/2} /
*/

const { input, select } = require("@inquirer/prompts");
const { Separator } = require("@inquirer/select");

let token;

const chooseRoute = async () => {
  const answer = await select({
    message: "\n\nSelect a route",
    choices: [
      {
        name: "V1",
        value: "v1",
        description: "get from unprotected route",
      },
      {
        name: "V2",
        value: "v2",
        description: "get from protected route",
      },
      new Separator(),
    ],
  });

  //! If the user has not validated their login at least once on this 'shopping spree' make them.

  if (!token && answer === "v2") {
    const username = await input({ message: "Enter your username:" });
    const password = await input({ message: "Enter your password:" });
    token = await validateUser(username, password);
  }

  return answer;
};

const chooseModel = async () => {
  const answer = await select({
    message: "Select a Path",
    choices: [
      {
        name: "Clothes",
        value: "clothes",
        description: "Search for clothes",
      },
      {
        name: "Requests",
        value: "requests",
        description: "Request a new item",
      },
      new Separator(),
    ],
  });

  return answer;
};

const chooseOneOrAll = async () => {
  const answer = await select({
    message: "Find One or All?",
    choices: [
      {
        name: "All",
        value: "all",
        description: "get all",
      },
      {
        name: "One",
        value: "one",
        description: "get one by id",
      },
      new Separator(),
    ],
  });

  return answer;
};

const getData = async (route, model, amount) => {
  //? Get the previously chosen model at the previously chosen route */

  try {
    let response;

    //* Check if they want everything or one thing */
    if (amount === "all") {
      response = await axios.get(
        `${process.env.API_URL}/api/${route}/${model}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
    } else {
      const ID = await input({ message: "Enter the item's ID:" });

      response = await axios.get(`${API_URL}/api/${route}/${model}/${ID}`, {
        headers: { authorization: `Bearer ${token}` },
      });
    }

    return response.data;
  } catch (error) {
    console.log("\nerror getting data from v2: ".red, error.message);
  }
};

const UserGetPrompt = async () => {
  const route = await chooseRoute();
  const model = await chooseModel();
  const amount = await chooseOneOrAll();

  const data = await getData(route, model, amount);
  console.table(data);
};

module.exports = UserGetPrompt;
