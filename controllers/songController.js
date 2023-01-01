const dbConnection = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");

const insertSong = ({ data }) => {
  return new Promise((resolve, reject) => {
    const { songName, songPath, songDuration } = data;
    const songID = uuidv4();
    const Date = "2021-12-09";
    dbConnection.query(
      `INSERT INTO songcollection (s_id,songName,songPath,songDuration,Date) VALUES ("${songID}","${songName}","${songPath}","${songDuration}","${Date}")`,
      (err, result) => {
        if (!err) {
          return resolve(songID);
        }
        return reject(err);
      }
    );
  });
};

module.exports = { insertSong };
