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
	//buildCart(); // Enables cart drop zone.
	//requestFromServer('GetProductListByCategory', 'language_id=1&category_id=1&order=ASC&items_per_page=10&page=1');
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
	case 'GetProductList':
		getProductList(parameters);
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
	var height = 400 + 100 * qty;
	$("#pageWrapper").css("height", height);
	$("#footer").css("top", height);
}



/* Get product list by category and initializates car */
function getProductList(parameters) {
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetProductListBy' + parameters;
	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;

				var i = 1, j = 1; // Id counter(i) and tab counter(j).
				var qty = 0;
				$(response).find('product').each(function() { qty++; });

				/* Resize content */
				initializeContent(qty);
				
				
				if(qty == 0 )
					$('div.product').html("<h3>No se encontró ningun producto. Me gusta el jamon.</h3>");
				else $('div.product').html("");	// Clear content
				
				var out = '<' + $ITEM_CONTAINER_TAG + ' id="' + $CATALOG_CONTAINER_ID + '" class="products helper-reset helper-clearfix"/>';
				$('div.product').append(out);
				$(response).find('product').each( function() {
					out = '';
					var marker = $(this);
					var name = marker.find("name").text();
					var image_url = marker.find("image_url").text();
					var price = marker.find("price").text();
					out +=	'<' + $CATALOG_ITEM + ' class="product-content corner-tr" id="' + i + '">'
					out +=  '<div class="productBg"/>'
					//out +=		'<h5 class="' + $CATALOG_ITEM_HEADER + '">' + name + '</h5>';
					out +=		'<div id="description' + i++ + '" class="' + $CATALOG_ITEM_DESCRIPTION + ' hide">';
					out +=			'<img src="' + image_url + '" alt="' + name + '" width="' + $IMG_WIDTH + '" height="' + $IMG_HEIGHT + '" class="image"></img>';
					out +=			'<div class="tabs">';
					out +=				'<ol><li><a href="#tabs-' + j + '">Detalles</a></li>';
					out +=				'<li><a href="#tabs-' + (j + 1) + '">Sinopsis</a></li></ol>';
					out +=				'<div id="tabs-' + j++ + '">';
					out +=					'<div id="details">';
					out +=						'<div class="divPrice">';
					out +=							'<p class="spanPrice">Precio por unidad: $' + price + '</p>';
					out +=							'<input id="addtocart" type="button" value=""/>';
					out +=						'</div>';
					out +=					'<div class="name">' + name + '<br /></div>';
					out +=					'<div class="autor">';
					out +=						'Director: Dario Argento<br/>';
					out +=						'Cast: Jessica Harper, Stefania Casini, Flavio Bucci, Miguel Bose, Barbara Magnolfi<br/>';
					out +=						'Wild Side Films<br/>';
					out +=					'</div>';
					out +=					'<div class="category">';
					out +=						'Genre: CATEGORY' + '<br/>';
					out +=						'Format: FORMAT' + '<br/>';
					out +=						'Original release date: DATE' + '<br/>';
					out +=						'Rating: RATING' + '<br/>';
					out +=					'</div>';
					out +=				'</div>';
					out +=			'</div>';
					out +=			'<div id="tabs-' + j++ + '">';
					out +=				'<div class="sinopsis">';
					out +=					'A young American dancer travels to Europe to join a famous ballet school. As she arrives,';
					out +=					'the camera turns to another young woman, who appears to be fleeing from the school. She returns ';
					out +=					'to her apartment where she is gruesomely murdered by a hideous creature. Meanwhile, the young ';
					out +=					'American is trying to settle in at the ballet school, but hears strange noises and is troubled ';
					out +=					'by bizarre occurrences. She eventually discovers that the school is merely a front for a much more ';
					out +=					'sinister organization.';
					out +=				'</div>';
					out +=			'</div>';
					out +=		'</div>';
					out +=	'</div>';
					out +=	'<img src="' + image_url + '" alt="' + name + '" width="' + $THUMB_WIDTH + '" height="' + $THUMB_HEIGHT + '"/>';
					out +=	'<p class="spanPrice">$' + price + '</p>';
					out +=  '<p class="productDetails"> Lalalalalalala </p>'
					out += '<h5 class="' + $CATALOG_ITEM_HEADER + '">' + name + '</h5>';
					out +=	'<a href="description.html" title="Full product details" class="' + $ICON + ' ' + $ICON_INFO + '">Full product details</a>';
					out +=	'<a href="' + $JS_OFF + '" title="Add to cart" class="' + $ICON + ' ' + $ICON_CART + '">Add to cart</a>';
					out +=	'</' + $CATALOG_ITEM + '>';
					$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).append(out);
				});
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

