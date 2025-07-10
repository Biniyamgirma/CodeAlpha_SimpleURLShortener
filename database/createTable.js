const {db} = require('./databaseConnection.js');

const createTable = () =>{
    db.run(`CREATE TABLE IF NOT EXISTS urlTable (
    id TEXT PRIMARY KEY,
    originalUrl TEXT NOT NULL)`);
}


module.exports = {createTable}