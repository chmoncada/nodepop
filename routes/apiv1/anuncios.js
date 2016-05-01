'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Import model Anuncio
let Anuncio = mongoose.model('Anuncio');

// Import jsonwebtoken auth
let jwtAuth = require('../../lib/jwtAuth');

router.use(jwtAuth()); // We need to check if the call has the right token

router.get('/',function (req,res, next) {

    // PENDING: MOVE ALL LOGIC TO A MODEL STATIC FUNCTION!!!!
     // Create variables for each filter we get from call

    let nombre = req.query.nombre;
    let tag = req.query.tag;
    let venta;
    // Boolean variable from a String
    if (typeof req.query.venta !== 'undefined') { // To avoid to pass toLowerCase method to an 'undefined'
        if (req.query.venta.toLowerCase() === 'true' || req.query.venta.toLowerCase() === 'false') {
            venta = ( req.query.venta.toLowerCase() === 'true');
        }
    }

    // We process the 'precio' string to make the conditions of search
    var precio; // Use var instead of let to use it inside the nested ifs and avoid errors
    if(typeof req.query.precio != 'undefined') {
        var range = req.query.precio.split('-');
        console.log(range);
        //var precio;
        if (range.length === 1) { // Check if it is enter a single value in the filter
            if(range[0] !== '' && !isNaN(range[0]) ) { // Check if the value is not empty or not number
                precio = range[0];
            } else {
               return res.status(401).json({ success: false, error: 'You should enter a number'});
            }
        } else if (range.length === 2) {
            if ( !isNaN(range[0]) && !isNaN(range[1]) ) { // Only evaluate if both values are numbers
                if (parseInt(range[0]) >= parseInt(range[1])) {
                    console.log('The first number should not be equal or greater than the second number');
                    return res.status(401).json({ success: false, error: 'The first number should not be equal or greater than the second number'});
                } else { // Built the precio filter
                    let max = null;
                    let min = null;
                    if(isNaN(parseInt(range[0]))){
                        max = parseInt(range[1]);
                        precio = {$lt: max};
                    } else if(isNaN(parseInt(range[1]))){
                        min = parseInt(range[0]);
                        precio = {$gt: min};
                    } else {
                        min = parseInt(range[0]);
                        max = parseInt(range[1]);
                        precio = {$gt: min, $lt: max};
                    }
                    //console.log(min, max);
                    //console.log('OK');
                }
            } else {
                console.log('You cannot enter a text'); // if some value is text, we will ignore the filter
                return res.status(401).json({ success: false, error: 'You should enter numbers'});
            }
        } else {
            return res.status(401).json({ success: false, error: 'Too many arguments for the filter'});
        }
    }

    // Pagination options
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