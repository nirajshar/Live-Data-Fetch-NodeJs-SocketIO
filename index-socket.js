const express = require('express');
const socket = require('socket.io');
const mysql = require('mysql');
const helper = require('./helperFunctions');

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
// Static File
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});


app.get('/getLiveData', function (req, res) {

    connection.query('SELECT * FROM node_test.View_Pending', function (err, rows) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });

});

// io.on('connection', function(socket){
//     console.log('Socket connection established',socket.id);  
//     socket.on('getLiveData', function(data) {
//         socket.emit('getLiveData',data)
//     });   
// });


io.on('connection', function (socket) {
    console.log('Socket connection established', socket.id);


    setInterval(function () {
        connection.query('SELECT * FROM node_test.View_Pending', function (err, rows) {

            if (rows.length > 0) {

                for (var i = 0; i < rows.length; i++) {

                    rows[i]['time_elapsed'] = helper.get_time_diff(rows[i]['date_created']);
                    // console.log(JSON.stringify(row, null, 2));
                    // rows.push(row['time_elapsed']);

                }
                socket.emit('getLiveData', rows)
            }
        });
    }, 1000);

});

