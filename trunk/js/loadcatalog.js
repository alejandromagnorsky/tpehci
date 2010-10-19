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
	case 'SetAccountPreferences':
		setAccountPreferences(parameters);
		break;
	case 'GetAccountPreferences':
		getAccountPreferences(parameters);
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

function updateProductLanguage(){
	
	$(".LangSub").text(Language.subcategory);
	
	$(".LangActors").text(Language.actors);
	
	$(".LangLanguage").text(Language.language);
	$(".LangSubtitles").text(Language.subtitles);
	$(".LangRuntime").text(Language.runtime);
	$(".LangRelease").text(Language.releasedate);
	$(".LangFormat").text(Language.format);
	
	
	$(".LangPrice").text(Language.price);
	$(".LangMoneySign").text(Language.moneySign);
	
	$(".LangAspect").text(Language.aspectratio);
	$(".LangDiscs").text(Language.numberdiscs);
	$(".LangASIN").text(Language.ASIN);
	$(".LangRegion").text(Language.region);
	
	$(".LangAuthors").text(Language.authors);
	$(".LangPublisher").text(Language.publisher);
	$(".LangPubDate").text(Language.publisheddate);
	$(".LangLanguage").text(Language.language);
	
	$(".LangRank").text(Language.salesrank);
	
	$(".basePrice").each(function(){
		var price = $(this).attr("value");
		
		$(this).text((price*Language.conversionMoney).toFixed(2));
		
	});
	
	$(".baseDate").each(function(){
		var date = $(this).attr("value");
		
		
		$(this).text( toLocalDate2(date));
	});
	
}


