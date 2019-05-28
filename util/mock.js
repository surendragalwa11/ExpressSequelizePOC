var walletMockService = [
  function () {
      var promise = {
          then: function (args) {
          }
      };

      return {
          assetPrice: function (args) {
              return promise;
          },
          assetPurchased: function (args) {
              return promise;
          }
      };
  }
];

module.exports = walletMockService;