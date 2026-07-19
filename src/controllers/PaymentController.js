const paymentService = require('../services/PaymentService');
const { TIERS } = require('../utils/constants');

class PaymentController {
    async subscribe(req, res) {
        try {
            const { apiKey, targetTier } = req.body;
            if (!apiKey || !targetTier || !TIERS[targetTier]) {
                return res.status(400).json({ error: 'Valid apiKey and targetTier (basic or premium) required' });
            }
            
            const url = await paymentService.initiatePayment(apiKey, targetTier);
            res.json({ GatewayPageURL: url });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async paymentSuccess(req, res) {
        try {
            const tran_id = req.query.tran_id || req.body.tran_id;
            const tier = await paymentService.handleSuccess(tran_id);
            res.json({ message: 'Payment Successful', tier, tran_id });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async paymentFail(req, res) {
        try {
            const tran_id = req.query.tran_id || req.body.tran_id;
            await paymentService.handleFail(tran_id);
            res.json({ message: 'Payment Failed', tran_id });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async paymentCancel(req, res) {
        try {
            const tran_id = req.query.tran_id || req.body.tran_id;
            await paymentService.handleCancel(tran_id);
            res.json({ message: 'Payment Cancelled', tran_id });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async paymentIpn(req, res) {
        res.json({ message: 'IPN Received' });
    }
}

module.exports = new PaymentController();
