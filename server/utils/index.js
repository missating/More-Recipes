import jwt from 'jsonwebtoken';

const generateToken = ({ id }) => jwt.sign(
  { id },
  process.env.MY_SECRET
  // FIXME: add token expiration for production
  // { expiresIn: '24h' }
);

export default generateToken;
