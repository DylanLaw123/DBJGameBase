const { getDBConnection } = require("./db");

function getPlays(res) {
  let qry =
    "select accounts.Name, video_games.title, Hours_played from plays inner join accounts on plays.Account_id = accounts.Account_id inner join video_games on plays.Game_id = video_games.Game_id";
  const connection = getDBConnection();

  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }

    // error could happen here
    let result = {
      plays: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

function getAdminPlays(res) {
  let qry = "select * from plays";
  const connection = getDBConnection();

  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }

    // error could happen here
    let result = {
      plays: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

module.exports = {
  getPlays,
  getAdminPlays,
};
