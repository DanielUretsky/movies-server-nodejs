require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const tokenMiddleware = require('./middlewares/tokenMiddleware');

const connectToDB = require('./configs/connectToDB');
const cors = require('cors');

const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');
const userRequestLogMiddleware = require('./middlewares/userRequestLogMiddleware');

//configs
connectToDB();

//middlewares 
app.use(express.json());
app.use(cors());

//routes
app.use('/auth', authRouter, userRequestLogMiddleware);
app.use('/users', tokenMiddleware, usersRouter, userRequestLogMiddleware);

//listen 
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
}); 