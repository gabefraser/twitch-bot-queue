// Package Initialisation.
const tmi = require('tmi.js');

// Variables Initialisation.
let options = require('../config/options.json');
let handlers = require('../src/handlers.js');

// Create Client Object.
let client = new tmi.client(options);

// Event Handlers
client.on('message', handlers.onMessageHandler);
client.on('connected', handlers.onConnectedHandler);
client.on('disconnected', handlers.onDisconnectedHandler);

module.exports.client = client;