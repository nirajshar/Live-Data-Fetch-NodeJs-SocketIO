// Make connection 
var socket = io.connect('http://localhost:4000');

socket.on('getLiveData', function (data) {
    console.log('%j', data);
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += "<tr>";
        html += "<td>" + data[i].name + "</td>";
        html += "<td>" + data[i].documents + "</td>";
        html += "<td>" + data[i].date_created + "</td>";
        html += "<td>" + data[i].time_elapsed + "</td>";
        html += "</tr>";
    }
    document.getElementById("tbody").innerHTML = html;
});

$('#search').tooltip({trigger: 'manual'}).tooltip('show');

$('#search').keyup(function() {    

    var input, filter, table, tr, td, i;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        table = document.getElementById("Abandoned_Call_Log");
        tr = table.getElementsByTagName("tr");

    if( filter != '') {       
        socket.off('getLiveData');
        // $('#search').tooltip({trigger: 'manual'}).tooltip('show');
        
    } else {
        socket.on('getLiveData', function (data) {
            console.log('%j', data);
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td>" + data[i].name + "</td>";
                html += "<td>" + data[i].documents + "</td>";
                html += "<td>" + data[i].date_created + "</td>";
                html += "<td>" + data[i].time_elapsed + "</td>";
                html += "</tr>";
            }
            document.getElementById("tbody").innerHTML = html;
        });
        
    }

    // console.log(filter);

    for (i = 1; i < tr.length; i++) {
        // Hide the row initially.
        tr[i].style.display = "none";
    
        td = tr[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
          cell = tr[i].getElementsByTagName("td")[j];
          if (cell) {
            if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
              break;
            } 
          }
        }
    }
});


$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })




