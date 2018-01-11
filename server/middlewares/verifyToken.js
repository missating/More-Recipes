import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req, res, next) => {
  try {
    const verifiedToken = jwt.verify(req.token, process.env.MY_SECRET);
    req.userId = verifiedToken.id;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }
};

export default verifyToken;

