$(function(){
    /* Two main object: products and cart. */
    var $products = $("#products"), $cart = $("#cart");
	
    /* Products are draggable. */
    $("li", $products).draggable({
        cancel: "a.icon",	// Clicking an icon won't start drag.
        revert: "invalid",	// When dragged but not dropped, item reverts to initial position
        
		/* DESPUES FIJARME BIEN SI SAC�NDOLA NO PASA NADA */
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
		addedItem.find("a.icon-cart").remove();
		/* Adds 'Remove From Cart', '+' & '-' buttons */
		addedItem.append("<a href='link/to/recycle/script/when/we/have/js/off' title='-' class='icon icon-minus'>- Quantity</a>");
		addedItem.append("<a href='link/to/recycle/script/when/we/have/js/off' title='+' class='icon icon-plus'>+ Quantity</a>");
		addedItem.append("<a href='link/to/recycle/script/when/we/have/js/off' title='Remove From Cart' class='icon icon-remove'>Remove From Cart</a>");
		addedItem.quantity = 1;
		
		// Event delegation for cart items.
		// NO ME GUSTA NO PODER USAR THIS o $(THIS) PERONO ANDA NO SE PORQUE PREGUNTAR ESTO PORQ EUES UNA CHANCHADA
		addedItem.click(function( event ) {
			$target = $(event.target);
			if ( $target.is( "a.icon-zoom" ) ) {
				productDetails($target);
			} else if ( $target.is( "a.icon-remove" ) ) {
				removeFromCart($(this));
			} else if ( $target.is( "a.icon-plus" ) ) {
				addedItem.quantity++;
			} else if ( $target.is( "a.icon-minus" ) ) {
				addedItem.quantity--;
				if (addedItem.quantity <= 0){
					removeFromCart($(this));
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
			cartItems[i].quantity++;
			return;
		} else {
			var itemToAdd = buildCartItem($item);
		
			// Finally, adds new item to cart.
			itemToAdd.appendTo($("ul", $cart)).fadeIn(function(){
				itemToAdd.animate({ width: "68px" }).find("img").animate({ height: "56px" });
			});
			return;
		}
	}
	
	/* Removes an element from the cart. */
	function removeFromCart($item){
		$item.fadeOut( function(){ $("ul", $cart).children().remove("#" + $item[0].id); });
	}
    
    /* View full product details */
    function productDetails($link){
		var src = $link.attr("href"), title = $link.siblings("img").attr("alt"), $modal = $("img[src$='" + src + "']");
		
		if ($modal.length) {
			$modal.dialog("open");
		} else {
			var img = $("<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />").attr("src", src).appendTo("body");
			setTimeout(function(){
				img.dialog({
					title: title,
					width: 400,
					modal: true
				});
			}, 1);
		}
	}
	
	/* Event delegation for products. */
	$( "#products > li" ).click(function( event ) {
		var $item = $(this);
		$target = $( event.target );
		if ($target.is("a.icon-cart")) {
			addToCart($item);
		} else if ($target.is("a.icon-zoom")) {
			productDetails($target);
		}
		return false;
	});
});