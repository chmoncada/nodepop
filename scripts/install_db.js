'use strict';

var mongoose = require('mongoose');
var db = mongoose.connection;
var fs = require('fs');
var async = require('async');
var crypto = require('crypto');

db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB!');
});

mongoose.connect('mongodb://localhost:27017/nodepop');


require('../models/Anuncio');
require('../models/Usuario');

var Anuncio = mongoose.model('Anuncio');
var Usuario = mongoose.model('Usuario');
var content = fs.readFileSync('./scripts/anuncios.json'); // Reading initial DB anuncios file
var anunciosJson = JSON.parse(content); // Convert file to JSON

async.series([

    // Cleaning Anuncios collection and populate with JSON file
    function(callback) {
        Anuncio.remove({}, function (error) {
            if (error) {
                callback(error, null);
            }
            console.log('Anuncios collection cleaned');

            var anuncioGrabar = {};
            console.log('Initial anuncios saving...');

            // Definition of saving anuncio function
            function saving(n, cb) {
                anuncioGrabar = new Anuncio(anunciosJson.anuncios[n]);
                console.log('Saving anuncio: ', anunciosJson.anuncios[n].nombre, ' ...');
                anuncioGrabar.save(function (error) {
                    if (error) {
                        console.log('Anuncio not saved: ', anunciosJson.anuncios[n].nombre);
                        process.exit();//mejorarlo con pasar el error al callback de async.series
                    } else {
                        console.log('OK');
                        cb();

                    }
                });
            }

            // Definition of loop recursive function to avoid that the callback returns
            // before all anuncios finished to save in the DB
            function loop(n, fn, callbackFinal) {
                if (n ===0){
                    callbackFinal();
                    return;
                }
                n--;
                fn(n, function () {
                    loop(n, fn, callbackFinal);
                });
            }

            // make the call of the recursive function to pass the callback to the next function
            // in the async.series function
            loop(anunciosJson.anuncios.length, saving, function () {
                callback(null, true);
            });

        });

    },
    // Delete usuarios collection
    function(callback) {

        Usuario.remove({}, function(error) {
            if(error){
                callback(error, null);
            }
            console.log('Usuarios collection cleaned');

            // Saving usuario inicial
            var usuarioInicial = new Usuario(anunciosJson.usuarios);
            var sha1 = crypto.createHash('sha256').update(usuarioInicial.clave).digest('hex'); // We create clave hash
            usuarioInicial.clave = sha1;
            console.log('Saving usuario: ' + anunciosJson.usuarios.nombre, ' ...');
            usuarioInicial.save(function (err,usuarioCreado) {
                if (error) {
                    console.log('Usuario not saved: ', anunciosJson.usuarios.nombre);
                    process.exit();//mejorarlo con pasar el error al callback de async.series
                }
                console.log('OK', usuarioCreado);
                callback( null, true);
             });

        });
    },



], function (error, result) {
    if (error) {
        console.error('Hubo un error: ', error);
        return process.exit(1);
    }
    console.log('Init script ready!! Bye!!');
    return process.exit(0);
});







