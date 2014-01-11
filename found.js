window.onload = function() {
	var submit = get('submit');
	submit.addEventListener('click', function(event) {
		event.preventDefault();
		var found_obj = {};
		found_obj.name = get('found_name').value;
		found_obj.location = get('found_location').value;
		found_obj.description = get('found_description').value;
		found_obj.date = get('found_date').value;
		found_add_item(lost_obj);
	});
}

// assume well-formatted
found_add_item = function(found_obj) {
	// if (lost_obj.length !== 4) {
	// 	console.log('Wrong number of values');
	// 	return;
	// }
	if (found_obj.name !== '') {
		todoItemTable.insert(
		{
			name: found_obj.name, location: found_obj.location, description: found_obj.description, date: found_obj.date
		});
	}
}


get = function(id) {
    return document.getElementById(id);
}