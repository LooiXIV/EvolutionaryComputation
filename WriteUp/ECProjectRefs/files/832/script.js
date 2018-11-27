$(function() {
	$("#member_show").click(function() {
		$("#member_panel").slideToggle('fast');
		if (document.getElementById('edit-username')) {setTimeout(function() {if ($('#edit-username').is(':visible')) {$('#edit-username').focus();}}, 500);}
	});
});
