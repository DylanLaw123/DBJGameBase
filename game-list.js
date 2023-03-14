const { getDBConnection } = require("./db");

function getGameList(res) {
  let qry =
    "select accounts.Name, video_games.title, Group_name from game_list inner join accounts on game_list.Account_id = accounts.Account_id inner join video_games on game_list.Game_id = video_games.Game_id";
  const connection = getDBConnection();

  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }

    // error could happen here
    let result = {
      game_list: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

function getAdminGameList(res) {
  let qry = "select * from game_list";
  const connection = getDBConnection();

  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }

    // error could happen here
    let result = {
      game_list: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

module.exports = {
  getGameList,
  getAdminGameList,
};
