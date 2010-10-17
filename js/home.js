/**
 * @author Mariano
 */
window.onload = loadMain;
document.onclick = mouseClicked;

var main;

// I love Stack overflow:
// http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery
// Just modified it to work with the hash
function getURLParameter(name) {
	return unescape((RegExp(name + '=' + '(.+?)(&|$)').exec(location.hash) || [
			, null ])[1]);
}

// This one works with real argumetns "?"
function getURLParameter2(name) {
	return unescape((RegExp(name + '=' + '(.+?)(&|$)').exec(location.href) || [
			, null ])[1]);
}

function loadMain() {

	main = true;
	configureValidators();
	$("#menuCategorias").accordion();

	getCategories($LANG_QTY);
	getSubCategories($LANG_QTY);

	loadSession();
	loadFisheye();
	loadLanguage();

	$("#inputsearch").keydown(resolveSearchKeys);
	$("#searchForm").keydown(ignoreFormEnter);
	$("#searchButton").click(function() {
		slideHeaderUp(function() {
			search();
		});
	});
	document.getElementById("linklogin").onclick = showHideLogin;
	document.getElementById("spanlogout").onclick = logout;
	document.getElementById("spanpreferences").onclick = showPreferences;
	document.getElementById("spanregister").onclick = showRegisterDialog;
	document.getElementById("linkmyaccount").onclick = showHideAccount;
	document.getElementById("inputsearch").onclick = clearSearchData;
	document.getElementById("homeLink").onclick = slideHeaderDown;
	document.getElementById("loginForm").onsubmit = logIn;
	document.getElementById("languageCombo").onchange = function() {
		currentLang = document.getElementById("languageCombo").selectedIndex + 1;
		setCookie("language", $.toJSON(currentLang), undefined, '/', '', false);
		if (currentLang == $EN)
			Language.en();
		else
			Language.es();
	};

	resolveAutoComplete();

	buildCart(); // Enables cart drop zone.

	parseArguments();
}


function search(event, callback) {

	showLoadingDialog();

	var parameters = 'criteria=' + $("#inputsearch").val();

	parent.location.hash = "content=true&search=" + $("#inputsearch").val();

	var subCategoryIndex = $("#categoryCBox").val();

	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetProductListByName' + '&' + parameters;

	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;

				var i = 1, j = 1; // Id counter(i) and tab counter(j).

				/* Resize content */
				initializeContent();

				$('div.product').html("");

				var noMatch = true;

				$("#content").html('<div class="product"/>');
				var out = '<' + $ITEM_CONTAINER_TAG + ' id="'
						+ $CATALOG_CONTAINER_ID
						+ '" class="products helper-reset helper-clearfix"/>';
				$('div.product').html(out);

				idIndex = 1;

				$(response)
						.find('product')
						.each(
								function() {
									var override = (subCategoryIndex == Language.allCategories);
									if (override)
										printProduct($(this), undefined);
									else
										printProduct($(this), subCategoryIndex);
									noMatch = false;
								});
				if (noMatch)
					$('div.product')
							.html(
									"<h3>No se encontró ningun producto. Por favor, vuelva a buscar.</h3>");
				buildDraggables();
				enableTabs();

				hideLoadingDialog();
				if (callback != null)
					callback();
			}
		}
	};
	request.send();
}


// To prevent animation on linking product
function loadContentStructure() {

	$("#fisheye").css("display", "none");
	$("#fisheyeBottom").css("display", "none");

	$("#divcategory").css("display", "none");

	$("#headerBorder").css( {
		"top" : "112px"
	});

	$("#semiHeader").css( {
		"top" : "160px",
		"height" : "65px"
	});

	$("#header").css( {
		"height" : "150px"
	});
	$("#headerContent").css( {
		"top" : "-150px"
	});
	$("#headerTitle").css( {
		"top" : "125px",
		"left" : "-215px"
	});

	$("#titleImg").css( {
		"height" : "150px"
	});

	$("#pageWrapper").css("visibility", "visible");

	main = false;

}

// To make bookmarking and linking easier
function parseArguments() {

	var content = getURLParameter("content");
	var product = getURLParameter("product");
	var searchTag = getURLParameter("search");
	
	var fb = getURLParameter2("fb");

	// Clear url hash
	parent.location.hash = "";
	
	// If Facebook, override product tag
	if( fb != "null"){
		product = fb;
	} 
	
	
	if (searchTag != "null") {
		$("#inputsearch").val(searchTag);

		if (content == "true")
			loadContentStructure();

		slideHeaderUp(function() {
			search(null, null);
		});
	} else 	if (product != "null") {
		$("#inputsearch").val(product);

		if (content == "true")
			loadContentStructure();

		slideHeaderUp(function() {
			search(null, function() {

				$(".product-header").each(function() {

					var title = $(this).text();

					if (title == product) {
						var productContent = $(this).parent();

						var detailsButton = productContent.find(".icon-zoom");

						detailsButton.trigger('click');
					}
				});

			});
		});
	}
}

function ignoreFormEnter(event) {
	if (event.which == 13)
		return false;
	else
		return true;
}

