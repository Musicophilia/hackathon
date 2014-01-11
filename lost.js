var client = new WindowsAzure.MobileServiceClient('https://lost-found.azure-mobile.net/', 'PgYPjeVvaByElucuwGqnmaPVhkkgtf15'),
        lost_table = client.getTable('lost_items');

window.onload = function() {
    var search = new Search("lost");
    var submit = get('submit');
    submit.addEventListener('click', function(event) {
        console.log("submit button clicked");
        console.log(search);
        lost_add_item(search.search_obj);

        var results_section = get('results');
        results_section.style.display="hidden";
        setTimeout(function() {window.location = "thanks.html";}, 500);
    });
}

// assume well-formatted
lost_add_item = function(lost_obj) {
	if (lost_obj.category !== '' && lost_obj.email !== '') {
		lost_table.insert(
		{
		    category: lost_obj.category, location: lost_obj.location, description: lost_obj.description, date: lost_obj.date,
                    email: lost_obj.email
		});
	}
}

get = function(id) {
    return document.getElementById(id);
}
