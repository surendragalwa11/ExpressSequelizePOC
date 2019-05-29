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

  Wallet.deductBalance = (user_id, amount) => {
    return sequelize.transaction(t => {
      return Wallet.findOne({
        where: { user_id: user_id}, transaction: t, lock: true
      }).then(wallet => {
        if(!wallet) { throw "no wallet for this user"; }
        if(wallet.balance < amount) {
          throw "insufficient funds";
        }
        wallet.balance = wallet.balance - amount;
        return wallet.save({transaction: t});
      });
    }).then(wallet => {
        return new Promise((resolve)=> {
          resolve(wallet.balance);
        });
    }).catch((err) => {
        return new Promise((resolve, reject) => {
          reject(err);
        });
    });
  }

  return Wallet;
};