const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors');


// Helper Files
const helper = require('./helperFunctions');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});


const program = () => {
    data = [];

    connection.query("SELECT * FROM node_test.View_Pending", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        result.forEach(function (row) {
            row['time_elapsed'] = helper.get_time_diff(row['date_created']);
            // console.log(JSON.stringify(row, null, 2));
            data.push(row);
        });
    });



    setTimeout(program, 300);
}

program();

app.use(cors());
app.options('*', cors());

app.get('/', function (req, res) {
    res.status(200).json({
        message: data
    });
});



// app.use((req, res, next) => {
//     res.status(200).json({
//         message: data
//     });
// });

module.exports = app;