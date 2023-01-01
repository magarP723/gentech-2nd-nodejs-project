const AppError = require("../utils/AppError");
const { failure } = require("../utils/responseMessage");

const validationError = (error) => {
  return new AppError("Validation Error", error.message, 400);
};
const JWTError = (error) => {
  return new AppError("JsonWebTokenError", error.message, 400);
};
const referenceError = (error) => {
  return new AppError("Reference Error", error.name, 400);
};

const tokenExpiredError = (error) => {
  return new AppError("TokenExpiredError", error.message, 500);
};

const typeError = (error) => {
  return new AppError("Type Error", error.message, 400);
};

const sendErrorMessage = (error, req, res, next) => {
  return res.status(error.statusCode).json(
    failure({
      type: error.type,
      message: error.message,
      statusCode: error.statusCode,
    })
  );
};
const MysqlError = (e) => {
  if (e.errno === 1062) {
    return new AppError("MySQL Error", "Duplicate Entry", 500);
  }
  if (e.errno === 1406) {
    return new AppError("MySQL Error", "Data Too Long", 500);
  }
  if (e.errno === 1292) {
    return new AppError("MySQL Error", "Incorrect date value", 500);
  }
};

const errorHandler = (error, req, res, next) => {
  let errorMessage = {
    type: "Error",
    message: error.message,
    statusCode: 500,
  };
  if (error.errno && error.sql) {
    errorMessage = MysqlError(error);
  }
  if (error.name === "ValidationError") {
    errorMessage = validationError(error);
  }

  if (error.name === "ReferenceError") {
    errorMessage = referenceError(error);
  }
  if (error.name === "JsonWebTokenError") {
    errorMessage = JWTError(error);
  }

  if (error.name === "TypeError") {
    errorMessage = typeError(error);
  }

  if (error.name === "TokenExpiredError") {
    errorMessage = tokenExpiredError(error);
  }

  if (error instanceof AppError) {
    sendErrorMessage(error, req, res, next);
  }

  sendErrorMessage(errorMessage, req, res, next);
};

module.exports = errorHandler;
