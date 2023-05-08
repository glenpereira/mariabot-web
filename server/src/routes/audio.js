const Router = require("express").Router;
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const db = require("../db");

const router = Router();
const client = new S3Client({});

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
      res.status(201).json({ message: "Speech Generated!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error occurred" });
    });
});

// delete an audio file
router.delete("/:name", (req, res) => {
  const input = {
    Bucket: "mariabot",
    Key: req.params.name,
  };
  const command = new DeleteObjectCommand(input);
  db.getDb()
    .collection("audio")
    .deleteOne({ name: req.params.name })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Audio Deleted!" });
      client
        .send(command)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error occurred" });
    });
});

module.exports = router;
