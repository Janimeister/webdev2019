function loadApp() {
  console.log("loading application");

  // Bind AJAX call to the click event of Button #lataa
  $('#lataa').click(function(event) {
    // prevent the navigation when clicking submit
    event.preventDefault();

    // The server must be bind to localhost (for testing) as we don't have a FQDN or HTTP proxy available
    $.get("http://localhost:8080/api/v1/athletes", function(data) {
      console.log("Sending HTTP GET to server");
    })
    .done(function( data ) {
      console.log("response from server :", data);

      // Building the table
      CreateTable(data);
      function CreateTable() {

        var col = [];
        for (var i = 0; i < data.length; i++) {
            for (var id in data[i]) {
                if (col.indexOf(id) === -1) {
                    col.push(id);
                }
            }
        }

        var table = document.createElement("table");
        // Row
        var tr = table.insertRow(-1);

        for (var i = 0; i < col.length; i++) {
            // Header
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // Add rows
        for (var i = 0; i < data.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i][col[j]];
            }
        }

        // Finding the urheilijat div from index.html
        var divContainer = document.getElementById("urheilijat");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
      }
    })
    .fail(function(err) {
      console.log("error");
    })
    .always(function() {
      console.log("finished");
    });
  });
}