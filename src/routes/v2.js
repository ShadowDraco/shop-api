"use strict";

const express = require("express");
const dataModules = require("../models");
const acl = require("../auth/middleware/acl");
const bearerAuth = require("../auth/middleware/bearer");
const router = express.Router();

//* Require users to work with the user CART */
const { users } = require("../models/index");

router.param("model", (req, res, next) => {
  const modelName = req.params.model;

  if (dataModules[modelName]) {
    //* If the model being searched for is the conflicted one set it to the right model */
    if (modelName === "users") {
      req.model = userModule;
    } else {
      req.model = dataModules[modelName];
    }
    next();
  } else {
    next("Invalid Model");
  }
});

//? Users can only add to their own cart. Bearer authorizes and returns user, handleAdd.. does the adding
router.post("/add-to-cart", bearerAuth, handleAddToCart);

router.get("/:model", bearerAuth, handleGetAll);
router.get("/:model/:id", bearerAuth, handleGetOne);
router.post("/:model", bearerAuth, acl("create"), handleCreate);
router.put("/:model/:id", bearerAuth, acl("update"), handleUpdate);
router.delete("/:model/:id", bearerAuth, acl("delete"), handleDelete);
router.patch("/:model/:id", bearerAuth, acl("delete"), handleUpdate);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
}

async function handleAddToCart(req, res) {
  //? /cart route does bearer auth so that users can only access their own carts, then returns a user object.
  //* */ item is only listed by name because cart is array of strings.
  const item = req.body.name;
  //* update User Model because user collection does not have this functionality */
  let updatedRecord = await users.addToCart(req.user, item);
  //* return updated user */
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;
