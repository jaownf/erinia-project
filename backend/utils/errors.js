class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode || 500;
  }
}

module.exports = {
  HttpError,
};
