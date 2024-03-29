/**
 * @author Mariano
 */

function loadFisheye() {

	getFisheyeData();

	$("#fisheye").mousemove(fisheyeLogic);
}

function sign(x) {
	return x >= 0 ? 1 : -1;
}

function abs(x) {
	if (x > 0)
		return x;
	else
		return -x;
}

function initFisheyeState() {
	var x = 100;
	$('.fisheyeElement').each(function(index) {
		$(this).css("left", x + "px");
		x += 150;
	});
	$('.fisheyeElement').fadeIn(500);

	var x = 100;
	$('.fisheyeShadow').each(function(index) {
		$(this).css("left", x + "px");
		x += 150;
	});
	$('.fisheyeShadow').fadeIn(500);
}

function fisheyeLogic(event) {

	var mouseX;
	var halfWidth = $(document).width() / 2;
	mouseX = event.pageX;

	initFisheyeState();

	$('.fisheyeElement').each(function(index) {

		var elementX = $(this).offset().left;
		var distance = mouseX - elementX - $(this).width() / 2;
		var proportion = 1 - (abs(distance) / halfWidth);
		proportion *= proportion;
		proportion *= proportion;

		$(this).css("height", 150 + proportion * 150);
		$(this).css("top", -50 - proportion * 140);
		$(this).css("width", 75 + proportion * 75);

		var direction = sign(distance);

		$(this).offset( {
			left : elementX - 50 * (1 - proportion) * direction
		});

	});

	$('.fisheyeShadow').each(function(index) {

		var elementX = $(this).offset().left;
		var distance = mouseX - elementX - $(this).width() / 2;
		var proportion = 1 - (abs(distance) / halfWidth);
		proportion *= proportion;
		proportion *= proportion;

		$(this).css("height", 150 + proportion * 150);
		$(this).css("width", 75 + proportion * 75);

		var direction = sign(distance);

		$(this).offset( {
			left : elementX - 50 * (1 - proportion) * direction
		});

	});

}

/* Get product list by category and initializates car */
function getFisheyeData() {
	var parameters = 'language_id=1&category_id=1&order=ASC&items_per_page=10&page=1';
	var request = new XMLHttpRequest();
	var url = $CATALOG + 'GetProductListByCategory' + '&' + parameters;

	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;

				$(response).find('product').each(

						function() {

							var marker = $(this);
							var name = marker.find("name").text();
							var image_url = marker.find("image_url").text();

							var out = "";
							out += '<a href="#"><img name="'+name+'" class="fisheyeElement" src="'
									+ image_url
									+ '"/></a><img class="fisheyeShadow" src="' + image_url + '"/>';
							$('#fisheyeContainer').append(out);
						});
				
				$(".fisheyeElement").click(function(){
					
					var product = $(this).attr("name");
					
					$("#inputsearch").val(product);

					slideHeaderUp(function() {
						search(null, function() {

							$(".product-header").each(function() {

								var title = $(this).text();

								if (title == product) {
									var productContent = $(this).parent();

									var detailsButton = productContent.find(".icon-zoom");

									detailsButton.trigger('click');
								}
							});

						});
					});
				});
			}
		}

		initFisheyeState();
	};
	request.send();

}
