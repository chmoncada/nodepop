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

anuncioSchema.statics.list = function (filter, start, limit, sort, cb) {
    console.log('filter',filter);
    var query = Anuncio.find(filter);
    query.skip(start);
    query.limit(limit);
    query.sort(sort);
    return query.exec(cb);
};

// lo asignamos al modelo
var Anuncio = mongoose.model('Anuncio', anuncioSchema);
