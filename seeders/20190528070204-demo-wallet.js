'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

      return queryInterface.bulkInsert('Wallets', [{
        wallet_id: '20cfb6e5-7bd7-4c3d-af1c-b1a7999aecf7',
        user_id: '4537ee34-777d-487e-8fee-cb77aa0cdb95',
        balance: 1000
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Wallets', null, {});
  }
};
