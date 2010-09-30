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
	
	$( "#menuCategorias" ).accordion();
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
	 widget.css("margin","auto");
	 widget.css("margin-top","0");

	 widget.css("left","0");
	 widget.css("right","0");
	 
	 widget.css("top","50px");
	 widget.css("bottom","0");
	 widget.css("height","750px");
	 widget.css("width","600px");
	 widget.css("text-align","left");
	 
	 widget.css("position","absolute");
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
	
	$("#header").animate({"height": "150px"}, 1000);
	$("#headerContent").animate({"top": "-150px"}, 1000);
	$("#headerTitle").animate({"top": "135px", "left": "-215px"}, 1000);
	$("#titleImg").animate({ "height": "175px"}, 1000);
	
	$("#divfisheye").fadeOut("slow", function() {
			$("#pageWrapper").fadeIn("slow",function() {
				
				
				
			}); 
		}); 

}

function slideHeaderDown(){
	
	$("#header").animate({"height": "300px"}, 1000);
	$("#headerContent").animate({"top": "0px"}, 1000);
	$("#headerTitle").animate({"top": "-20px", "left" : "0"	}, 1000);
	$("#titleImg").animate({ "height": "300px"}, 1000);
	
	$("#pageWrapper").fadeOut("slow", function() {
		$("#divfisheye").fadeIn("slow");
	}); 
}