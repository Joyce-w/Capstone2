const { Client } = require("pg");

let DB_URI;

//allow for a testing/ main db environment
if (process.env.NODE_ENV === "test") {
    DB_URI = "postgresql:///usersdb_test"
} else {
    DB_URI = "postgresql:///usersdb";
}

let db = new Client({
    connectionString: DB_URI
});

db.connect();

module.exports = db;
