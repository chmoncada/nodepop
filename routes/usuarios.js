'use strict';

var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var mongoose = require('mongoose');
var config = require('../local_config');
let errorTranslator = require('../lib/errorTranslator.js');

var express = require('express');
var router = express.Router();

var Usuario = mongoose.model('Usuario');

// Authenticate usuario
router.post('/authenticate', function (req, res) {
    var user = req.body.email;
    var pass =crypto.createHash('sha256').update(req.body.clave).digest('hex');
    let lang = req.query.lang;

    let langError;
    if (lang === 'es') {
        langError = lang;
    } else {
        langError = 'en';
    }
    let errorText;


    Usuario.findOne({email: user}).exec(function (err, user) {
        if(err){
            return res.status(500).json({ success: false, error: err});
        }
        if(!user) {
            errorText = errorTranslator('USER_NOT_FOUND', langError);
            return res.status(401).json({ success: false, error: errorText});
        }
        if(user.clave !== pass) {
            errorText = errorTranslator('INVALID_PASS', langError);
            return res.status(401).json({ success: false, error: errorText});
        }

        var token = jwt.sign({ id: user._id}, config.jwt.secret, {
            expiresIn: '2 days'
        });
        res.json({success: true, token: token});

    });
});

//Register new usuario
router.post('/register', function (req, res) {
    let nombre = req.body.nombre;
    let user = req.body.email;
    let clave =crypto.createHash('sha256').update(req.body.clave).digest('hex');
    let lang = req.query.lang;

    let langError;
    if (lang === 'es') {
        langError = lang;
    } else {
        langError = 'en';
    }
    let errorText;

    // First, we check if the username exist in the DB to not create a duplicate one
    Usuario.findOne({email: user}).exec(function (err, user) {
        if(err){
            return res.status(500).json({ success: false, error: err});
        }
        if(user) {
            errorText = errorTranslator('USER_EXIST', langError);
            return res.status(403).json({ success: false, error: errorText});
        } else {
            let email = req.body.email;
            let newUsuario = new Usuario({
                nombre: nombre,
                email: email,
                clave: clave
            });            

            console.log('Saving usuario: ' + newUsuario.nombre, ' ...');
            newUsuario.save(function (error,usuarioCreado) {
                if (error) {
                    return res.status(500).json({ success: false, error: err});
                }
                console.log('OK');
                res.status(200).json({success: true, newUser: usuarioCreado });
            });
        }
    });
});


module.exports = router;