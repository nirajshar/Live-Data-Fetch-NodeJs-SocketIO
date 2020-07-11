const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');
const ora = require('ora');

const spinner = ora({
    text: 'Waiting for DB Events',
    color: 'blue',
    spinner: 'dots2'
});

const program = async () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: ''
    });

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

    });

    const instance = new MySQLEvents(connection, {
        startAtEnd: true
    });

    await instance.start();

    instance.addTrigger({
        name: 'Monitoring all Events',
        expression: 'node_test.*',
        statement: MySQLEvents.STATEMENTS.ALL,
        onEvent: e => {
            // console.log(e);

            connection.query("SELECT * FROM node_test.View_Pending", function (err, result, fields) {
                if (err) throw err;
                // console.log(result);
                result.forEach(function (row) {
                    console.log(JSON.stringify(row, null, 2));
                });
            });
            spinner.succeed('_EVENT_');
            spinner.start();
        }
    });

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);

}

program()
    .then(spinner.start.bind(spinner))
    .catch(console.error);
