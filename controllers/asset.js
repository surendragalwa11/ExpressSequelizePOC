var models = require('../models');
module .exports = {
  purchaseAsset: async ({user_id, amount}) => {
    let resp = await models.Wallet.purchaseAsset(user_id, amount)
    return resp;
  }
}