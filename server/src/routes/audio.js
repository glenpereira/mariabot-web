const Router = require("express").Router;

const router = Router();
const db = require("../db");

// get audio files
router.get("/", (req, res) => {
  const audioList = [];
  db.getDb()
    .collection("audio")
    .find()
    .forEach((audio) => {
      console.log(audio);
      audioList.push(audio);
    })
    .then((result) => {
      // console.log(result);
      res.status(200).json(audioList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error occured" });
    });
});

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

module.exports = router;
