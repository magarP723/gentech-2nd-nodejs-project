class AppError extends Error {
  constructor(type, message, statusCode) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
