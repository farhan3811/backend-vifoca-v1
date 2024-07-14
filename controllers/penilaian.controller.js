const db = require("../models");
const Penilaian = db.penilaian;
const { Op } = db.Sequelize;

// Create a new Penilaian
exports.create = (req, res) => {
    // Validate request
    if (!req.body.form_penilaian) {
        res.status(400).send({
            message: "Form penilaian cannot be empty!"
        });
        return;
    }

    // Create a Penilaian object
    const penilaian = {
        user_id: req.body.user_id,
        draw_id: req.body.draw_id,
        form_penilaian: req.body.form_penilaian,
        ket_penilaian: req.body.ket_penilaian,
        created_at: req.body.created_at ? new Date(req.body.created_at) : new Date(),
        updated_at: req.body.updated_at ? new Date(req.body.updated_at) : new Date()
    };

    // Save Penilaian in the database
    Penilaian.create(penilaian)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the penilaian."
            });
        });
};

// Retrieve all Penilaians from the database
exports.findAll = (req, res) => {
    const form_penilaian = req.query.form_penilaian;
    var condition = form_penilaian ? { form_penilaian: { [Op.iLike]: `%${form_penilaian}%` } } : null;

    Penilaian.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving penilaians."
            });
        });
};

// Find a single Penilaian with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Penilaian.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Penilaian with id=${id} was not found.`
                });
                return;
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving penilaian with id=" + id
            });
        });
};

// Update a Penilaian by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Penilaian.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Penilaian was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update penilaian with id=${id}. Maybe penilaian was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating penilaian with id=" + id
            });
        });
};

// Delete a Penilaian with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Penilaian.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Penilaian was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete penilaian with id=${id}. Maybe penilaian was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete penilaian with id=" + id
            });
        });
};

// Delete all Penilaians from the database
exports.deleteAll = (req, res) => {
    Penilaian.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} penilaians were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all penilaians."
            });
        });
};
