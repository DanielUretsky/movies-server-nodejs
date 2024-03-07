require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const userRequestLog = require('./middlewares/userRequestLog')

const connectToDB = require('./configs/connectToDB');
const cors = require('cors');

const authRouter = require('./routers/authRouter')
const usersRouter = require('./routers/usersRouter')
const productsRouter = require('./routers/moviesRouter')

//configs
connectToDB();

//middlewares
app.use(express.json());
app.use(cors());


//routes
app.use('/auth', userRequestLog, authRouter);
app.use('/users', usersRouter)
app.use('/movies', productsRouter)

//listen 
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});