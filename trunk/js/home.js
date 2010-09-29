/**
 * @author Mariano
 */

window.onload = loadMain;
var headerMinPos;

function loadMain() {
	
	headerMinPos = -200;
	
	document.getElementById("spanlogin").onclick = showHideLogin;
	document.getElementById("spanregister").onclick = showRegisterDialog;
	document.getElementById("searchButton").onclick = slideHeaderUp;
	document.getElementById("inputsearch").onclick = clearSearchData;
	document.getElementById("homeLink").onclick = slideHeaderDown;
	loadRegisterForm();
}

function clearSearchData(){
	document.getElementById("inputsearch").value ="";
	
}

function showRegisterDialog() {

	$("#divRegister").dialog( {
		"width" : 650,
		"modal" : "true",
		"resizable" : "false",
		"autoOpen" : "false",
		"title" : "Registraci&oacute;n",
	});
	
	
	 var widget= $("#divRegister").dialog("widget");
	 widget.css("margin","auto auto");
	 widget.css("top","-650px");
	 widget.css("position","relative");
	 widget.css("-moz-box-shadow", " 0 0px 20px rgba(0, 0, 0, 1)");
	 widget.css("-moz-border-radius","10px 10px 10px 10px");
	 widget.css("background-color","transparent");
	 widget.css("border","2px solid rgba(255,255,255,0.3)");
	 
	 /*
		 * var overlay = $(".ui-widget-overlay");
		 * overlay.css("background-color", "#000");
		 */
}


function slideHeaderUp(){
	
	$("#header").animate({"top": "-250px"}, 1000);
	$("#headerTitle").animate({"float":"left","top": "235px"}, 1000);
	$("#titleImg").animate({ "left": "-370px", "position":"relative","height": "175px"}, 1000);
	
	$("#divfisheye").fadeOut("slow");
}

function slideHeaderDown(){
	
	$("#header").animate({"top": "0px"}, 1000);
	$("#headerTitle").animate({"float":"left","top": "20%"}, 1000);
	$("#titleImg").animate({ "left": "0px","height": "300px"}, 1000);
	$("#divfisheye").fadeIn("slow");
}