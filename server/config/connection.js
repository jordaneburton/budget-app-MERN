const mongoose = require('mongoose');

// MIGHT NEED EDITTING
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/budgetapp');

module.exports = mongoose.connection;