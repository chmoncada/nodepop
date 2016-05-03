'use strict';

let fs = require('fs');

let error_content = fs.readFileSync('./lang/errors.json');

let error_Json = JSON.parse(error_content);

function errorTranslator( key, langError ) {
   if(langError === 'es') {
       return error_Json[key].es;
   } else {
       return error_Json[key].en;
   }

}

module.exports = errorTranslator;

