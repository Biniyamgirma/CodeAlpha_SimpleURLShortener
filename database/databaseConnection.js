const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./shortener.db', (err)=>{
    if(err){
        console.log("there was an error connecting to the database: ", err.message);
    }
    else{
        console.log("Connected to the Database");
    }
})

exports.db = db;

