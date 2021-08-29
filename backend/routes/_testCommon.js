"use strict";

const db = require("../db");

const Plant = require("../models/plants");

async function commonBeforeAll() {
    //delete existing plant table
    await db.query("DELETE FROM plantpicker_test");

    await Plant.addPlant("wisteria", "wisteria", "vines that can be trained into trees", "bright", false, false, 180, true)
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
}