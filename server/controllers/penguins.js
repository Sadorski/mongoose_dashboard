const mongoose = require('mongoose')
const Penguin = require('../models/penguin')
module.exports.index = function(req, res){
    Penguin.find({}, function(err, penguins) {
        if (err) { console.log(err); }
        console.log(penguins)
        res.render('index', {penguins: penguins});
    })
    console.log('finding penguins');
}
module.exports.new = function(req, res){
    res.render('new');
}
module.exports.show = function(req, res){
    Penguin.findOne({_id: req.params.id}, function(err, penguin) {
        if (err) { 
            console.log('hello');
            res.redirect('/') 
        }
        res.render('show', {penguin: penguin});
    })
    console.log('finding penguin');
}
module.exports.edit = function(req, res){
    Penguin.findOne({_id: req.params.id}, function(err, penguin) {
        if (err) { console.log("this is an error", err); }
            if (penguin == null) {
                return res.redirect('/');
            }
            res.render('edit', {penguin: penguin});
        })
}
module.exports.destroy = function(req, res){
    Penguin.remove({_id: req.params.id}, function(err) {
        if (err) { 
            console.log(err);
            res.redirect('/')
        }
        
        res.redirect('/');
    })
    console.log('finding penguins');
}
module.exports.postid = function(req, res){
    Penguin.findOne({_id: req.params.id}, function(err, penguin) {
        if (err) {
            console.log('something went wrong');
            for(var key in err.errors){
                req.flash('form_validation', err.errors[key].message);
            }
        res.redirect(`/penguins/${req.params.id}/edit`);
        } else {
            penguin.name = req.body.name
            penguin.species = req.body.species
            penguin.age = req.body.age 
            penguin.location = req.body.location
            penguin.save(function(err){
                if (err) {
                console.log('unable to save')
                for(var key in err.errors){
                    req.flash('form_validation', err.errors[key].message);
                }
                res.redirect(`/penguins/${req.params.id}/edit`)
            }
            console.log('updating penguins');
            res.redirect(`/penguins/${req.params.id}`)
            })
            
        }
    })
}
module.exports.postmain = function(req, res){
    console.log("POST DATA", req.body);
    var penguin = new Penguin({name: req.body.name, species: req.body.species, age: req.body.age, location: req.body.location});
    penguin.save(function(err) {
        if(err) {
            console.log('something went wrong');
            for(var key in err.errors){
                req.flash('form_validation', err.errors[key].message);
            }
            res.redirect('/penguins/new')
        } else { 
        console.log('successfully added a user!');
        res.redirect('/');
        }
    
    })
}