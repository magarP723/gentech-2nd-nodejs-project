const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "prabesh",
  database: "musicapp",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const dbConnect = async () => {
  try {
    connection.connect((err) => {
      if (!err) {
        console.log("Connected to DB ..");
      } else {
        console.log("database error");
      }
    });
  } catch (error) {
    console.log("pop", error);
  }
};

dbConnect();

module.exports = connection;
