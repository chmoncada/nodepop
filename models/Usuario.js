"use strict";

var mongoose = require('mongoose');

// Schema for the anuncios

var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});


// Assign the schema to model
mongoose.model('Usuario', usuarioSchema);