'use strict';

const base64 = require('base-64');
const { users } = require('../../models');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(user, pass);
    next();
  } catch (e) {
    _authError(e);
  }

  function _authError(e) {
    console.log(e.message);
    res.status(403).send('Basic Invalid Login');
  }

};
