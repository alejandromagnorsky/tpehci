function loadRegisterForm(){
    /*
     if (currentLang == $EN) {
     $.datepicker.setDefaults($.datepicker.regional['en']);
     }
     else
     if (currentLang == $ES) {
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
     */
    requestFromServer('GetCountryList', 'language_id=' + currentLang);
    
    document.getElementById("countryCombo").onchange = function(e){
        var index = document.getElementById("countryCombo").selectedIndex;
        requestFromServer('GetStateList', 'language_id=' + currentLang + '&country_id=' + index);
    };
    $("#stateCombo").html("");
	
    document.getElementById("buttonCancel").onclick = resetRegisterForm;
}


function getCountryList(parameters){
    var url = $COMMON + 'GetCountryList' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200) {
            
                var response = request.responseXML;
                
                var i = 1;
                var out = "";
                out += '<option value="" disabled="true" selected ="selected">';
                out += Language.countryselection;
                out += '</option>';
                $(response).find('country').each(function(){
                    var marker = $(this);
                    var name = marker.find("name").text();
                    out += '<option value="' + i++ + '">';
                    out += name;
                    out += '</option>';
                });
                $('#countryCombo').html(out);
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}


function getStateList(parameters){
    var url = $COMMON + 'GetStateList' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200) {
                var response = request.responseXML;
                
                var i = 1;
                var out = "";
                
                $(response).find('state').each(function(){
                    var marker = $(this);
                    var name = marker.find("name").text();
                    out += '<option value="' + i++ + '">';
                    out += name;
                    out += '</option>';
                });
                $('#stateCombo').html(out);
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}


function register(){
    var msg = XMLGenerator("account", ["username", "name", "password", "email", "birth_date"], [$("#register_username").val(), $("#register_clientname").val(), $("#passwordInput").val(), $("#register_email").val(), toISODate($("#datepicker").val())]);
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/service/Security.groovy",
        dataType: "xml",
        data: {
            method: "CreateAccount",
            account: msg
        },
        success: function(xml){
            if ($(xml).find("response").attr('status') == 'ok') {
                resetRegisterForm();
                $("#divRegisterOK").dialog({
                    close: function(){
                         $("#divRegisterOK").dialog("destroy");
                    },
					"modal": "true",
                    "resizable": "false",
					"title": Language.register,
                    draggable: false
                });
				var widget = $("#divRegisterOK").dialog("widget");
				widget.css("top", "300px");
				widget.css("left", "670px");
				widget.css("width", "550px");
				widget.css("height", "100px");
            }
            else {
                $("#usernametaken").dialog({
                    close: function(){
                         $("#usernametaken").dialog("destroy");
                    },
					"modal": "true",
                    "resizable": "false",
					"title": Language.register,
                    draggable: false
                });
				var widget = $("#usernametaken").dialog("widget");
				widget.css("top", "300px");
				widget.css("left", "670px");
				widget.css("width", "550px");
				widget.css("height", "100px");
            }
        }
    }).responseXML;
}



function resetRegisterForm(){
    $("#registerForm")[0].reset();
    registerValidator.resetForm();
    $("#divRegister").dialog("destroy");
}


function XMLGenerator(rootElem, tags, data){
    var xmldoc = "<" + rootElem + ">";
    var white_space;
    
    $(tags).each(function(itag, tag){
        if (data[itag] == null || data[itag] == undefined || data[itag] == "") {
            xmldoc += "<" + tag + "/>"
        }
        else {
            xmldoc += "<" + tag + ">" + data[itag] + "</" + tag + ">";
        }
    });
    
    whiteSpace = rootElem.lastIndexOf(" ", 0);
    if (whiteSpace != -1) {
        rootElem = rootElem.substring(0, rootElem.lastIndexOf(" ", 0));
    }
    xmldoc += "</" + rootElem + ">";
    return xmldoc;
}
