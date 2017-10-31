const extractToken = (req, res, next) => {
  req.token = req.body.token || req.header.token || req.query.token;
  if (!req.token) {
    const err = res.status(403).send({ status: 'Forbidden.', message: 'Please sign in.' });
    return next(err);
  }
  return next();
};

export default extractToken;

