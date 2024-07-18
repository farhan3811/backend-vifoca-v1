module.exports = (sequelize, Sequelize) => {
  const Biodata = sequelize.define("biodata", {
    nama_lengkap: {
      type: Sequelize.STRING
    },
    tanggal_lahir: {
      type: Sequelize.DATE
    },
    nomor_telp: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  return Biodata;
};
