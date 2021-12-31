'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(11)
      },
      category_id: {
        type: Sequelize.BIGINT(11),
        // references: {
        //   model: {
        //     tableName: 'categories',
        //     schema: 'schema'
        //   },
        //   key: 'id'
        // },
        // allowNull: false
      },
      contact_name: {
        type: Sequelize.STRING(255)
      },
      contact_phone: {
        type: Sequelize.STRING(255)
      },
      agency: {
        type: Sequelize.STRING(255)
      },
      company: {
        type: Sequelize.STRING(255)
      },
      description: {
        type: Sequelize.TEXT
      },
      deadline: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('orders', {
      type: 'FOREIGN KEY',
      fields: ['category_id'],
      name: 'FK_category_order',
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }));
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('orders');
  }
};
