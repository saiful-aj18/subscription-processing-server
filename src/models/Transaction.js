const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    tranId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    tier: { type: String },
    amount: { type: Number },
    status: { type: String, default: 'pending' }, 
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
