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
    inyectCountries();
    
    document.getElementById("countryCombo").onchange = function(e){
        var index = document.getElementById("countryCombo").selectedIndex;
        inyectStates(index);
    };
    $("#stateCombo").html("");
    
    document.getElementById("buttonCancel").onclick = resetRegisterForm;
}

function inyectCountries(){
    var i;
    var out = "";
    out += '<option value="" disabled="true" selected ="selected">';
    out += Language.countryselection;
    out += '</option>';
    for (i = 0; i < countries[currentLang - 1].length; i++) {
        out += '<option value="' + i + 1 + '">';
        out += countries[currentLang - 1][i].name;
        out += '</option>';
    }
    $('#countryCombo').html(out);
}

function inyectStates(country_id){
    var i = 1, j = 1;
    var out = "";
    
    for (i = 0; i < states[currentLang - 1].length; i++) {
        if (states[currentLang - 1][i].country_id == country_id) {
            out += '<option value="' + j++ + '">';
            out += states[currentLang - 1][i].name;
            out += '</option>';
        }
    }
    $('#stateCombo').html(out);
}


function loadCountries(){
    countries = new Array();
    var i;
    for (i = 0; i < 2; i++) {
        countries[i] = new Array();
        
        var response = getCountryList('language_id=' + (i + 1));
        $(response).find('country').each(function(){
            var marker = $(this);
            countries[i].push(new Country(marker.attr('id'), marker.find("code").text(), marker.find("name").text()));
        })
    }
}


function loadStates(){
    states = new Array();
    var i, j;
    for (i = 0; i < 2; i++) {
        states[i] = new Array();
        for (j = 0; j < countries[i].length; j++) {
            var response = getStateList('language_id=' + (i + 1) + '&country_id=' + (countries[i][j].id));
            $(response).find('state').each(function(){
                var marker = $(this);
                states[i].push(new State(marker.attr('id'), marker.find("code").text(), marker.find("name").text(), marker.find('country_id').text()));
            })
        }
    }
    
}


function Country(id, code, name){
    this.id = id;
    this.code = code;
    this.name = name;
}

function State(id, code, name, country_id){
    this.id = id;
    this.code = code;
    this.name = name;
    this.country_id = country_id;
}


function getCountryList(parameters){
    var url = $COMMON + 'GetCountryList' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    if (request.status == 200) {
    
        var response = request.responseXML;
        return response;
    }
    else {
        alert('Error: ' + request.statusText);
    }
}


function getStateList(parameters){
    var url = $COMMON + 'GetStateList' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    if (request.status == 200) {
        var response = request.responseXML;
        return response;
        /*
         var i = 1;
         var out = "";
         
         $(response).find('state').each(function(){
         var marker = $(this);
         var name = marker.find("name").text();
         out += '<option value="' + i++ + '">';
         out += name;
         out += '</option>';
         });
         $('#stateCombo').html(out);*/
    }
    else {
        alert('Error: ' + request.statusText);
    }
    
    
}


function register(){
    var msg = XMLGenerator("account", ["username", "name", "password", "email", "birth_date"], [$("#register_username").val(), $("#register_clientname").val(), $("#passwordInput").val(), $("#register_email").val(), toISODate($("#datepicker").val())]);
    var link = getHref() + "/service/Security.groovy";
    $.ajax({
        type: "POST",
        url: link,
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
