
var loginShowing = false;

function checkLogin(e){
    if (!loginShowing) 
        return;
    var target = (e && e.target) || (event && event.srcElement);
    var objDiv = document.getElementById("divlogin");
    var objLink = document.getElementById("linklogin");
    var objSpan = document.getElementById("spanlogin");
    var parent = checkParent(target, "divlogin");
    if (!parent && target != objLink) {
        objDiv.style.display = 'none';
        objLink.className = 'lang_login text_link';
        objSpan.className = 'unclicked';
        
        $("#divlogin").hide("slide", {
            direction: "up"
        }, 250);
        
        loginShowing = false;
    }
}

function checkParent(t, parent) {
    while (t.parentNode) {
        if (t == document.getElementById(parent)) 
            return true;
        t = t.parentNode;
    }
    return false;
}

function showHideLogin(){
    var display = document.getElementById("divlogin").style.display;
    
    if (display == 'none' || display == '') {
    
        document.getElementById("linklogin").className = 'lang_login text_link_clicked';
        document.getElementById("spanlogin").className = 'clicked';
        
        $("#divlogin").show("slide", {
            direction: "up"
        }, 250);
        
        /*setTimeout(function(){
            displayPreferences();
        }, 500);*/
        
        loginShowing = true;
    }
    else {
    
        document.getElementById("divlogin").style.display = 'none';
        document.getElementById("linklogin").className = 'lang_login text_link';
        document.getElementById("spanlogin").className = 'unclicked';
        
        $("#divlogin").hide("slide", {
            direction: "up"
        }, 250);
        
        loginShowing = false;
    }
    return false;
}

function logIn(){
    $(".regWarning").css("visibility", "hidden");
    var username = $("#login_username").attr("value");
    var password = $("#login_password").attr("value");
    requestFromServer('SignIn', 'username=' + username + '&password=' + password);
    return false;
}

function signIn(parameters){
    var url = $SECURITY + 'SignIn' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    var response = request.responseXML;
    if ($(response).find("response").attr('status') == 'ok') {
		session = new Session($("#login_username").attr("value"), $("#login_password").attr("value"), $ORANGE, $(response).find("token").text());
		loadPreferences();
		applyPreferences();
		
		setCookie("session", $.toJSON(session), undefined, '/', '', false);
		
		changeDivLink();
		$("#divlogin").hide("slide", {
            direction: "up"
        }, 250);
        loginShowing = false;	
		getAddressList('username=' + session.username + '&authentication_token=' + session.token);
    }
    else {
        var errorCode = $(response).find("error").attr("code");
        if (errorCode == 4 || errorCode == 5 || errorCode == 104) 
            $("#loginwarning").css("visibility", "visible");
    }
}

function Session(username, password, theme, token){
	this.username = username;
	this.password = password;
	this.preferences = new Preferences(theme);
	this.token = token;
}

function Preferences(theme){
	this.theme = theme;
}
