import bcrypt from 'bcrypt';
import db from '../models/index';
import generateToken from '../utils';

/**
 * @class usersController
 *
 * @export
 *
 */
export default class usersController {
  /**
   * @description - Create a new user
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof usersController
   *
   * @returns {object} Class instance
   */
  static createUser(req, res) {
    const {
      email, fullname, username, password
    } = req.body;

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
          password
        })
        .then((newUser) => {
          const token = generateToken(newUser);
          res.status(201)
            .json({
              status: 'success',
              message: 'Account created',
              user: {
                username: newUser.username,
                fullname: newUser.fullname,
                email: newUser.email,
                id: newUser.id
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
   * @description - Logs in a user
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof usersController
   *
   * @returns {object} Class instance
   */
  static userLogin(req, res) {
    const { email, password } = req.body;

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
              message: 'These credentials do not match our record',
            });
        }
        if (!bcrypt.compareSync(password, foundUser.password)) {
          return res.status(401)
            .json({
              status: 'fail',
              message: 'These credentials do not match our record'
            });
        }
        const token = generateToken(foundUser);
        return res.status(200)
          .json({
            status: 'success',
            token,
            foundUser: {
              username: foundUser.username,
              fullname: foundUser.fullname,
              email: foundUser.email,
              id: foundUser.id
            }
          });
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }


  /**
   * @description - Gets user's profile
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof usersController
   *
   * @returns {object} Class instance
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
   * @description - Update a user's profile
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof usersController
   *
   * @returns {object} Class instance
   */
  static updateUserProfile(req, res) {
    const { fullname, username } = req.body;

    return db.User.findOne({
      where: {
        id: req.userId
      }
    })
      .then((foundUser) => {
        if (foundUser) {
          const update = {
            fullname: fullname || foundUser.fullname,
            username: username || foundUser.username,
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
              status: 'fail',
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
