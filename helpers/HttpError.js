const messages = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
};

const HttpError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

module.exports = HttpError;

// const httpError = (status, message) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

// module.exports = httpError;
