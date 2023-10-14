const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const audioRoutes = require("./routes/audio");

app.use(cors());

app.use(express.json());
// app.use(express.static(path.join(__dirname, "..", "dist")));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
// });

app.use("/audio", audioRoutes);

module.exports = app;
