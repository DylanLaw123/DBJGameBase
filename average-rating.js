const { getDBConnection } = require("./db");

function getAverageRating(res) {
  let qry =
    "SELECT Title, num_reviews, ROUND(total_rating / num_reviews, 1) AS Average_Rating FROM AVERAGE_RATING A, VIDEO_GAMES V WHERE A.Game_id = V.Game_id;";
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
