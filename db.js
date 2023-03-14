const fs = require("fs");
const mysql = require("mysql");

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

module.exports = {
  getDBConnection,
};
