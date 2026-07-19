const libraryService = require('../services/LibraryService');

class LibraryController {
    async search(req, res) {
        try {
            const apiKey = req.query.apiKey || req.headers['x-api-key'];
            if (!apiKey) return res.status(401).json({ error: 'Missing API Key' });

            const query = req.query.q;
            if (!query) return res.status(400).json({ error: 'Missing search query (q)' });

            const result = await libraryService.searchBooks(query, apiKey);
            res.json(result);
        } catch (err) {
            
            if (err.message.includes('Monthly limit exceeded')) {
                return res.status(429).json({ error: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new LibraryController();
