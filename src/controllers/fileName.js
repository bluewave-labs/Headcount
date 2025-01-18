const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");

//Retrieve all files
exports.showAll = async (req, res, next) => {
    const data = await db.fileName.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    if (!data) {
        res.send("No results found");
    }
    else {
        res.send(data);
    }
};

//Retrieve a file with a given id
exports.showOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await db.fileName.findByPk(id);
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};

//Create a file
exports.createRecord = async (req, res, next) => {
    try {
        const data = await db.fileName.create(req.body);
        res.status(201).send(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};

//Update a file
exports.updateRecord = async (req, res, next) => {
    const updatedData = req.body;
    try {
        const data = await db.fileName.findByPk(updatedData.id);
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            data.set(updatedData);
            await data.save();
            res.status(200).send(data);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};

//Delete a file
exports.deleteRecord = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await db.fileName.findByPk(id);
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            await db.video.destroy({
                where: { id: id }
            });
            res.status(204).send({ message: message.deleted });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};