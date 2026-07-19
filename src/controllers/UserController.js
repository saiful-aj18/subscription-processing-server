const userService = require('../services/UserService');

class UserController {
    async register(req, res) {
        try {
            const { email } = req.body;
            if (!email) return res.status(400).json({ error: 'Email is required' });
            
            const result = await userService.registerUser(email);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async cancelSubscription(req, res) {
        try {
            const { apiKey } = req.body;
            if (!apiKey) return res.status(401).json({ error: 'Valid apiKey required' });

            const result = await userService.cancelSubscription(apiKey);
            res.json(result);
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new UserController();
