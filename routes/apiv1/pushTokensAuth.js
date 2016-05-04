'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let PushToken = mongoose.model('PushToken');
let Usuario = mongoose.model('Usuario');

// Import jsonwebtoken auth
let jwtAuth = require('../../lib/jwtAuth');

// Import error translator module
let errorTranslator = require('../../lib/errorTranslator');

router.use(jwtAuth()); // We need to check if the call has the right token

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

    //console.log(req.decoded.id);
    //console.log(typeof req.decoded.id);

    Usuario.findOne({email: usuario}).exec(function(error, result) {
        if (error) {
            return next();
        }

        if (result === null) {
            errorText = errorTranslator('USER_NOT_FOUND', langError);
            return res.status(500).json({success: false, msg: errorText });
        } else {
            //console.log(typeof result._id);
            //console.log(result._id.toString());
            if (result._id.toString() !== req.decoded.id) {
                errorText = errorTranslator('TOKEN_IS_NOT_FROM_USER', langError);
                return res.status(500).json({success: false, msg: errorText });
            } else {
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
            }
        }
    });
});

module.exports = router;
