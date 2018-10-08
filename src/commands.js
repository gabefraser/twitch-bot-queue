// Commands File

// Variables
const helper = require('../src/helper.js');
const db = require('../src/db.js');

let test = function(target, context, params){
    if(params.length){
        const msg = params.join(' ');
        helper.send_message(target, context, msg);
    }
}

let joinqueue = function(target, context, params){
    if(params.length){
        // Set-up for DB INSERT.
        const twitch_name = context.username;
        const epic_name = params.join(' ');
        // Create query.
        var query = { twitch_name: twitch_name, epic_name: epic_name };
        db.insert(query);

        helper.send_message(target, context, `@${context.username}, You're now in the queue to play with the host.`);
    }else{
        helper.send_message(target, context, `@${context.username}, Please enter your Epic Games username.`);
    }
}

const list = { test, joinqueue };

module.exports.list = list;
module.exports.test = test;
module.exports.joinqueue = joinqueue;