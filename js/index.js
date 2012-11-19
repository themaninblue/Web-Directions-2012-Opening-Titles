
$(init);

function init() {
	$('#show a').click(function() {
		window.open('titles.html', 'titles', 'width=1024,height=576,toolbar=no,status=no,scrollbars=no,location=no,menubar=no');
		return false;
	})
}