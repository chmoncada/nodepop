'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let PushToken = mongoose.model('PushToken');

// Import error translator module
let errorTranslator = require('../../lib/errorTranslator');

// Save push token for Android or iOS
router.post('/', function(req, res) {

    let lang = req.query.lang;
    let langError;
    if (lang === 'es') {
        langError = lang;
    } else {
        langError = 'en';
    }

    let errorText;

    // Get info from body
    let plataforma = req.body.plataforma;
    let token = req.body.token;
    let usuario = req.body.usuario;

    let newToken = new PushToken({
        plataforma: plataforma,
        token: token,
        usuario: usuario
    });

    console.log('Saving token: ...');
    newToken.save(function(error, tokenCreado) {
        if (error) {
            errorText = errorTranslator('TOKEN_NOT SAVED', langError);
            return res.status(500).json({ success: false, msg: errorText, error: error});
        }

        console.log('OK');
        res.status(200).json({success: true, newToken: tokenCreado });
    });
});

module.exports = router;
