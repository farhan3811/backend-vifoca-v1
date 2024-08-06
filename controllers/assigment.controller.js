const db = require("../models");
const Assigment = db.assigment;
const { Op } = db.Sequelize;

// Create a new Assigment
exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body.nama_soal || !req.file) {
            return res.status(400).send({
                message: "Nama soal and foto tugas cannot be empty!"
            });
        }

        // Create an Assigment object
        const assigment = {
            materi_id: req.body.materi_id,
            nama_soal: req.body.nama_soal,
            status_level: req.body.status_level,
            foto_tugas: req.file.path, // Handle file upload
            ket_assigment: req.body.ket_assigment,
            deadline: req.body.deadline ? new Date(req.body.deadline) : null,
            created_at: new Date(),
            updated_at: new Date()
        };

        // Save Assigment in the database
        const data = await Assigment.create(assigment);
        res.send(data);
    } catch (err) {
        console.error("Error creating assignment:", err); // Log the error for debugging
        res.status(500).send({
            message: err.message || "Some error occurred while creating the assignment."
        });
    }
};

// Retrieve all Assigments from the database
exports.findAll = async (req, res) => {
    try {
        const nama_soal = req.query.nama_soal;
        const page = parseInt(req.query.page, 10) || 1;
        const size = parseInt(req.query.size, 10) || 10;
        const offset = (page - 1) * size;

        const condition = nama_soal ? { nama_soal: { [Op.iLike]: `%${nama_soal}%` } } : null;

        const data = await Assigment.findAndCountAll({
            where: condition,
            limit: size,
            offset: offset
        });

        res.send({
            assignments: data.rows,
            totalPages: Math.ceil(data.count / size),
            currentPage: page
        });
    } catch (err) {
        console.error("Error retrieving assignments:", err); // Log the error for debugging
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving assignments."
        });
    }
};

// Find a single Assigment with an id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Assigment.findByPk(id);

        if (!data) {
            return res.status(404).send({
                message: `Assignment with id=${id} was not found.`
            });
        }
        res.send(data);
    } catch (err) {
        console.error("Error retrieving assignment with id=" + req.params.id, err); // Log the error for debugging
        res.status(500).send({
            message: "Error retrieving assignment with id=" + id
        });
    }
};

// Update an Assigment by the id in the request
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const [num] = await Assigment.update(req.body, {
            where: { id: id }
        });

        if (num === 1) {
            res.send({
                message: "Assignment was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update assignment with id=${id}. Maybe assignment was not found or req.body is empty!`
            });
        }
    } catch (err) {
        console.error("Error updating assignment with id=" + req.params.id, err); // Log the error for debugging
        res.status(500).send({
            message: "Error updating assignment with id=" + id
        });
    }
};

// Delete an Assigment with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const num = await Assigment.destroy({
            where: { id: id }
        });

        if (num === 1) {
            res.send({
                message: "Assignment was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete assignment with id=${id}. Maybe assignment was not found!`
            });
        }
    } catch (err) {
        console.error("Error deleting assignment with id=" + req.params.id, err); // Log the error for debugging
        res.status(500).send({
            message: "Could not delete assignment with id=" + id
        });
    }
};

// Delete all Assigments from the database
exports.deleteAll = async (req, res) => {
    try {
        const nums = await Assigment.destroy({
            where: {},
            truncate: false
        });

        res.send({ message: `${nums} assignments were deleted successfully!` });
    } catch (err) {
        console.error("Error deleting all assignments:", err); // Log the error for debugging
        res.status(500).send({
            message: err.message || "Some error occurred while removing all assignments."
        });
    }
};
