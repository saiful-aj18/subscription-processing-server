const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    apiKey: { type: String, default: uuidv4, unique: true },
    tier: { type: String, default: 'free', enum: ['free', 'basic', 'premium'] },
    requestsCount: { type: Number, default: 0 },
    lastRequestMonth: { type: Number, default: new Date().getMonth() }, 
    subscriptionExpiry: { type: Date, default: null },
    cancelAtEnd: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
