const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const dbURL =
  "mongodb+srv://parapsychic:parapsychic@mariabotdb.cpllr3y.mongodb.net/?retryWrites=true&w=majority";

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
