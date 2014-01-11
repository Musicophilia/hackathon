var client = new WindowsAzure.MobileServiceClient('https://lost-found.azure-mobile.net/', 'PgYPjeVvaByElucuwGqnmaPVhkkgtf15'),
        todoItemTable = client.getTable('todoitem');
        lost_table = client.getTable('lost_items');

window.onload = function() {

	var submit = get('submit');
	submit.addEventListener('click', function(event) {
		event.preventDefault();
		var lost_obj = {};
		lost_obj.category = get('lost_category').value;

		lost_obj.location = get('lost_location').value;

                lost_obj.description = get('lost_description').value;

		lost_obj.date = get('lost_date').value;

		lost_add_item(lost_obj);
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
                var search = new Search();
		get('lost_category').value = '';
		get('lost_location').value = '';
		get('lost_description').value = '';
		get('lost_date').value = '';
	}
}


get = function(id) {
    return document.getElementById(id);
}
