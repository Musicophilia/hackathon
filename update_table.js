/*
Need to add a table with id 'resuts' to the html page
Table should be hidden until report is clicked
*/

update_table = function(query) {

    var report_section = get('report_section');
    report_section.style.display="none";
    var results_section = get('results');
    results_section.style.display="block";
    var table = get('results_table');

    var rows = table.rows;
    console.log("table rows = " + rows.length);
    for (var i = rows.length - 1; i >= 0; i--) {
        table.deleteRow(rows[i]);
    }

    var tr = document.createElement('tr');
    var th_category = document.createElement('td');
    th_category.innerHTML = 'Category';
    tr.appendChild(th_category);

    var th_location = document.createElement('td');
    th_location.innerHTML = 'Location';
    tr.appendChild(th_location);

    var th_date = document.createElement('td');
    th_date.innerHTML = 'Date';
    tr.appendChild(th_date);

    var th_description = document.createElement('td');
    th_description.innerHTML = 'Description';
    tr.appendChild(th_description);

    var th_email = document.createElement('td');
    th_email.innerHTML = 'Email';
    tr.appendChild(th_email);

    table.appendChild(tr);

    query.read().then(function(matchedItems) {
        var table = get('results_table');
        console.log("Hits: ", matchedItems);
        for (var i = 0; i < matchedItems.length; i++) {

            var row = matchedItems[i];
            tr = document.createElement('tr');
            var td_category = document.createElement('td');
            td_category.innerHTML = row.category;
            tr.appendChild(td_category);

            var td_location = document.createElement('td');
            td_location.innerHTML = row.location;
            tr.appendChild(td_location);

            var td_date = document.createElement('td');
            td_date.innerHTML = row.date;
            tr.appendChild(td_date);

            var td_description = document.createElement('td');
            td_description.innerHTML = row.description;
            tr.appendChild(td_description);

            var td_email = document.createElement('td');
            td_email.innerHTML = row.email;
            tr.appendChild(td_email);

            table.appendChild(tr);

        }
    }, handleError);
}
