import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import validateUser from '../validation/validateUser';


/**
 *
 *
 * @export
 * @class User
 */
export default class Users {
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {json} creates a user
   * @memberof User
   */
  static createUser(req, res) {
    const userValidate = validateUser(req.body);
    if (!userValidate) {
      return userValidate.message;
    }
    const {
      fullname, username, email,
    } = req.body;
    db.User.findOne({
      where: { email }
    })
      .then((existing) => {
        if (existing) {
          return res.status(403).send({
            status: 'Forbidden',
            message: 'Email already exists.',
          });
        }
        return db.User
          .create({
            fullname,
            username,
            email,
            password: bcrypt.hashSync(req.body.password, 10),
          })
          .then((newUser) => {
            const token = jwt.sign({
              id: newUser.id,
              fullname: newUser.fullname,
              username: newUser.username,
              email: newUser.email,
            }, 'secretkeyhere', { expiresIn: 1440 });
            return res.status(201)
              .json({
                status: 'success',
                token,
                message: 'Account created'
              });
          }).catch(error => res.status(400).send(error.message));
      })
      .catch(() => res.status(500).json({ message: 'server is currently not available, please try again' }));
  }
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {json} with the user's token
 * @memberof Users
 */
  static userLogin(req, res) {
    const { email } = req.body;
    db.User.findOne({
      where: {
        email
      }
    })
      .then((foundUser) => {
        const match = bcrypt.compareSync(req.body.password, foundUser.password);
        if (match) {
          const token = jwt.sign({ id: foundUser.id }, 'secretkeyhere', { expiresIn: 1440 });
          return res.status(200).send({ status: 'Success.', token: { token } });
        }
        return res.status(400).send({ status: 'Failed', message: 'Invalid password.' });
      })
      .catch(error => res.status(400).send({ status: 'Failed', message: error.message }));
  }
}
