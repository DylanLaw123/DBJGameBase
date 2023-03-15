/*
 */
"use strict";

const express = require("express");
const multer = require("multer");
const path = require("path");
const { getDBConnection } = require("./db");

const { postAdminCmd } = require("./admin-cmd");

const { getAccounts, getAdminAccounts } = require("./accounts");
const { getAverageRating, getAdminAverageRating } = require("./average-rating");
const { getGameList, getAdminGameList } = require("./game-list");
const { getPlays, getAdminPlays } = require("./plays");
const { getReviews, getAdminReviews } = require("./reviews");
const { getVideoGames, getAdminVideoGames } = require("./video-games");

const app = express();
const ERROR_400 = 400;
const ERROR_500 = 500;

app.use(express.static(path.join(__dirname, "public")));

// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // built-in middleware

// for application/json
app.use(express.json()); // built-in middleware

// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

app.post("/admin/admin-cmd", async (req, res) => {
  try {
    postAdminCmd(req, res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/admin/accounts", async (req, res) => {
  try {
    getAdminAccounts(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/admin/average_rating", async (req, res) => {
  try {
    getAdminAverageRating(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/admin/game_list", async (req, res) => {
  try {
    getAdminGameList(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/admin/plays", async (req, res) => {
  try {
    getAdminPlays(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/admin/reviews", async (req, res) => {
  try {
    getAdminReviews(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/admin/video_games", async (req, res) => {
  try {
    getAdminVideoGames(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/accounts", async (req, res) => {
  try {
    getAccounts(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/average_rating", async (req, res) => {
  try {
    getAverageRating(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/game_list", async (req, res) => {
  try {
    getGameList(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/plays", async (req, res) => {
  try {
    getPlays(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/reviews", async (req, res) => {
  try {
    getReviews(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

app.get("/video_games", async (req, res) => {
  try {
    getVideoGames(res);
  } catch (error) {
    res.status(ERROR_500).send();
  }
});

// Allows us to change the port easily by setting an environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT);
