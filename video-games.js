const { getDBConnection } = require("./db");

function getVideoGames(res) {
  let qry = "select * from video_games";
  const connection = getDBConnection();

  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }

    // error could happen here
    let result = {
      video_games: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

function getAdminVideoGames(res) {
  let qry = "select * from video_games";
  const connection = getDBConnection();

  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }

    // error could happen here
    let result = {
      video_games: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

module.exports = {
  getVideoGames,
  getAdminVideoGames,
};
