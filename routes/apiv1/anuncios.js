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

    var nombre = req.query.nombre;
    var tag = req.query.tag;
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;

    //creamos una variable para meter todos los filtros de busqueda
    var criteria = {};

    //vemos si el filtro fue ingresado y se lo asignamos a la variable sino no hacemos nada
    if (typeof nombre !== 'undefined'){
        criteria.nombre = nombre;
    }
    if (typeof tag !== 'undefined'){
        criteria.tags = tag;
    }

    Anuncio.list(criteria, start, limit, sort, function (err, rows) {
        if(err){
            return res.json({success: false, error: err});
        }
        res.json({success: true, rows: rows});
    });
    

});



module.exports = router;