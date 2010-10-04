
function loadRegisterForm(){
      
    var language = 1;
    $("#divRegister").html(""); // Clear the divregister tag
    var out = '';
	
    if (language == 1) {
        out += '<form action="">';
        out += 	'<div id = "personal">';
        out += 		'<div class="regFormHeader">';
       	out +=			 'Datos personales';
        out += 		'</div>';
        out += 		'<div class="regFormContent">';
        out += 			'<div class="regInput">';
        out += 				'<label class="regFormLabel">';
        out += 					'<strong>Nombre/s*:</strong>';
        out += 				'</label>';
        out += 				'<br/>';
        out += 				'<input name="name" type="text" size="40"/>';
        out += 				'<br/>';
        out += 				'<label class="regWarning">';
        out +=					'Introduzca uno o m&aacute;s nombres';
        out += 				'</label>';
        out += 			'</div>';
        out += 			'<div class="input">';
        out += 				'<label class="regFormLabel">';
        out += 					'<strong>Apellido/s*:</strong>';
        out += 				'</label>';
        out += 				'<br/>';
        out += 				'<input name="sirname" type="text" size="40" />';
        out += 				'<br/>';
        out += 				'<label class="regWarning">';
        out += 					'Introduzca uno o m&aacute;s apellidos';
        out += 				'</label>';
        out += 			'</div>';
        out += 			'<div class="input">';
        out += 				'<label class="regFormLabel">';
        out += 					'<strong>Fecha de nacimiento*:</strong>';
        out += 				'</label>';
        out += 				'<br/>';
        out += 				'<input id="datepicker" name="birthday" type="text" size="8" maxlength="10" />';
        out += 			'</div>';
        out += 			'<div class="input">';
        out += 				'<label class="regFormLabel">';
        out += 					'<strong>Pa&iacute;s*:</strong>';
        out += 				'</label>';
        out += 				'<br/>';
        out += 				'<select name="country">';
        out += 					'<option value="0" selected="selected">Argentina</option>';
        out += 					'<option value="1">Estados Unidos</option>';
        out += 					'<option value="2">Espa&ntilde;a</option>';
        out += 					'<option value="3">Inglaterra</option>';
        out += 				'</select>';
        out += 			'</div>';
        out +=	 		'<div class="input">';
        out +=	 			'<label class="regFormLabel">';
        out += 					'<strong>Provincia*:</strong>';
        out += 				'</label>';
        out += 				'<br/>';
        out += 				'<select name="state">';
        out +=	 				'<option value="0" selected="selected">Buenos Aires</option>';
        out += 					'<option value="1">Misiones</option>';
        out += 					'<option value="2">C&oacute;rdoba</option>';
        out += 					'<option value="3">La Pampa</option>';
        out += 				'</select>';
        out += 			'</div>';
        out += 		'</div>';
        out += 	'</div>';
        out += 	'<div id = "userData">';
        out += 		'<div class="regFormHeader">';
        out +=			'Datos de usuario';
        out += 		'</div>';
        out += 		'<div class="regFormContent">';
        out += 			'<div class="regInput">';
        out += 				'<label class="regFormLabel">';
        out += 					'<strong>Nombre de usuario*:</strong>';
        out += 				'</label>';
        out += 				'<br/>';
        out += 				'<input name="username" type="text" size="30" maxlength="20"/>';
        out += 				'<br/>';
        out += 			'</div>';
        out += 			'<div class="input">';
        out += 				'<label class="regFormLabel">';
        out += 					'<strong>Contrase&ntilde;a*:</strong>';
        out += 				'</label>';
        out += 				'<br/>';
        out += 				'<input name="password" type="password" size="20" maxlength="20"/>';
        out += 				'<br/>';
        out += 			'</div>';
        out += 			'<div class="input">';
        out += 				'<label class="regFormLabel">';
        out += 					'<strong>Confirmar contrase&ntilde;a*:</strong>';
        out += 				'</label>';
        out += 				'<br/>';
        out += 				'<input name="confirmPassword" type="password" size="20" maxlength="20"/>';
        out += 				'<br/>';
        out += 			'</div>';
        out += 			'<div class="regInput">';
        out += 				'<label class="regFormLabel">';
        out += 					'<strong>Correo electr&oacute;nico*:</strong>';
        out += 				'</label>';
        out += 				'<br/>';
        out += 				'<input name="email" type="text" size="30" maxlength="30"/>';
        out += 				'<br/>';
        out += 			'</div>';
        out += 		'</div>';
        out += 	'</div>';
        out += 	'<div>';
        out += 		'<label class="regReference">';
        out += 			'<strong>*Datos obligatorios</strong>';
        out += 		'</label>';
        out += 		'<br/>';
        out += 		'<input id="buttonOK" type="submit" value="Aceptar"/><input id="buttonCancel" type="button" value="Cancelar"/>';
        out += 	'</div>';
        out += '</form>';
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
    else if (language == 2) {
     	$.datepicker.setDefaults($.datepicker.regional['en']);
    }
	$("#divRegister").html(out);
	$("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: 'c-100',
        minDate: '-100y',
        maxDate: '+0d'
    });
	
	document.getElementById("buttonCancel").onclick = function(){
        $("#divRegister").dialog("destroy");
    };
}
