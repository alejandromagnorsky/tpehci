$CART_ITEM_WIDTH = "83px";
$CART_ITEM_HEIGHT = "112px";

$(function(){
	/* ********* PARCHAZO!!! ***************** */
	while($("li", $products).length == 0);
	/*  *************************************** */
	
	$(".tabs").tabs();
	
	/* Instantiates dialog windows for every product */
	$(".description").dialog({
			autoOpen: false, 
			width: 1024,
			resizable: false,
			modal: true
	});
				
    /* Two main object: products and cart. */
    var $products = $("#products"), $cart = $("#cart");
	
    /* Products are draggable. */
    $("li", $products).draggable({
        cancel: "a.icon",	// Clicking an icon won't start drag.
        revert: "invalid",	// When dragged but not dropped, item reverts to initial position
        
		/* DESPUES FIJARME BIEN SI SACÁNDOLA NO PASA NADA */
        containment: $("#demo-frame").length ? "#demo-frame" : "document", // stick to demo-frame if present
        helper: "clone",
        cursor: "move",
		opacity: 0.8
    });

    /* Cart is the dropzone. Products can be dropped in the cart. */
    $cart.droppable({
        accept: "#products > li",
		activeClass: "state-highlight",
        drop: function(event, ui){ addToCart(ui.draggable); }
    });
	
	
	/* NECESITO SABER QUE MIERDA HACE ESTA LINEA Y POR QUE LA NECESITO, porque la necesito si o si. */
	$( "<ul class='products helper-reset'/>" ).appendTo( $cart );
	
	/* Builds cart item */
	function buildCartItem(item){
		var addedItem = item.clone();
		
		/* Add some buttons. */
		addedItem.find("a.icon-cart").remove();
		addedItem.append("<a href='link/to/recycle/script/when/we/have/js/off' title='-' class='icon icon-minus'>- Quantity</a>");
		addedItem.append("<a href='link/to/recycle/script/when/we/have/js/off' title='+' class='icon icon-plus'>+ Quantity</a>");
		addedItem.append("<a href='link/to/recycle/script/when/we/have/js/off' title='Remove from cart' class='icon icon-remove'>Remove From Cart</a>");
		addedItem.append("<span class='quantity'>1</span>");
		
		// Event delegation for cart items.
		addedItem.click(function( event ) {
			$target = $(event.target);
			if ( $target.is( "a.icon-zoom" ) ) {
				productDetails($target);
			} else if ( $target.is( "a.icon-remove" ) ) {
				removeFromCart($(this));
			} else if ( $target.is( "a.icon-plus" ) ) {
				var qty = parseInt(addedItem.find("span.quantity").text()) + 1;
				addedItem.find("span.quantity").text(qty);
			} else if ( $target.is( "a.icon-minus" ) ) {
				var qty = parseInt(addedItem.find("span.quantity").text()) - 1;
				if (qty <= 0){
					removeFromCart($(this));
				} else {
					addedItem.find("span.quantity").text(qty);
				}
			}
			return false;
		});
		return addedItem;
	}
	
	/* Checks if an item is already in the cart */
	function inCart(item){
		var cartItems = $("ul", $cart).children();
		for (var i=0; i<cartItems.length; i++){
			if (cartItems[i].id == item[0].id){
				return i;
			}
		}
		return -1;
	}
	
	function addToCart($item){
		var i = inCart($item);
		if (i >= 0){
			var cartItems = $("ul", $cart).children();
			var item = $("span", cartItems[i]);
			var qty = parseInt(item.text()) + 1;
			item.text(qty);
		} else {
			var itemToAdd = buildCartItem($item);
			itemToAdd.appendTo($("ul", $cart)).fadeIn(function(){
				itemToAdd.animate({ width: $CART_ITEM_WIDTH });
				itemToAdd.children("img").animate({ height: $CART_ITEM_HEIGHT });;
			});
		}
	}
	
	/* Removes an element from the cart. */
	function removeFromCart($item){
		$item.fadeOut( function(){ $("ul", $cart).children().remove("#" + $item[0].id); });
	}
    
    /* View full product details */
	function productDetails($link){
		var toOpen =  $("#description" + $link.parent().attr("id"));
		toOpen.dialog("option", "title", $link.siblings("img").attr("alt"));
		toOpen.dialog("open");		
		return false;
	}
	
	/* Event delegation for products. */
	$( "#products > li" ).click(function( event ) {
		var $item = $(this);
		$target = $( event.target );
		if ($target.is("a.icon-cart")) {
			addToCart($item);
		} else if ($target.is("a.icon-zoom")) {
			$target.parent();
			productDetails($target);
		}
		return false;
	});
})