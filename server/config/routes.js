const mongoose = require('mongoose')
var Penguin = require('../models/penguin')
const penguins = require('../controllers/penguins')

module.exports = function(app){
    app.get('/', function(req, res) {
        penguins.index(req, res);
    });

    app.get('/penguins/new', function(req, res) {
        penguins.new(req, res);
    });

    app.get('/penguins/:id', function(req, res) {
        penguins.show(req, res);
    });


    app.get('/penguins/:id/edit', function(req, res) {
        penguins.edit(req, res);    
    });

    app.post('/penguins/:id/destroy', function(req, res) {
        penguins.destroy(req, res);
    });

    app.post('/penguins/:id', function(req, res) {
        penguins.postid(req, res);
    });


    app.post('/penguins', function(req, res) {
        penguins.postmain(req, res);
    });
}