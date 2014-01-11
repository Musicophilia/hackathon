var client = new WindowsAzure.MobileServiceClient('https://lost-found.azure-mobile.net/', 'PgYPjeVvaByElucuwGqnmaPVhkkgtf15'),
        found_table = client.getTable('found_items');

function Search(prefix) {
    var obj = this;
    var search = get('search');
    search.addEventListener('click', function(event) {
        console.log("search button clicked.");
	event.preventDefault();
	var search_obj = {};
	search_obj.category = get(prefix + '_category').value;
	search_obj.location = get(prefix + '_location').value;
        search_obj.description = get(prefix + '_description').value;
	search_obj.date = get(prefix + '_date').value;
        search_obj.email = get(prefix + '_email').value;
       
        if(prefix == 'found' && (search_obj.category == '' || search_obj.email == '' || search_obj.location == '' || search_obj.date == ''
            || search_obj.description == '')) {
            alert("Must fill in all fields.");
        } else if(search_obj.category == '') {
            alert("Must choose a category!");
        } else if(search_obj.email == '') {
            alert("Must include your email!");
        } else {
    
            console.log("SEARCH WAS CLICKED!");
            
            var query = found_table.where({});
            query.read().then(function(matchedItems) {
                console.log(matchedItems);
                for(var i = 0; i < matchedItems.length; i++) {
                    console.log("EVERYTHING: " + matchedItems[i].category + " " + matchedItems[i].location + " " + matchedItems[i].date);
                }
            }, handleError);
            console.log("1");
            console.log(query);
            if(search_obj.category !== '') query = query.where({category: search_obj.category});
            if(search_obj.location !== '') query = query.where({location: search_obj.location});
            if(search_obj.date !== '') {
                if(prefix == 'lost') {
                    query = query.where(function(date) {
                        return this.date >= date;
                    }, search_obj.date);
                } else {
                    query = query.where(function(date) {
                        return this.date <= date;
                    }, search_obj.date);
                }
            }
            
            query.read().then(function(matchedItems) {
                console.log(matchedItems);
                for(var i = 0; i < matchedItems.length; i++) {
                    console.log("found something: " + matchedItems[i].category + " " + matchedItems[i].location + " " + matchedItems[i].date);
                }
            }, handleError);
            update_table(query);
            obj.search_obj = search_obj;

	    get(prefix + '_category').value = '';
	    get(prefix + '_location').value = '';
	    get(prefix + '_description').value = '';
	    get(prefix + '_date').value = '';
            get(prefix + '_email').value = '';
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
