const validation = require('../validation/users');
const Validator = require('validatorjs');
const md5 = require('md5');

const User = require('../models/User');
exports.create = async (request, response, next) => {
	try {
		const rules = validation.rules;
		const validationFields = new Validator(request.body, rules);
		if (validationFields.fails()) {
			return response.status(400).json({ erros: validationFields.errors.all() });
		}

		const { login, password, email, name, birthDate } = request.body;
		const cryptoPass = md5(password);

		user = await User.create({
			login,
			password: cryptoPass,
			email,
			name,
			birthDate,
		});

		return response.status(200).json(user);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao cadastrar usuário!: ${erro}.` });
	}
};
