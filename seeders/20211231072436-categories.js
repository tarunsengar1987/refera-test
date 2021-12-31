'use strict';

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Categories', [
      { name: 'Test category one', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Test category two', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Test category three', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Test category four', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Category', null, {});
  }
};
