'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Author extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Book, {foreignKey: 'author_id', as: 'books'});
        }
    }

    Author.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Author',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Author;
};