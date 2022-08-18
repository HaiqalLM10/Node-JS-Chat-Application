'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "username is required" },
        len: {
          args: [3, 20],
          msg: "username length is not in this range [3, 20]"
        }
      },
    },
    avatarImage: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      validate: {
        len: {
          args: [3, 10000],
          msg: "avatar image length is not in this range [3, 10000]"
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "email is required" },
        len: {
          args: [1, 50],
          msg: "email length is not in this range [1, 50]"
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "password is required" },
        len: {
          args: [8],
          msg: "password length is minimum 8"
        }
      },
    },
    isAvatarImageSet: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};