/* Global */
var categories; // Categories array.

var idIndex; // For generating products' id

/*
 * Category constructor. Each category has and id, parent_id, code, name and an array of
 * subcategories. Each category has null parent_id; each subcategory is a Category, but
 * has no subcategories.
 */
function Category(id, parent_id, code, name) {
	this.id = id;
	this.parent_id = parent_id;
	this.code = code;
	this.name = name;
	this.subcategories = new Array();
}

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
	case 'SignOut':
		signOut(parameters);
		break;
	case 'GetAccount':
		getAccount(parameters);
		break;
	default:
		alert("Invalid method");
	}
}

var contentHeight;

function incrementContentByProduct(){
	contentHeight+=140;
	$("#pageWrapper").css("height", contentHeight);
	$("#footer").css("top", contentHeight);
}

// Base size
function initializeContent() {
	contentHeight = 400;
	
	$("#pageWrapper").css("height", contentHeight);
	$("#footer").css("top", contentHeight);
}

function printProduct(marker, subCategoryID){
	

	incrementContentByProduct();
	
	out = '';
	var j = 1; // Id counter(i) and tab counter(j).
	var name = marker.find("name").text();
	var image_url = marker.find("image_url").text();
	var price = marker.find("price").text();					
	var c_id = marker.find("category_id").text();
	var sc_id = marker.find("subcategory_id").text();
	var genre = categories[c_id-1].name + ' | ' + (getSubCategoryName(sc_id-1));
	
	if(subCategoryID != undefined)
		if(sc_id != subCategoryID)
			return false;
	
	var productResponse = getProduct(marker.attr('id'));
	out +=	'<' + $CATALOG_ITEM + ' class="product-content corner-tr" id="' + idIndex + c_id + sc_id + '">';
	out +=  	'<div class="productBg"/>';
	out +=		'<h5 class="' + $CATALOG_ITEM_HEADER + '">' + name + '</h5>';
	out +=		'<div id="description' + idIndex++ + c_id + sc_id + '" style="height: 100%;" class="' + $CATALOG_ITEM_DESCRIPTION + ' hide">';
	out += 		'<div class="descriptionWrapper">';
	out +=			'<img src="' + image_url + '" alt="' + name + '" width="' + $IMG_WIDTH + '" height="' + $IMG_HEIGHT + '" class="descImage"></img>';
	out += 			'<div class="imgWrapperBig"/>';
	out +=					'<div class="details">';
	out +=						'<div class="name">' + name + '<br /></div>';
	out +=					'<span class="detailTitle">Rank:</span> ' + ($(productResponse).find("sales_rank").text()) + '<br />';
	out +=						'<div class="autor">';
	out +=							'<span class="detailTitle">Genre:</span> ' + genre + '<br/>';
	if (c_id == 1)
		out +=						'<span class="detailTitle">Cast:</span> ' + ($(productResponse).find("actors").text()) + '<br/>';
	out +=						'</div>';
	out +=						'<div class="detailsDetails">';
	if (c_id == 1){
		out +=						'<span class="detailTitle">Spoken language: </span> ' + ($(productResponse).find("language").text()) + '<br/>';
		out +=						'<span class="detailTitle">Subtitles:  </span> ' + ($(productResponse).find("subtitles").text()) + '<br/>';
		out +=						'<span class="detailTitle">Total runtime:  </span> ' + ($(productResponse).find("run_time").text()) + '<br/>';
		out +=						'<span class="detailTitle">Release date: </span>  ' + ($(productResponse).find("release_date").text()) + '<br/>';
		out +=						'<span class="detailTitle">Format: </span>  ' + ($(productResponse).find("format").text()) + '<br/>';
		out +=						'<span class="detailTitle">Aspect ratio:  </span> ' + ($(productResponse).find("aspect_ratio").text()) + '<br/>';
		out +=						'<span class="detailTitle">Number of discs: </span>  ' + ($(productResponse).find("number_discs").text()) + '<br/>';
		out +=						'<span class="detailTitle">ASIN: </span>  ' + ($(productResponse).find("ASIN").text()) + '<br/>';
	} else if( c_id == 2 ){
		out +=						'<span class="detailTitle">Authors:  </span> ' + ($(productResponse).find("authors").text()) + '<br/>';
		out +=						'<span class="detailTitle">Publisher: </span>  ' + ($(productResponse).find("publisher").text()) + '<br/>';
		out +=						'<span class="detailTitle">Published Date:  </span> ' + ($(productResponse).find("published_date").text()) + '<br/>';
		out +=						'<span class="detailTitle">ISBN 10:  </span> ' + ($(productResponse).find("ISBN_10").text()) + '<br/>';
		out +=						'<span class="detailTitle">ISBN 13:  </span> ' + ($(productResponse).find("ISBN_13").text()) + '<br/>';
		out +=						'<span class="detailTitle">Language:  </span> ' + ($(productResponse).find("language").text()) + '<br/>';
	}
	out +=						'</div>';
	out +=						'<div class="divPrice">';
	out +=							'<p class="detailsPrice">Precio: $' + price + '</p>';
	out +=							'<div id="addtocart"> ADD TO CART </div>';
	out +=						'</div>';
	out +=						'http://www.facebook.com/sharer.php?u=http://google.com&t=<title of content>';
	out +=					'</div>';
	out +=			'</div>';
	out +=	'</div>';
	
	
	
	out +=  '<div class="imgDragger"/>';
	out += '<div class="cartFeedback"> Added to cart! </div>';
	out +=	'<img src="' + image_url + '" alt="' + name + '" width="' + $THUMB_WIDTH + '" height="' + $THUMB_HEIGHT + '"/>';
	out +=	'<p class="spanPrice">$' + price + '</p>';
	out +=  '<div class="productDetails">';
	out +=  'Rank: ' + ($(productResponse).find("sales_rank").text()) + '<br/>'; 
	
	if( c_id == 2 ){
		out +=  'Authors: ' + ($(productResponse).find("authors").text()) + '<br/>';
		out +=  'Publisher: ' + ($(productResponse).find("publisher").text()) + '<br/>';
		out +=  'Published Date: ' + ($(productResponse).find("published_date").text()) + '<br/>';
	} else if( c_id == 1) {
		out +=					'Total runtime: ' + ($(productResponse).find("run_time").text()) + '<br/>';
		out +=					'Release date: ' + ($(productResponse).find("release_date").text()) + '<br/>';
		out +=					'Region: ' + ($(productResponse).find("region").text()) + '<br/>';
	}
		
	out += ' </div>';
	out += '<h5 class="' + $CATALOG_ITEM_HEADER + '">' + name + '</h5>';
	out +=	'<a href="#" title="Full product details" class="' + $ICON_INFO + '"></a>';
	out +=	'<a href="' + $JS_OFF + '" title="Add to cart" class="' + $ICON_CART + '"></a>';
	out +=	'</' + $CATALOG_ITEM + '>';
	$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).append(out);

}



