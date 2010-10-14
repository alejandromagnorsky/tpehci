/* Two main objects: products and cart. */
var products;

function enableTabs(){	
	$('.tabs').tabs();	
}

/* Injects cart tag and makes it droppable */
function buildCart(){
	var cartTag = "";

	cartTag += '<div class="sidebarBg"><div id="cartHeader"> Shopping cart</div> <div class ="sidebar"><div id="cartWrapper">';
	cartTag +=	'<div id="' + $CART + '" class="product-content ' + $CART_DEFAULT + '">';
	cartTag +=		'<' + $ITEM_CONTAINER_TAG + ' class="products helper-reset"/>';
	cartTag +=	'</div></div></div><div id="cartFooter">Checkout!</div></div>';
	$('#sidebar-right').html(cartTag);
	
	cart = $('#' + $CART);
	
    // Cart is the dropzone. Products can be dropped into the cart.
    cart.droppable({
        accept: '#' + $CATALOG_CONTAINER_ID + ' > ' + $CATALOG_ITEM,
		activeClass: $CART_HIGHLIGHT,
        drop: function(event, ui){ addToCart(ui.draggable); }
    });
}

function buildDraggables(){
	products = $('#' + $CATALOG_CONTAINER_ID);
		
	// Instantiates dialog windows for every product 
	$('.' + $CATALOG_ITEM_DESCRIPTION, $CATALOG_ITEM).dialog({
			autoOpen: false, 
			width: 1024,
			resizable: false,
			modal: true
	});
	
    // Products are draggable. 
    $( $CATALOG_ITEM, products ).draggable({
        cancel: 'a.' + $ICON,	// Clicking an icon won't start dragging.
        revert: 'invalid',	// When dragged but not dropped, item reverts to initial position
        helper: 'clone',
        cursor: 'move',
		opacity: 0.8
    });
	
	// Event delegation for products.
	$( '#' + $CATALOG_CONTAINER_ID + ' > ' + $CATALOG_ITEM ).click(function( event ) {
		var $item = $(this);
		$target = $( event.target );
		if ($target.is( 'a.' + $ICON_CART )) {
			addToCart($item);
		} else if ($target.is( 'a.' + $ICON_INFO )) {
			$target.parent();
			productDetails($target);
		}
		return false;
	});
}

/* Builds cart item */
function buildCartItem(item){
	var addedItem = item.clone();
	
	//alert(item.find('h5.' +$CATALOG_ITEM_HEADER).text());
	
	var newItem; // This will be the cart product view item, similar but different to the product view item
	
	// Add some buttons.
	addedItem.find('a.' + $ICON_CART).remove();
	addedItem.find('div.productBg').remove();
	addedItem.find('p.productDetails').remove();
	addedItem.append("<a href='" + $JS_OFF + "' title='-' class='" + $ICON + " " + $ICON_MINUS + "'>- Quantity</a>");
	addedItem.append("<a href='" + $JS_OFF + "' title='+' class='" + $ICON + " " + $ICON_PLUS + "'>+ Quantity</a>");
	addedItem.append("<a href='" + $JS_OFF + "' title='Remove from cart' class='" + $ICON + " " + $ICON_REMOVE + "'>Remove From Cart</a>");
	addedItem.append("<span class='" + $CATALOG_ITEM_QUANTITY + "'>1</span>");
	addedItem.append('<div class="cartDivisor"/>');
	
	// Event delegation for cart items.
	addedItem.click(function( event ) {
		$target = $(event.target);
		if ( $target.is( 'a.' + $ICON_INFO ) ) { 
			productDetails($target);
		} else if ( $target.is( 'a.' + $ICON_REMOVE ) ) {
			removeFromCart($(this));
		} else if ( $target.is( 'a.' + $ICON_PLUS ) ) {
			var qty = parseInt(addedItem.find( 'span.' + $CATALOG_ITEM_QUANTITY ).text()) + 1;
			addedItem.find( 'span.' + $CATALOG_ITEM_QUANTITY ).text(qty);
		} else if ( $target.is( 'a.' + $ICON_MINUS ) ) {
			var qty = parseInt(addedItem.find( 'span.' + $CATALOG_ITEM_QUANTITY ).text()) - 1;
			if (qty <= 0){
				removeFromCart($(this));
			} else {
				addedItem.find( 'span.' + $CATALOG_ITEM_QUANTITY ).text(qty);
			}
		}
		return false;
	});
	return addedItem;
}

/* Checks if an item is already in the cart */
function inCart(item){
	var cartItems = $($ITEM_CONTAINER_TAG, cart).children();
	for (var i=0; i<cartItems.length; i++)
		if (cartItems[i].id == item[0].id)
			return i;
	return -1;
}

/* Adds item to the cart. */
function addToCart($item){
	var i = inCart($item);
	if (i >= 0){
		var cartItems = $($ITEM_CONTAINER_TAG, cart).children();
		var item = $("span", cartItems[i]);
		var qty = parseInt(item.text()) + 1;
		item.text(qty);
	} else {
		var itemToAdd = buildCartItem($item);
		
		itemToAdd.css("width", $CART_ITEM_WIDTH);
		itemToAdd.children("img").css("height", $CART_ITEM_HEIGHT );
		itemToAdd.appendTo($($ITEM_CONTAINER_TAG, cart));
		
		/*itemToAdd.appendTo($($ITEM_CONTAINER_TAG, cart)).fadeIn(function(){
			itemToAdd.animate({ width: $CART_ITEM_WIDTH });
			itemToAdd.children("img").animate({ height: $CART_ITEM_HEIGHT });;
		});*/
	}
}

/* Removes an element from the cart. */
function removeFromCart($item){
	$item.fadeOut( function(){ $($ITEM_CONTAINER_TAG, cart).children().remove("#" + $item[0].id); });
}
   
/* View full product details */
function productDetails($link){
	var toOpen =  $('#' + $CATALOG_ITEM_DESCRIPTION + $link.parent().attr("id"));
	toOpen.dialog("option", "title", $link.siblings("img").attr("alt"));
	toOpen.dialog("open");		
	return false;
}
