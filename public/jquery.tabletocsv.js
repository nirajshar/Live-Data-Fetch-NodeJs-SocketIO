/**
 * Takes a HTML table and saves its data as a csv
 *
 * copyright (c) 2013 Scott-David Jones
 */
(function($){
  $.fn.tableToCsv = function( options ){
    var t = $(this);
    if (! t.is('table')) {
      throw "selector element is not a table..";
    }

    var settings = $.extend({
      seperator: ',',
      fileName: t.attr('id'),
      outputheaders: true,
      extension: 'csv'
    }, options);

    var quote = function(string) {
      return '"' + string.trim().replace('"', '""') + '"';
    }

    var csvData = [];

    //get headers
    if (settings.outputheaders === true) {
      var headers = [];
      t.find('thead tr').each(function(index, element){
        var row = $(this);
        row.find('th').each(function(i,e){
          var cell = $(this);
          headers.push(quote(cell.text()));
        });
      });
      csvData.push(headers);
    }

    //get the main body of data
    t.find('tbody tr').each(function(i,e){
      var rowData = [];
      var row = $(this);
      row.find('td').each(function(i, e){
        var cell = $(this);
        var text = cell.text();
        //if number add else encapsulate with quotes
        if ( !isNaN(parseFloat(text)) && isFinite(text) ) {
          rowData.push(text);
        }
        else {
          rowData.push(quote(text));
        }
        
      });
      csvData.push(rowData);
    });

    var csvString = '';
    for (var c in csvData) {
      var current = csvData[c];
      csvString += current.join(settings.seperator)+"\r\n";
    }

    // Ludovic Feltz
    // https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
    var save = function(filename, data) {
      var blob = new Blob([data], {type: 'text/csv'});
      if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
      }
      else {
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
      }
    }

    save(settings.fileName + "." + settings.extension, csvString)
  }
}(jQuery));
