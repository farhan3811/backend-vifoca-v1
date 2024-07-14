module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
          type: Sequelize.STRING
      },
      level: {
          type: Sequelize.INTEGER
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

  return Role;
};
