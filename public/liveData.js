// Make connection 
var socket = io.connect('http://localhost:4000');

socket.on('getLiveData', function (data) {
    console.log('%j', data);
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += "<tr>";
        html += "<td>" + data[i].name + "</td>";
        html += "<td>" + data[i].time_elapsed + "</td>";
        html += "</tr>";
    }
    document.getElementById("tbody").innerHTML = html;
});



