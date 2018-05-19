var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');

var flash = require('express-flash');

app.use(flash());
var session = require('express-session');

app.use(session({
    secret: 'penguinsrock',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'ejs');

require("./server/config/mongoose")()
require('./server/config/routes.js')(app)
app.listen(8000, function() {
    console.log("listening on port 8000");
})