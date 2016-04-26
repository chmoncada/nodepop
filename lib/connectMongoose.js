"use strict";

var mongoose = require('mongoose');
var connection = mongoose.connection;

//handlers de eventos de conexion

connection.on('error', console.log.bind(console, 'connection error'));

connection.once('open', function () {
    console.log('Connected to mongodb!');
});


// conectar a la base de datos

mongoose.connect('mongodb://localhost:27017/nodepop');