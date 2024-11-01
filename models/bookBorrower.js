'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookBorrower extends Model {
    static associate(models) {
      this.belongsTo(models.Book, {foreignKey: 'book_id', as: 'book'});
      this.belongsTo(models.Borrower, {foreignKey: 'borrower_id', as: 'borrower'});
    }
  }
  BookBorrower.init({
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    borrower_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_returned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'BookBorrower',
    tableName: 'book_borrowers',
    underscored: true,
    createdAt: 'borrowed_at',
    updatedAt: 'updated_at'
  });
  return BookBorrower;
};