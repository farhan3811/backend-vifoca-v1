const db = require("../models");
const User = db.user;
const { Op } = db.Sequelize;
const moment = require("moment-timezone");

// Create a new User
exports.create = (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).send({
      message: "Name and email cannot be empty!",
    });
  }

  const id = req.body.id ? parseInt(req.body.id, 10) : null;
  const role_id = req.body.role_id ? parseInt(req.body.role_id, 10) : null;
  const nim = req.body.nim ? BigInt(req.body.nim) : null;
  const biodata_id = req.body.biodata_id ? BigInt(req.body.biodata_id) : null;
  const created_at = moment().tz("Asia/Jakarta").toDate();
  const updated_at = moment().tz("Asia/Jakarta").toDate();

  const user = {
    id: id,
    role_id: role_id,
    name: req.body.name,
    prodi: req.body.prodi,
    nim: nim,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    biodata_id: biodata_id,
    created_at: created_at,
    updated_at: updated_at,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

// Find all Users with pagination and sorting
exports.findAll = (req, res) => {
  const name = req.query.name || "";
  const sortOrder = req.query.sortOrder || "desc";
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 5) || 5;
  const offset = (page - 1) * limit;

  if (!["asc", "desc"].includes(sortOrder)) {
    return res.status(400).send({
      message: "Invalid sortOrder value. Use 'asc' or 'desc'.",
    });
  }

  const order = sortOrder === "asc" ? ["updated_at", "ASC"] : ["updated_at", "DESC"];
  const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  User.findAndCountAll({
    where: condition,
    order: [order],
    limit: limit,
    offset: offset,
  })
    .then(({ count, rows }) => {
      res.send({
        totalItems: count,
        users: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    })
    .catch((err) => {
      console.error("Error retrieving users:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `User with id=${id} was not found.`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      console.error("Error retrieving user with id:", id, err);
      res.status(500).send({
        message: "Error retrieving user with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  req.body.updated_at = moment().tz("Asia/Jakarta").toDate();

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.error("Error updating user with id:", id, err);
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        });
      }
    })
    .catch((err) => {
      console.error("Could not delete user with id:", id, err);
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};

// Delete all Users from the database
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} users were deleted successfully!` });
    })
    .catch((err) => {
      console.error("Error removing all users:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};
