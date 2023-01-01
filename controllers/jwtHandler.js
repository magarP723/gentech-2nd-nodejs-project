const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  return new Promise((resolve, reject) => {
    const payload = { user };
    const secretkey = process.env.ACCESS_TOKEN;
    const options = { expiresIn: "30s", audience: user.userid };
    jwt.sign(payload, secretkey, options, (err, token) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(token);
      }
    });
  });
};

const createRefreshToken = async (username) => {
  return new Promise((resolve, reject) => {
    const payload = { username: username };
    const secretkey = process.env.REFRESH_TOKEN;
    const options = { expiresIn: "30min", audience: username };
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
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
    return { payload };
  } catch (error) {
    return { expired: error.message, error };
  }
};

const verifyRefreshToken = async (token) => {
  console.log("appleorange mango");
  try {
    const payload = await jwt.verify(token, process.env.REFRESH_TOKEN);
    console.log(payload);
    return { payload };
  } catch (error) {
    return { expired: error.message, error };
  }
};

module.exports = {
  createToken,
  createRefreshToken,
  verifyToken,
  verifyRefreshToken,
};
