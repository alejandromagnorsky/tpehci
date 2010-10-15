
var showing = false;

function checkLogin(e) {
	if (!showing)
		return;
	var target = (e && e.target) || (event && event.srcElement);
	var objDiv = document.getElementById("divlogin");
	var objLink = document.getElementById("spanlogin");
	var objSpan = document.getElementById("link");
	var parent = checkParent(target);
	if (!parent && target != objLink) {
		objDiv.style.display = 'none';
		objLink.className = 'lang_login text_link';
		objSpan.className = 'unclicked';

		$("#divlogin").hide("slide", {
			direction : "up"
		}, 250);

		showing = false;
	}
}

function checkParent(t) {
	while (t.parentNode) {
		if (t == document.getElementById('divlogin'))
			return true;
		t = t.parentNode;
	}
	return false;
}

function showHideLogin() {
	var display = document.getElementById("divlogin").style.display;

	if (display == 'none' || display == '') {
		
		document.getElementById("spanlogin").className = 'lang_login text_link_clicked';
		document.getElementById("link").className = 'clicked';

		$("#divlogin").show("slide", {
			direction : "up"
		}, 250);
		displayPreferences();
		showing = true;
	} else {

		document.getElementById("divlogin").style.display = 'none';
		document.getElementById("spanlogin").className = 'lang_login text_link';
		document.getElementById("link").className = 'unclicked';

		$("#divlogin").hide("slide", {
			direction : "up"
		}, 250);

		showing = false;
	}
	return false;
}

function logIn(){
	$(".regWarning").css("visibility", "hidden");
	var username = $("#login_username").attr("value");
	var password = $("#login_password").attr("value");
	requestFromServer('SignIn', 'username='+username+'&password='+password);
	return false;
}
