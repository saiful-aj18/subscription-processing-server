const { v4: uuidv4 } = require('uuid');
const SSLCommerzPayment = require('sslcommerz-lts');
const { TIERS } = require('../utils/constants');
const userRepository = require('../repositories/UserRepository');
const transactionRepository = require('../repositories/TransactionRepository');

class PaymentService {
    async initiatePayment(apiKey, targetTier) {
        const user = await userRepository.findByApiKey(apiKey);
        if (!user) throw new Error('User not found');
        if (targetTier === 'free') throw new Error('Cannot subscribe to free');

        const tran_id = uuidv4();
        const amount = TIERS[targetTier].price;

        const data = {
            total_amount: amount,
            currency: 'BDT',
            tran_id: tran_id,
            success_url: `${process.env.BASE_URL}/api/payment/success?tran_id=${tran_id}`,
            fail_url: `${process.env.BASE_URL}/api/payment/fail?tran_id=${tran_id}`,
            cancel_url: `${process.env.BASE_URL}/api/payment/cancel?tran_id=${tran_id}`,
            ipn_url: `${process.env.BASE_URL}/api/payment/ipn`,
            shipping_method: 'No',
            product_name: `Subscription to ${targetTier} plan`,
            product_category: 'Subscription',
            product_profile: 'general',
            cus_name: user.email.split('@')[0],
            cus_email: user.email,
            cus_add1: 'Dhaka',
            cus_city: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_city: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        await transactionRepository.create({ tranId: tran_id, email: user.email, tier: targetTier, amount });

        const sslcz = new SSLCommerzPayment(process.env.SSL_STORE_ID, process.env.SSL_STORE_PASS, false); // false for sandbox
        const response = await sslcz.init(data);
        console.log("SSL Init Response:", response);
        
        if (response?.GatewayPageURL) {
            return response.GatewayPageURL;
        } else {
            throw new Error('Payment gateway error');
        }
    }

    async handleSuccess(tran_id) {
        const trans = await transactionRepository.findByTranId(tran_id);
        if (!trans || trans.status !== 'pending') throw new Error('Invalid or already processed transaction');

        await transactionRepository.updateStatus(tran_id, 'success');

        const newExpiry = new Date();
        newExpiry.setMonth(newExpiry.getMonth() + 1);

        await userRepository.updateStatus(trans.email, trans.tier, newExpiry, false);
        return trans.tier;
    }

    async handleFail(tran_id) {
        await transactionRepository.updateStatus(tran_id, 'failed');
    }

    async handleCancel(tran_id) {
        await transactionRepository.updateStatus(tran_id, 'cancelled');
    }
}

module.exports = new PaymentService();
