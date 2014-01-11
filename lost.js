window.onload = function() {
	var submit = get('submit');
	submit.addEventListener('click', function(event) {
		event.preventDefault();
		var lost_obj = {};
		lost_obj.name = get('lost_name').value;
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
	if (lost_obj.name !== '') {
		todoItemTable.insert(
		{
			name: lost_obj.name, location: lost_obj.location, description: lost_obj.description, date: lost_obj.date
		});
	}
}

get = function(id) {
    return document.getElementById(id);
}