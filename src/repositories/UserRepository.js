const User = require('../models/User');

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findByApiKey(apiKey) {
        return await User.findOne({ apiKey });
    }

    async create(userData) {
        return await User.create(userData);
    }

    async updateStatus(email, tier, subscriptionExpiry, cancelAtEnd = false) {
        return await User.updateOne(
            { email }, 
            { tier, subscriptionExpiry, cancelAtEnd }
        );
    }
    
    async saveUser(user) {
        return await user.save();
    }
}

module.exports = new UserRepository();
