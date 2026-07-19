const Transaction = require('../models/Transaction');

class TransactionRepository {
    async create(data) {
        return await Transaction.create(data);
    }

    async findByTranId(tranId) {
        return await Transaction.findOne({ tranId });
    }

    async updateStatus(tranId, status) {
        return await Transaction.updateOne({ tranId }, { status });
    }
}

module.exports = new TransactionRepository();
