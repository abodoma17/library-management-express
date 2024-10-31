'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
        'books',
        'author_id',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'authors',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          after: 'isbn'
        }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Books', 'author_id');
  }
};
