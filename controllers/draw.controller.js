const db = require("../models");
const Draw = db.draw;
const { Op } = db.Sequelize;

// Create a new Draw
exports.create = (req, res) => {
    // Validate request
    if (!req.body.answer) {
        res.status(400).send({
            message: "Answer cannot be empty!"
        });
        return;
    }

    // Create a Draw object
    const draw = {
        user_id: req.body.user_id,
        assigment_id: req.body.assigment_id,
        answer: req.body.answer,
        created_at: req.body.created_at ? new Date(req.body.created_at) : new Date(),
        updated_at: req.body.updated_at ? new Date(req.body.updated_at) : new Date()
    };

    // Save Draw in the database
    Draw.create(draw)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the draw."
            });
        });
};

// Retrieve all Draws from the database
exports.findAll = (req, res) => {
    const answer = req.query.answer;
    var condition = answer ? { answer: { [Op.iLike]: `%${answer}%` } } : null;

    Draw.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving draws."
            });
        });
};

// Find a single Draw with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Draw.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Draw with id=${id} was not found.`
                });
                return;
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving draw with id=" + id
            });
        });
};

// Update a Draw by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Draw.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Draw was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update draw with id=${id}. Maybe draw was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating draw with id=" + id
            });
        });
};

// Delete a Draw with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Draw.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Draw was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete draw with id=${id}. Maybe draw was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete draw with id=" + id
            });
        });
};

// Delete all Draws from the database
exports.deleteAll = (req, res) => {
    Draw.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} draws were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all draws."
            });
        });
};
