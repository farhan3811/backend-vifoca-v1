module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_id: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        prodi: {
            type: Sequelize.STRING
        },
        nim: {
            type: Sequelize.BIGINT
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.TEXT
        },
        biodata_id: {
            type: Sequelize.BIGINT
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

    return User;
};
