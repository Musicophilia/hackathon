var client = new WindowsAzure.MobileServiceClient('https://found-found.azure-mobile.net/', 'PgYPjeVvaByElucuwGqnmaPVhkkgtf15'),
        found_table = client.getTable('found_items');

window.onload = function() {
    var search = new Search("found");
    var submit = get('submit');
    submit.addEventListener('click', function(event) {
        console.log("submit button clicked");
        console.log(search);
        found_add_item(search.search_obj);

        var results_section = get('results');
        results_section.style.display="hidden";
        setTimeout(function() {window.location = "thanks.html";}, 500);
    });
}

// assume well-formatted
found_add_item = function(found_obj) {
	if (found_obj.category !== '' && found_obj.email !== '') {
		found_table.insert(
		{
		    category: found_obj.category, location: found_obj.location, description: found_obj.description, date: found_obj.date,
                    email: found_obj.email
		});
	}
}

get = function(id) {
    return document.getElementById(id);
}
