module.exports = (sequelize, Sequelize) => {
    const Draw = sequelize.define("draw", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.BIGINT
        },
        assigment_id: {
            type: Sequelize.BIGINT
        },
        answer: {
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

    return Draw;
};