var sentBitly;

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
	var p_id = marker.attr('id');
	out +=	'<' + $CATALOG_ITEM + ' class="product-content corner-tr" id="' + p_id + '">';
	out +=  	'<div class="productBg"/>';
	out +=		'<h5 class="' + $CATALOG_ITEM_HEADER + '">' + name + '</h5>';
	out +=		'<div id="description' + p_id + '" style="height: 100%;" class="' + $CATALOG_ITEM_DESCRIPTION + ' hide">';
	out += 		'<div class="descriptionWrapper">';
	out +=			'<img src="' + image_url + '" alt="' + name + '" width="' + $IMG_WIDTH + '" height="' + $IMG_HEIGHT + '" class="descImage"></img>';
	out += 			'<div class="imgWrapperBig"/>';
	out +=					'<div class="details">';
	out +=						'<div class="name">' + name + '<br /></div>';
	out +=					'<span class="detailTitle LangRank">' + Language.salesrank + ':</span> ' + ($(productResponse).find("sales_rank").text()) + '<br />';
	out +=						'<div class="autor">';
	out +=							'<span class="detailTitle LangSub">' + Language.subcategory + ':</span> ' + genre + '<br/>';
	if (c_id == 1)
		out +=						'<span class="detailTitle LangActors">' + Language.actors + ':</span> ' + ($(productResponse).find("actors").text()) + '<br/>';
	out +=						'</div>';
	out +=						'<div class="detailsDetails">';
	if (c_id == 1){
		out +=						'<span class="detailTitle LangLanguage">' + Language.language +':</span> ' + ($(productResponse).find("language").text()) + '<br/>';
		out +=						'<span class="detailTitle LangSubtitles">' + Language.subtitles +':  </span> ' + ($(productResponse).find("subtitles").text()) + '<br/>';
		out +=						'<span class="detailTitle LangRuntime">' + Language.runtime + ':  </span> ' + ($(productResponse).find("run_time").text()) + '<br/>';
		out +=						'<span class="detailTitle LangRelease">' + Language.releasedate + ': </span> <span class="baseDate" value="'+$(productResponse).find("release_date").text()+'">  ' + toLocalDate2($(productResponse).find("release_date").text()) + '</span><br/>';
		out +=						'<span class="detailTitle LangFormat">' + Language.format + ': </span>  ' + ($(productResponse).find("format").text()) + '<br/>';
		out +=						'<span class="detailTitle LangAspect">' + Language.aspectratio + ':  </span> ' + ($(productResponse).find("aspect_ratio").text()) + '<br/>';
		out +=						'<span class="detailTitle LangDiscs">' + Language.numberdiscs + ': </span>  ' + ($(productResponse).find("number_discs").text()) + '<br/>';
		out +=						'<span class="detailTitle LangASIN">' + Language.ASIN + ': </span>  ' + ($(productResponse).find("ASIN").text()) + '<br/>';
		out +=						'<span class="detailTitle LangRegion">' + Language.region + ': </span>  ' + ($(productResponse).find("ASIN").text()) + '<br/>';
	} else if( c_id == 2 ){
		out +=						'<span class="detailTitle LangAuthors">' + Language.authors  + ':  </span> ' + ($(productResponse).find("authors").text()) + '<br/>';
		out +=						'<span class="detailTitle LangPublisher">' + Language.publisher + ': </span>  ' + ($(productResponse).find("publisher").text()) + '<br/>';
		out +=						'<span class="detailTitle LangPubDate">' + Language.publisheddate + ':  </span><span class="baseDate" value="'+$(productResponse).find("published_date").text()+'"> ' + toLocalDate2($(productResponse).find("published_date").text()) + '</span><br/>';
		out +=						'<span class="detailTitle">ISBN 10:  </span> ' + ($(productResponse).find("ISBN_10").text()) + '<br/>';
		out +=						'<span class="detailTitle">ISBN 13:  </span> ' + ($(productResponse).find("ISBN_13").text()) + '<br/>';
		out +=						'<span class="detailTitle LangLanguage">' + Language.language + ':  </span> ' + ($(productResponse).find("language").text()) + '<br/>';
	}
	
	
	out += '<a class="fbSharer" href="#">Share this product on Facebook!</a>';
	out += '<a class="twSharer" href="#">Tweet this product!</a>';
	
	
	out +=						'</div>';
	out +=						'<div class="divPrice">';
	out +=							'<p class="detailsPrice"><span class="LangPrice">' + Language.price + '</span>:<span class="LangMoneySign">' + Language.moneySign + '</span><span class="basePrice" value="'+price+'">' + (Language.conversionMoney*price).toFixed(2) + '</span></p>';
	out +=							'<a href="#"><div class="addtocart" value="' + p_id + '"> ADD TO CART </div></a>';
	out +=						'</div>';

	
	out +=					'</div>';
	out +=			'</div>';
	out +=	'</div>';
	
	
	
	out +=  '<div class="imgDragger"/>';
	out += '<div class="cartFeedback"> Added to cart! </div>';
	out +=	'<img src="' + image_url + '" alt="' + name + '" width="' + $THUMB_WIDTH + '" height="' + $THUMB_HEIGHT + '"/>';
	out +=	'<p class="spanPrice"> <span class="LangMoneySign">'+ Language.moneySign +'</span><span class="basePrice" value="'+price+'">' + (Language.conversionMoney *price).toFixed(2) + '</span></p>';
	out +=  '<div class="productDetails">';
	out +=  '<span class="LangRank">' + Language.salesrank + '</span>:' + ($(productResponse).find("sales_rank").text()) + '<br/>'; 
	
	if( c_id == 2 ){
		out +=  '<span class="LangAuthors"> ' + Language.authors + '</span>: ' + ($(productResponse).find("authors").text()) + '<br/>';
		out +=  '<span class="LangPublisher">' + Language.publisher +'</span>: ' + ($(productResponse).find("publisher").text()) + '<br/>';
		out +=  '<span class="LangPubDate">' + Language.publisheddate +'</span>:<span class="baseDate" value="'+$(productResponse).find("published_date").text()+'"> ' + toLocalDate2($(productResponse).find("published_date").text())+ '</span><br/>';
	} else if( c_id == 1) {
		out +=	'<span class="LangRuntime">' +	Language.runtime +'</span>:' + ($(productResponse).find("run_time").text()) + '<br/>';
		out +=	'<span class="LangRelease">' +	Language.releasedate +'</span>:<span class="baseDate" value="'+$(productResponse).find("release_date").text()+'"> ' + toLocalDate2($(productResponse).find("release_date").text()) + '</span><br/>';
		out +=	'<span class="LangRegion">' +	Language.region +'</span>:' + ($(productResponse).find("region").text()) + '<br/>';
	}
		
	out += ' </div>';
	out +=	'<a href="#" title="Full product details" class="' + $ICON_INFO + '"></a>';
	out +=	'<a href="' + $JS_OFF + '" title="Add to cart" class="' + $ICON_CART + '"></a>';
	out +=	'</' + $CATALOG_ITEM + '>';
	$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).append(out);
			
	$(".twSharer").click(function(){
		var url = window.location.href;
		var parsedUrl = url;
		sentBitly = false;
		
		var username="thorstore"; // bit.ly username
		var key="R_4d83d805f815155b6bcbc183d90f5682";
		$.ajax({
			url:"http://api.bit.ly/v3/shorten",
			data:{longUrl:parsedUrl,apiKey:key,login:username},
			dataType:"jsonp",
			success:function(v)
			{
				
				if(sentBitly)
					return;
				else sentBitly = true;
				
				var bit_url=v.data.url;
				var twArgs = "url=" + bit_url + "&via=ThorStore&text=Check out '" + name + "' on ThorStore!"; 
				window.open("http://twitter.com/share?" + twArgs,"Share Thor on Twitter!",
				"menubar=no,width=630,height=300,toolbar=no");
			}
		});
		
	});
	
	
	$(".fbSharer").click(function(){
		// This random thing is a hack to prevent facebook from loading the description from its cache.
		var randomArg = Math.floor(Math.random()*100000);
		
		var url = window.location.href;
		var path = url.substring(0, url.indexOf("#", 0));
		var longUrl = path + "?fb=" + name ;
		
		window.open("http://www.facebook.com/sharer.php?u=" + longUrl + "&t=Thor DVD's and Books","Share Thor on Facebook!",
		"menubar=no,width=630,height=300,toolbar=no");
		
		return false;
	});
	

}



