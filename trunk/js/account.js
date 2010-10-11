$(function(){
    $(".tabs").tabs();
    Language.es();   
    //document.getElementById("tabPref").onclick = loadPreferences;
	//document.getElementById("themeForm").onsubmit = savePreferences;	
});

function initializeModValidator(){
	modifyValidator = $("#modifyForm").validate({
    
        errorElement: "div",
        
        
        submitHandler: register
        	
        /*
         invalidHandler: function(form, validator){
         $(".regWarning").css("visibility", "visible");
         }
         */
    });
}



function loadAccount(){
    requestFromServer('GetAccount', 'username=' + username + '&authentication_token=' + authenticationToken);
}

function getAccount(parameters){
    var url = $COMMON + 'GetAccount' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200) {            
                var response = request.responseXML;
                if ($(response).find("response").attr('status') == 'ok') {
					$("#modify_clientname").attr("value","$(response).find('name').text()");
					$("#modify_datepicker").attr("value","$(response).find('birth_date').text()");
					$("#modify_email").attr("value","$(response).find('email').text()");
				}
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}


function loadPreferences(){
    requestFromServer('GetAccountPreferences', 'username=' + username + '&authentication_token=' + authenticationToken);
}

function savePreferences(){
	if($("input[value='Orange']").attr("checked") == true)
		requestFromServer('SetAccountPreferences', 'username=' + username + '&authentication_token=' + authenticationToken + '&value=1');
	else
		requestFromServer('SetAccountPreferences', 'username=' + username + '&authentication_token=' + authenticationToken + '&value=2');
}

function getAccountPreferences(parameters){
    var url = $COMMON + 'GetAccountPreferences' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200) {
            
                var response = request.responseXML;
                
                alert($(response).find('value'));
                
                $("input[value='Twitter']").attr("checked", "checked");
                $("input[value='Orange']").attr("checked", "");
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}


function setAccountPreferences(parameters){
    var url = $COMMON + 'SetAccountPreferences' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200) {            
                var response = request.responseXML;                
                if ($(response).find("response").attr('status') == 'ok')
					alert("Se ha guardado su configuración"); 
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}

function logout(){
	requestFromServer('SignOut', 'username=' + username + '&authentication_token=' + authenticationToken);
}
	

function signout(parameters){
	var url = $SECURITY + 'Signout' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200) {            
                var response = request.responseXML;                
                if ($(response).find("response").attr('status') == 'ok')
					alert("La sesión ha sido cerrada correctamente"); 
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}