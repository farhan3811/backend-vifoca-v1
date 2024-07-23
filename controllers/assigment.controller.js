const db = require("../models");
const Assigment = db.assigment;
const { Op } = db.Sequelize;

// Create a new Assigment
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nama_soal) {
        res.status(400).send({
            message: "Nama soal cannot be empty!"
        });
        return;
    }

    // Create an Assigment object
    const assigment = {
        materi_id: req.body.materi_id,
        nama_soal: req.body.nama_soal,
        status_level: req.body.status_level,
        foto_tugas: req.body.foto_tugas,
        ket_assigment: req.body.ket_assigment,
        deadline: req.body.deadline ? new Date(req.body.deadline) : null,
        created_at: req.body.created_at ? new Date(req.body.created_at) : new Date(),
        updated_at: req.body.updated_at ? new Date(req.body.updated_at) : new Date()
    };

    // Save Assigment in the database
    Assigment.create(assigment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the assigment."
            });
        });
};

// Retrieve all Assigments from the database
exports.findAll = (req, res) => {
    const nama_soal = req.query.nama_soal;
    var condition = nama_soal ? { nama_soal: { [Op.iLike]: `%${nama_soal}%` } } : null;

    Assigment.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving assigments."
            });
        });
};

// Find a single Assigment with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Assigment.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Assigment with id=${id} was not found.`
                });
                return;
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving assigment with id=" + id
            });
        });
};

// Update an Assigment by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Assigment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Assigment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update assigment with id=${id}. Maybe assigment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating assigment with id=" + id
            });
        });
};

// Delete an Assigment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Assigment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Assigment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete assigment with id=${id}. Maybe assigment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete assigment with id=" + id
            });
        });
};

// Delete all Assigments from the database
exports.deleteAll = (req, res) => {
    Assigment.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} assigments were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all assigments."
            });
        });
};
