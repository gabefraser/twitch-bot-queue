// Package Initialisation.
const tmi = require('tmi.js');

// Variables Initialisation.
let options = require('./options.json');
let config = require('./config.json');
let db = require('./db.js');
let command_prefix = config.settings.command_prefix;
let commands = { test };

// Command Functions.
function test(target, context, params){
    if(params.length){
        const msg = params.join(' ');
        sendMessage(target, context, msg);
    }
}

// Helper Functions.
function sendMessage(target, context, message){
    if(context['message-type'] === 'whisper'){
        client.whisper(target, message);
    }else{
        client.say(target, message);
    }
}

// Create Client Object.
let client = new tmi.client(options);

// Event Handlers
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('disconnected', onDisconnectedHandler);

// Connect the Client.
client.connect();

// Chat Message Handler.
function onMessageHandler(target, context, msg, self){
    if(self) return;
    
    if(msg.substr(0, 1) !== command_prefix){
        return;
    }

    const parse = msg.slice(1).split(' ');
    const command_name = parse[0];
    const params = parse.splice(1);

    if(command_name in commands){
        const command = commands[command_name];
        command(target, context, params);
        console.log(`Executed command ${command_name} for ${context.username}`);
    }else{
        console.log(`Unknown command ${command_name}`);
    }
}

// Connected Handler.
function onConnectedHandler(addr, port){
    console.log(`Connected to ${addr}:${port}`);
}

// Disconnected Handler.
function onDisconnectedHandler(reason){
    console.log(`Disconnected: ${reason}`);
    process.exit(1);
}