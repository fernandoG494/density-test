const express = require('express');
const cors = require('cors');
const app = express();

const userRouter = require('./routes/user.routes.cjs');

app.use(express.json());
app.use(cors());

app.use('/users', userRouter);

app.get('/', (request, response) => {
    response.json({
        message: 'Server is running...'
    });
});

module.exports = app;
