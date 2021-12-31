'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'Category Name'
        }
    }, {});

    Category.associate = function (models) {
        Category.belongsTo(models.order, { foreignKey: 'id' });

    }

    return Category;
};