"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var  Anuncio = mongoose.model('Anuncio');

router.get('/',function (req,res, next) {

    /*//CARGA DE PRUEBA DE ANUNCIO
    var anuncio = new Anuncio({
        nombre: 'iphone',
        venta: true,
        precio: 300.00,
        foto: 'iphone.png',
        tags: ['lifestyle','mobile']
    });
    anuncio.save(function (err,anuncioCreado) {
        if(err) throw err;
        console.log('Anuncio ' + anuncioCreado.nombre + ' creado');
    });*/

    // Create variables for each filter we get from call
    console.log(req.query);
    var nombre = req.query.nombre;
    var tag = req.query.tag;
    // Boolean variable from a String
    if (typeof req.query.venta !== 'undefined') { // To avoid to pass toLowerCase method to an 'undefined'
        if (req.query.venta.toLowerCase() === 'true' || req.query.venta.toLowerCase() === 'false') {
            var venta = ( req.query.venta.toLowerCase() === 'true');
        }
    }

    // We process the 'precio' string to make the conditions of search
    if(typeof req.query.precio != 'undefined') {
        var range = req.query.precio.split('-');
        console.log(range);
        if (range.length === 1) {//si han ingresado un valor en el filtro precio
            if(range[0] !== '' && !isNaN(range[0]) ) { //Check if the value is not empty or not number
                var precio = range[0];
                console.log(precio);
            } else {
                console.log('You should enter a number'); // ignore the filter
            }
        } else if (range.length === 2) {
            if ( !isNaN(range[0]) && !isNaN(range[1]) ) { // Only evaluate if both values are numbers
                if (parseInt(range[0]) >= parseInt(range[1])) {
                    console.log('The first number should not be equal or greater than the second number')
                } else {
                    let max = null;
                    let min = null;
                    if(isNaN(parseInt(range[0]))){
                        max = parseInt(range[1]);
                        var precio = {$lt: max};
                    } else if(isNaN(parseInt(range[1]))){
                        min = parseInt(range[0]);
                        var precio = {$gt: min};
                    } else {
                        min = parseInt(range[0]);
                        max = parseInt(range[1]);
                        var precio = {$gt: min, $lt: max};
                    }
                    console.log(min, max);
                    console.log('OK');
                }
            } else {
                console.log('You cannot enter a text'); // if some value is text, we will ignore the filter
            }
        }
    };

    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;

    // Define a variable to put all searching filters
    var criteria = {};

    // Check if the filter 'name' was written and if it exists putting inside 'criteria' object
    if (typeof nombre !== 'undefined'){
        // Put a regular expression for matching text with a pattern in the beginning of the field 'nombre'
        criteria.nombre = new RegExp('^'+ nombre,'i');
    }

    // Check if the filter 'tag' was written and if it exists putting inside 'criteria' object
    if (typeof tag !== 'undefined'){
        criteria.tags = tag; // el texto menciona que solo puedo tener 4 valores, falta implementar eso
    }

    // Check if the filter 'venta' was written and if it exists putting inside 'criteria' object
    if (typeof venta !== 'undefined'){
        criteria.venta = venta;
    }

    // Check if the filter 'price' was written and if it exists putting inside 'criteria' object
    if (typeof precio !== 'undefined'){
        criteria.precio = precio;
    }

    // Call the static method of model 'Anuncio'
    Anuncio.list(criteria, start, limit, sort, function (err, rows) {
        if(err){
            return res.json({success: false, error: err});
        }
        res.json({success: true, rows: rows});
    });
    

});



module.exports = router;