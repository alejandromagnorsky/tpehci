window.onload = prepareButtons;

function prepareButtons(){
	document.getElementById("buttonCancel").onclick = function(){
		back();
	};
}