const router = require('express').Router();

const usersRouter = require('./users');

//Rota de Usuários
router.use('/users', usersRouter);

module.exports = router;