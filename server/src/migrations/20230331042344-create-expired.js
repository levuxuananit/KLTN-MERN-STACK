'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Expireds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pid: {
        type: Sequelize.STRING
      },
      uid: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      days: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Accepted', 'Cancelled'),
        defaultValue: 'Pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Expireds');
  }
};