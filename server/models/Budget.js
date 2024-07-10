const { Schema, model } = require('mongoose');
const { Category } = require('./Category');

const budgetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    limit: {
        type: Number,
        required: true,
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    // Other fields related to the total budget if needed

    
    },
    {
        toJSON: {
          virtuals: true,
        },
      }
);

const Budget = model('Budget', budgetSchema);

module.exports = Budget;