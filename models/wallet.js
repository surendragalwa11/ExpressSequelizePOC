'use strict';

module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    wallet_id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    }
  }, {
    timestamps: true,
  });
  Wallet.associate = function(models) {
    Wallet.hasMany(models.Transaction, {
      as: 'transactions',
      foreignKey: 'user_id',
      source_key: 'user_id'
    })
  };

  Wallet.purchaseAsset = (user_id, amount) => {
    let resp = {};
    let updated_balance;
    return sequelize.transaction().then(t => {
      return Wallet.findOne({
        where: { user_id: user_id}, transaction: t, lock: true
      }).then(wallet => {
        if(!wallet) { throw "no wallet for this user"; }
        if(wallet.balance < amount) {
           throw "insufficient funds";
        }
        wallet.balance = wallet.balance - amount;
        return wallet.save({transaction: t});
      }).then((updatedWallet) => {
        updated_balance = updatedWallet.balance
        return sequelize.models.Transaction.create({
          user_id: user_id,
          amount: amount
        }, {transaction: t});
      }).then(newTransaction => {
        t.commit();
        resp = {
          Response: 200,
          data: {
            wallet_balance: updated_balance,
            transaction_id: newTransaction.transaction_id
          }
        };
        return resp;
      }).catch((err) => {
        t.rollback();
        resp = {
          Response: 400,
          data:{},
          error: err,
        };
        return resp
      });
    });
  }

  return Wallet;
};