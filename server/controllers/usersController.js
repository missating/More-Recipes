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
   * @param {obj} req
   * @param {obj} res
   * @returns {obj} with the new user details
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
    if (password.length < 8) {
      return res.status(400)
        .json({ message: 'Passwords should be at least 8 characters' });
    }
    if (!confirmPassword) {
      return res.status(400)
        .json({ message: 'confirm Password field is empty' });
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
    }).then((existingUser) => {
      if (existingUser) {
        return res.status(409)
          .json({
            status: 'fail',
            message: 'Email already exist',
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
          const token = jwt.sign(
            { id: newUser.id },
            process.env.MY_SECRET,
            { expiresIn: '24h' }
          );
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
        });
    })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }


  /**
 *
 *
 * @static
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} with the user's token
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
        if (!foundUser) {
          return res.status(404)
            .json({
              status: 'fail',
              message: 'This email does not exist. Sign up instead ?',
            });
        }
        const match = bcrypt.compareSync(req.body.password, foundUser.password);
        if (!match) {
          return res.status(401)
            .json({
              status: 'fail',
              message: 'Email or Password is incorrect'
            });
        }
        const token = jwt.sign({
          id: foundUser.id
        }, process.env.MY_SECRET, {
          expiresIn: '24h'
        });
        return res.status(200)
          .json({
            status: 'success',
            token
          });
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }


  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {obj} with the users profile details
 * @memberof Users
 */
  static getUserProfile(req, res) {
    db.User.findOne({
      where: {
        id: req.userId
      }
    }).then((existingUser) => {
      if (!existingUser) {
        return res.status(404)
          .json({
            status: 'fail',
            message: 'A user with that Id is not found',
          });
      }
      if (existingUser) {
        return res.status(200)
          .json({
            status: 'success',
            user: {
              fullname: existingUser.fullname,
              username: existingUser.username,
              email: existingUser.email,
              joined: new Date(existingUser.createdAt).toDateString()
            }
          });
      }
    })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }


  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {obj} with the updated user details
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
            fullname: fullname || foundUser.fullname,
            username: username || foundUser.username,
            email: email || foundUser.email
          };
          foundUser.update(update)
            .then(updatedUser => res.status(200)
              .json({
                status: 'success',
                user: {
                  fullname: updatedUser.fullname,
                  username: updatedUser.username,
                  email: updatedUser.email,
                  joined: new Date(updatedUser.createdAt).toDateString()
                }
              }));
        }
        if (!foundUser) {
          return res.status(404)
            .json({
              status: 'success',
              message: `Can't find user with id ${req.userId}`
            });
        }
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }
}
