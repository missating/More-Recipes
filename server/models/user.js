import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      fullname: {
        type: DataTypes.STRING,
        allownull: false
      },
      username: {
        type: DataTypes.STRING,
        allownull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      }
    }
  );

  User.associate = (models) => {
    // associations defined here
    User.hasMany(models.Recipe, { foreignKey: 'userId' });
    User.hasMany(models.Review, { foreignKey: 'userId' });
    User.hasMany(models.Vote, { foreignKey: 'userId' });
    User.hasMany(models.Favourite, { foreignKey: 'userId' });
  };
  return User;
};
