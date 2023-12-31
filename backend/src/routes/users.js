const express = require('express');
const router = express('router');
const usersController = require('../controller/userController.js');

// Criar novo usuário
router.route('/create').post((req, res) => usersController.create(req, res));

// Buscar (um) usuário pelo id
router.route('/get/:id').get((req, res) => usersController.getOne(req, res));

// Buscar todos os usuários
router.route('/get').get((req, res) => usersController.getAll(req, res));

// Atualizar (um) usuário por id
router.route('/update/:id').patch((req, res) => usersController.update(req, res));

// Remover (um) usuário por id
router.route('/delete/:id').delete((req, res) => usersController.delete(req, res));

module.exports = router;