import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';


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
      return res.status(400).json({ message: 'Lastname field is empty' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password field is empty' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Passwords should be at leats 6 characters' });
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
          .then(newUser => res.status(201)
            .json({
              status: 'success',
              message: 'Account created',
              username: newUser.username,
              fullname: newUser.fullname,
              email: newUser.email
            }))
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
          }, 'secretkeyhere', {
            expiresIn: '3h'
          });
          return res.status(200).send({
            status: 'Success.',
            token: {
              token
            }
          });
        }
        return res.status(400).send({
          status: 'Failed',
          message: 'Invalid password.'
        });
      })
      .catch(error => res.status(400).send({
        status: 'Failed',
        message: error.message
      }));
  }

  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {success} when user adds favourite
 * @memberof Users
 */
  static addFavourite(req, res) {
    const { recipeId } = req.body;

    db.Recipe.findById(req.body.recipeId)
      .then((found) => {
        if (!found) {
          return res.status(404)
            .json({ message: 'recipe doesn\'t exist in catalogue' });
        }
        if (found) {
          db.User.findById(req.params.userId)
            .then((foundUser) => {
              if (!foundUser) {
                return res.status(404)
                  .json({ message: 'user not found' });
              }
              if (foundUser) {
                db.User.update(
                  { favourite: Sequelize.fn('array_append', Sequelize.col('favourite'), recipeId) },
                  { where: { id: req.params.userId } }
                );
              }
              return res.status(201).json({
                status: 'Success',
                message: 'Recipe added to favourites'
              });
            })
            .catch(() => res.status(500)
              .json({ message: 'Unable to add to favourites due to server error' }));
        }
      });
  }
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {json} with the user's favorite
 * @memberof Users
 */
  static getAllFavourite(req, res) {
    db.User.findById(req.params.userId)
      .then((found) => {
        if (!found) {
          return res.status(404)
            .json({
              status: 'Failed',
              message: 'User not found'
            });
        }
        if (found) {
          db.Recipe.findAll({
            where: {
              id: found.favourite
            },
            include: [
              { model: db.Review, attributes: ['content'] }
            ]
          })
            .then((recipes) => {
              res.status(200)
                .json({
                  status: 'Success',
                  recipes
                });
            })
            .catch(() => res.status(500)
              .json({ status: 'Failed', message: 'Unable to get favourites, internal server error' }));
        }
      });
  }
}
