const dbConnection = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");

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
  const { name, username, hashPassword, DOB, bio, country } = data;
  const userid = uuidv4();
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
const addRefreshToken = (refreshtoken) => {
  let uuid = uuidv4();
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `INSERT INTO refreshtoken (tokenid,refreshToken) VALUE ("${uuid}","${refreshtoken}")`,
      (err, result) => {
        if (!err) {
          return resolve(result);
        }
        return reject(err);
      }
    );
  });
};
const getRefreshToken = (refreshToken) => {
  return new Promise((resolve, rejecct) => {
    dbConnection.query(
      `SELECT * FROM refreshtoken WHERE refreshToken = "${refreshToken}"`,
      (err, result) => {
        if (!err) {
          return resolve(result);
        }
        return reject(err);
      }
    );
  });
};

const deleteRefreshTOken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(
      `DELETE FROM refreshtoken WHERE refreshToken="${refreshToken}"`,
      (err, result) => {
        if (!err) {
          return resolve(result);
        }
        return reject(err);
      }
    );
  });
};
module.exports = {
  getAll,
  addUser,
  getUser,
  addRefreshToken,
  getRefreshToken,
  deleteRefreshTOken,
};
