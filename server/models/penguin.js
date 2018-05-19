var mongoose = require('mongoose')

var PenguinSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 2},
    species: { type: String, required: true, minlength: 4 },
    age: { type: Number, min: 1, max: 75 },
    location: { type: String, required: true },
    penguin_id: {type: Number}
}, {timestamps: true });

module.exports = mongoose.model('Penguin', PenguinSchema); 
var Penguin = mongoose.model('Penguin')