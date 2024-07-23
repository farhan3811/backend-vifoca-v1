module.exports = (sequelize, Sequelize) => {
    const Materi = sequelize.define("materi", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        kategori_id: {
            type: Sequelize.INTEGER
        },
        name_materi: {
            type: Sequelize.STRING
        },
        img_materi: {
            type: Sequelize.TEXT
        },
        ket_materi: {
            type: Sequelize.TEXT
        },
        vid_materi: {
            type: Sequelize.TEXT
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

    return Materi;
};
