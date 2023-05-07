const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const audioRoutes = require('./routes/audio')

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/audio", audioRoutes)

module.exports = app;