//bit_url function
function bit_url(url)
{
	var url=url;
	var username="thorstore"; // bit.ly username
	var key="R_4d83d805f815155b6bcbc183d90f5682";
	$.ajax({
		url:"http://api.bit.ly/v3/shorten",
		data:{longUrl:url,apiKey:key,login:username},
		dataType:"jsonp",
		success:function(v)
		{
		var bit_url=v.data.url;
		//$("#result").html('<a href="'+bit_url+'" target="_blank">'+bit_url+'</a>');
		
		return bit_url;
		}
	});
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
				
				var cID = -1;
				var sID = -1;
				
				// To each product, send same subcategory to override filter
				$(response).find('product').each( function(){
					var tmp_scid = $(this).find("subcategory_id").text();
					printProduct($(this), tmp_scid);
					
					
					cID = $(this).find("category_id").text();
					sID = tmp_scid;
				});
				
				buildDraggables();
				enableTabs();
				hideLoadingDialog();
				
				// Manage product styles
				$(".imgDragger").css("background-image", "url(../css/images/inicio/" + StyleAddr + "imgDragger.png)");
				$(".icon-cart").css("background-image", "url(../css/images/inicio/" + StyleAddr + "cartButton.png)");
				$(".icon-zoom").css("background-image", "url(../css/images/inicio/" + StyleAddr + "detailsButton.png)");
				$(".addtocart").css("background-image", "url(../css/images/inicio/" + StyleAddr + "addToCart.png)");
				$(".addtocart").css("color", StyleTextColor);
				$(".imgWrapperBig").css("background-image", "url(../css/images/inicio/" + StyleAddr + "imgWrapperBig.png)");

				parent.location.hash = "content=true&search=" + $("#inputsearch").val() + "&c=" + cID + "&sc=" + sID ;
				
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
	

	// This random thing is a hack to prevent facebook from loading the description from its cache.
	var randomArg = Math.floor(Math.random()*100000);
	var url = window.location.pathname;
	
	if( url.charAt(url.length-1) == '#' )
		url = url.substring(0,url.length-1);
	
	var longUrl = url + "?tmp=" + randomArg + "&t=Thor DVD's and Books";
	out += '<div class="footerBlock">';
	out += '<a name="fb_share" type="button" share_url="'+ longUrl + '"></a>';
	out += '<span id="follow-ThorStore"></span>';
	  twttr.anywhere(function (T) {
	    T('#follow-ThorStore').followButton("ThorStore");
	  });
	out += '<br /><a id="watchmotto" class="lang_watchmotto"></a>';
	out += '</div>';
			
	
	$("#footerInfo").html(out);
	
	document.getElementById("watchmotto").onclick = showVideo;
	updateText("watchmotto", Language.watchmotto);
	
	// Event delegation for categories in '.categoryBlock'.
	$( '.categoryBlock' ).click(function( event ) {
		var $item = $(this);
		$target = $( event.target );
		if ($target.is( 'a.categoryLink' )){
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.

			$("#inputsearch").val($target.text());
			
			slideHeaderUp( function(){
					requestFromServer('GetProductList', 'Category&language_id=' + currentLang + '&category_id=' + (getCategoryIndex($target.html()) + 1) + '&order=ASC&items_per_page=10&page=1');
			});
		} else if ($target.is( 'a.subCategoryLink' )){

			$("#inputsearch").val($target.text());
			
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
			$("#inputsearch").val($target.text());
			requestFromServer('GetProductList', 'Category&language_id=' + currentLang + '&category_id=' + (getCategoryIndex($target.html()) + 1) + '&order=ASC&items_per_page=10&page=1');
		} else if ($target.is( 'a.subCategoryLink' )){
			$("#inputsearch").val($target.text());
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

			$("#inputsearch").val($target.text());
			$($ITEM_CONTAINER_TAG + '#' + $CATALOG_CONTAINER_ID).remove(); // Cleans old search.
			slideHeaderUp(function(){
				requestFromServer('GetProductList', 'Category&language_id=' + currentLang + '&category_id=' + (getCategoryIndex($target.html()) + 1) + '&order=ASC&items_per_page=10&page=1');	
			});
		} else if ($target.is( 'a.subCategoryLink' )){

			$("#inputsearch").val($target.text());
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

function printAddress(id, full_name, address_line_1, address_line_2, country_id, state_id, city, zip_code, phone_number){
	$('.addressTable').find('.addressInputCol').append('<li class="addressItem"><input class="addressInput" type="radio" name="address" value="' + id + '"/></li>');
	$('.addressTable').find('.fullNameCol').append('<li class="addressItem">' + full_name + '</li>');
	$('.addressTable').find('.addrCol').append('<li class="addressItem">' + address_line_1 + '</li>');
	$('.addressTable').find('.cityCol').append('<li class="addressItem">' + city + '</li>');
	$('.addressTable').find('.zipCodeCol').append('<li class="addressItem">' + zip_code + '</li>');
	$('.addressTable').find('.phoneCol').append('<li class="addressItem">' + phone_number + '</li>');
}

function printOrder(input, id, address_id, status, created_date, confirmed_date, shipped_date, delivered_date, latitude, longitude){
	var statusLabel;
	if (status == 1) statusLabel = 'Created';
	else if (status == 2) statusLabel = 'Confirmed';
	else if (status == 3) statusLabel = 'Shipped';
	else statusLabel = 'Delivered';

	incrementContentByProduct();
	
	// If some parameter is null, it means programmer don't want to print that parameter.
	if (input == 'input' ) $('.orderTable').find('.orderInputCol').append('<li class="orderItem"><input class="orderInput" type="radio" checked="checked" name="order" value="' + id + '"/></li>');
	/*if (id != null )*/ $('.orderTable').find('.orderIdCol').append('<li class="orderItem">' + id + '</li>');
	/*if (address_id != null )*/ $('.orderTable').find('.orderAddrIdCol').append('<li class="orderItem"><a href="#" class="viewAddress' + id + '">View</a></li>');
	/*if (status != null )*/ $('.orderTable').find('.statusCol').append('<li class="orderItem">' + statusLabel + '</li>');
	/*if (created_date != null )*/ $('.orderTable').find('.createdCol').append('<li class="orderItem">' + created_date + '</li>');
	/*if (confirmed_date != null )*/ $('.orderTable').find('.confirmedCol').append('<li class="orderItem">' + ((status != 2) ? 'Not confirmed yet' : confirmed_date) + '</li>');
	/*if (shipped_date != null )*/ $('.orderTable').find('.shippedCol').append('<li class="orderItem">' + ((status != 3) ? 'Not shipped yet' : shipped_date) + '</li>');
	/*if (delivered_date != null )*/ $('.orderTable').find('.deliveredCol').append('<li class="orderItem">' + ((status != 4) ? 'Not delivered yet' : delivered_date) + '</li>');
	/*if (latitude != null )*/ $('.orderTable').find('.latCol').append('<li class="orderItem">' + latitude + '</li>');
	/*if (longitude != null )*/ $('.orderTable').find('.lonCol').append('<li class="orderItem">' + longitude + '</li>');
	if (status == 2){
		$('.orderTable').find('.confirmCol').append('<li class="orderItem confirmedOrder">Confirmed</li>');
		$('.orderTable').find('.dropCol').append('<li class="orderItem confirmedOrder">Cannot Drop</li>');
	} else if ( status == 3 ) {
		$('.orderTable').find('.confirmCol').append('<li class="orderItem shippedOrder">Shipped</li>');
		$('.orderTable').find('.dropCol').append('<li class="orderItem confirmedOrder">Cannot Drop</li>');
	} else if ( status == 4 ){
		$('.orderTable').find('.confirmCol').append('<li class="orderItem deliveredOrder">Delivered</li>');
		$('.orderTable').find('.dropCol').append('<li class="orderItem confirmedOrder">Cannot Drop</li>');
	} else {
		$('.orderTable').find('.confirmCol').append('<li class="orderItem"><a href="#" class="confirmOrder' + id + '">Confirm</a></li>')
		$('.orderTable').find('.dropCol').append('<li class="orderItem"><a href="#" class="dropOrder' + id + '">Drop</a></li>');
	}
	
	$('.confirmOrder' + id).click(function(){
		openAddressSelector(id);
		return false;
	});
	$('.dropOrder' + id).click(function(){
		deleteOrder(id);
		return false;
	});
	$('.viewAddress' + id).click(function(){
		openAddressInfo(id);
		getAddress("username=" + session.username + "&authentication_token=" + session.token + "&address_id=" + id);
		return false;
	});
}

function getAddress(parameters){	
	var request = new XMLHttpRequest();
	var url = $ORDER + 'GetAddress' + '&' + parameters;
	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;
				$('#addressInfo .addressItem').remove();
				alert($(response).find('address_id').length);
				$(response).find('address_id').each(function(){
					var marker = $(this);
					var a_id = marker.attr('id');
					var fn = marker.find('full_name').text();
					var ad1 = marker.find('address_line_1').text();
					var ad2 = marker.find('address_line_2').text();
					var cid = marker.find('country_id').text();
					var sid = marker.find('state_id').text();
					var c = marker.find('city').text();
					var zc = marker.find('zip_code').text();
					var pn = marker.find('phone_number').text();
					$('.addrIdColInfo').append('<li class="addressItem">' + a_id + '</li>');
					$('.fullNameColInfo').append('<li class="addressItem">' + fn + '</li>');
					$('.addrColInfo1').append('<li class="addressItem">' + ad1 + '</li>');
					$('.addrColInfo2').append('<li class="addressItem">' + ad2 + '</li>');
					$('.countryColInfo').append('<li class="addressItem">' + cid + '</li>');
					$('.stateColInfo').append('<li class="addressItem">' + sid + '</li>');
					$('.cityColInfo').append('<li class="addressItem">' + c + '</li>');
					$('.zipCodeColInfo').append('<li class="addressItem">' + zc + '</li>');
					$('.phoneColInfo').append('<li class="addressItem">' + pn + '</li>');
				});
				
				
			} else 
				alert('Error: ' + request.statusText);
		}
	};
	request.send();
}

function openAddressInfo(o_id){
	$("#addressInfo").dialog({
		close: function(){
			$(this).dialog("destroy");
		},
		"width" : 650,
		"modal" : "true",
		"resizable" : "false",
		"title" : 'Address for Order #' + o_id,
		draggable : false
	});
	
	var widget = $("#addressInfo").dialog("widget");
	widget.css("margin", "auto");
	widget.css("margin-top", "0");

	widget.css("left", "0");
	widget.css("right", "0");

	widget.css("top", "30px");
	widget.css("bottom", "0");
	widget.css("height", "450px");
	widget.css("width", "850px");
	widget.css("text-align", "left");

	widget.css("position", "absolute");
	widget.css("-moz-box-shadow", " 0 0px 20px rgba(0, 0, 0, 1)");
	widget.css("-moz-border-radius", "10px 10px 10px 10px");
	widget.css("background-color", "transparent");
	widget.css("background-image", "none");
	widget.css("border", "2px solid rgba(255,255,255,0.3)");
}

function openAddressSelector(o_id){
	$('.orderIdDialog').html(o_id);
	$("#addressSelector").dialog({
		close: function(){
			$(this).dialog("destroy");
		},
		"width" : 650,
		"modal" : "true",
		"resizable" : "false",
		"title" : 'Confirm Order #' + o_id,
		draggable : false
	});
	
	var widget = $("#addressSelector").dialog("widget");
	widget.css("margin", "auto");
	widget.css("margin-top", "0");

	widget.css("left", "0");
	widget.css("right", "0");

	widget.css("top", "30px");
	widget.css("bottom", "0");
	widget.css("height", "450px");
	widget.css("width", "850px");
	widget.css("text-align", "left");

	widget.css("position", "absolute");
	widget.css("-moz-box-shadow", " 0 0px 20px rgba(0, 0, 0, 1)");
	widget.css("-moz-border-radius", "10px 10px 10px 10px");
	widget.css("background-color", "transparent");
	widget.css("background-image", "none");
	widget.css("border", "2px solid rgba(255,255,255,0.3)");
	
}

function openAddressCreator(){
	if (addressValidator == undefined)
		initializeAddressValidator();
	configureAddressValidator(); 
	
	$("#addressCreator").dialog({
		close: function(){
			$("#addressCreator").dialog("destroy");
		},
		"width" : 650,
		"modal" : "true",
		"resizable" : "false",
		"title" : 'Create new address',
		draggable : false
	});
	
	inyectCountries("#address_countryCombo");
    
    document.getElementById("address_countryCombo").onchange = function(e){
        var index = document.getElementById("address_countryCombo").selectedIndex;
        inyectStates(index, "#address_stateCombo");
    };
    $("#address_stateCombo").html("");
	
	var widget = $("#addressCreator").dialog("widget");
	widget.css("margin", "auto");
	widget.css("margin-top", "0");

	widget.css("left", "0");
	widget.css("right", "0");

	widget.css("top", "30px");
	widget.css("bottom", "0");
	widget.css("height", "600px");
	widget.css("width", "500px");
	widget.css("text-align", "left");

	widget.css("position", "absolute");
	widget.css("-moz-box-shadow", " 0 0px 20px rgba(0, 0, 0, 1)");
	widget.css("-moz-border-radius", "10px 10px 10px 10px");
	widget.css("background-color", "transparent");
	widget.css("background-image", "none");
	widget.css("border", "2px solid rgba(255,255,255,0.3)");
}

function getAddressList(parameters){	
	var request = new XMLHttpRequest();
	var url = $ORDER + 'GetAddressList' + '&' + parameters;
	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;
				
				$('.addressItem').remove();
				$(response).find('address').each(function(){
					marker = $(this);
					printAddress(marker.attr('id'), marker.find('full_name').text(), marker.find('address_line_1').text(), marker.find('address_line_2').text(), marker.find('country_id').text(), marker.find('state_id').text(), marker.find('city').text(), marker.find('zip_code').text(), marker.find('phone_number').text());
					$('ul.addressInputCol li.addressItem:eq(0)').find('.addressInput').attr("checked", "checked");

				});
			} else 
				alert('Error: ' + request.statusText);
		}
	};
	request.send();
}

