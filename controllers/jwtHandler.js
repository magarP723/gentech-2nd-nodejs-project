const jwt = require("jsonwebtoken");

const createToken = async (userid) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secretkey = "appleand90orange";
    const options = { expiresIn: "30s", audience: userid };
    jwt.sign(payload, secretkey, options, (err, token) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(token);
      }
    });
  });
};
const createRefreshToken = async (userid) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secretkey = "appleand90orange";
    const options = { expiresIn: "1y", audience: userid };
    jwt.sign(payload, secretkey, options, (err, token) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(token);
      }
    });
  });
};

const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "appleand90orange", (err, decoded) => {
      if (!err) {
        resolve(decoded);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = { createToken, createRefreshToken, verifyToken };
