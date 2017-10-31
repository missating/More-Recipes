import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(req.token, 'secretkeyhere');
  } catch (e) {
    const err = res.status(400).send({ message: e });
    return next(err);
  }
  if (!verifiedToken.id) {
    const err = res.status(400).send({ message: 'Unauthorized token' });
    return next(err);
  }
  req.userId = verifiedToken.id;
  return next();
};

export default verifyToken;

