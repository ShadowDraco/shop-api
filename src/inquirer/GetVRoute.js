const axios = require("axios");
require("dotenv").config();
const API_URL = process.env.API_URL || "http://localhost:3001";

const { input, select } = require("@inquirer/prompts");
const { Separator } = require("@inquirer/select");

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

  return answer;
};

const chooseModel = async () => {
  const answer = await select({
    message: "Select an item",
    choices: [
      {
        name: "Clothes",
        value: "clothes",
        description: "choose the clothes model",
      },
      {
        name: "Requests",
        value: "requests",
        description: "choose the requests model",
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
  //* Get the previously chosen model at the previously chosen route */

  try {
    let response;

    //* Check if they want everything or one thing */
    if (amount === "all") {
      response = await axios.get(
        `${process.env.API_URL}/api/${route}/${model}`
      );
    } else {
      const ID = await input({ message: "Enter the item's ID:" });

      response = await axios.get(`${API_URL}/api/${route}/${model}/${ID}`);
    }

    console.log(response);
    return response.data;
  } catch (error) {
    console.log("\n\nerror getting data from v1", error);
  }
};

const UserGetPrompt = async () => {
  const route = await chooseRoute();
  const model = await chooseModel();
  const amount = await chooseOneOrAll();

  console.log(route, model, amount);

  const data = getData(route, model, amount);
  return data;
};

module.exports = UserGetPrompt;
