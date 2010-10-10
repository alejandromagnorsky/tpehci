/**
 * @author Mariano
 */

function loadFisheye() {

	initFisheyeState();

	$(".fisheyeElement").mouseenter(fisheyeExpand);
	$(".fisheyeElement").mouseleave(fisheyeContract);
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
		$(this).css("top", -50 - proportion * 50);
		$(this).css("width", 75 + proportion * 75);

		var direction = sign(distance);

		$(this).offset( {
			left : elementX - 50 * (1-proportion) * direction
		});

	});

}

function fisheyeExpand(event) {
	var element = $(event.target);

}

function fisheyeContract(event) {
	var element = $(event.target);

}
