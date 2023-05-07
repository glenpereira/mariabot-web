const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const dbURL = "mongodb://0.0.0.0:27017/mariabot";

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Database already initialized!");
    return callback(null, _db);
  }
  MongoClient.connect(dbURL)
    .then((client) => {
      _db = client.db();
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized!");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
