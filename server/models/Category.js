const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  // Other fields related to the category if needed


  transactions: [{
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    }],
},
{
    toJSON: {
        virtuals: true,
    },
}
);

// Transactions schema code
const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},
{
  toJSON: {
    virtuals: true,
  },
}
);

const Category = model('Category', categorySchema);
const Transaction = model('Transaction', transactionSchema);


module.exports = {
  Category,
  Transaction,
};