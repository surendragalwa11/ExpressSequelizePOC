var models = require('../models');
module .exports = {
  purchaseAsset: async ({user_id, amount}) => {
    let resp = {};
    let updatedBalance;
    resp = models.Wallet.deductBalance(user_id, amount)
      .then((updatedbalance)=>{
        updatedBalance = updatedbalance
        return models.Transaction.createTransaction(user_id,amount);
      }).then((transaction_id)=> {
        return ({
          Response: 200,
          data: {
            wallet_balance: updatedBalance,
            transaction_id: transaction_id
          }
        })
      })
      .catch((err)=> {
        return ({
          Response: 401,
          data: {},
          error: err
        });
      })
    return resp;
  }
}