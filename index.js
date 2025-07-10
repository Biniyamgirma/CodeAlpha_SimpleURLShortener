const express = require('express');
const app = express();
const {db} = require('./database/databaseConnection.js');
const { createTable } = require('./database/createTable.js');
const idGenerator = require('./utils/generateId.js');
const checkURL = require('./utils/checkURL.js');
const cors = require('cors');
app.use(cors());
require('dotenv').config();

createTable();// calling the function to create the table if it doesn't exist

app.get('/', (req,res)=>{
    res.send('Welcome to the Simple URL Shortener!');
})

app.post('/shorten', express.json(), (req,res)=>{
    const {originalUrl} = req.body;
    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }
    if (!checkURL(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }
    let id = idGenerator();
    db.run(`INSERT INTO urlTable (id, originalUrl) VALUES (?,?)`, [id, originalUrl], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.status(201).json({
            id:id,
            shortURL: `${req.protocol}://${req.get('host')}/${id}`
         });
    })
        
    });

    app.get('/:id', (req, res) => {
        const {id} = req.params;

        db.get(`SELECT originalUrl FROM urlTable WHERE id = ?`,[id] , (err, row) => {
            if(err){
                return res.status(500).json({
                    error:"database error",
                    details: err.message
                })
            }else if(!row){
                return res.status(404).json({
                    error: "URL not found"
                })
            
            }else{
                let url = row.originalUrl;
                res.status(200);
                res.redirect(url);
            }


})
})



app.listen(process.env.PORT_NUMBER || 3030, () => {
    console.log('Server is running on port 3030');
})