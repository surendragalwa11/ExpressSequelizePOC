'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    transaction_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'Platform'
    },
    amount: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    },
  }, {
    timestamps: true
  });
  Transaction.associate = function(models) {
    // associations can be defined here
  };

  Transaction.createTransaction = (user_id, amount) => {
    return Transaction.create({
      user_id: user_id,
      amount: amount
    }).then(transaction => {
      return new Promise((resolve)=> {
        resolve(transaction.transaction_id);
      })
    }).catch((err)=> {
      return new Promise((resolve, reject)=> {
        reject(err);
      })
    })
  }

  return Transaction;
};