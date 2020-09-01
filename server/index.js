"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "./assets/uploads/" });
const morgan = require("morgan");
const {
  logIn,
  createUser,
  addMeditation,
  getFeed,
  likePost,
  unlikePost,
  commentPost,
  getProfile,
  getPost,
  addChallenge,
  removeChallenge,
} = require("./handlers");

const PORT = 4000;

const app = express();

app
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );

    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
  })

  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/feed/:_id", getFeed)
  .get("/profile/:_id", getProfile)
  .get("/post/:_id", getPost)
  .post("/login", logIn)
  .post("/users", createUser)
  .put("/meditate", upload.single("image"), addMeditation)
  .put("/like", likePost)
  .put("/unlike", unlikePost)
  .put("/comment", commentPost)
  .put("/addChallenge", addChallenge)
  .put("/removeChallenge", removeChallenge)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
