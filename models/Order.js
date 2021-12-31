'use strict';
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        category_id: {
            type: DataTypes.BIGINT(11),
            allowNull: false,
            comment: 'Category Id'
        },
        contact_name: {
            type: DataTypes.STRING(255),
            comment: 'Contact Name'
        },
        contact_phone: {
            type: DataTypes.STRING(255),
            comment: 'Contact Phone'
        },
        agency: {
            type: DataTypes.STRING(255),
            comment: 'Agency Name'
        },
        company: {
            type: DataTypes.STRING(255),
            comment: 'Company Name'
        },
        description: {
            type: DataTypes.TEXT,
            comment: 'Description'
        },
        deadline: {
            type: DataTypes.DATE,
            comment: 'Dead Line'
        }
    }, {});

    Order.associate = function (models) {
        Order.hasOne(models.category, { foreignKey: 'id', sourceKey: 'category_id' });

    }

    return Order;
};