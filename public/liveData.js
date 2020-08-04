// Make connection 
var socket = io.connect('http://localhost:4000');

$('#listen-active').change(function(event) {
    
    if( $('#listen-active').is(':checked') ) {
        
        socket.on('getLiveData', function (data) {
            console.log('%j', data);
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td>" + data[i].name + "</td>";
                html += "<td>" + data[i].documents + "</td>";
                html += "<td>" + data[i].date_created + "</td>";
                // html += "<td>" + obsKeysToString(duration(data[i].date_created, getFormattedCurrentDate()), keys, ':') + "</td>";
                html += "<td>" + obsEntriesTostring(duration(data[i].date_created, getFormattedCurrentDate()), keys, ':') + "</td>";
                html += "</tr>";
            }
            document.getElementById("tbody").innerHTML = html;
        });
        
        
    } else {
        
        socket.off('getLiveData');
        
    }
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
});


function duration(t0, t1){
    let d = (new Date(t1)) - (new Date(t0));
    let Weekdays     = Math.floor(d/1000/60/60/24/7);
    let Days         = Math.floor(d/1000/60/60/24 - Weekdays*7);
    let Hours        = Math.floor(d/1000/60/60    - Weekdays*7*24            - Days*24);
    let Minutes      = Math.floor(d/1000/60       - Weekdays*7*24*60         - Days*24*60         - Hours*60);
    let Seconds      = Math.floor(d/1000          - Weekdays*7*24*60*60      - Days*24*60*60      - Hours*60*60      - Minutes*60);
    let t = {};
    ['Days ', 'Hours ', 'Minutes', 'Seconds'].forEach(q=>{ if (eval(q)>0) { t[q] = eval(q); } });
    return t;
}

// console.log(duration('2019-07-17T18:35:25.235Z', '2019-07-20T00:37:28.839Z'));



var keys = ['days', 'hours','minutes', 'seconds']
// console.log(obsKeysToString(duration('2019-07-17T18:35:25.235Z', '2019-07-20T00:37:28.839Z'), keys, ':'));

function obsKeysToString(o, k, sep) {    
    return k.map(key => o[key]).filter(v => v).join(sep);
}

function obsEntriesTostring(obj){
    return Object.entries(obj).toString().split(',').join(' ');
}

function getFormattedCurrentDate(){
    var d = new Date();

    d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

    return d;
}

// console.log(getFormattedCurrentDate());

// let xobj = {hello:'world'};
// console.log(Object.entries(xobj).toString().split(',').join(':'));


