"use strict";

var mongoose = require('mongoose');

// Schema for the anuncios

var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: {
        type: String,
        required: true,
        index: true
    },
    clave: String
});


// Assign the schema to model
mongoose.model('Usuario', usuarioSchema);