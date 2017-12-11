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
      .catch(() => res.status(500).send({
        status: 'Failed',
        message: 'This user does not exist'
      }));
  }


  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {json} all users with their recipes
 * @memberof Users
 */
  static getUserProfile(req, res) {
    db.User.findOne({
      where: {
        id: req.params.userId
      }
    }).then((existing) => {
      if (!existing) {
        return res.status(404).send({
          status: 'Not found',
          message: 'A user with that Id is not found',
        });
      }
      if (existing) {
        return res.status(200)
          .json({
            status: 'Success',
            user: {
              fullname: existing.fullname,
              username: existing.username,
              email: existing.email,
              joined: new Date(existing.createdAt).toDateString()
            }
          });
      }
    })
      .catch(() => res.status(500)
        .json({ message: 'Unable to find a user with that id' }));
  }


  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {json} all users with their recipes
 * @memberof Users
 */
  static updateUserProfile(req, res) {
    const { fullname, username, email } = req.body;

    db.User.findOne({
      where: {
        id: req.userId
      }
    })
      .then((foundUser) => {
        if (foundUser) {
          const update = {
            fullname: fullname ? fullname.toLowerCase() : foundUser.fullname,
            username: username ? username.toLowerCase() : foundUser.username,
            email: email ? email.toLowerCase() : foundUser.email
          };
          foundUser.update(update)
            .then(updatedUser => res.status(200)
              .json({
                status: 'Update successful',
                user: {
                  fullname: updatedUser.fullname,
                  username: updatedUser.username,
                  email: updatedUser.email,
                  joined: new Date(updatedUser.createdAt).toDateString()
                }
              }))
            .catch(error => res.status(500)
              .json({
                status: 'Fail',
                message: error
              }));
        }
        if (!foundUser) {
          return res.status(404)
            .json({
              status: 'Fail',
              message: `Can't find user with id ${req.userId}`
            });
        }
      })
      .catch(error => res.status(500)
        .json({
          status: 'Fail',
          error,
        }));
  }
}
