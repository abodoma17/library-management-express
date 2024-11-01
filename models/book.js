'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Author, {foreignKey: 'author_id', as: 'author'});
        }
    }

    Book.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        shelf_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        available_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Book',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Book;
};