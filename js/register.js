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
    
    document.getElementById("buttonCancel").onclick = function(){
        $("#registerForm")[0].reset();
        validator.resetForm();
        
        $("#divRegister").dialog("destroy");
    };
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

function signIn(parameters){
    var url = $SECURITY + 'SignIn' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    var response = request.responseXML;
    if ($(response).find("response").attr('status') == 'fail') {
        var errorCode = $(response).find("error").attr("code");
        if (errorCode == 4 || errorCode == 5 || errorCode == 104) 
            $("#loginwarning").css("visibility", "visible");
        
    }
    else {
        alert("Sesión iniciada");
        $(".regWarning").css("visibility", "hidden");
    }
}


function initializeValidator(){
    jQuery.validator.addMethod("dateARG", function(value, element){
        var check = false;
        var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        if (re.test(value)) {
            var adata = value.split('/');
            var gg = parseInt(adata[0], 10);
            var mm = parseInt(adata[1], 10);
            var aaaa = parseInt(adata[2], 10);
            var xdata = new Date(aaaa, mm - 1, gg);
            if ((xdata.getFullYear() == aaaa && xdata.getFullYear() < 2010) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == gg)) 
                check = true;
            else 
                check = false;
        }
        else 
            check = false;
        return this.optional(element) || check;
    }, "");
    
    jQuery.validator.addMethod("dateUSA", function(value, element){
        var check = false;
        var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        if (re.test(value)) {
            var adata = value.split('/');
            var mm = parseInt(adata[0], 10);
            var gg = parseInt(adata[1], 10);
            var aaaa = parseInt(adata[2], 10);
            var xdata = new Date(aaaa, mm - 1, gg);
            if ((xdata.getFullYear() == aaaa && xdata.getFullYear() < 2010) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == gg)) 
                check = true;
            else 
                check = false;
        }
        else 
            check = false;
        return this.optional(element) || check;
    }, "");
    
    
    
    validator = $("#registerForm").validate({
    
        errorElement: "div",
        
        submitHandler: function(form){
            var sel = $('#countryCombo option:selected').text();
            if (sel == Language.countryselection) 
                alert(sel);
            
            //$(form).ajaxSubmit();
        }
        /*
         invalidHandler: function(form, validator){
         $(".regWarning").css("visibility", "visible");
         }*/
    });
}
