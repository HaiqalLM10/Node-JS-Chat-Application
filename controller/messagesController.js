const messageModel = require("../model/messageModel");
const models = require("../models/index")
const Sequelize = require('sequelize');
const op = Sequelize.Op;

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await models.Messages.create({
            message: message,
            msg_from: from,
            msg_to: to,
            sender: from,
        });
        if (data) return res.json({ msg: "Message added Successfully" });
        return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        next(ex);
    }
};

module.exports.getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await models.Messages.findAll({ where: {
            msg_from: { [op.in]: [from, to] },
            msg_to: { [op.in]: [from, to] }
        },
        order: [ ['updatedAt', 'ASC'] ],
    });
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender == from,
                message: msg.message,
            }
        });
        res.json(projectMessages)

    } catch (ex) {
        next(ex);
    }
};