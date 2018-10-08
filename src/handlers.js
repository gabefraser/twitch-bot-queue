// Handlers

// Variables
let commands = require('../src/commands.js');
let helper = require('../src/helper.js');
let config = require('../config/config.json');
let command_prefix = config.settings.command_prefix;

// Chat Message Handler.
let onMessageHandler = function (target, context, msg, self){
    if(self) return;
    
    if(msg.substr(0, 1) !== command_prefix){
        return;
    }

    const parse = msg.slice(1).split(' ');
    const command_name = parse[0];
    const params = parse.splice(1);

    if(command_name in commands.list){
        const command = commands.list[command_name];
        command(target, context, params);
        console.log(`[${helper.timestamp()}] Executed command ${command_name} for ${context.username}`);
    }else{
        console.log(`[${helper.timestamp()}] Unknown command ${command_name}`);
    }
}

// Connected Handler.
let onConnectedHandler = function (addr, port){
    console.log(`[${helper.timestamp()}] Connected to ${addr}:${port}`);
}

// Disconnected Handler.
let onDisconnectedHandler = function (reason){
    console.log(`[${helper.timestamp()}] Disconnected: ${reason}`);
    process.exit(1);
}

module.exports.onMessageHandler = onMessageHandler;
module.exports.onConnectedHandler = onConnectedHandler;
module.exports.onDisconnectedHandler = onDisconnectedHandler;