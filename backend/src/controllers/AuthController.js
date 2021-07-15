const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const md5 = require('md5');

module.exports = {
	async logar(request, response) {
		try {
			const user = await User.findOne({ login: request.body.login });
			if (md5(request.body.password) == user.password) {
				const token = jwt.sign({ id: user._id }, process.env.SECRET, {
					// expiresIn: 300,
				});
				return response.json({ auth: true, token: token, user: user.name });
			} else {
				return response.status(500).json('Usuário não cadastrado na plataforma!');
			}
		} catch (erro) {
			return response.status(500).json({ Erro: `Erro ao autenticar usuário!: ${erro}.` });
		}
	},
};
