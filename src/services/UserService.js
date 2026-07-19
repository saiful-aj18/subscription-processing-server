const userRepository = require('../repositories/UserRepository');

class UserService {
    async registerUser(email) {
        let user = await userRepository.findByEmail(email);
        if (user) return { message: 'User already exists', apiKey: user.apiKey };
        
        user = await userRepository.create({ email });
        return { message: 'Register successful', apiKey: user.apiKey, tier: user.tier };
    }

    async cancelSubscription(apiKey) {
        const user = await userRepository.findByApiKey(apiKey);
        if (!user) throw new Error('Invalid apiKey');
        if (user.tier === 'free') throw new Error('You are on the free plan');

        user.cancelAtEnd = true;
        await userRepository.saveUser(user);
        return { message: 'Subscription cancelled. You will be downgraded to free at the end of your billing cycle.' };
    }
}

module.exports = new UserService();
