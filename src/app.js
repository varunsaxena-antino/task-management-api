const taskRoutes = require('./routes/task.routes');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes.js');
const authMiddleware = require('./middlewares/auth.middleware.js');

const app = express();

app.use(cors());
app.use(express.json());

// 🔴 THIS LINE MAKES REGISTER API WORK
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.send('Task Management API is running');
});

console.log('authMiddleware value:', authMiddleware);
console.log('authMiddleware type:', typeof authMiddleware);



app.get('/api/v1/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Access granted',
    user: req.user
  });
});


module.exports = app;
