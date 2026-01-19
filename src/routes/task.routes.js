const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware.js');
const { createTask, getTasks, updateTask,deleteTask } = require('../controllers/task.controller.js');

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:id',authMiddleware, updateTask );
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
