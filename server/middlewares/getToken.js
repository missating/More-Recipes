const getToken = (req, res, next) => {
  req.token = req.body.token || req.headers.token || req.query.token;

  if (!req.token) {
    return res.status(401)
      .send({
        status: 'fail',
        message: 'Unauthorized'
      });
  }
  return next();
};

export default getToken;

