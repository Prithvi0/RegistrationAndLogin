const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./config/databaseConfig');
const mongoose = require('mongoose');
const http = require('http');
const port = process.env.PORT || 4001;
const server = http.createServer(app);
const dotenv = require('dotenv');
dotenv.config();

// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// route definition
app.get('/', (request, response) => {
    response.json({'message': 'Welcome User!'});
});

// listen for requests
server.listen(port, err => {
    if (err)
        throw new Error(err);
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;