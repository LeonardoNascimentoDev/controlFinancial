const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		login: String,
		password: String,
		email: String,
		name: String,
		birthDate: String,
	},
	{ timestamps: true, collection: 'user' },
);

module.exports = mongoose.model('User', UserSchema);
