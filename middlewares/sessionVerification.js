const { getUser, getRefreshToken } = require("../controllers/useRegister");
const { success, failure } = require("../utils/responseMessage");
const {
  createToken,
  verifyToken,
  verifyRefreshToken,
} = require("../controllers/jwtHandler");

const sessionVerification = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(404).json(failure("Invalid auth token"));
  }
  const accessToken = authHeader.split(" ")[1];
  await setUser(accessToken, req, res, next);
};

const setUser = async (accessToken, req, res, next) => {
  try {
    const { payload, expired, error } = await verifyToken(accessToken);
    if (expired === "jwt expired") {
      return await setNewAccessTokenByVerifyingRefreshToken(req, res, next);
    }
    req.user = payload;
    return next();
  } catch (error) {
    return next(error);
  }
};

const setNewAccessTokenByVerifyingRefreshToken = async (req, res, next) => {
  const { refresh_token } = JSON.parse(req.cookies.userCredentials);
  const isRefreshTokenExist = await getRefreshToken(refresh_token);
  if (!isRefreshTokenExist) {
    return res.status(400).json(failure("Auth Error."));
  }

  const { payload, expired, error } = await verifyRefreshToken(refresh_token);
  if (expired === "jwt expired") {
    return next(error);
  }

  const user = await getUser(payload.username);
  if (!user) {
    return res.status(400).json(failure("Auth Error"));
  }
  let accessToken = await createToken(user[0]);
  const userCredentials = {
    ...user[0],
    refresh_token,
    accessToken,
  };
  res.cookie("userCredentials", JSON.stringify(userCredentials));
  setUser(accessToken, req, res, next);
};

const checkIfTokenExpired = async (req, res, next) => {
  if (req.user) {
    res.status(200).json(success("verified"));
  }
};

module.exports = { checkIfTokenExpired, sessionVerification };
