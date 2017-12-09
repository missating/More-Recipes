import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';

dotenv.config();

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
    const {
      email, password, confirmPassword, fullname, username
    } = req.body;

    if (!fullname) {
      return res.status(400).json({ message: 'Fullname field is empty' });
    }
    if (!username) {
      return res.status(400).json({ message: 'Username field is empty' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password field is empty' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Passwords should be at least 6 characters' });
    }
    if (!confirmPassword) {
      return res.status(400).json({ message: 'confirm Password field is empty' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords don\'t match' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email field is empty' });
    }
    if (typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    db.User.findOne({
      where: {
        email
      }
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
            const token = jwt.sign({ id: newUser.id }, process.env.MY_SECRET, { expiresIn: '24h' });
            res.status(201)
              .json({
                status: 'success',
                message: 'Account created',
                user: {
                  username: newUser.username,
                  fullname: newUser.fullname,
                  email: newUser.email,
                },
                token
              });
          })
          .catch(error => res.status(400).send(error.message));
      }).catch(error => res.status(400).send(error.message));
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
    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password field is empty' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email field is empty' });
    }

    db.User.findOne({
      where: {
        email
      }
    })
      .then((foundUser) => {
        const match = bcrypt.compareSync(req.body.password, foundUser.password);
        if (match) {
          const token = jwt.sign({
            id: foundUser.id
          }, process.env.MY_SECRET, {
            expiresIn: '24h'
          });
          return res.status(200).send({
            status: 'Success.',
            token
          });
        }
        return res.status(401).send({
          status: 'Failed',
          message: 'Wrong password'
        });
      })
      .catch(error => res.status(500).send({
        status: 'Failed',
        message: error.message
      }));
  }
}