/* Get product list by category and initializates car */
function getProductList(parameters) {
	
	showLoadingDialog();
	
	
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetProductListBy' + parameters;
	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;

				/* Resize content */
				initializeContent();
				
				$("#content").html('<div class="product"/>');
				var out = '<' + $ITEM_CONTAINER_TAG + ' id="' + $CATALOG_CONTAINER_ID + '" class="products helper-reset helper-clearfix"/>';
				$('div.product').html(out);

				idIndex = 1;
				
				// To each product, send same subcategory to override filter
				$(response).find('product').each( function(){
					var tmp_scid = $(this).find("subcategory_id").text();
					printProduct($(this), tmp_scid);
				});
				buildDraggables();
				enableTabs();
				hideLoadingDialog();
			} else {
				alert('Error: ' + request.statusText);
			}
		}
	};
	request.send();
}

function getProduct(product_id) {
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetProduct' + '&product_id=' + product_id;
	request.open('GET', url, false);
	request.send();
	if (request.status == 200)
		return request.responseXML;
	else
		alert('Error: ' + request.statusText);
}

function getCategories(l_qty) {
	categories = new Array();
	var i;
	for (i = 0; i < l_qty; i++){
		categories[i] = new Array();
		var response = getCategoryList('language_id=' + (i+1));
		$(response).find('category').each( function() {
			var marker = $(this);
			categories[i].push(new Category(marker.attr('id'), null, marker.find("code").text(), marker.find("name").text()));
		})
	}
}

