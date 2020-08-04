const express = require('express');
const socket = require('socket.io');
const helper = require('./helperFunctions');
var sql = require("mssql");

var app = express();
app.use(express.static('public'));

// Port
port = 4000;

// App setup
const server = app.listen(port, function () {
    console.log(`Listening to requests on ${port}`);
});

// Socket setup
var io = socket(server);

 // config for your database
const config = {
    user: 'root',
    password: '',
    server: 'localhost', 
    database: '' 
};

sql.connect(config, function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get('/getLiveDataMsSql', function (req, res) {

    // create Request object
    var request = new sql.Request();

    request.query('SELECT * FROM node_test.View_Pending', function (err, rows) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });

});

io.on('connection', function (socket) {

    console.log('Socket connection established', socket.id);

    setInterval(function () {
        request.query('SELECT * FROM node_test.View_Pending', function (err, rows) {

            if (rows.length > 0) {

                for (var i = 0; i < rows.length; i++) {

                    rows[i]['time_elapsed'] = helper.get_time_diff(rows[i]['date_created']);
                    rows[i]['date_created'] =   new Date(rows[i]['date_created']).toISOString().
                                                replace(/T/, ' ').      // replace T with a space
                                                replace(/\..+/, '') ;

                    // console.log(JSON.stringify(row, null, 2));
                    // rows.push(row['time_elapsed']);

                }
                socket.emit('getLiveData', rows)
            }
        });
    }, 1000);

});

