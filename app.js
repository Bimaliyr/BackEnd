const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const session = require('express-session');

const app = express();

const customerRoutes = require('./router/customers');
const loginRoutes = require('./router/login');
const restaurentownerRoutes = require('./router/RestaurentownerController');
const tableRoutes = require('./router/TableController');
const menuRoutes = require('./router/MenuController');
const adminRoutes = require('./router/Admincontroller');

app.use(morgan("dev"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.set('useFindAndModify', false);

const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useNewUrlParser: true })
    .then(() => console.log('MogoDB Connected...'))
    .catch(err => console.log(err))

// app.use(session({
//     secret: 'secretcookies',
//     saveUninitialized: true,
//     resave: false
// }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/api/customers',customerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/restaurentowners',restaurentownerRoutes);
app.use('/api/tables',tableRoutes);
app.use('/api/menu',menuRoutes);
app.use('/api/admins',adminRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;