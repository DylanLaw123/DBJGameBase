const { getDBConnection } = require("./db");

function getAccounts(res) {
  let qry =
    "select Account_id, Name, date_format(Date_Created, '%Y-%m-%d'), Email from accounts";
  const connection = getDBConnection();
  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }
    // error could happen here
    let result = {
      accounts: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

function getAdminAccounts(res) {
  let qry =
    "select Account_id, Name, date_format(Date_Created, '%Y-%m-%d'), Email from accounts";
  const connection = getDBConnection();
  connection.query(qry, function (error, results, fields) {
    if (error) {
      console.log("Errors occurs");
    }
    // error could happen here
    let result = {
      accounts: results,
    };
    res.type("json");
    res.json(result);
  });
  connection.end();
}

module.exports = {
  getAccounts,
  getAdminAccounts,
};
