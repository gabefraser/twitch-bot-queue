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

let insert = function(query){
    // Create the start of the query.
    const command = "INSERT INTO";
    const sql = `${command} ${query}`;

    // Execute the INSERT.
    con.query(sql, function (err, result) {
        if(err) throw err;
        console.log(`Executed the ${query} with a result of `);
    });
}

module.exports.insert = insert;