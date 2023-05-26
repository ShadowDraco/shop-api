"use-strict";
const base64 = require("base-64");
const colors = require("colors");

const axios = require("axios");
require("dotenv").config();
const API_URL = process.env.API_URL || "http://localhost:3001";

const validateUser = async (username, password) => {
  try {
    const encodedUser = base64.encode(`${username}:${password}`);

    const validatedUser = await axios.post(
      `${API_URL}/signin`,
      {},
      {
        headers: {
          authorization: `Basic ${encodedUser}`,
          "Content-Type": "application/json",
        },
      }
    );

    // set the token until the user stops the shopping spree
    let token = validatedUser ? validatedUser.data.token : null;

    return token;
  } catch (error) {
    console.log("\nError validating user: ".red, error.message);
  }
};

module.exports = validateUser;
