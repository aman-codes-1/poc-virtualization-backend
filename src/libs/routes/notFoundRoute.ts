const noRoutesFound = (req, res, next) => {
  console.log('noRouteFound function called');
  next({ status: 404, error: 'not found' });
};

export default noRoutesFound;
