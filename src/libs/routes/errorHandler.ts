const errorHandler = (err, req, res, next) => {
  console.log('errorHandler function called');

  if (res.headersSent) {
    console.log('If block of error Handler called');
    return next();
  }
  const { message, status, error } = err;
  console.log('res.HeaderSent not found from noRoutesFound');

  const result = {
    error: error || 'undefined',
    message: message || 'error',
    status: status || 500,
    timestamp: new Date(),
  };

  return res.status(result.status).json(result);
};

export default errorHandler;
