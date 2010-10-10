/**
 * @author Mariano
 */

function loadFisheye() {

	getFisheyeData();

	$(".fisheyeElement").mouseenter(fisheyeExpand);
	$("#fisheye").mouseleave(fisheyeContract);
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
		$(this).css("top", -50 - proportion * 75);
		$(this).css("width", 75 + proportion * 75);

		var direction = sign(distance);

		$(this).offset( {
			left : elementX - 50 * (1 - proportion) * direction
		});

	});

}

function fisheyeExpand(event) {

}

function fisheyeContract(event) {
	var x = 100;
	$('.fisheyeElement').each(function(index) {
		$(this).animate({"left": x + "px", "height": "150px", "width": "75px", "top": "-50px"},1000);
		x += 150;
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
							out += '<img class="fisheyeElement" src="'
									+ image_url + '"/>';
							$('#fisheyeContainer').append(out);
						});
			}
		}

		initFisheyeState();
	};
	request.send();

}
