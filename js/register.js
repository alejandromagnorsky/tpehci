/* API Services */
$COMMON = '/service/Common.groovy?method=';
$SECURITY = '/service/Security.groovy?method=';
$CATALOG = '/service/Catalog.groovy?method=';
$ORDER = '/service/Order.groovy?method=';

var request = new XMLHttpRequest();
var countrySelected;

function loadRegisterForm(){
      
    var language = 1;
   	
    if (language == 1) {
		$.datepicker.setDefaults($.datepicker.regional['en']);
    }
    else if (language == 2) {
		jQuery(function($){
            $.datepicker.regional['es'] = {
                closeText: 'Cerrar',
                prevText: '&#x3c;Ant',
                nextText: 'Sig&#x3e;',
                currentText: 'Hoy',
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mi&eacute;', 'Juv', 'Vie', 'S&aacute;b'],
                dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S&aacute;'],
                weekHeader: 'Sm',
                dateFormat: 'dd/mm/yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };
            $.datepicker.setDefaults($.datepicker.regional['es']);
        });
    }
	
	$("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: 'c-100',
        minDate: '-100y',
        maxDate: '+0d'
    });
	
	
	requestFromServer('GetCountryList', 'language_id=1');
	
	document.getElementById("countryCombo").onchange = function(e){
		var index = document.getElementById("countryCombo").selectedIndex;
		requestFromServer('GetStateList', 'language_id=1&country_id='+index);
	};
	
	document.getElementById("buttonCancel").onclick = function(){
        $("#divRegister").dialog("destroy");
    };
}

function requestFromServer(method, parameters){
	if ( method == 'GetCountryList' )
		getCountryList(parameters);
	else if (method == 'GetStateList')
		getStateList(parameters);
}

function getCountryList(parameters){
	var url = $COMMON + 'GetCountryList' + '&' + parameters;
	request.open('GET', url, true);
	request.onreadystatechange = function(){
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;
				
				var i = 1;
				var out = "";
				out +=	'<option value="i++" disabled="true" selected ="selected">';
				out +=		Language.countryselection;
				out +=	'</option>';
				$(response).find('country').each(function() {
					var marker = $(this);
					var name = marker.find("name").text();
					out +=	'<option value="'+ i++ +'">';
					out +=		name;
					out +=	'</option>';			
				});
				$('#countryCombo').html(out);
			} else {
				alert('Error: ' + request.statusText);
			}
		}
	};
	request.send();
}


function getStateList(parameters){
	var url = $COMMON + 'GetStateList' + '&' + parameters;
	request.open('GET', url, true);
	request.onreadystatechange = function(){
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseXML;
	
				var i = 1;
				var out = "";

				$(response).find('state').each(function() {
					var marker = $(this);
					var name = marker.find("name").text();
					out +=	'<option value="'+ i++ +'">';
					out +=		name;
					out +=	'</option>';			
				});
				$('#stateCombo').html(out);
			} else {
				alert('Error: ' + request.statusText);
			}
		}
	};
	request.send();
}