function getSubCategories(l_qty) {
	var i, j;
	for (i = 0; i < l_qty; i++){
		for(j = 0; j < categories[i].length; j++){
			categories[i][j].subcategories = new Array();
			var response = getSubcategoryList('language_id=' + (i+1) + '&category_id=' + (categories[i][j].id));
			$(response).find('subcategory').each( function() {
				var marker = $(this);
				categories[i][j].subcategories.push(new Category(marker.attr('subcategory_id'), marker.find('category_id').text(), marker.find("code").text(), marker.find("name").text()));
			})
		}
	}
}

function getCategoryList(parameters) {
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetCategoryList' + '&' + parameters;
	request.open('GET', url, false);
	request.send();
	if (request.status == 200)
		return request.responseXML;
	else
		alert('Error: ' + request.statusText);
}

function getSubcategoryList(parameters) {
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetSubcategoryList' + '&' + parameters;
	request.open('GET', url, false);
	request.send();
	if (request.status == 200)
		return request.responseXML;
	else
		alert('Error: ' + request.statusText);
}

/* Injects categories and subcategories from global variable 'categories' into html */
function injectCategories() {
	var i, j, out = "";
	
	// Inject categories into search bar.
	out +=	'<option class="searchOption" selected="selected">' + Language.allCategories + '</option>';
	for (i = 0; i < categories[currentLang-1].length; i++) {
		out +=	'<optgroup class="searchOption" label="' + categories[currentLang-1][i].name + '" value="' + (i+1) + '">';
		for (j = 0; j < categories[currentLang-1][i].subcategories.length; j++)
			out += '<option class="searchOption" value="' + getSubCategoryIndex(i, categories[currentLang-1][i].subcategories[j].name) + '">' + categories[currentLang-1][i].subcategories[j].name + '</option>';
		out +=	'</optgroup>';
	}
	$("select#categoryCBox").html(out);

	// Inject categories into accordion.
	out = "";
	for (i = 0; i < categories[currentLang-1].length; i++) {
		out +=	'<h3><a class="categoryLink" href="#">' + categories[currentLang-1][i].name + '</a></h3>';
		out +=	'<div><li>';
		for (j = 0; j < categories[currentLang-1][i].subcategories.length; j++)
			out +=	'<a class="subCategoryLink parentCategory' + (i+1) + '" href="#">' + categories[currentLang-1][i].subcategories[j].name + '</a><br/>';
		out +=	'</li></div>';
	}
	$("#menuCategorias").html(out);

	// Inject categories into categories menu (below search bar).
	out = "";
	for (i = 0; i < categories[currentLang-1].length; i++) {
		out +=	'<div class="categoryBlock">';
		out +=		'<div class="categoryBlockTitle">';
		out +=			'<a class="categoryLink" href="#">' + categories[currentLang-1][i].name + '</a>';
		out +=		'</div>';
		out +=		'<div class="categoryBlockSub">';
		for (j = 0; j < categories[currentLang-1][i].subcategories.length; j++)
			out +=		'<a class="subCategoryLink parentCategory' + (i+1) + '" href="#">' + categories[currentLang-1][i].subcategories[j].name + '</a>';
		out +=		'</div>';
		out +=	'</div>';
	}
	$("#categorySelector").html(out);
	
	// Inject categories in footer.
	out = "";
	for (i = 0; i < categories[currentLang-1].length; i++) {
		out +=	'<div class="footerBlock">';
		out +=		'<a class="categoryLink" href="#">' + categories[currentLang-1][i].name + '</a><br/>';
		for (j = 0; j < categories[currentLang-1][i].subcategories.length; j++)
			out +=	'<a class="subCategoryLink parentCategory' + (i+1) + '" href="#">' + categories[currentLang-1][i].subcategories[j].name + '</a>';
		out +=	'</div>';
	}
	out += '<div class="footerBlock">';
	out += '<a class="fbSharer" href="#" > Share us on Facebook!</a>';
	out += '</div>';
	
	$("#footerInfo").html(out);
	
	$(".fbSharer").click(function(){
		
		var randomArg = Math.floor(Math.random()*10000);
		var url = window.location.href;
		
		if( url.charAt(url.length-1) == '#' )
			url = url.substring(0,url.length-1);
		
		
		window.open("http://www.facebook.com/sharer.php?u=" + url + "?tmp=" + randomArg + "&t=Hola","Share Thor on Facebook!",
		"menubar=no,width=630,height=300,toolbar=no");
	});
	
	// Event delegation for categories in '.categoryBlock'.
	$( '.categoryBlock' ).click(function( event ) {
		var $item = $(this);
		$target = $( event.target );
		if ($target.is( 'a.categoryLink' )){
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.
			
			slideHeaderUp( function(){
					requestFromServer('GetProductList', 'Category&language_id=' + currentLang + '&category_id=' + (getCategoryIndex($target.html()) + 1) + '&order=ASC&items_per_page=10&page=1');
			});
		} else if ($target.is( 'a.subCategoryLink' )){
			var c_id, sc_id;
			for(c_id=0; c_id < categories[currentLang-1].length; c_id++)
				if($target.is( 'a.parentCategory' + (c_id+1) ))
					break;
			sc_id = getSubCategoryIndex(c_id, $target.html());
			c_id++;
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.
			
			slideHeaderUp(function(){
				requestFromServer('GetProductList', 'Subcategory&language_id=' + currentLang + '&category_id=' + c_id + '&subcategory_id=' + sc_id + '&order=ASC&items_per_page=10&page=1');
			});
		}
		return false;
	});
	

	// Event delegation for categories in '#menuCategorias'.
	$( '#menuCategorias' ).click(function( event ) {
		var $item = $(this);
		$target = $( event.target );
		if ($target.is( 'a.categoryLink' )){
			requestFromServer('GetProductList', 'Category&language_id=' + currentLang + '&category_id=' + (getCategoryIndex($target.html()) + 1) + '&order=ASC&items_per_page=10&page=1');
		} else if ($target.is( 'a.subCategoryLink' )){
			var c_id, sc_id;
			for(c_id=0; c_id < categories[currentLang-1].length; c_id++)
				if($target.is( 'a.parentCategory' + (c_id+1) ))
					break;
			sc_id = getSubCategoryIndex(c_id, $target.html());
			c_id++;
			requestFromServer('GetProductList', 'Subcategory&language_id=' + currentLang + '&category_id=' + c_id + '&subcategory_id=' + sc_id + '&order=ASC&items_per_page=10&page=1');
		}
		return false;
	});

	// Event delegation for categories in '.footerBlock'.
	$( '.footerBlock' ).click(function( event ) {
		var $item = $(this);
		$target = $( event.target );
		if ($target.is( 'a.categoryLink' )){
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.
			slideHeaderUp(function(){
				requestFromServer('GetProductList', 'Category&language_id=' + currentLang + '&category_id=' + (getCategoryIndex($target.html()) + 1) + '&order=ASC&items_per_page=10&page=1');	
			});
		} else if ($target.is( 'a.subCategoryLink' )){
			var c_id, sc_id;
			for(c_id=0; c_id < categories[currentLang-1].length; c_id++)
				if($target.is( 'a.parentCategory' + (c_id+1) ))
					break;
			sc_id = getSubCategoryIndex(c_id, $target.html());
			c_id++;
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.
			
			slideHeaderUp(function(){
					requestFromServer('GetProductList', 'Subcategory&language_id=' + currentLang + '&category_id=' + c_id + '&subcategory_id=' + sc_id + '&order=ASC&items_per_page=10&page=1');	
			});
		}
		return false;
	});
}

function getCategoryIndex(categoryName){
	var i;
	for(i = 0; i < categories[currentLang-1].length; i++)
		if (categories[currentLang-1][i].name == categoryName)
			return i;
	return -1;
}

function getSubCategoryIndex(categoryId, subcategoryName){
	var j;
	var subcategoriesCount = 0;
	
	for(j = 0; j < categoryId; j++)
		subcategoriesCount += categories[currentLang-1][j].subcategories.length;
	for (j = 0; j < categories[currentLang-1][categoryId].subcategories.length; j++)		
		if ($('<textarea/>').html(categories[currentLang-1][categoryId].subcategories[j].name).val() == subcategoryName) 
			return subcategoriesCount + j + 1;
	return -1;
}

function getSubCategoryName(sc_id){
	var i, j, k=0;
	for(i=0; i < categories[currentLang-1].length; i++){
		for(j=0; j < categories[currentLang-1][i].subcategories.length; j++, k++)
			if (sc_id == k)
				return categories[currentLang-1][i].subcategories[j].name;
	}
	return null;
}
