var client = new WindowsAzure.MobileServiceClient('https://lost-found.azure-mobile.net/', 'PgYPjeVvaByElucuwGqnmaPVhkkgtf15'),
        found_table = client.getTable('found_items');

function Search() {

    var search = get('submit');

    search.addEventListener('click', function(event) {
        event.preventDefault();
        console.log("SEARCH WAS CLICKED!");
        var search_obj = {};
        search_obj.category = get('lost_category').value;
        search_obj.location = get('lost_location').value;
        search_obj.date = get('lost_date').value;

        console.log("  searched: category = " + search_obj.category + ", location = " + search_obj.location);

        var query = found_table.where({});
        if(search_obj.category !== '') query = query.where({category: search_obj.category});
        if(search_obj.location !== '') query = query.where({location: search_obj.location});
        if(search_obj.date !== '') {
            console.log("yay");
            query = query.where(function(date) {
                return this.date >= date;
            }, search_obj.date);
            console.log("after");
        }

        query.read().then(function(matchedItems) {
            console.log(matchedItems);
            for(var i = 0; i < matchedItems.length; i++) {
                console.log("found something: " + matchedItems[i].category + " " + matchedItems[i].location + " " + matchedItems[i].date);
            }
            console.log("After var items");
        }, handleError);
      	get('lost_category').value = '';
        get('lost_location').value = '';
	get('lost_description').value = '';
	get('lost_date').value = '';
    });
}

function handleError(error) {
    var text = error + (error.request ? ' - ' + error.request.status : '');
    $('#errorlog').append($('<li>').text(text));
}
get = function(id) {
    return document.getElementById(id);
}
