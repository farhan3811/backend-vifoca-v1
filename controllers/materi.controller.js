const db = require("../models");
const Materi = db.materi;
const { Op } = db.Sequelize;

// Create a new Materi
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name_materi) {
        res.status(400).send({
            message: "Name materi cannot be empty!"
        });
        return;
    }

    // Create a Materi object
    const materi = {
        id: req.body.id ? BigInt(req.body.id) : null,
        kategori_id: req.body.kategori_id,
        name_materi: req.body.name_materi,
        img_materi: req.file ? req.file.path : null, // URL gambar
        ket_materi: req.body.ket_materi,
        vid_materi: req.body.vid_materi,
        created_at: req.body.created_at ? new Date(req.body.created_at) : new Date(),
        updated_at: req.body.updated_at ? new Date(req.body.updated_at) : new Date()
    };

    // Save Materi in the database
    Materi.create(materi)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the materi."
            });
        });
};

// Retrieve all Materis from the database with pagination, sorting, and searching
exports.findAll = (req, res) => {
    const name_materi = req.query.name;
    const sortOrder = req.query.sortOrder || 'desc';
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;

    const condition = name_materi ? { name_materi: { [Op.iLike]: `%${name_materi}%` } } : null;
    const order = [['updated_at', sortOrder.toUpperCase()]];
    const limit = size;
    const offset = (page - 1) * size;

    Materi.findAndCountAll({ where: condition, order, limit, offset })
        .then(data => {
            const totalPages = Math.ceil(data.count / size);
            res.send({
                materis: data.rows,
                totalPages: totalPages,
                currentPage: page,
                pageSize: size
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving materis."
            });
        });
};

// Find a single Materi with an id
exports.findOne = (req, res) => {
    const id = BigInt(req.params.id); // Convert id to BigInt

    Materi.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Materi with id=${id} was not found.`
                });
                return;
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving materi with id=" + id
            });
        });
};

// Update a Materi by the id in the request
exports.update = (req, res) => {
    const id = BigInt(req.params.id); // Convert id to BigInt

    req.body.updated_at = new Date();

    Materi.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num[0] === 1) { // Sequelize returns an array with the count of updated rows
                res.send({
                    message: "Materi was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update materi with id=${id}. Maybe materi was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating materi with id=" + id
            });
        });
};

// Delete a Materi with the specified id in the request
exports.delete = (req, res) => {
    const id = BigInt(req.params.id); // Convert id to BigInt

    Materi.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) { // Sequelize returns the count of deleted rows
                res.send({
                    message: "Materi was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete materi with id=${id}. Maybe materi was not found!`
                });
            }
        })
        .catch(err => {
            console.error("Could not delete materi with id:", id, err);
            res.status(500).send({
                message: "Could not delete materi with id=" + id
            });
        });
};

// Delete all Materis from the database
exports.deleteAll = (req, res) => {
    Materi.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} materis were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all materis."
            });
        });
};
