'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.bulkInsert('Transactions', [{
        transaction_id: '9f883e6e-559f-4c7b-a142-d9e4bb732178',
        user_id: '4537ee34-777d-487e-8fee-cb77aa0cdb95',
        amount: 20,
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Transactions', null, {});
  }
};
