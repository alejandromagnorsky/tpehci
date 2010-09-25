window.onload = prepareButtons;

function prepareButtons(){
	document.getElementById("buttonCancel").onclick = function(){
		back();
	};

	$("#datepicker").datepicker({
		changeMonth: true,
		changeYear: true,
		yearRange: 'c-100',
		minDate: '-100y',
		maxDate: '+0d'
	});
}