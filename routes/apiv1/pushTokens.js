'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let PushToken = mongoose.model('PushToken');
let Usuario = mongoose.model('Usuario');

// Import error translator module
let errorTranslator = require('../../lib/errorTranslator');

// Save push token for Android or iOS
router.post('/', function(req, res, next) {

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
    let token = req.body.pushtoken;
    let usuario = req.body.usuario;

    // Check if the user exists in the Usuario DB
    Usuario.findOne({email: usuario}).exec(function(error, result) {
        if (error) {
            return next();
        }

        if (result === null) {
            PushToken.findOne({token: token}).exec(function(error, result2) {
                    if (error) {
                        return next();
                    }

                    if (result2 === null) {
                        let newToken = new PushToken({
                            plataforma: plataforma,
                            token: token,
                            usuario: usuario
                        });
                        console.log('Saving token: ...');
                        newToken.save(function(error, tokenCreado) {
                            if (error) {
                                errorText = errorTranslator('TOKEN_NOT_SAVED', langError);
                                return res.status(500).json({success: false, msg: errorText, error: error});
                            }

                            console.log('OK');
                            return res.status(200).json({success: true, newToken: tokenCreado});
                        });
                    } else {
                        errorText = errorTranslator('EXISTING_TOKEN', langError);
                        return res.status(500).json({success: false, msg: errorText });
                    }
                });
        } else {
            errorText = errorTranslator('USE_AUTH_ROUTE', langError);
            return res.status(500).json({success: false, msg: errorText });
        }
    });
});

module.exports = router;
