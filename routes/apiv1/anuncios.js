'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Import model Anuncio
let Anuncio = mongoose.model('Anuncio');

// Import jsonwebtoken auth
let jwtAuth = require('../../lib/jwtAuth');

// Import error translator module
let errorTranslator = require('../../lib/errorTranslator');

router.use(jwtAuth()); // We need to check if the call has the right token

router.get('/',function (req,res) {

    // PENDING: MOVE ALL LOGIC TO A MODEL STATIC FUNCTION!!!!
     // Create variables for each filter we get from call

    // filter of language
    let lang = req.query.lang;
    let langError;
    if (lang === 'es') {
        langError = lang;
    } else {
        langError = 'en';
    }
    let errorText;

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
        if (range.length === 1) { // Check if it is enter a single value in the filter
            if(range[0] !== '' && !isNaN(range[0]) ) { // Check if the value is not empty or not number
                precio = range[0];
            } else {
                errorText = errorTranslator('ENTER_NUMBER', langError);
                return res.status(401).json({ success: false, error: errorText});
            }
        } else if (range.length === 2) {
            if ( !isNaN(range[0]) && !isNaN(range[1]) ) { // Only evaluate if both values are numbers
                if (parseInt(range[0]) >= parseInt(range[1])) {
                    errorText = errorTranslator('FIRST_NUMBER_SHOULD_BE_SMALLER_THAN_SECOND', langError);
                    return res.status(401).json({ success: false, error: errorText});
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
                }
            } else {
                errorText = errorTranslator('ENTER_NUMBER', langError);
                return res.status(401).json({ success: false, error: errorText});
            }
        } else {
            errorText = errorTranslator('TOO_MANY_ARGUMENTS', langError);
            return res.status(401).json({ success: false, error: errorText});
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

router.get('*', function(req, res, next) {
    //return res.json({success: false, error: 'HOLA'});
    var err = new Error();
    err.status = 404;
    next(err);
});

module.exports = router;