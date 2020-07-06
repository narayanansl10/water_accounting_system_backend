const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/env');
const http = require('http');

mongoose.connect(config.database.name, { useNewUrlParser: true });
// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to Database ' + config.database.name);
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});
const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Routes
const state=require('./routes/states');
const district=require('./routes/districts');
const cropInfo=require('./routes/cropinfo');
const LoginDetails=require('./routes/logindetails');
const taluk= require('./routes/taluks');
const WaterInfo = require('./routes/waterinfo');
const Plantation = require('./routes/plantations');
//Ports
const port = process.env.PORT || 3000;
var production = false;

//CORS
if (production) {
    //app.use(cors({ origin: 'address_here' }));
} else {
    app.use(cors({ origin: "*" }));   
}

// Set Static Folder
app.use('/assets', express.static('assets'));
app.use('/public', express.static('public'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//App Starts
app.use('/states',state);
app.use('/districts',district);
app.use('/cropinfo',cropInfo);
app.use('/logindetails',LoginDetails);
app.use('/taluks',taluk);
app.use('/waterinfo',WaterInfo);
app.use('/plantations',Plantation);
if (production) {

    var distDir = __dirname + "/dist/";

    app.use('/', express.static(distDir));

    app.get('*', (req, res) => {
        res.sendFile(distDir + "index.html");
    });
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log('Server started on port ' + port);
    });
    app.use(express.static(distDir));
}
else {
    app.get('/', (req, res) => {
        res.send('HELLO WORLD!');
        //res.redirect('http://localhost:4200')
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });

    // Start Server
    app.listen(port, () => {
        console.log('Server started on port ' + port);
    });
}