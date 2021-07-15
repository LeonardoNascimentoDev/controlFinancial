const { Router } = require('express');
const FinancialController = require('./controllers/FinancialController');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const AuthMiddleware = require('./middleware/Auth');

const routes = Router();

routes.all('*', AuthMiddleware.verifyJwt);

routes.post('/api/v1/transaction', FinancialController.store);
routes.get('/api/v1/transactions', FinancialController.index);
routes.put('/api/v1/transaction-update/:id', FinancialController.update);
routes.delete('/api/v1/transaction/:id', FinancialController.delete);
routes.get('/api/v1/transaction-search/:id', FinancialController.search);
routes.post('/api/v1/create-user', UserController.create);
routes.post('/api/v1/login', AuthController.logar);

module.exports = routes;
