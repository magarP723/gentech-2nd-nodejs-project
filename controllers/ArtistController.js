const dbConnection = require("../config/db.config");

const { v4: uuidv4 } = require("uuid");

const addArtist = ({ data }) => {
  return new Promise((resolve, reject) => {
    const { artistname, bio, artistphoto, year, status } = data;
    const artistid = uuidv4();
    dbConnection.query(
      `INSERT INTO artists (artistid,artistname,bio,artistphoto,year,status) VALUES("${artistid}","${artistname}","${bio},"${artistphoto}","${year}",${status})`,
      (err, result) => {
        if (!err) {
          return resolve("ADDED");
        }
        return reject(err);
      }
    );
  });
};
const getArtist = (username) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `SELECT * FROM artists WHERE artistname="${username}"`,
      (err, result) => {
        if (!err) {
          return resolve(result);
        }
        return reject(err);
      }
    );
  });
};

module.exports = { addArtist, getArtist };
