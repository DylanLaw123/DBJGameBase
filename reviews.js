const { getDBConnection } = require("./db");

function getReviews(res) {
  let qry =
    "select accounts.Name, video_games.title, Rating, RComment from reviews inner join accounts on reviews.Account_id = accounts.Account_id inner join video_games on reviews.Game_id = video_games.Game_id";
  const connection = getDBConnection();

  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }

    // error could happen here
    let result = {
      reviews: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

function getAdminReviews(res) {
  let qry = "select * from reviews";
  const connection = getDBConnection();

  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }

    // error could happen here
    let result = {
      reviews: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

module.exports = {
  getReviews,
  getAdminReviews,
};
