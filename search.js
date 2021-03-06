var client = new WindowsAzure.MobileServiceClient('https://lost-found.azure-mobile.net/', 'PgYPjeVvaByElucuwGqnmaPVhkkgtf15'),
        found_table = client.getTable('found_items');
        lost_table = client.getTable('lost_items');

function Search(prefix) {
    var obj = this;
    var search = get('search');
    search.addEventListener('click', function(event) {
        console.log("search button clicked.");
        
        var red = get("category_redtext");
        red.style.display="none";
        red = get("location_redtext");
        red.style.display="none";
        red = get("date_redtext");
        red.style.display="none";
        red = get("description_redtext");
        red.style.display="none";
        red = get("email_redtext");
        red.style.display="none";

	event.preventDefault();
	var search_obj = {};
	search_obj.category = get(prefix + '_category').value;
	search_obj.location = get(prefix + '_location').value;
        search_obj.description = get(prefix + '_description').value;
	search_obj.date = get(prefix + '_date').value;
        search_obj.email = get(prefix + '_email').value;
       
        var good = true;
        if(prefix == 'found') {
            if(search_obj.category == '') {
                red = get("category_redtext");
                red.style.display = "block";
                good = false;
            }
            if(search_obj.email == '') {
            
                red = get("email_redtext");
                red.style.display = "block";
                good = false;
            } else {
                var re = /\S+@\S+\.\S+/;
                red = get("email_redtext");
                var formatted = re.test(search_obj.email);
                if(!formatted) {
                    red.style.display = "block";
                    good = false;
                }
            }
            if(search_obj.location == '') {
              
                red = get("location_redtext");
                red.style.display = "block";
                good = false;
            }
            if(search_obj.date == '') {

                red = get("date_redtext");
                red.style.display = "block";
                good = false;
            }
            if(search_obj.description == '') {

                red = get("description_redtext");
                red.style.display = "block";
                good = false;
            }

        } else {
            if(search_obj.email == '') {
                red = get("email_redtext");
                red.style.display = "block";
                good = false;
            } else {
                var re = /\S+@\S+\.\S+/;
                red = get("email_redtext");
                var formatted = re.test(search_obj.email);
                if(!formatted) {
                    red.style.display = "block";
                    good = false;
                }
            }
        }

        if(good) {
    
            console.log("SEARCH WAS CLICKED!");
            
            var query;
            if(prefix == 'lost')
              query = found_table.where({});
            else
              query = lost_table.where({});
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
            display_map(query);
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
