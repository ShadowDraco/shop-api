"use strict";

const express = require("express");
const dataModules = require("../models");

const router = express.Router();

router.param("model", (req, res, next) => {
  const modelName = req.params.model;

  if (dataModules[modelName]) {
    //* If the model being searched for is the conflicted one set it to the right model */
    if (modelName === "users") {
      req.model = userModule;
    } else if (modelName === "requests") {
      req.model = dataModules[modelName];
    } else {
      next("Access Denied");
    }
    next();
  } else {
    next("Invalid Model");
  }
});

router.get("/:model", handleGetAll);
router.get("/:model/:id", handleGetOne);
//! Only allow average user to add REQUESTS
//* Also allow them to create a user otherwise database is inaccessible */
router.post("/:model", handleCreate);
//! Remove this functionality to the average user
/*
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);
*/

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

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;
