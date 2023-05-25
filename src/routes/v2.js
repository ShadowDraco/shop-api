'use strict';

const express = require('express');
const dataModules = require('../models');
const bearerAuth = require('../middleware/bearer');
const basicAuth = require('../middleware/basic');
const router = express.Router();
const acl = require('../middleware/acl');

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

router.get('/:model', basicAuth, handleGetAll);
router.get('/:model/:id', basicAuth, handleGetOne);
router.post('/:model', bearerAuth, acl ('Require Create'), handleCreate);
router.put('/:model/:id', bearerAuth, acl ('Require Update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, acl ('Required Update'), handleDelete);
router.patch('/:model/:id', bearerAuth, acl ('Delete'), handleUpdate);

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
