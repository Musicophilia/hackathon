var client = new WindowsAzure.MobileServiceClient('https://lost-found.azure-mobile.net/', 'PgYPjeVvaByElucuwGqnmaPVhkkgtf15'),
        todoItemTable = client.getTable('todoitem');
        lost_table = client.getTable('lost_items');

window.onload = function() {
    var search = new Search();
    var submit = get('submit');
    submit.addEventListener('click', function(event) {
        console.log("submit button clicked");
        console.log(search);
        lost_add_item(search.search_obj);

       /* var results_section = get('results');
        results_section.style.display="hidden";
        window.location = "lost.html";*/
    });
}

// assume well-formatted
lost_add_item = function(lost_obj) {
	// if (lost_obj.length !== 4) {
	// 	console.log('Wrong number of values');
	// 	return;
	// }
	if (lost_obj.category !== '' && lost_obj.email !== '') {
		lost_table.insert(
		{
		    category: lost_obj.category, location: lost_obj.location, description: lost_obj.description, date: lost_obj.date,
                    email: lost_obj.email
		});
                console.log(lost_obj);
                console.log("After lost insert");
		get('lost_category').value = '';
		get('lost_location').value = '';
		get('lost_description').value = '';
		get('lost_date').value = '';
                get('lost_email').value = '';
	}
}

get = function(id) {
    return document.getElementById(id);
}
