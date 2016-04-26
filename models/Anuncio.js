"use strict";

var mongoose = require('mongoose');

// Schema for the anuncios

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});


// Assign the schema to model
mongoose.model('Anuncio', anuncioSchema);
