// const program = () => {
//     data = [];

//     connection.query("SELECT * FROM node_test.View_Pending", function (err, result, fields) {
//         if (err) throw err;
//         // console.log(result);
//         result.forEach(function (row) {
//             row['time_elapsed'] = helper.get_time_diff(row['date_created']);
//             // console.log(JSON.stringify(row, null, 2));
//             data.push(row);
//         });
//     });

//     setTimeout(program, 300);
// }

// response = program();