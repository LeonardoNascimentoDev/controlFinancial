const validation = require('../validation/transaction');
const Validator = require('validatorjs');

const Transaction = require('../models/Transaction');

exports.store = async (request, response, next) => {
	try {
		const rules = validation.rules;
		const validationFields = new Validator(request.body, rules);
		if (validationFields.fails()) {
			return response.status(400).json({ erros: validationFields.errors.all() });
		}

		const { name, documentNumber, income, outflow, description } = request.body;

		transaction = await Transaction.create({
			name,
			documentNumber,
			income,
			outflow,
			description,
		});

		return response.status(200).json(transaction);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao cadastrar transação!: ${erro}.` });
	}
};

exports.index = async (request, response, next) => {
	try {
		const transaction = await Transaction.find();
		return response.status(200).json(transaction);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao buscar transações!: ${erro}.` });
	}
};

exports.update = async (request, response, next) => {
	try {
		// Validacao da request
		const rules = validation.rules;
		const validationFields = new Validator(request.body, rules);
		if (validationFields.fails()) {
			return response.status(400).json({ erros: validationFields.errors.all() });
		}
		const newTransaction = await Transaction.findOne({ _id: request.params.id });
		newTransaction.name = request.body.name;
		newTransaction.documentNumber = request.body.documentNumber;
		newTransaction.income = request.body.income;
		newTransaction.outflow = request.body.outflow;
		newTransaction.description = request.body.description;

		//Atualizando a transaction
		await Transaction.updateOne({ _id: request.params.id }, newTransaction);
		return response.json(newTransaction);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro editar a transação!: ${erro}.` });
	}
};

exports.delete = async (request, response, next) => {
	try {
		const transaction = await Transaction.findOneAndDelete({ _id: request.params.id });
		return response.json(transaction);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro deletar transação!: ${erro}.` });
	}
};

exports.search = async (request, response, next) => {
	try {
		const transaction = await Transaction.findOne({ name: request.params.id });
		return response.status(200).json(transaction);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao buscar transação!: ${erro}.` });
	}
};

exports.show = async (request, response, next) => {
	try {
		const empresa = await Empresa.findOne({ nome: request.params.id });
		return response.status(200).json(empresa);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao buscar empresa!: ${erro}.` });
	}
};

exports.paginacao = async (request, response, next) => {
	try {
		let page = request.body.page;
		let limit = 25;
		let skip = limit * (page - 1);
		const empresas = await Empresa.find().skip(skip).limit(limit).sort('-updatedAt');

		return response.status(200).json(empresas);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao buscar empresa!: ${erro}.` });
	}
};
