const Task = require('../models/task.model');

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user.id
    });

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create task'
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = { user: req.user.id };

    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      page: Number(page),
      limit: Number(limit),
      count: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch tasks'
    });
  }
};
// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      _id: id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found or unauthorized'
      });
    }

    const { title, description, status } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update task'
    });
  }
};
// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found or unauthorized'
      });
    }

    res.json({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete task'
    });
  }
};

