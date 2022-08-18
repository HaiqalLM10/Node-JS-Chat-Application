'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Messages.init({
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Message is required" },
      },
    },
    msg_from: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Msg From is required" },
      },
    },
    msg_to: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Msg To is required" },
      },
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Sender is required" },
      },
    },
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};
