var products;

function enableTabs(){	
	//$('.tabs').tabs();	
}

/* Injects cart tag and makes it droppable */
function buildCart(){
	var cartTag = "";
	cartTag += '<div class="sidebarBg"><div id="cartHeader"> Shopping cart</div> <div class ="sidebar"><div id="cartWrapper">';
	cartTag +=	'<div id="' + $CART + '" class="product-content ' + $CART_DEFAULT + '">';
	cartTag +=		'<' + $ITEM_CONTAINER_TAG + ' class="products helper-reset"/>';
	cartTag +=	'</div></div></div><div id="cartFooter">'
	cartTag +=		'<a class="checkoutButton" href="' + $JS_OFF + '" alt="Checkout!">Checkout!</a>';
	cartTag +=	'</div></div>';
	$('#sidebar-right').html(cartTag);
	
	$('.checkoutButton').click(function(event){
		proceedToCheckout();
		return false;
	});
	
	$("#cartHeader").css("background-image", "url(../css/images/inicio/" + StyleAddr + "cart_header.png)");
	$("#cartHeader").css("color", StyleTextColor);
	$("#cartFooter").css("background-image", "url(../css/images/inicio/" + StyleAddr + "cart_footer.png)");
	
	cart = $('#' + $CART);
	var cookie = getCookie("cart");
	if (cookie) {
		var shoppingCart = $.secureEvalJSON(cookie);
		$("#cart").html(shoppingCart);
		
		// Event delegation for cart items.
		$('#cart').find('li').each(function (){
			$(this).click( function(event){
				$target = $(event.target);
				if ( $target.is( 'a.' + $ICON_INFO ) ) {
					productDetails($target);
				} else if ( $target.is( 'a.' + $ICON_REMOVE ) ) {
					removeFromCart($(this));
					//setCookie("cart", $.toJSON($('#cart').html()), undefined, '/', '', false);
				} else if ( $target.is( 'a.' + $ICON_PLUS ) ) {
					var qty = parseInt($(this).find( 'span.' + $CATALOG_ITEM_QUANTITY ).text()) + 1;
					$(this).find( 'span.' + $CATALOG_ITEM_QUANTITY ).text(qty);
					//setCookie("cart", $.toJSON($('#cart').html()), undefined, '/', '', false);
				} else if ( $target.is( 'a.' + $ICON_MINUS ) ) {
					var qty = parseInt($(this).find( 'span.' + $CATALOG_ITEM_QUANTITY ).text()) - 1;
					if (qty <= 0)
						removeFromCart($(this));
					else
						$(this).find( 'span.' + $CATALOG_ITEM_QUANTITY ).text(qty);
					//setCookie("cart", $.toJSON($('#cart').html()), undefined, '/', '', false);
				}
				return false;
			});
		})
	}
    // Cart is the dropzone. Products can be dropped into the cart.
    cart.droppable({
        accept: '#' + $CATALOG_CONTAINER_ID + ' > ' + $CATALOG_ITEM,
		activeClass: $CART_HIGHLIGHT,
        drop: function(event, ui){ addToCart(ui.draggable); }
    });
}

