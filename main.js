require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const session = require('express-session');
//const cron = require('node-cron');

const app = express();

const connectToDB = require('./configs/connectToDB');
const connectToMongoDBSession = require('connect-mongodb-session')(session);
const cors = require('cors');

const tokenMiddleware = require('./middlewares/tokenMiddleware');
const dailyRequestsMiddleware = require('./middlewares/dailyRequestsMiddleware');
const checkAmountOfRequestsMiddleware = require('./middlewares/checkAmountOfRequestsMiddleware');
const userRequestsMiddleware = require('./middlewares/userRequestsMiddleware');
const userRequestLogMiddleware = require('./middlewares/userRequestLogMiddleware');
const requestCountLogMiddleware = require('./middlewares/requestCountLogMiddleware');

const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');

//configs 
connectToDB();
const store = new connectToMongoDBSession({
    uri: process.env.MONGODB_URI,
    collection: "sessions"
});

//middlewares 
app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    name: 'user',
    cookie: {

    }
}));

//routes
app.use('/auth', authRouter, dailyRequestsMiddleware, userRequestLogMiddleware, requestCountLogMiddleware);
app.use('/users', tokenMiddleware, dailyRequestsMiddleware, checkAmountOfRequestsMiddleware, usersRouter, userRequestsMiddleware, userRequestLogMiddleware, requestCountLogMiddleware);

//listen 
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
}); 