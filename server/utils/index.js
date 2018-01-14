import jwt from 'jsonwebtoken';

const generateToken = ({ id }) => jwt.sign(
  { id },
  process.env.MY_SECRET,
  { expiresIn: '24h' }
);

export default generateToken;
