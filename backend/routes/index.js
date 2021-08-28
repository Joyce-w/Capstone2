"use strict";

const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("you hit plants/ route")
});

module.exports = router;
