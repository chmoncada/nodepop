"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var  Anuncio = mongoose.model('Anuncio');

router.get('/',function (req,res) {

    console.log('Prueba de router');

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

    res.json({
        sucess: true
    });

});



module.exports = router;