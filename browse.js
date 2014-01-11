var client = new WindowsAzure.MobileServiceClient('https://lost-found.azure-mobile.net/', 'PgYPjeVvaByElucuwGqnmaPVhkkgtf15'),
        found_table = client.getTable('found_items');
        lost_table = client.getTable('lost_items');

window.onload = function() {
    console.log("browse init");
    var query = lost_table.where({});
    console.log(query);
    query.read().then(function(matchedItems) {
        console.log(matchedItems);
        for(var i = 0; i < matchedItems.length; i++) {
            console.log("found something: " + matchedItems[i].category + " " + matchedItems[i].location + " " + matchedItems[i].date);
        }
    }, handleError);
    update_table(query);
}

function handleError(error) {
    var text = error + (error.request ? ' - ' + error.request.status : '');
    $('#errorlog').append($('<li>').text(text));
}
get = function(id) {
    return document.getElementById(id);
}
