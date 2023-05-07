const Router = require("express").Router;

const router = Router();
const db = require("../db");

// add new audio file
router.post("", (req, res, next) => {
  const newAudioFile = {
    name: req.body.name,
    src: req.body.src,
    author: req.body.author,
  };
  console.log(newAudioFile);
  db.getDb()
    .collection("audio")
    .insertOne(newAudioFile)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).json({ message: "Speech Generated!" });
});

module.exports = router