function buildDraggables(){
	products = $('#' + $CATALOG_CONTAINER_ID);

    // Products are draggable. 
    $( $CATALOG_ITEM, products ).draggable({
        cancel: 'a.' + $ICON,	// Clicking an icon won't start dragging.
        revert: 'invalid',	// When dragged but not dropped, item reverts to initial position
        helper: 'clone',
        cursor: 'move',
		helper: function(event){
    	
    		var helper = "<img width='66' height='90' src='" + $(this).find("img").attr("src") + "'/> ";
    		
    		return $( helper );
    	},
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
	addedItem.find('.productDetails').remove();
	addedItem.find('.imgDragger').remove();
	addedItem.append("<a href='" + $JS_OFF + "' title='-' class='" + $ICON + " " + $ICON_MINUS + "'>- Quantity</a>");
	addedItem.append("<a href='" + $JS_OFF + "' title='+' class='" + $ICON + " " + $ICON_PLUS + "'>+ Quantity</a>");
	addedItem.append("<a href='" + $JS_OFF + "' title='Remove from cart' class='" + $ICON + " " + $ICON_REMOVE + "'>Remove From Cart</a>");
	addedItem.append("<span class='" + $CATALOG_ITEM_QUANTITY + "'>1</span>");
	addedItem.append('<div class="cartDivisor"/>');
	addedItem.append('<div class="imgWrapper"/>');
	item.find(".cartFeedback").fadeIn(500);
	setTimeout(function(){ item.find(".cartFeedback").fadeOut(1000);}, 3000);
	
	// Event delegation for cart items.
	addedItem.click(function( event ) {
		$target = $(event.target);
		if ( $target.is( 'a.' + $ICON_INFO ) ) { 
			productDetails($target);
		} else if ( $target.is( 'a.' + $ICON_REMOVE ) ) {
			removeFromCart($(this));
			//setCookie("cart", $.toJSON($('#cart').html()), undefined, '/', '', false);
		} else if ( $target.is( 'a.' + $ICON_PLUS ) ) {
			var qty = parseInt(addedItem.find( 'span.' + $CATALOG_ITEM_QUANTITY ).text()) + 1;
			addedItem.find( 'span.' + $CATALOG_ITEM_QUANTITY ).text(qty);
			//setCookie("cart", $.toJSON($('#cart').html()), undefined, '/', '', false);
		} else if ( $target.is( 'a.' + $ICON_MINUS ) ) {
			var qty = parseInt(addedItem.find( 'span.' + $CATALOG_ITEM_QUANTITY ).text()) - 1;
			if (qty <= 0) {
				removeFromCart($(this));
			} else {
				addedItem.find('span.' + $CATALOG_ITEM_QUANTITY).text(qty);
			}
			//setCookie("cart", $.toJSON($('#cart').html()), undefined, '/', '', false);
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
		var item = $(cartItems.get(i)).find(".quantity");
		var qty = parseInt(item.text()) + 1;
		item.text(qty);
	} else {
		var itemToAdd = buildCartItem($item);
		
		itemToAdd.css("width", $CART_ITEM_WIDTH);
		itemToAdd.children("img").css("height", $CART_ITEM_HEIGHT );
		itemToAdd.appendTo($($ITEM_CONTAINER_TAG, cart));
		
		
		$(".imgWrapper").css("background-image", "url(../css/images/inicio/" + StyleAddr + "imgWrapper.png)");
		
		/*itemToAdd.appendTo($($ITEM_CONTAINER_TAG, cart)).fadeIn(function(){
			itemToAdd.animate({ width: $CART_ITEM_WIDTH });
			itemToAdd.children("img").animate({ height: $CART_ITEM_HEIGHT });;
		});*/
	}
	//setCookie("cart", $.toJSON($('#cart').html()), undefined, '/', '', false);
}

/* Removes an element from the cart. */
function removeFromCart($item){
	$item.fadeOut( function(){ $($ITEM_CONTAINER_TAG, cart).children().remove("#" + $item[0].id); });
}
   
/* View full product details */
function productDetails($link){
	
	var toOpen =  $('#' + $CATALOG_ITEM_DESCRIPTION + $link.parent().attr("id"));

	// Instantiates dialog windows for every product 
	toOpen.dialog({
			autoOpen: false, 
			width: 1024,
			resizable: false,
			close : function(){
				parent.location.hash = "search=" + $("#inputsearch").val();
				$(this).dialog("destroy");
			},
			modal: true
	});
	
	
	
	toOpen.dialog("option", "title", $link.siblings("img").attr("alt"));
	
	// Modify hash tag
	parent.location.hash = "content=true&product=" + $link.parent().find(".product-header").text();
	
	toOpen.dialog("option", "draggable", false);
	toOpen.dialog("open");		
	
	var widget = toOpen.dialog("widget");
	widget.css("margin", "auto");
	//widget.css("margin-top", "");

	widget.css("left", "0");
	widget.css("right", "0");

	widget.css("top", "30px");
	widget.css("bottom", "0");
	widget.css("height", "390px");
	widget.css("width", "850px");
	widget.css("text-align", "left");
	widget.css("overflow", "hidden");

	widget.css("position", "absolute");
	widget.css("padding", "0");
	widget.css("-moz-box-shadow", " 0 0px 20px rgba(0, 0, 0, 1)");
	widget.css("-moz-border-radius", "10px 10px 10px 10px");
	widget.css("background-image", "none");
	widget.css("border", "2px solid rgba(255,255,255,0.3)");
	
	
	$(".addtocart").click(function(){

		var id = $(this).attr("value");
		var products = $("#products").find(".product-content");
		
		products.each( function(){
			
			if($(this).attr("id") == id){
				var cartButton = $(this).find(".icon-cart");
				cartButton.click();
			}
		});
	});
	
	return false;
}

function proceedToCheckout(){
	var out = '';
	$("#content").html('<div class="product">' + out + '</div>');
	out +=	'<h3 class="checkout-header">Checkout</h3>';
	if ($('#cart').find('li').length != 0){
		var fromCart = $('#cart');
		out +=	'<div class="checkoutTable">';
		out +=		'<ul class="idCol"><li class="checkoutTitle">ID</li></ul>';
		out +=		'<ul class="nameCol"><li class="checkoutTitle">Título</li></ul>';
		out +=		'<ul class="qtyCol"><li class="checkoutTitle">Cantidad</li></ul>';
		out +=		'<ul class="priceCol"><li class="checkoutTitle">Precio</li></ul>';
		out +=		'<ul class="subtotalCol"><li class="checkoutTitle">Subtotal</li></ul>';
		out +=	'</div>';
		$('.product').append(out);
		
		var total = 0;
		fromCart.find('li').each( function(){
			var marker = $(this);
			var price = marker.find('.basePrice').html();
			var qty = marker.find('span.quantity').html();
			total += price * qty;
			$('.checkoutTable').find('.idCol').append('<li class="checkoutItem">' + marker.attr('id') + '</li>');
			$('.checkoutTable').find('.nameCol').append('<li class="checkoutItem">' + marker.find('h5.product-header').html() + '</li>');
			$('.checkoutTable').find('.qtyCol').append('<li class="checkoutItem">' + qty + '</li>');
			$('.checkoutTable').find('.priceCol').append('<li class="checkoutItem">' + price + '</li>');
			$('.checkoutTable').find('.subtotalCol').append('<li class="checkoutItem">' + (price * qty) + '</li>');
		});
		
		out = '<div class="totalCheckout"><br><br><br><br><br><br>Total: ' + total + '</div>';
		$('.product').append(out);
	} else {
		out += '<span>No hay ítems en el carrito</br></span>';
		$('.product').append(out);
	}
	out = '';
	if (session == undefined){
		out += '<span><p/><p/>Usted debe estar logueado para hacer un pedido.</br></span>';
		$('.product').append(out);
	} else {
		out +=	'<h3 class="order-header">SELECT NON-CONFIRMED ORDER...</h3>';
		out +=	'<form id="orderForm" action="#">';
		out +=		'<div class="orderTable">';
		out +=			'<ul class="orderInputCol"><li class="orderTitle">#</li></ul>';
		out +=			'<ul class="orderIdCol"><li class="orderTitle">Order ID</li></ul>';
		out +=			'<ul class="statusCol"><li class="orderTitle">Status</li></ul>';
		out +=			'<ul class="createdCol"><li class="orderTitle">Placed on</li></ul>';
		out +=			'<ul class="confirmCol"><li class="orderTitle">Confirm</li></ul>';
		out +=			'<ul class="dropCol"><li class="orderTitle">Drop</li></ul>';
		out +=		'</div>';
		out +=	'</form>';
		out +=	'<span><a href="#" class="addToSelectedOrder"><p/><p/>Add to selected order</a></span>';
		out +=	'<h3 class="order-header"><br/><p/><p/><p/><p/>...OR PLACE A NEW ONE</h3>';
		out +=	'<span><a href="#" class="placeNewOrder"><p/><p/>Place new order</a></span>';
		$('.product').append(out);
		getOrderList('username=' + session.username + '&authentication_token=' + session.token, 'printNotConfirmed');
		


		initializeContent();
		incrementContentByProduct();
		incrementContentByProduct();
		incrementContentByProduct();
		incrementContentByProduct();
		

		$('.addToSelectedOrder').click(function(){
			if ($('ul.orderIdCol > li.orderItem').length == 0){
				alert("No orders to add to. Must place a new order.");
			} else if ($('ul.idCol > li.checkoutItem').length == 0){
				alert("No items to add.");
			} else {
				// Finds out which radio button is checked
				showLoadingDialog();
				var order_id = jQuery('#orderForm input:radio:checked').val();
				var i = 0;
				$('ul.idCol > li.checkoutItem').each(function(){
					var marker = $(this);
					addOrderItem(order_id, marker.html(), $('ul.qtyCol > li.checkoutItem:eq(' + i + ')').html());
					i++;
				});
				$('li.checkoutItem').remove();
				incrementContentByProduct();
			}
			
			return false;
		});
		
		$('.placeNewOrder').click(function(){
			if ($('ul.idCol > li.checkoutItem').length != 0){
				showLoadingDialog();
				createOrder();
				incrementContentByProduct();
				
			} else {
				alert("Can't place new order without any item in cart ");
			}
			
			return false;
		});
	}
}

function createOrder(){
    $.ajax({
        type: "POST",
        url: getHref()+"/service/Order.groovy",
        dataType: "xml",
        data: {
            method: "CreateOrder",
            username: session.username,
            authentication_token: session.token
        },
        success: function(xml){
            if ($(xml).find("response").attr('status') == 'ok') {
                var order_id = $(xml).find("order").attr('id');
				var i = 0;
				$('ul.idCol > li.checkoutItem').each(function(){
					var marker = $(this);
					addOrderItem(order_id, marker.html(), $('ul.qtyCol > li.checkoutItem:eq(' + i + ')').html());
					i++;
				});
				$('li.checkoutItem').remove();
				getOrder('username=' + session.username + '&authentication_token=' + session.token + '&order_id=' + order_id);
			} else {
                alert("Error: " + $(xml).find("error").attr('message'));
            }
        }
    }).responseXML;
}

function confirmOrder(o_id, addr_id){
	$.ajax({
        type: "POST",
        url: getHref()+"/service/Order.groovy",
        dataType: "xml",
        data: {
            method: "ConfirmOrder",
            username: session.username,
            authentication_token: session.token,
			order_id: o_id,
			address_id: addr_id
        },
        success: function(xml){
            if ($(xml).find("response").attr('status') == 'ok') {
				var i = 0, stop = false;
				$('ul.orderIdCol li.orderItem').each(function(){
					if (!stop){
						marker = $(this);
						if (marker.html().toString() == o_id.toString())
							stop = true;
						else i++;
					}
				});
				var order_checked = jQuery('#orderForm input:radio:checked').val();
				$('ul.statusCol li.orderItem:eq(' + i + ')').html('Confirmed');
				$('ul.statusCol li.orderItem:eq(' + i + ')').css('color', '#CD0A0A');
				$('ul.confirmCol li.orderItem:eq(' + i + ')').html('Confirmed');
				$('ul.dropCol li.orderItem:eq(' + i + ')').html('Cannot drop');
				$('ul.dropCol li.orderItem:eq(' + i + ')').css('color', '#CD0A0A');
				$('ul.confirmCol li.orderItem:eq(' + i + ')').css('color', '#CD0A0A');
				$('ul.orderInputCol li.orderItem:eq(' + i + ')').html('');
				if (o_id == order_checked)
					$('ul.orderInputCol li.orderItem:eq(0)').find('.orderInput').attr("checked", "checked");
					
				hideLoadingDialog();
				alert("Order succesfully confirmed");		
			} else {
                alert("Error: " + $(xml).find("error").attr('message'));
            }
        }
    }).responseXML;
}

function deleteOrder(o_id){
    $.ajax({
        type: "POST",
        url: getHref()+"/service/Order.groovy",
        dataType: "xml",
        data: {
            method: "DeleteOrder",
            username: session.username,
            authentication_token: session.token,
			order_id: o_id
        },
        success: function(xml){
            if ($(xml).find("response").attr('status') == 'ok') {
				var i = 0, stop = false;
				$('ul.orderIdCol li.orderItem').each(function(){
					if (!stop){
						marker = $(this);
						if (marker.html().toString() == o_id.toString())
							stop = true;
						else i++;
					}
				});
				var order_checked = jQuery('#orderForm input:radio:checked').val();
				$('ul.orderInputCol li.orderItem:eq(' + i + ')').remove();
				$('ul.orderIdCol li.orderItem:eq(' + i + ')').remove();
				$('ul.statusCol li.orderItem:eq(' + i + ')').remove();
				$('ul.createdCol li.orderItem:eq(' + i + ')').remove();
				$('ul.confirmCol li.orderItem:eq(' + i + ')').remove();
				$('ul.dropCol li.orderItem:eq(' + i + ')').remove();
				if (o_id == order_checked)
					$('ul.orderInputCol li.orderItem:eq(0)').find('.orderInput').attr("checked", "checked");

			} else {
                alert("Error: " + $(xml).find("error").attr('message'));
            }
        }
    }).responseXML;
}

function addOrderItem(o_id, product_id, count){
	$.ajax({
        type: "POST",
        url: getHref()+"/service/Order.groovy",
        dataType: "xml",
        data: {
            method: "AddOrderItem",
            username: session.username,
            authentication_token: session.token,
			order_id: o_id,
			order_item: '<order_item><product_id>' + product_id + '</product_id><count>' + count + '</count></order_item>'
        },
        success: function(xml){
            if ($(xml).find("response").attr('status') == 'ok') {
				$('#cart li#' + product_id).remove();
				$('.checkoutTable').html('<span>No hay ítems en el carrito</br></span>');
				$('.totalCheckout').remove();
				hideLoadingDialog();
			} else {
                alert("Error: " + $(xml).find("error").attr('message'));
            }
        }
    }).responseXML;
}

function createAddress(){
	var full_name = $("#address_fullname").val();
	var ad_1 = $("#address_primaryaddress").val();
	var ad_2 = $("#address_secondaryaddress").val();
	var c_id = $("#address_countryCombo").val();
	var s_id = $("#address_stateCombo").val();
	var city = $('#address_city').val();
	var z_c = $('#address_zipcode').val();
	var p_n = $('#address_phonenumber').val();
	var msg = XMLGenerator("address", ["full_name", "address_line_1", "address_line_2", "country_id", "state_id", "city", "zip_code", "phone_number"], [full_name, ad_1, ad_2, c_id, s_id, city, z_c, p_n]);
    $.ajax({
        type: "POST",
        url: getHref()+"/service/Order.groovy",
        dataType: "xml",
        data: {
            method: "CreateAddress",
            username: session.username,
            authentication_token: session.token,
            address: msg
        },
        success: function(xml){
            if ($(xml).find("response").attr('status') == 'ok') {
                alert("New address added");
				var new_id = $(xml).find("address").attr('id');
				printAddress(new_id, full_name, ad_1, ad_2, c_id, s_id, city, z_c, p_n);

			} else {
                alert("Error: " + $(xml).find("error").attr('message'));
            }
        }
    }).responseXML;
}

function updateAddress(addr_id, full_name, address_line_1, address_line_2, country_id, state_id, city, zip_code, phone_number){
    $.ajax({
        type: "POST",
        url: getHref()+"/service/Order.groovy",
        dataType: "xml",
        data: {
            method: "UpdateAddress",
            username: session.username,
            authentication_token: session.token,
            address: 	'<address id="' + addr_id + '">' + 
							'<full_name>' + full_name + '</full_name>' +
							'<address_line_1>' + address_line_1 + '</address_line_1>' +
							'<address_line_2>' + address_line_2 + '</address_line_2>' +
							'<country_id>' + country_id + '</country_id>' +
							'<state_id>' + state_id + '</state_id>' +
							'<city>' + city + '</city>' +
							'<zip_code>' + zip_code + '</zip_code>' +
							'<phone_number>' + phone_number + '</phone_number>' +
						'</address>'
        },
        success: function(xml){
            if ($(xml).find("response").attr('status') == 'ok') {
                alert("Address updated");
			} else {
                alert("Error: " + $(xml).find("error").attr('message'));
            }
        }
    }).responseXML;
}

