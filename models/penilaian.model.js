module.exports = (sequelize, Sequelize) => {
    const Penilaian = sequelize.define("penilaian", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.BIGINT
        },
        draw_id: {
            type: Sequelize.BIGINT
        },
        form_penilaian: {
            type: Sequelize.STRING
        },
        ket_penilaian: {
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

    return Penilaian;
};
