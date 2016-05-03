'use strict';
/**
 * Your utility library for express
 */
var jwt = require('jsonwebtoken');
var configJWT = require('../local_config').jwt;

// Import error translator module
let errorTranslator = require('./errorTranslator');

/**
 * JWT auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', jwtAuth());
 *
 * @returns {function} Express 4 middleware
 */
module.exports = function() {
    return function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        let lang = req.query.lang;
        let langError;
        if (lang === 'es') {
            langError = lang;
        } else {
            langError = 'en';
        }

        let errorText;

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, configJWT.secret, function(err, decoded) {
                if (err) {
                    errorText = errorTranslator('FAILED_AUTH', langError);
                    return res.status(401).json({ sucess: false, code: 401, message: errorText});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token return error
            errorText = errorTranslator('NO_TOKEN', langError);
            return res.status(403).json({ sucess: false, code: 403, message: errorText});
        }
    };
};
