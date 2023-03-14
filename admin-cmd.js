const { getDBConnection } = require("./db");

function postAdminCmd(req, res) {
  // let name = req.body["name"];
  // let age = req.body["age"];
  let sqlcommand = req.body["sqlcommand"];
  console.log("===== postAdminCmd");
  // console.log(name);
  // console.log(age);

  const connection = getDBConnection();

  console.log("===== postAdminCmd =====");

  connection.query(sqlcommand, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }

    // error could happen here
    res.type("json");
    res.json(results);
  });
  connection.end();
}

module.exports = {
  postAdminCmd,
};
