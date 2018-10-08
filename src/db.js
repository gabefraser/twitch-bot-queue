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
    // Variables to be used within in the function
    const length = Object.keys(query).length;
    var columns = ""; // Set-up columns string.
    var values = ""; // Set-up values string.

    // Set the column title for the SQL statement.
    var i = 1; // Set-up count for query.
    for (item in query){
        i++;
        columns += `${item}`;
        if(i <= length){
            columns += ', ';
        }
    }

    // Set the values for the SQL statement.
    var i = 1; // Set-up count for query.
    for (item in query){
        i++;
        values += `'${query[item]}'`;
        if(i <= length){
            values += ', ';
        }
    }

    // Setup the SQL statement.
    var sql = `INSERT INTO queue(${columns}) VALUES (${values})`;

    // Execute the INSERT.
    con.query(sql, function (err, result) {
        if(err) throw err;
        console.log(`Executed the ${sql} successfully.`);
    });
}

module.exports.insert = insert;