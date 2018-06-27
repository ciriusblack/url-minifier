
//We Get Our Requirements
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const urlRouter = require('./routes/url');
const debug = require('debug')('url-minifier:server');
const app = express();
require('./startup/db')()

debug(`NODE_ENV : ${process.env.NODE_ENV}`);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/url', urlRouter);
app.use( (err, req, res, next) => {
    res.status(500).send('Something Failed...');
});

const port = process.env.PORT || '3000';
const server = app.listen(port, () => debug(`Server Listening on Port ${port}...`))

module.exports = server;


