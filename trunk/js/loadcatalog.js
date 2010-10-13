/* Global */
var categories; // Categories array.

/*
 * Category constructor Each category has and id, code, name and an array of
 * subcategories. Each subcategory is a Category, but has no subcategories.
 */
function Category(id, code, name) {
	this.id = id;
	this.code = code;
	this.name = name;
	this.subcategories = new Array();
};

$(function() {
	buildCart(); // Enables cart drop zone.
	requestFromServer('GetProductListByCategory',
			'language_id=1&category_id=1&order=ASC&items_per_page=10&page=1');
});

function requestFromServer(method, parameters) {
	switch (method) {
	case 'GetCategoryList':
		getCategoryList(parameters);
		break;
	case 'GetSubcategoryList':
		getSubcategoryList(parameters);
		break;
	case 'GetCategories':
		getCategories(parameters);
		break;
	case 'GetProductListByCategory':
		getProductListByCategory(parameters);
		break;
	case 'GetCountryList':
		getCountryList(parameters);
		break;
	case 'GetStateList':
		getStateList(parameters);
		break;
	case 'SignIn':
		signIn(parameters);
		break;
	case 'CreateAccount':
		createAccount(parameters);
		break;
	default:
		alert("Invalid method");
	}
}

function initializeContent(qty) {
	var height = 300 * (qty / 3);
	$("#pageWrapper").css("height", height);
	$("#footer").css("top", height);
}

/* Get product list by category and initializates car */
function getProductListByCategory(parameters) {
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetProductListByCategory' + '&' + parameters;
	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;

				var i = 1, j = 1; // Id counter(i) and tab counter(j).
				var out = '<' + $ITEM_CONTAINER_TAG + ' id="'
						+ $CATALOG_CONTAINER_ID
						+ '" class="products helper-reset helper-clearfix">';

				var qty = 0;

				$(response).find('product').each(function() {
					qty++;
				});

				/* Resize content */
				initializeContent(qty);

				$(response)
						.find('product')
						.each(
								function() {
									var marker = $(this);
									var name = marker.find("name").text();
									var image_url = marker.find("image_url")
											.text();
									var price = marker.find("price").text();
									out += '<'
											+ $CATALOG_ITEM
											+ ' class="product-content corner-tr" id="'
											+ i + '">'
									out += '<h5 class="' + $CATALOG_ITEM_HEADER
											+ '">' + name + '</h5>';
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
								});
				out += '</' + $ITEM_CONTAINER_TAG + '>';
				$($ITEM_CONTAINER_TAG + '#products').remove();
				$('div.product').append(out);
				buildDraggables();
				enableTabs();
			} else {
				alert('Error: ' + request.statusText);
			}
		}
	};
	request.send();
}

function getCategories(language) {
	requestFromServer('GetCategoryList', language);

	for ( var i = 0; i < categories.length; i++) {
		requestFromServer('GetSubcategoryList', language + '&category_id='
				+ (i + 1));
	}
}

function getCategoryList(parameters) {
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetCategoryList' + '&' + parameters;
	request.open('GET', url, false);
	request.send();
	if (request.status == 200) {
		var response = request.responseXML;
		categories = new Array();
		$(response).find('category').each(
				function() {
					var marker = $(this);
					categories.push(new Category(marker.attr('id'), marker
							.find("code").text(), marker.find("name").text()));
				});
	} else {
		alert('Error: ' + request.statusText);
	}
}

function getSubcategoryList(parameters) {
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetSubcategoryList' + '&' + parameters;
	request.open('GET', url, false);
	request.send();
	if (request.status == 200) {
		var response = request.responseXML;
		$(response).find('subcategory').each(
				function() {
					var marker = $(this);
					var category_id = parseInt(marker.find('category_id')
							.text()) - 1;
					categories[category_id].subcategories.push(new Category(
							marker.attr('subcategory_id'), marker.find("code")
									.text(), marker.find("name").text()));
				});
	} else {
		alert('Error: ' + request.statusText);
	}
}

/*
 * Injects categories and subcategories from global variable 'categories' into
 * html
 */
// VALUE = 2!!!!!
function injectCategories() {
	var i, j, out = "";
	out += '<option class="searchOption" selected="selected" disabled="true" value="0">'
			+ Language.selectCategory + '</option>';
	out += '<option class="searchOption" value="1">' + Language.allCategories
			+ '</option>';
	for (i = 0; i < categories.length; i++) {
		out += '<optgroup class="searchOption" label="' + categories[i].name
				+ '">';
		for (j = 0; j < categories[i].subcategories.length; j++) {
			out += '<option class="searchOption" value="2">'
					+ categories[i].subcategories[j].name + '</option>';
		}
		out += '</optgroup>';
	}
	$("select#categoryCBox").html(out);

	out = "";
	for (i = 0; i < categories.length; i++) {
		out += '<h3><a href="#">' + categories[i].name + '</a></h3><div><li>';
		for (j = 0; j < categories[i].subcategories.length; j++) {
			out += ' <a href="#">' + categories[i].subcategories[j].name
					+ '</a><br/>';
		}
		out += '</li></div>';
	}
	$("#menuCategorias").html(out);

	out = "";
	for (i = 0; i < categories.length; i++) {
		out += '<div class="categoryBlock"><div class="categoryBlockTitle"><a class="categoryLink" href="#">'
				+ categories[i].name
				+ '</a></div><div class="categoryBlockSub">';
		for (j = 0; j < categories[i].subcategories.length; j++) {
			out += '<a class="subCategoryLink" href="#">'
					+ categories[i].subcategories[j].name + '</a>';
		}
		out += '</div></div></div>';
	}

	$("#categorySelector").html(out);
}
