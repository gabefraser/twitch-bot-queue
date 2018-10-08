// Package Initialisation.
const mysql = require('mysql');

// Variables Initialisation.
let config = require('./config.json');
let db = config.database;

// Initialise the SQL connection.
let con = mysql.createConnection(db);

// Intialise the connection.
con.connect(function(err){
    if(err) throw err;
    console.log(`Connected to ${db.host}`);
});