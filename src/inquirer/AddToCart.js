const colors = require("colors");

const axios = require("axios");
require("dotenv").config();
const API_URL = process.env.API_URL || "http://localhost:3001";

/*
  //* This prompt guides the user through requesting data from /api/{1/2} /
*/

const { input } = require("@inquirer/prompts");

const AddToCartPrompt = async (token) => {
  try {
    const item = await input({ message: "Enter the item's name:" });

    // axios.post(url, body, options)
    const response = await axios.post(
      `${API_URL}/api/v2/add-to-cart`,
      { name: item },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return `Added ${item} to your cart!`;
  } catch (error) {
    console.log("\nError adding to cart: ".red, error.message);
  }
};

module.exports = AddToCartPrompt;