/* Injects categories and subcategories from global variable 'categories' into html */
// VALUE = 2!!!!!
function injectCategories() {
	var i, j, out = "";
	
	// Inject categories into search bar.
	out +=	'<option class="searchOption" selected="selected" disabled="true" value="0">' + Language.selectCategory + '</option>';
	out +=	'<option class="searchOption" value="1">' + Language.allCategories + '</option>';
	for (i = 0; i < categories.length; i++) {
		out +=	'<optgroup class="searchOption" label="' + categories[i].name + '">';
		for (j = 0; j < categories[i].subcategories.length; j++)
			out +=	'<option class="searchOption" value="2">' + categories[i].subcategories[j].name + '</option>';
		out +=	'</optgroup>';
	}
	$("select#categoryCBox").html(out);

	// Inject categories into accordion.
	out = "";
	for (i = 0; i < categories.length; i++) {
		out +=	'<h3><a class="categoryLink" href="#">' + categories[i].name + '</a></h3>';
		out +=	'<div><li>';
		for (j = 0; j < categories[i].subcategories.length; j++)
			out +=	'<a class="subCategoryLink" href="#">' + categories[i].subcategories[j].name + '</a><br/>';
		out +=	'</li></div>';
	}
	$("#menuCategorias").html(out);

	// Inject categories into categories menu (below search bar).
	out = "";
	for (i = 0; i < categories.length; i++) {
		out +=	'<div class="categoryBlock">';
		out +=		'<div class="categoryBlockTitle">';
		out +=			'<a class="categoryLink" href="#">' + categories[i].name + '</a>';
		out +=		'</div>';
		out +=		'<div class="categoryBlockSub">';
		for (j = 0; j < categories[i].subcategories.length; j++)
			out +=		'<a class="subCategoryLink" href="#">' + categories[i].subcategories[j].name + '</a>';
		out +=		'</div>';
		out +=	'</div>';
		//out +=	'</div>';	// ESTE DIV SE PUEDE ELIMINAR???? CREO QUE SI, PROBE Y NO CAMBIA NADA.
	}
	$("#categorySelector").html(out);
	
	// Inject categories into categories menu (below search bar).
	out = "";
	for (i = 0; i < categories.length; i++) {
		out +=	'<div class="footerBlock">';
		out +=			'<a class="categoryLink" href="#">' + categories[i].name + '</a><br/>';
		for (j = 0; j < categories[i].subcategories.length; j++)
			out +=		'<a class="subCategoryLink" href="#">' + categories[i].subcategories[j].name + '</a>';
		out +=	'</div>';
		//out +=	'</div>';	// ESTE DIV SE PUEDE ELIMINAR???? CREO QUE SI, PROBE Y NO CAMBIA NADA.
	}
	$("#footerInfo").html(out);
	
	
	// Event delegation for categories in '#categorySelector'.
	$( '.categoryBlock' ).click(function( event ) {
		var $item = $(this);
		$target = $( event.target );
		if ($target.is( 'a.categoryLink' )){
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.
			requestFromServer('GetProductList', 'Category&language_id=' + currentLang + '&category_id=' + (getCategoryIndex($target.html()) + 1) + '&order=ASC&items_per_page=10&page=1');
			slideHeaderUp();
		} else if ($target.is( 'a.subCategoryLink' )){
			var ids = getSubCategoryIndex($target.html());
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.
			requestFromServer('GetProductList', 'Subcategory&language_id=' + currentLang + '&category_id=' + (ids[0]+1) + '&subcategory_id=' + (ids[1]+1) + '&order=ASC&items_per_page=10&page=1');
			slideHeaderUp();
		}
		return false;
	});
	

	// Event delegation for categories in '#categorySelector'.
	$( '#menuCategorias' ).click(function( event ) {
		var $item = $(this);
		$target = $( event.target );
		if ($target.is( 'a.categoryLink' )){
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.
			requestFromServer('GetProductList', 'Category&language_id=' + currentLang + '&category_id=' + (getCategoryIndex($target.html()) + 1) + '&order=ASC&items_per_page=10&page=1');
			slideHeaderUp();
		} else if ($target.is( 'a.subCategoryLink' )){
			var ids = getSubCategoryIndex($target.html());
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.
			requestFromServer('GetProductList', 'Subcategory&language_id=' + currentLang + '&category_id=' + (ids[0]+1) + '&subcategory_id=' + (ids[1]+1) + '&order=ASC&items_per_page=10&page=1');
			slideHeaderUp();
		}
		return false;
	});

	// Event delegation for categories in '#categorySelector'.
	$( '.footerBlock' ).click(function( event ) {
		var $item = $(this);
		$target = $( event.target );
		if ($target.is( 'a.categoryLink' )){
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.
			requestFromServer('GetProductList', 'Category&language_id=' + currentLang + '&category_id=' + (getCategoryIndex($target.html()) + 1) + '&order=ASC&items_per_page=10&page=1');
			slideHeaderUp();
		} else if ($target.is( 'a.subCategoryLink' )){
			var ids = getSubCategoryIndex($target.html());
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.
			requestFromServer('GetProductList', 'Subcategory&language_id=' + currentLang + '&category_id=' + (ids[0]+1) + '&subcategory_id=' + (ids[1]+1) + '&order=ASC&items_per_page=10&page=1');
			slideHeaderUp();
		}
		return false;
	});
}

function getCategoryIndex(categoryName){
	var i;
	for(i = 0; i < categories.length; i++)
		if (categories[i].name == categoryName)
			return i;
	return -1;
}

function getSubCategoryIndex(subcategoryName){
	var i, j, ans = new Array(0);
	for(i = 0; i < categories.length; i++)
		for(j = 0; j < categories[i].subcategories.length; j++)
			if (categories[i].subcategories[j].name == subcategoryName){
				ans.push(i); ans.push(j);
				return ans;
			}
	return null;
}
