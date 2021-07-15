const jwt = require('jsonwebtoken');

module.exports = {
	verifyJwt: function (req, res, next) {
		try {
			const relex = ['/api/v1/login', '/api/v1/create-user'];
			if (relex.includes(req.path)) return next();
			const token = req.header('Authorization');
			if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

			jwt.verify(token, process.env.SECRET, function (err, decoded) {
				if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

				req.userId = decoded.id;
				next();
			});
		} catch (erro) {
			return res.status(500).json({ Erro: `Erro ao autenticar usuário!: ${erro}.` });
		}
	},
};
