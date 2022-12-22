const dbConnection = require("../config/db.config");

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnection.query(`SELECT * FROM userinfos`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const addUser = async ({ data }) => {
  const { userid, name, username, hashPassword, DOB, bio, country } = data;
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `INSERT INTO userinfos (userid,name,username,password,DOB,bio,country) VALUES ("${userid}","${name}","${username}","${hashPassword}","${DOB}","${bio}","${country}")`,
      (err) => {
        if (!err) {
          return resolve("DATA_ADDED_TO_DB");
        } else {
          return reject(err);
        }
      }
    );
  });
};

const getUser = (username) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `SELECT * FROM userinfos WHERE username="${username}"`,
      (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      }
    );
  });
};

module.exports = { getAll, addUser, getUser };
