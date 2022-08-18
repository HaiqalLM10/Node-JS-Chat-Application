const Users = require("../model/userModel")
const bcrypt = require("bcrypt")
const models = require("../models/index")
const Sequelize = require('sequelize');
const op = Sequelize.Op;

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await models.User.findOne({ where: { username: req.body.username } });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await models.User.findOne({ where: { username: req.body.username } });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await models.User.findOne({ where: { email: req.body.email } });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await models.User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    let values = {
      isAvatarImageSet: true,
      avatarImage: req.body.image
    }

    const userData = await models.User.update(values, { where: { id: req.params.id } })

    return res.json({
      isSet: true,
      image: req.body.image,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {

  try {
    const users = await models.User.findAll({ where: { id: { [op.notIn]: [req.params.id] } } });
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};