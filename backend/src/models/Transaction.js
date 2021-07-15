const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
	{
		name: String,
		documentNumber: String,
		income: String,
		outflow: String,
		description: String,
	},
	{ timestamps: true, collection: 'transaction' },
);

module.exports = mongoose.model('Transaction', TransactionSchema);
