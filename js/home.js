/**
 * @author Mariano
 */

window.onload = loadMain;
document.onclick = mouseClicked;
$EN = 1;
$ES = 2;
var currentLang = $EN;
var main;

function loadMain() {

	main = true;
	$("#menuCategorias").accordion();
	Language.en();	
	loadFisheye();
	document.getElementById("spanlogin").onclick = showHideLogin;
	document.getElementById("spanregister").onclick = showRegisterDialog;
	document.getElementById("searchButton").onclick = slideHeaderUp;
	document.getElementById("inputsearch").onclick = clearSearchData;
	document.getElementById("homeLink").onclick = slideHeaderDown;
	document.getElementById("loginForm").onsubmit = logIn;
	document.getElementById("languageCombo").onchange = function() {
		currentLang = document.getElementById("languageCombo").selectedIndex + 1;
		if (currentLang == $EN)
			Language.en();
		else
			Language.es();
	};	
}

function clearSearchData() {
	document.getElementById("inputsearch").value = "";

}

function mouseClicked(e) {
	checkLogin(e);
}

function showRegisterDialog() {
	
	loadRegisterForm();
	
	$("#divRegister").dialog( {
		close : function() {
			$("#registerForm").validate().resetForm();
			$("#divRegister").dialog("destroy");			
		},
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

	widget.css("top", "30px");
	widget.css("bottom", "0");
	widget.css("height", "780px");
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

	if (main != true)
		return;

	$("#divfisheye").fadeOut(500);

	setTimeout(function() {

		$("#headerBorder").animate( {
			"top" : "112px"
		}, 1000);

		$("#header").animate( {
			"height" : "150px"
		}, 1000);
		$("#headerContent").animate( {
			"top" : "-150px"
		}, 1000);
		$("#headerTitle").animate( {
			"top" : "125px",
			"left" : "-215px"
		}, 1000);

		$("#titleImg").animate( {
			"height" : "150px"
		}, 1000, function() {

			$("#pageWrapper").css("visibility", "visible");

			main = false;
			// ACA CARGA LA PAGINA
		});
	}, 500);

}

function slideHeaderDown() {

	if (main == true)
		return;

	$("#pageWrapper").css("visibility", "hidden");

	$("#headerBorder").animate( {
		"top" : "262px"
	}, 1000);

	$("#header").animate( {
		"height" : "300px"
	}, 1000);
	$("#headerContent").animate( {
		"top" : "0px"
	}, 1000);
	$("#headerTitle").animate( {
		"top" : "25px",
		"left" : "20px"
	}, 1000);
	$("#titleImg").animate( {
		"height" : "225px"
	}, 1000);

	setTimeout(function() {

		$("#divfisheye").fadeIn(1000);
		$("#headerBorder").fadeIn(1000);

		setTimeout(function(){
		
			main = true;
		}, 1000);
	}, 1000);

}