function exportReportToExcel() {
    let table = document.getElementById("Abandoned_Call_Log"); // you can use document.getElementById('tableId') as well by providing id to the table tag
    TableToExcel.convert(table[0], { // html code may contain multiple tables so here we are refering to 1st table tag
      name: `export.xlsx`, // fileName you could use any name
      sheet: {
        name: 'Sheet 1' // sheetName
      }
    });
  }

  $('#export').on('click',function(){
    $('#Abandoned_Call_Log').tableToCsv({
        fileName: 'Export.csv'
    });
});
