window.onload = getXMLHttpRequest();

function getXMLHttpRequest(){
	var request = new XMLHttpRequest();
	if(request) {
		getProductListByCategory(request, 1, 1, 'ASC', 10, 1);
	}
}

function getProductListByCategory(request, language_id, category_id, order, items_per_page, page){
	var url = '/service/Catalog.groovy?method=GetProductListByCategory';
	url += '&language_id=' + language_id;
	url += '&category_id=' + category_id;
	url += '&order=' + order;
	url += '&items_per_page=' + items_per_page;
	url += '&page=' + page;
	request.open('GET', url, true);
	request.onreadystatechange = function(){
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;
				var paramList= response.getElementsByTagName('category');  alert("3");
				
				var i=1, out = "";
				$(response).find('product').each(function() {
					var marker = $(this);
					var name = marker.find("name").text();
					var image_url = marker.find("image_url").text();
					var price = marker.find("price").text();
					out +=	'<li class="product-content corner-tr" id="' + i + '">'
					out +=		'<h5 class="product-header">' + name + '</h5>';
					out +=		'<div id="description' + i + '" class="description hide">';
					out +=			'<img src="' + image_url + '" alt="' + name + '" width="250" height="360" class="image"></img>';
					out +=			'<div class="tabs">';
                   	out +=			    '<ol><li><a href="#tabs-1">Detalles</a></li>';
					out +=				'<li><a href="#tabs-2">Sinopsis</a></li></ol>';
					out +=				'<div id="tabs-1">';
					out +=					'<div id="details">';
                    out +=						'<div class="divPrice">';            
					out +=							'<p class="spanPrice">Precio por unidad: $' + price + '</p>';
					out +=							'<input id="addtocart" type="button" value=""/>';
					out +=						'</div>';
					out +=						'<div class="name">' + name + '<br /></div>';
					out +=						'<div class="autor">';
					out +=							'Director: Dario Argento<br/>';
					out +=							'Cast: Jessica Harper, Stefania Casini, Flavio Bucci, Miguel Bose, Barabara Magnolfi<br/>';
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
					out +=				'<div id="tabs-2">';
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
					out +=		'<img src="' + image_url + '" alt="' + name + '" width="96" height="125"/>';
					out +=		'<a href="description.html" title="Full product details" class="icon icon-zoom">Full product details</a>';
					out +=		'<a href="link/to/trash/script/when/we/have/js/off" title="Add to cart" class="icon icon-cart">Add to cart</a>';
					out +=	'</li>'
					i++;					
				});
				$('#products').html(out);
			}
			else {
				alert('Error:\n');
				alert(request.statusText);
			}
			request = null;
		}
	};
	request.send();
}
