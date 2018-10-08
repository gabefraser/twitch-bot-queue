// Package Initialisation.
const mysql = require('mysql');

// Variables Initialisation.
let helper = require('../src/helper.js');
let config = require('../config/config.json');
let db = config.database;
var row_length = 0;

// Initialise the SQL connection.
let con = mysql.createConnection(db);

// Intialise the connection.
con.connect(function(err){
    if(err) throw err;
    console.log(`[${helper.timestamp()}] Connected to ${db.host}`);
});

let insert = function(query){
    // Variables to be used within in the function.
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
    con.query(sql, function (err) {
        if(err) throw err;
        console.log(`[${helper.timestamp()}] Executed the ${sql} successfully.`);
    });
    return false;
}

let select = function(query){
    // Variables to be used within in the function.
    var item = "";
    var prop = "";

    // Assign the value & item to the corresponding variables.
    for(value in query){
        item = value;
        prop = query[value];
    }

    const sql = `SELECT ${item} FROM queue WHERE ${item}='${prop}'`;

    con.query(sql, function(err, row){
        if(err) throw err;
        row_length = Object.keys(row).length;
        console.log(`[${helper.timestamp()}] Executed the ${sql} successfully.`);
    });

    if(row_length > 0){
        return true;
    }else{
        return false;
    }
}

module.exports.insert = insert;
module.exports.select = select;