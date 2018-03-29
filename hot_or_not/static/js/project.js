/* Project specific Javascript goes here. */

/*
Formatting hack to get around crispy-forms unfortunate hardcoding
in helpers.FormHelper:

    if template_pack == 'bootstrap4':
        grid_colum_matcher = re.compile('\w*col-(xs|sm|md|lg|xl)-\d+\w*')
        using_grid_layout = (grid_colum_matcher.match(self.label_class) or
                             grid_colum_matcher.match(self.field_class))
        if using_grid_layout:
            items['using_grid_layout'] = True

Issues with the above approach:

1. Fragile: Assumes Bootstrap 4's API doesn't change (it does)
2. Unforgiving: Doesn't allow for any variation in template design
3. Really Unforgiving: No way to override this behavior
4. Undocumented: No mention in the documentation, or it's too hard for me to find
*/
$('.form-group').removeClass('row');

$('.left-option').click(function() {
	var data = {
		'action': 'vote_left'
	}
	var id = $(".match").data().id;

	var request = voteRequest(data, id).done(function(msg) {
		$('.left-count').text(msg.vote_left);
		location.reload();
	})

	request.fail(function(err, txtStatus) {
		console.log(err);
		console.log(txtStatus);
	})
});

$('.right-option').click(function() {
	var data = {
		'action': 'vote_right'
	}

	var id = $(".match").data().id;

	var request = voteRequest(data, id).done(function(msg) {
		$('.right-count').text(msg.vote_right);
		location.reload();
	})

	request.fail(function(err, txtStatus) {
		console.log(err);
		console.log(txtStatus);
	})
});

function voteRequest(data, id) {
	return $.ajax({
			  url : '/game/vote/' + id,
			  data : JSON.stringify(data),
			  type : 'PATCH',
			  contentType : 'application/json',
			  processData: false,
			  dataType: 'json'
			});
}