function resolveAutoComplete() {

	var products = new Array();
	var parameters = 'language_id=' + $ES + '&category_id=1';
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetProductListByCategory' + '&' + parameters;

	var index = 0;

	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;

				$(response).find('product').each(function() {

					var marker = $(this);
					var name = marker.find("name").text();

					products[index] = name;
					index++;

				});

				// Got DVD's, now Books!
				var bookParameters = 'language_id=' + $ES + '&category_id=2';
				var bRequest = new XMLHttpRequest();
				var bUrl = $CATALOG + 'GetProductListByCategory' + '&'
						+ bookParameters;

				bRequest.open('GET', bUrl, true);
				bRequest.onreadystatechange = function() {
					if (bRequest.readyState == 4) {
						if (bRequest.status == 200) {
							var bResponse = bRequest.responseXML;

							$(bResponse).find('product').each(function() {

								var bMarker = $(this);
								var bName = bMarker.find("name").text();

								products[index] = bName;
								index++;
							});

							$("#inputsearch").autocomplete(products, {
								matchContains : true,
								selectFirst : false
							});
						}
					}
				};
				bRequest.send();
			}
		}
	};
	request.send();
}

function resolveSearchKeys(event) {
	if (event.which == 38 || event.which == 40)
		return true;

	if (event.which == 13) {
		slideHeaderUp(function() {
			search(event, null);
		});

		return false;
	}
}

function clearSearchData() {
	if ($("#inputsearch").val() == Language.search)
		document.getElementById("inputsearch").value = "";
}

function mouseClicked(e) {
	checkLogin(e);
	checkMyAccount(e);
}

function showLoadingDialog() {
	$("#divLoading").dialog( {
		close : function() {
			return false;
		},
		"modal" : "true",
		"resizable" : "false",
		dialogClass : "loadingClass",
		draggable : false,
		closeOnEscape : false
	});

	$('.loadingClass div.ui-dialog-titlebar').hide();

	$('.loadingClass div.ui-dialog-titlebar').hide();

	var widget = $("#divLoading").dialog("widget");
	widget.css("margin", "auto");

	widget.css("left", "0");
	widget.css("right", "0");

	widget.css("top", "30px");
	widget.css("bottom", "0");
	widget.css("height", "50px");
	widget.css("width", "200px");
	widget.css("text-align", "left");

	widget.css("position", "absolute");
	widget.css("background-color", "transparent");
	widget.css("background-image", "none");
	widget.css("color", "#fff");
	widget.css("border", "none");
}

function hideLoadingDialog() {
	$("#divLoading").dialog("destroy");
}

function showRegisterDialog() {

	loadRegisterForm();

	$("#divRegister").dialog( {
		close : function() {
			resetRegisterForm();
		},
		"width" : 650,
		"modal" : "true",
		"resizable" : "false",
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
	widget.css("height", "670px");
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

function slideHeaderUp(callback) {

	if (main != true) {
		if (callback != undefined)
			callback();
		return;
	}

	$("#fisheye").fadeOut(500);
	$("#fisheyeBottom").fadeOut(500);

	$("#divcategory").fadeOut(500);

	setTimeout(function() {

		$("#headerBorder").animate( {
			"top" : "112px"
		}, 1000);

		$("#semiHeader").animate( {
			"top" : "160px",
			"height" : "65px"
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

			if (callback != undefined)
				callback();
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

	$("#semiHeader").animate( {
		"top" : "300px",
		"height" : "140px"
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

		$("#fisheye").fadeIn(1000);
		$("#fisheyeBottom").fadeIn(1000);
		$("#headerBorder").fadeIn(1000);
		$("#divcategory").fadeIn(1000);

		setTimeout(function() {

			main = true;
		}, 1000);
	}, 1000);

}

function loadLanguage() {
	var cookie = getCookie("language");
	if (cookie) {
		currentLang = $.secureEvalJSON(cookie);
		document.getElementById("languageCombo").selectedIndex = currentLang - 1;
	} else {
		currentLang = $EN;
		setCookie("language", $.toJSON(currentLang), undefined, '/', '', false);
	}
	if (currentLang == $EN)
		Language.en();
	else
		Language.es();
}

function loadSession() {
	var cookie = getCookie("session");
	if (cookie) {
		changeDivLink();
		session = $.secureEvalJSON(getCookie("session"));
	}
}

function changeDivLink() {
	if (getCookie("session")) {
		document.getElementById("divlogin").style.display = 'none';
		document.getElementById("linklogin").className = 'lang_login text_link';
		document.getElementById("spanlogin").className = 'unclicked';

		$("#spanmyaccount").css("display", "inline");
		$("#spanregister").css("display", "none");
		$("#spanlogin").css("display", "none");
		$("#welcomeuser").fadeIn(600);
		$("#welcomeuser").fadeOut(2000);
	} else {
		document.getElementById("divmyaccount").style.display = 'none';
		document.getElementById("linkmyaccount").className = 'lang_myaccount text_link';
		document.getElementById("spanmyaccount").className = 'unclicked';

		$("#divmyaccount").hide("slide", {
			direction : "up"
		}, 250);

		myaccountShowing = false;

		$("#spanmyaccount").css("display", "none");
		$("#spanregister").css("display", "inline");
		$("#spanlogin").css("display", "inline");
	}
}