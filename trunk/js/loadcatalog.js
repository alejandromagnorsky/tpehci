/* API Services */
$COMMON = '/service/Common.groovy?method=';
$SECURITY = '/service/Security.groovy?method=';
$CATALOG = '/service/Catalog.groovy?method=';
$ORDER = '/service/Order.groovy?method=';

/* Images */
$IMG_WIDTH = 250;
$IMG_HEIGHT = 360;

/* Thumbs */
$THUMB_WIDTH = 96;
$THUMB_HEIGHT = 125;

/* Misc */
$JS_OFF = 'link/al/cart/cuando/js/esta/off';

/* Global */
var request;
var categories;	// Categories array.

function Category(id, code, name){
	this.id = id;
	this.code = code;
	this.name = name;
	this.subcategories = new Array();
};


$(function(){
	/* this function must be called at the very beginning of everything */
	requestFromServer('GetCategories', 'language_id=1');
	
	requestFromServer('GetProductListByCategory', 'language_id=1&category_id=1&order=ASC&items_per_page=5&page=1');
	
	
});

function requestFromServer(method, parameters){
	if ( method == 'GetCategoryList' ){
		getCategoryList(parameters);
	} else if ( method == 'GetSubcategoryList' ){
		getSubcategoryList(parameters);
	} else if ( method == 'GetCategories' ){
		getCategories(parameters);
	} else if ( method == 'GetProductListByCategory' ){
		getProductListByCategory(parameters);
		
	}
}

function getProductListByCategory(parameters){
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetProductListByCategory' + '&' + parameters;
	request.open('GET', url, true);
	request.onreadystatechange = function(){
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;
				
				var i=1, j=1;	// Id counter(i) and tab counter(j).
				var out = "";
				$(response).find('product').each(function() {
					var marker = $(this);
					var name = marker.find("name").text();
					var image_url = marker.find("image_url").text();
					var price = marker.find("price").text();
					out +=	'<li class="product-content corner-tr" id="' + i + '">'
					out +=		'<h5 class="product-header">' + name + '</h5>';
					out +=		'<div id="description' + i++ + '" class="description hide">';
					out +=			'<img src="' + image_url + '" alt="' + name + '" width="' + $IMG_WIDTH + '" height="' + $IMG_HEIGHT + '" class="image"></img>';
					out +=			'<div class="tabs">';
                   	out +=			    '<ol><li><a href="#tabs-' + j + '">Detalles</a></li>';
					out +=				'<li><a href="#tabs-' + (j+1) + '">Sinopsis</a></li></ol>';
					out +=				'<div id="tabs-' + j++ + '">';
					out +=					'<div id="details">';
                    out +=						'<div class="divPrice">';            
					out +=							'<p class="spanPrice">Precio por unidad: $' + price + '</p>';
					out +=							'<input id="addtocart" type="button" value=""/>';
					out +=						'</div>';
					out +=						'<div class="name">' + name + '<br /></div>';
					out +=						'<div class="autor">';
					out +=							'Director: Dario Argento<br/>';
					out +=							'Cast: Jessica Harper, Stefania Casini, Flavio Bucci, Miguel Bose, Barbara Magnolfi<br/>';
					out +=							'Wild Side Films<br/>';
					out +=						'</div>';
					out +=						'<div class="category">';
					out +=							'Genre: CATEGORY' + '<br/>';
					out +=							'Format: FORMAT' + '<br/>';
					out +=							'Original release date: DATE' + '<br/>';
					out +=							'Rating: RATING' + '<br/>';
					out +=						'</div>';
					out +=					'</div>';
					out +=				'</div>';
					out +=				'<div id="tabs-' + j++ + '">';
					out +=					'<div class="sinopsis">';
					out +=						'A young American dancer travels to Europe to join a famous ballet school. As she arrives,';
					out +=						'the camera turns to another young woman, who appears to be fleeing from the school. She returns ';
					out +=						'to her apartment where she is gruesomely murdered by a hideous creature. Meanwhile, the young ';
					out +=						'American is trying to settle in at the ballet school, but hears strange noises and is troubled ';
					out +=						'by bizarre occurrences. She eventually discovers that the school is merely a front for a much more ';
					out +=						'sinister organization.';
					out +=					'</div>';
					out +=				'</div>';
					out +=			'</div>';
					out +=		'</div>';
					out +=		'<img src="' + image_url + '" alt="' + name + '" width="' + $THUMB_WIDTH + '" height="' + $THUMB_HEIGHT + '"/>';
					out +=		'<a href="description.html" title="Full product details" class="icon icon-zoom">Full product details</a>';
					out +=		'<a href="' + $JS_OFF + '" title="Add to cart" class="icon icon-cart">Add to cart</a>';
					out +=	'</li>'			
				});
				$('ul#products').html(out);
				initCart();
			} else {
				alert('Error: ' + request.statusText);
			}
		}
	};
	request.send();
}

/* Note: calls to 'GetCategoryList' and 'GetSubcategoryList' are synchronous. */
function getCategories(language){
	requestFromServer('GetCategoryList', language);

	for (var i=0; i<categories.length; i++){
		requestFromServer('GetSubcategoryList', language + '&category_id=' + (i+1));
	}
}

function getCategoryList(parameters){
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetCategoryList' + '&' + parameters;
	request.open('GET', url, false);
	request.send();
	if (request.status == 200) {
		var response = request.responseXML;
		categories = new Array();
		$(response).find('category').each(function(){
			var marker = $(this);
			categories.push(new Category(marker.attr('id'), marker.find("code").text(), marker.find("name").text()));
		});
	} else {
		alert('Error: ' + request.statusText);
	}
}

function getSubcategoryList(parameters){
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetSubcategoryList' + '&' + parameters;
	request.open('GET', url, false);
	request.send();
	if (request.status == 200) {
		var response = request.responseXML;
		$(response).find('subcategory').each(function(){
			var marker = $(this);
			var category_id = parseInt(marker.find('category_id').text())-1;
			categories[category_id].subcategories.push(new Category(marker.attr('subcategory_id'), marker.find("code").text(), marker.find("name").text()));
		});
	}
	else {
		alert('Error: ' + request.statusText);
	}
}
