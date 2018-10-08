// Helper Files.

// Variables.
const bot = require('../src/bot.js');

// Functions.
let send_message = function (target, context, message){
    if(context['message-type'] !== 'whisper'){
        bot.client.say(target, message);
    }
}

let timestamp = function(){
    return new Date();
}

// Exports.
module.exports.send_message = send_message;
module.exports.timestamp = timestamp;