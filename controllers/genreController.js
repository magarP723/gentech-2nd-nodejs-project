const dbConnection = require("../config/db.config");

const { v4: uuidv4 } = require("uuid");

const addGenre = ({ data }) => {
  return new Promise((resolve, reject) => {
    const { genreName, genreDescription } = data;
    const genreid = uuidv4();
    dbConnection.query(
      `INSERT INTO genre (genreid,genreName,genreDescription) VALUES ("${genreid}","${genreName}","${genreDescription}")`,
      (err, result) => {
        if (!err) {
          return resolve("ADDED");
        }
        return reject(err);
      }
    );
  });
};

const getGenre = ({ genre }) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `SELECT * FROM genre WHERE genreName="${genre}"`,
      (err, result) => {
        if (!err) {
          return resolve(result);
        }
        return reject(err);
      }
    );
  });
};

module.exports = { addGenre, getGenre };