function getOrder(parameters, action){	
	var request = new XMLHttpRequest();
	var url = $ORDER + 'GetOrder' + '&' + parameters;
	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;
				printOrder('input', $(response).find('order').attr('id'), $(response).find('address_id').text(), $(response).find('status').text(), $(response).find('created_date').text(), $(response).find('confirmed_date').text(), $(response).find('shipped_date').text(), $(response).find('delivered_date').text(), $(response).find('latitude').text(), $(response).find('longitude').text());
				$('.checkoutTable').html('<span>No hay ítems en el carrito</br></span>');
				$('.totalCheckout').remove();
				hideLoadingDialog();
			} else 
				alert('Error: ' + request.statusText);
		}
	};
	request.send();
}

function getOrderList(parameters, action){	
	var request = new XMLHttpRequest();
	var url = $ORDER + 'GetOrderList' + '&' + parameters;
	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				
				initializeContent();
				incrementContentByProduct();
				
				$(".product").append("<div id='mapContainer'></div>");

				// Add map!
				$("#mapContainer").html("<div id='map_canvas'/>");	
				initializeMap();
				
				var response = request.responseXML;
				if (action == 'printNotConfirmed') {
					$(response).find('order').each(function(){
						marker = $(this);
						if (marker.find('status').text() != 2)
							printOrder('input', marker.attr('id'), marker.find('address_id').text(), marker.find('status').text(), marker.find('created_date').text(), marker.find('confirmed_date').text(), marker.find('shipped_date').text(), marker.find('delivered_date').text(), marker.find('latitude').text(), marker.find('longitude').text());
							$('ul.orderInputCol li.orderItem:eq(0)').find('.orderInput').attr("checked", "checked");
					});
				} else if (action == 'printAll'){
					$(response).find('order').each(function(){
						marker = $(this);
						printOrder('notinput', marker.attr('id'), marker.find('address_id').text(), marker.find('status').text(), marker.find('created_date').text(), marker.find('confirmed_date').text(), marker.find('shipped_date').text(), marker.find('delivered_date').text(), marker.find('latitude').text(), marker.find('longitude').text());
					});
				}
			} else 
				alert('Error: ' + request.statusText);
		}
	};
	request.send();
}
