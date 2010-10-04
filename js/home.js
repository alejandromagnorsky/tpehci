/**
 * @author Mariano
 */

window.onload = loadMain;
document.onclick = mouseClicked;


var main;


function loadMain() {

	main = true;
	Language.en();
	document.getElementById("spanlogin").onclick = showHideLogin;
	document.getElementById("spanregister").onclick = showRegisterDialog;
	document.getElementById("searchButton").onclick = slideHeaderUp;
	document.getElementById("inputsearch").onclick = clearSearchData;
	document.getElementById("homeLink").onclick = slideHeaderDown;
	loadRegisterForm();

	$("#menuCategorias").accordion();
}

function clearSearchData() {
	document.getElementById("inputsearch").value = "";

}

function mouseClicked(e) {
	checkLogin(e);
}

function showRegisterDialog() {

	$("#divRegister").dialog( {
		close: function(){$("#divRegister").dialog("destroy");},
		"width" : 650,
		"modal" : "true",
		"resizable" : "false",
		"autoOpen" : "false",
		"title" : Language.register,
		draggable : false
	});
	
	
	var widget = $("#divRegister").dialog("widget");
	widget.css("margin", "auto");
	widget.css("margin-top", "0");

	widget.css("left", "0");
	widget.css("right", "0");

	widget.css("top", "50px");
	widget.css("bottom", "0");
	widget.css("height", "750px");
	widget.css("width", "600px");
	widget.css("text-align", "left");

	widget.css("position", "absolute");
	widget.css("-moz-box-shadow", " 0 0px 20px rgba(0, 0, 0, 1)");
	widget.css("-moz-border-radius", "10px 10px 10px 10px");
	widget.css("background-color", "transparent");
	widget.css("border", "2px solid rgba(255,255,255,0.3)");

	/*
	 * var overlay = $(".ui-widget-overlay"); overlay.css("background-color",
	 * "#000");
	 */
}

function slideHeaderUp() {
	
	if(main != true )
		return;
	
	$("#divfisheye").fadeOut(500);

	$("#headerBorder").fadeOut(500, function() {

		$("#header").animate( {
			"height" : "150px"
		}, 1000);
		$("#headerContent").animate( {
			"top" : "-150px"
		}, 1000);
		$("#headerTitle").animate( {
			"top" : "145px",
			"left" : "-215px"
		}, 1000);

		$("#titleImg").animate( {
			"height" : "150px"
		}, 1000, function() {

			$("#headerBorder").fadeIn(1000);
			$("#pageWrapper").css("display", "block");
			
			main = false;
			// ACA CARGA LA PAGINA
		});
	});

}

function slideHeaderDown() {
	
	if(main == true)
		return;

	$("#headerBorder").fadeOut(500, function() {

		$("#header").animate( {
			"height" : "300px"
		}, 1000);
		$("#headerContent").animate( {
			"top" : "0px"
		}, 1000);
		$("#headerTitle").animate( {
			"top" : "50px",
			"left" : "20px"
		}, 1000);
		$("#titleImg").animate( {
			"height" : "225px"
		}, 1000);
		
		$("#pageWrapper").css("display", "none");

		setTimeout(function() {

			$("#divfisheye").fadeIn("slow");
			$("#headerBorder").fadeIn(1000);
			
			main = true;
		}, 1000);

	});
}