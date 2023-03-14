const { getDBConnection } = require("./db");

function getAverageRating(res) {
  let qry =
    "select Title, num_reviews, total_rating from average_rating inner join video_games on average_rating.Game_id = video_games.Game_id";
  const connection = getDBConnection();

  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }

    // error could happen here
    let result = {
      average_rating: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

function getAdminAverageRating(res) {
  let qry = "select * from average_rating";
  const connection = getDBConnection();

  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }

    // error could happen here
    let result = {
      average_rating: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

module.exports = {
  getAverageRating,
  getAdminAverageRating,
};
