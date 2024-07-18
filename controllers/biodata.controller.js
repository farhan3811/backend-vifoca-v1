const db = require("../models");
const Biodata = db.biodata;
const { Op } = db.Sequelize;

// Create and Save a new Biodata
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama_lengkap) {
    res.status(400).send({
      message: "Nama lengkap tidak boleh kosong!"
    });
    return;
  }

  const nim = req.body.nim ? BigInt(req.body.nim) : null;
  
  // Create a Biodata object with optional fields
  const biodata = {
    nama_lengkap: req.body.nama_lengkap,
    tanggal_lahir: req.body.tanggal_lahir || null, // Allow tanggal_lahir to be null or empty
    alamat: req.body.alamat || null, // Allow alamat to be null or empty
    nomor_telp: req.body.nomor_telp,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Save Biodata in the database
  Biodata.create(biodata)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat membuat biodata."
      });
    });
};

// Retrieve all Biodata from the database.
exports.findAll = (req, res) => {
  const nama_lengkap = req.query.nama_lengkap;
  var condition = nama_lengkap ? { nama_lengkap: { [Op.iLike]: `%${nama_lengkap}%` } } : null;

  Biodata.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat mengambil biodata."
      });
    });
};

// Find a single Biodata with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Biodata.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Biodata dengan id=${id} tidak ditemukan.`
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Biodata with id=" + id
      });
    });
};

// Update a Biodata by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Biodata.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Biodata berhasil diperbarui."
        });
      } else {
        res.send({
          message: `Tidak dapat memperbarui Biodata dengan id=${id}. Biodata mungkin tidak ditemukan atau req.body kosong!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Biodata with id=" + id
      });
    });
};

// Delete a Biodata with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Biodata.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Biodata berhasil dihapus!"
        });
      } else {
        res.send({
          message: `Tidak dapat menghapus Biodata dengan id=${id}. Biodata mungkin tidak ditemukan!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Tidak dapat menghapus Biodata dengan id=" + id
      });
    });
};

// Delete all Biodata from the database.
exports.deleteAll = (req, res) => {
  Biodata.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} Biodata berhasil dihapus!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat menghapus semua biodata."
      });
    });
};
