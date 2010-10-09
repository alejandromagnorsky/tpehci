function loadRegisterForm(){

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
    
    
    $("#registerForm").validate({
    
        rules: {
            name: "required",
            lastname: "required",
            birthday: {
                required: true,
                date: true
            },
                        
            password: "required",
            password_again: {
                equalTo: "#passwordInput"
            },
            email: {
                required: true,
                email: true
            }
        
        },
        errorElement: "div",
        
        messages: {
            name: Language.clientnamewarning,
            lastname: Language.clientlastnamewarning,
            birthday: Language.birthdaywarning,
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            }
        },
        
        
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
    
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: 'c-100',
        minDate: '-100y',
        maxDate: '+0d'
    });
    
    
    requestFromServer('GetCountryList', 'language_id=' + currentLang);
    
    document.getElementById("countryCombo").onchange = function(e){
        var index = document.getElementById("countryCombo").selectedIndex;
        requestFromServer('GetStateList', 'language_id=' + currentLang + '&country_id=' + index);
    };
    
    document.getElementById("buttonCancel").onclick = function(){
        $("#registerForm").validate().resetForm();
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
                out += '<option value="i++" disabled="true" selected ="selected">';
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
