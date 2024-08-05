const { Router } = require('express')
const { addTodo, getAllTodo, deleteTodo, replaceTodo } = require('../controller/todoListController')
const verifyToken = require('../middelWare/verfiyToken')
const router = Router()

router.get('/', verifyToken, getAllTodo)
    .post('/', verifyToken, addTodo)
    .put('/:todoId',verifyToken, replaceTodo)
    .delete('/:todoId',verifyToken, deleteTodo)

// 1. API Endpoints:
//   * POST /register: Register a new user.
//   * POST /login: Log in an existing user and create a session.
//   * POST /todos: Create a new to-do item.
//   * GET /todos: Retrieve all to-do items for the logged-in user.
//   * PUT /todos/:id: Update a to-do item by ID.
//   * DELETE /todos/:id: Delete a to-do item by ID.
//   * GET /sessions: Retrieve all user sessions.

module.exports = router