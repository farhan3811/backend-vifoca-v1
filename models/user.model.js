const moment = require('moment-timezone');

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
        },
        updated_at: {
            type: Sequelize.DATE,
        }
    }, {
        timestamps: false,
        underscored: true,
        hooks: {
            beforeCreate: (user, options) => {
                const currentDateTimeInWIB = moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss");
                user.created_at = currentDateTimeInWIB;
                user.updated_at = currentDateTimeInWIB;
            },
            beforeUpdate: (user, options) => {
                user.updated_at = moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss");
            }
        }
    });

    return User;
};
