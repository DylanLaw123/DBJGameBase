/*
 * Name: Dylan Law
 * Date: April 20, 2020
 * Section: CSE 154 AL
 *
 * This is the server sided JS for the Node.js web service
 * for Homework 4 - Bestreads
 */
"use strict";

const express = require("express");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql");

const app = express();
const ERROR_400 = 400;
const ERROR_500 = 500;

app.use(express.static(path.join(__dirname, "public")));

// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // built-in middleware

// for application/json
app.use(express.json()); // built-in middleware

/**
 * Establishes a database connection to the wpl database and returns the database object.
 * Any errors that occur during connection should be caught in the function
 * that calls this one.
 * @return {object} - The database object for the connection.
 */
// host: "mysqlserver-css475.mysql.database.azure.com"
// host: "20.231.252.32",
function getDBConnection() {
  var connection = mysql.createConnection({
    host: "20.231.252.32",
    port: "3306",
    user: "DBJCSS475",
    password: "CSS475ProjectYES123",
    database: "gamebase",
    ssl: {
      ca: fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem"),
    },
  });

  connection.connect();
  return connection;
}

app.get("/accounts", async (req, res) => {
  try {
    let qry = "select * from accounts";
    const connection = getDBConnection();

    connection.query(qry, function (error, results, fields) {
      if (error) throw error;

      // error could happen here
      let result = {
        accounts: results,
      };
      res.type("json");
      res.json(result);
    });
  } catch (error) {
    res.status(ERROR_500).send();
  } finally {
  }
});

app.get("/average_rating", async (req, res) => {
  try {
    let qry = "select * from average_rating";
    const connection = getDBConnection();

    connection.query(qry, function (error, results, fields) {
      if (error) throw error;

      // error could happen here
      let result = {
        average_rating: results,
      };
      res.type("json");
      res.json(result);
    });
  } catch (error) {
    res.status(ERROR_500).send();
  } finally {
  }
});

app.get("/game_list", async (req, res) => {
  try {
    let qry = "select * from game_list";
    const connection = getDBConnection();

    connection.query(qry, function (error, results, fields) {
      if (error) throw error;

      // error could happen here
      let result = {
        game_list: results,
      };
      res.type("json");
      res.json(result);
    });
  } catch (error) {
    res.status(ERROR_500).send();
  } finally {
  }
});

app.get("/plays", async (req, res) => {
  try {
    let qry = "select * from plays";
    const connection = getDBConnection();

    connection.query(qry, function (error, results, fields) {
      if (error) throw error;

      // error could happen here
      let result = {
        plays: results,
      };
      res.type("json");
      res.json(result);
    });
  } catch (error) {
    res.status(ERROR_500).send();
  } finally {
  }
});

app.get("/reviews", async (req, res) => {
  try {
    let qry = "select * from reviews";
    const connection = getDBConnection();

    connection.query(qry, function (error, results, fields) {
      if (error) throw error;

      // error could happen here
      let result = {
        reviews: results,
      };
      res.type("json");
      res.json(result);
    });
  } catch (error) {
    res.status(ERROR_500).send();
  } finally {
  }
});

app.get("/video_games", async (req, res) => {
  try {
    let qry = "select * from video_games";
    const connection = getDBConnection();

    connection.query(qry, function (error, results, fields) {
      if (error) throw error;

      // error could happen here
      let result = {
        video_games: results,
      };
      res.type("json");
      res.json(result);
    });
  } catch (error) {
    res.status(ERROR_500).send();
  } finally {
  }
});

// Allows us to change the port easily by setting an environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT);
