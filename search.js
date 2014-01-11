var client = new WindowsAzure.MobileServiceClient('https://lost-found.azure-mobile.net/', 'PgYPjeVvaByElucuwGqnmaPVhkkgtf15'),
        found_table = client.getTable('found_items');

function Search() {
    var obj = this;
    var search = get('search');
    search.addEventListener('click', function(event) {
        console.log("search button clicked.");
	event.preventDefault();
	var search_obj = {};
	search_obj.category = get('lost_category').value;
	search_obj.location = get('lost_location').value;
        search_obj.description = get('lost_description').value;
	search_obj.date = get('lost_date').value;
        search_obj.email = get('lost_email').value;
       
        if(search_obj.category == '') {
            alert("Must choose a category!");
        } else if(search_obj.email == '') {
            alert("Must include your email!");
        } else {
    
            console.log("SEARCH WAS CLICKED!");
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
            var up = new update_table(query);
            obj.search_obj = search_obj;

	    get('lost_category').value = '';
	    get('lost_location').value = '';
	    get('lost_description').value = '';
	    get('lost_date').value = '';
            get('lost_email').value = '';
        }
    });
}

function handleError(error) {
    var text = error + (error.request ? ' - ' + error.request.status : '');
    $('#errorlog').append($('<li>').text(text));
}
get = function(id) {
    return document.getElementById(id);
}
