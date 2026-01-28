class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Internal Server Error",
    errors = [],
    stack = null
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;

    if (process.env.NODE_ENV !== "production") {
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    } else {
      delete this.stack;
    }
  }
}

export default ApiError;
