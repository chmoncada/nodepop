'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let PushToken = mongoose.model('PushToken');

//Modulo de error
//var errorHandler = require ('../../utils/Error.js').error;

// Save push token for Android or iOS
router.post ('/', function (req,res){

    // Get info from body
    let plataforma = req.body.plataforma;
    let token = req.body.token;
    let usuario = req.body.usuario;

    let newToken = new PushToken({
        plataforma: plataforma,
        token: token,
        usuario: usuario
    });

    console.log('Saving token: ' + newToken.token, ' ...');
    newToken.save(function (error,tokenCreado) {
        if (error) {
            console.log(error);
            console.log('Token not saved: ', newToken.token);
            return res.status(500).json({ success: false, error: error});//mejorarlo con pasar el error al callback de async.series return errorHandler(err,res);
        }
        console.log('OK');
        res.status(200).json({success: true, newToken: tokenCreado });
    }); 
});

module.exports = router;