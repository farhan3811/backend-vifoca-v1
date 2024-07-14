const db = require("../models");
const Role = db.role;
const { Op } = db.Sequelize;

// Create a new Role
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || req.body.level === undefined) {
        res.status(400).send({
            message: "Name and level cannot be empty!"
        });
        return;
    }

    // Convert id to integer
    const id = parseInt(req.body.id, 10);

    // Convert created_at and updated_at to Date objects
    const createdAt = req.body.created_at ? new Date(req.body.created_at) : new Date();
    const updatedAt = req.body.updated_at ? new Date(req.body.updated_at) : new Date();

    // Create a Role object
    const role = {
        id: id,
        name: req.body.name,
        level: req.body.level,
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    // Save Role in the database
    Role.create(role)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the role."
            });
        });
};

// Retrieve all Roles from the database
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Role.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving roles."
            });
        });
};

// Find a single Role with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Role.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Role with id=${id} was not found.`
                });
                return;
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving role with id=" + id
            });
        });
};

// Update a Role by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Role.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update role with id=${id}. Maybe role was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating role with id=" + id
            });
        });
};

// Delete a Role with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Role.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete role with id=${id}. Maybe role was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete role with id=" + id
            });
        });
};

// Delete all Roles from the database
exports.deleteAll = (req, res) => {
    Role.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} roles were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all roles."
            });
        });
};
