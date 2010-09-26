$(function(){
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
  
/*	// let the products be droppable as well, accepting items from the cart
    $products.droppable({
        accept: "#cart li",
        activeClass: "custom-state-active",
        drop: function(event, ui){
      //      recycleImage(ui.draggable);
        }
    }); */

	/* Adds given element to the cart. */ 
	var removeFromCartLink = "<a href='link/to/recycle/script/when/we/have/js/off' title='Remove From Cart' class='icon icon-remove'>Remove From Cart</a>";
	var list;
	function addToCart($item){
		$list = $( "ul", $cart ).length ?
					$( "ul", $cart ) : $( "<ul class='products helper-reset'/>" ).appendTo( $cart );
		var addedItem = $item.clone();
		addedItem.find("a.icon-cart").remove();
		addedItem.append(removeFromCartLink);
		
		// Event delegation for cart items.
		addedItem.click(function( event ) {
			$target = $(event.target);
			if ( $target.is( "a.icon-zoom" ) ) {
				productDetails($target);
			} else if ( $target.is( "a.icon-remove" ) ) {
				removeFromCart($(this));
			}
			return false;
		});
		
		// Finally, adds new item to cart.
		addedItem.appendTo($list).fadeIn(function(){
			addedItem.animate({ width: "48px" }).find("img").animate({ height: "36px" });
		});
		
	}
	
	/* Removes an element from the cart. */
	function removeFromCart($item){
		$item.fadeOut( function(){ $list.children().remove("#" + $item[0].id); });
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