const axios = require('axios');
const userRepository = require('../repositories/UserRepository');
const { TIERS } = require('../utils/constants');

class LibraryService {
    async searchBooks(query, apiKey) {
        const user = await userRepository.findByApiKey(apiKey);
        if (!user) throw new Error('Invalid API Key');

        // Downgrade if expired
        if (user.tier !== 'free' && user.subscriptionExpiry && new Date() > user.subscriptionExpiry) {
            user.tier = 'free';
            user.cancelAtEnd = false;
        }

        // Monthly Reset
        const currentMonth = new Date().getMonth();
        if (user.lastRequestMonth !== currentMonth) {
            user.requestsCount = 0;
            user.lastRequestMonth = currentMonth;
        }

        const limit = TIERS[user.tier].limit;
        if (user.requestsCount >= limit) {
            await userRepository.saveUser(user);
            throw new Error(`Monthly limit exceeded for tier: ${user.tier}. Limit is ${limit}.`);
        }

        // Open Library API Call
        const openLibraryRes = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        
        user.requestsCount += 1;
        await userRepository.saveUser(user);

        return {
            usage: {
                tier: user.tier,
                requestsMade: user.requestsCount,
                limit: limit,
                remaining: limit - user.requestsCount
            },
            data: openLibraryRes.data
        };
    }
}

module.exports = new LibraryService();
