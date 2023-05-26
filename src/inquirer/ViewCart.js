const colors = require("colors");

const axios = require("axios");
require("dotenv").config();
const API_URL = process.env.API_URL || "http://localhost:3001";

/*
  //* This prompt guides the user through requesting data from /api/{1/2} /
*/

const ViewCartPrompt = async (token) => {
  try {
    // axios.post(url, body, options)
    const response = await axios.get(`${API_URL}/api/v2/view-cart`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.log("\nError adding to cart: ".red, error.message);
  }
};

module.exports = ViewCartPrompt;
