const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const config = require('./config');

let app = express();

app.use(session(config.session));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./api/tag')(app);
require('./api/user')(app);
require('./api/company')(app);
require('./api/lang/translate')(app);

app.use((err, req, res, next) => res.status(err.status || 500));

let server = require('http').createServer(app);
server.listen(5000);
require('./socket')(server);