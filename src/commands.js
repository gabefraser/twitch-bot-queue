// Commands File

// Variables
const helper = require('../src/helper.js');

let test = function(target, context, params){
    if(params.length){
        const msg = params.join(' ');
        helper.send_message(target, context, msg);
    }
}

let joinqueue = function(){
}

const list = { test };

module.exports.list = list;
module.exports.test = test;
module.exports.joinqueue = joinqueue;