const AppError = require("../utils/AppError");
const { failure } = require("../utils/responseMessage");

const validationError = (error) => {
  return new AppError("Validation Error", error.message, 400);
};
const JWTError = (error) => {
  return new AppError("JsonWebTokenError", error.message, 400);
};
const referenceError = (error) => {
  return new AppError("Reference Error", error.message, 400);
};
const duplicateEntry = (error) => {
  return new AppError("MYSQL_ERROR", error.name, 409); //HTTP code 409 for conflict
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

const errorHandler = (error, req, res, next) => {
  console.log(error.name);
  let errorMessage = {
    type: "",
    message: "",
    statusCode: 400,
  };
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
  if (error.name === "ER_DUP_ENTRY") {
    errorMessage = duplicateEntry(error);
  }
  //also handle missing value error also...

  if (error.name === "TokenExpiredError") {
    errorMessage = tokenExpiredError(error);
  }

  if (error instanceof AppError) {
    sendErrorMessage(error, req, res, next);
  }
  sendErrorMessage(errorMessage, req, res, next);
};

module.exports = errorHandler;
