/**
 * @author Mariano
 */

window.onload = loadMain;
document.onclick = mouseClicked;

var main;

function loadMain() {

	main = true;
	$("#menuCategorias").accordion();
	Language.en();
	loadFisheye();
	document.getElementById("spanlogin").onclick = showHideLogin;

	$("#inputsearch").keydown(resolveSearchKeys);
	$("#searchForm").keydown(ignoreFormEnter);

	document.getElementById("spanregister").onclick = showRegisterDialog;
	document.getElementById("searchButton").onclick = search;
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

	buildCart(); // Enables cart drop zone.
}

function ignoreFormEnter(event) {
	if (event.which == 13)
		return false;
	else
		return true;
}

function search(event) {
	var parameters = 'criteria=' + $("#inputsearch").val();

	var subCategoryIndex = $("#categoryCBox").val();

	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetProductListByName' + '&' + parameters;

	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;

				var i = 1, j = 1; // Id counter(i) and tab counter(j).
				var qty = 0;
				$(response).find('product').each(function() {
					qty++;
				});

				/* Resize content */
				initializeContent(qty);

				$('div.product').html("");

				var noMatch = true;

				var out = '<' + $ITEM_CONTAINER_TAG + ' id="'
						+ $CATALOG_CONTAINER_ID
						+ '" class="products helper-reset helper-clearfix"/>';
				$('div.product').append(out);
				$(response)
						.find('product')
						.each(
								function() {
									out = '';
									var marker = $(this);
									var name = marker.find("name").text();
									var subcategoryID = marker.find(
											"subcategory_id").text();

									if (subcategoryID != subCategoryIndex
											&& subCategoryIndex != 'All')
										return;

									noMatch = false;

									var image_url = marker.find("image_url")
											.text();
									var price = marker.find("price").text();
									out += '<'
											+ $CATALOG_ITEM
											+ ' class="product-content corner-tr" id="'
											+ i + '">'
									out += '<div class="productBg"/>'
									// out += '<h5 class="' +
									// $CATALOG_ITEM_HEADER + '">' + name +
									// '</h5>';
									out += '<div id="description' + i++
											+ '" class="'
											+ $CATALOG_ITEM_DESCRIPTION
											+ ' hide">';
									out += '<img src="' + image_url + '" alt="'
											+ name + '" width="' + $IMG_WIDTH
											+ '" height="' + $IMG_HEIGHT
											+ '" class="image"></img>';
									out += '<div class="tabs">';
									out += '<ol><li><a href="#tabs-' + j
											+ '">Detalles</a></li>';
									out += '<li><a href="#tabs-' + (j + 1)
											+ '">Sinopsis</a></li></ol>';
									out += '<div id="tabs-' + j++ + '">';
									out += '<div id="details">';
									out += '<div class="divPrice">';
									out += '<p class="spanPrice">Precio por unidad: $'
											+ price + '</p>';
									out += '<input id="addtocart" type="button" value=""/>';
									out += '</div>';
									out += '<div class="name">' + name
											+ '<br /></div>';
									out += '<div class="autor">';
									out += 'Director: Dario Argento<br/>';
									out += 'Cast: Jessica Harper, Stefania Casini, Flavio Bucci, Miguel Bose, Barbara Magnolfi<br/>';
									out += 'Wild Side Films<br/>';
									out += '</div>';
									out += '<div class="category">';
									out += 'Genre: CATEGORY' + '<br/>';
									out += 'Format: FORMAT' + '<br/>';
									out += 'Original release date: DATE'
											+ '<br/>';
									out += 'Rating: RATING' + '<br/>';
									out += '</div>';
									out += '</div>';
									out += '</div>';
									out += '<div id="tabs-' + j++ + '">';
									out += '<div class="sinopsis">';
									out += 'A young American dancer travels to Europe to join a famous ballet school. As she arrives,';
									out += 'the camera turns to another young woman, who appears to be fleeing from the school. She returns ';
									out += 'to her apartment where she is gruesomely murdered by a hideous creature. Meanwhile, the young ';
									out += 'American is trying to settle in at the ballet school, but hears strange noises and is troubled ';
									out += 'by bizarre occurrences. She eventually discovers that the school is merely a front for a much more ';
									out += 'sinister organization.';
									out += '</div>';
									out += '</div>';
									out += '</div>';
									out += '</div>';
									out += '<img src="' + image_url + '" alt="'
											+ name + '" width="' + $THUMB_WIDTH
											+ '" height="' + $THUMB_HEIGHT
											+ '"/>';
									out += '<p class="spanPrice">$' + price
											+ '</p>';
									out += '<p class="productDetails"> Lalalalalalala </p>'
									out += '<h5 class="' + $CATALOG_ITEM_HEADER
											+ '">' + name + '</h5>';
									out += '<a href="description.html" title="Full product details" class="'
											+ $ICON
											+ ' '
											+ $ICON_INFO
											+ '">Full product details</a>';
									out += '<a href="' + $JS_OFF
											+ '" title="Add to cart" class="'
											+ $ICON + ' ' + $ICON_CART
											+ '">Add to cart</a>';
									out += '</' + $CATALOG_ITEM + '>';
									$(
											$ITEM_CONTAINER_TAG + '#'
													+ $CATALOG_CONTAINER_ID)
											.append(out);
								});

				if (noMatch)
					$('div.product')
							.html(
									"<h3>No se encontró ningun producto. Por favor, vuelva a buscar.</h3>");

				buildDraggables();
				enableTabs();
				slideHeaderUp();
			}
		}
	};
	request.send();
}

function resolveSearchKeys(event) {

	if (event.which == 38 || event.which == 40)
		return true;

	if (event.which != 13) {

		if ($("#inputsearch").val() == "")
			return;

		var products = new Array();
		var parameters = 'criteria=' + $("#inputsearch").val();
		var request = new XMLHttpRequest();
		var url = $CATALOG + 'GetProductListByName' + '&' + parameters;

		var index = 0;

		request.open('GET', url, true);
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200) {
					var response = request.responseXML;

					$(response).find('product').each(

					function() {

						var marker = $(this);
						var name = marker.find("name").text();

						products[index] = name;
						index++;

					});
					$("#inputsearch").autocomplete(products);
				}
			}
		};
		request.send();

	} else {
		search(event);
		return false;
	}
}

function clearSearchData() {
	if ($("#inputsearch").val() == Language.search)
		document.getElementById("inputsearch").value = "";
}

function mouseClicked(e) {
	checkLogin(e);
}

function showRegisterDialog() {

	loadRegisterForm();

	$("#divRegister").dialog( {
		close : function() {
			$("#registerForm")[0].reset();
			registerValidator.resetForm();
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

function slideHeaderUp() {

	if (main != true)
		return;

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
