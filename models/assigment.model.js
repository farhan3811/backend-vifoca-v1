module.exports = (sequelize, Sequelize) => {
    const Assigment = sequelize.define("assigment", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        materi_id: {
            type: Sequelize.BIGINT
        },
        nama_soal: {
            type: Sequelize.STRING
        },
        status_level: {
            type: Sequelize.STRING
        },
        ket_assigment: {
            type: Sequelize.TEXT
        },
        deadline: {
            type: Sequelize.DATE
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        timestamps: false,
        underscored: true
    });

    return Assigment;
};
