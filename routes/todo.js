const express = require('express');

const router = express.Router();

const todoController = require('../controller/todo');

router.post('/add-todo', todoController.addTodo)

router.get('/get-todo', todoController.getAllTodos)

router.put('/update-todo/:id', todoController.updateTodo)

router.delete('/delete-todo/:id', todoController.deleteTodo)

module.exports = router