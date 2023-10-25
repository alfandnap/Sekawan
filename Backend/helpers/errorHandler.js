function errorHandler(err, req, res, next) {
  let status;
  let message;
  // console.log(err.name);
  switch (err.name) {
    case 'SequelizeConstraintError':
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      status = 400;
      message = err.errors.map(el => { return el.message });
      break;
    case 'Unauthorized':
      status = 403;
      message = 'Unauthorized';
      break;
    case "JsonWebTokenError":
    case 'invalidToken':
      status = 401;
      message = "Unauthorized";
      break;
    case 'UsernamePasswordEmpty':
    case 'UsernamePasswordInvalid':
      status = 401;
      message = 'Invalid username/password';
      break;
    case 'NotFound':
      status = 404;
      message = 'NotFound';
      break;
    default:
      status = 500;
      message = 'Internal Server Error';
      break;
  }

  res.status(status).json({ message })
}

module.exports = { errorHandler }