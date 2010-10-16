/*$(function(){
 $(".tabs").tabs();
 Language.es();
 //document.getElementById("tabPref").onclick = loadPreferences;
 //document.getElementById("themeForm").onsubmit = savePreferences;
 });*/
var myaccountShowing = false;

function checkMyAccount(e){
    if (!myaccountShowing) 
        return;
    var target = (e && e.target) || (event && event.srcElement);
    var objDiv = document.getElementById("divmyaccount");
    var objLink = document.getElementById("linkmyaccount");
    var objSpan = document.getElementById("spanmyaccount");
    var parent = checkParent(target, "divmyaccount");
    if (!parent && target != objLink) {
        objDiv.style.display = 'none';
        objLink.className = 'lang_myaccount text_link';
        objSpan.className = 'unclicked';
        
        $("#divmyaccount").hide("slide", {
            direction: "up"
        }, 250);
        
        myaccountShowing = false;
    }
}

function showHideAccount(){
    var display = document.getElementById("divmyaccount").style.display;
    
    if (display == 'none' || display == '') {
    
        document.getElementById("linkmyaccount").className = 'lang_myaccount text_link_clicked';
        document.getElementById("spanmyaccount").className = 'clicked';
        
        $("#divmyaccount").show("slide", {
            direction: "up"
        }, 250);
        
        myaccountShowing = true;
    }
    else {
        document.getElementById("divmyaccount").style.display = 'none';
        document.getElementById("linkmyaccount").className = 'lang_myaccount text_link';
        document.getElementById("spanmyaccount").className = 'unclicked';
        
        $("#divmyaccount").hide("slide", {
            direction: "up"
        }, 250);
        
        myaccountShowing = false;
    }
    return false;
}


function updateAccount(){
    var msg = XMLGenerator("account", ["name", "email", "birth_date"], [$("#modify_clientname").val(), $("#modify_email").val(), toISODate($("#modify_datepicker").val())]);
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/service/Security.groovy",
        dataType: "xml",
        data: {
            method: "UpdateAccount",
            username: session.username,
            authentication_token: session.token,
            account: msg
        },
        success: function(xml){
            if ($(xml).find("response").attr('status') == 'ok') {
                $("#modifydatawarning").dialog({
                    close: function(){
                        $("#modifydatawarning").dialog("destroy");
                    },
                    "modal": "true",
                    "resizable": "false",
                    "title": Language.modifyData,
                    draggable: false
                });
                var widget = $("#modifydatawarning").dialog("widget");
                widget.css("top", "300px");
                widget.css("left", "670px");
                widget.css("width", "550px");
                widget.css("height", "100px");
                translateSettings();
            }
            else {
                alert("Error: " + $(xml).find("error").attr('message'));
            }
        }
    }).responseXML;
}

function changePassword(){
	 $.ajax({
        type: "POST",
        url: "http://localhost:8080/service/Security.groovy",
        dataType: "xml",
        data: {
            method: "ChangePassword",
            username: session.username,
            password: $("#modify_currentpassword").val(),
            new_password: $("#modify_passwordInput").val()
        },
        success: function(xml){
            if ($(xml).find("response").attr('status') == 'ok') {
                $("#changepasswarning").dialog({
                    close: function(){
                        $("#changepasswarning").dialog("destroy");
                    },
                    "modal": "true",
                    "resizable": "false",
                    "title": Language.headerchangepass,
                    draggable: false
                });
                var widget = $("#changepasswarning").dialog("widget");
                widget.css("top", "300px");
                widget.css("left", "670px");
                widget.css("width", "550px");
                widget.css("height", "100px");
				$("#changePassForm")[0].reset();
    			passwordValidator.resetForm();
            }
            else {
                alert("Error: " + $(xml).find("error").attr('message'));
            }
        }
    }).responseXML;
}



function loadAccount(){
    requestFromServer('GetAccount', 'username=' + session.username + '&authentication_token=' + session.token);
}

function getAccount(parameters){
    var url = $SECURITY + 'GetAccount' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    if (request.status == 200) {
        var response = request.responseXML;
        if ($(response).find("response").attr('status') == 'ok') {
            $("#modify_clientname").attr("value", $(response).find('name').text());
            $("#modify_datepicker").attr("value", toLocalDate($(response).find('birth_date').text()));
            $("#modify_email").attr("value", $(response).find('email').text());
            var out = "";
            out += "<p class='spanprofile'><span class='lang_clientname'></span>: " + $(response).find('name').text() + "</p>";
            out += "<p class='spanprofile'><span class='lang_birthday'></span>: " + toLocalDate($(response).find('birth_date').text()) + "</p>";
            out += "<p class='spanprofile'><span class='lang_email'></span>: " + $(response).find('email').text() + "</p>";
            out += "<p class='spanprofile'><span class='lang_createddate'></span>: " + toLocalDate($(response).find('created_date').text()) + "</p>";
            out += "<p class='spanprofile'><span class='lang_lastlogindate'></span>: " + toLocalDate($(response).find('last_login_date').text()) + "</p>";
            $("#tabsProfile").html(out);
        }
    }
    else {
        alert('Error: ' + request.statusText);
    }
}


function loadPreferences(){
    requestFromServer('GetAccountPreferences', 'username=' + username + '&authentication_token=' + authenticationToken);
}

function savePreferences(){
    if ($("input[value='theme1']").attr("checked") == true) 
        requestFromServer('SetAccountPreferences', 'username=' + username + '&authentication_token=' + authenticationToken + '&value=1');
    else 
        requestFromServer('SetAccountPreferences', 'username=' + username + '&authentication_token=' + authenticationToken + '&value=2');
}

function getAccountPreferences(parameters){
    var url = $COMMON + 'GetAccountPreferences' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200) {
            
                var response = request.responseXML;
                
                alert($(response).find('value'));
                
                $("input[value='theme2']").attr("checked", "checked");
                $("input[value='theme1']").attr("checked", "");
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}


function setAccountPreferences(parameters){
    var url = $COMMON + 'SetAccountPreferences' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200) {
                var response = request.responseXML;
                if ($(response).find("response").attr('status') == 'ok') 
                    alert("Se ha guardado su configuración");
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}


function logout(){
    requestFromServer('SignOut', 'username=' + session.username + '&authentication_token=' + session.token);
}

function signOut(parameters){
    var url = $SECURITY + 'SignOut' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200) {
                var response = request.responseXML;
                if ($(response).find("response").attr('status') == 'ok') {
                    delCookie("session", '/', '');
                    changeDivLink();
					$("#content").html("");
					slideHeaderDown();
                }
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}


function showPreferences(){
    showHideAccount();
    
    var out = "";
    out += "<div id='preferences'>";
    out += "   <div class='prefTabs'>";
    out += "      <ol>";
    out += "           <li>";
    out += "              <a class='lang_profile' href='#tabsProfile'></a>";
    out += "          </li>";
    out += "           <li>";
    out += "              <a class='lang_modifyData' href='#tabsData'></a>";
    out += "          </li>";
    out += "         <li>";
    out += "             <a class='lang_personalize' href='#tabsPref'></a>";
    out += "              </li>";
    out += "            </ol>";
    out += "            <div id='tabsProfile'>";
    out += "            </div>";
    out += "            <div id='tabsData'>";
    out += "               <div id='modifydatawarning' class='hidden lang_modifydatawarning'></div>";
    out += "               <form id='modifyForm' action=''>";
    out += "                  <div id = 'clientData'>";
    out += "                      <div class='lang_headermodify regFormHeader'>";
    out += "                     </div>";
    out += "                     <div class='regFormContent'>";
    out += "                         <div class='regInput'>";
    out += "                            <label class='lang_clientname regFormLabel'>";
    out += "                            </label>";
    out += "                            <br/>";
    out += "                          <input id='modify_clientname' name='name' type='text' size='40' maxlength='40' />";
    out += "                          <br/>";
    out += "                      </div>";
    out += "                     <div class='input'>";
    out += "                         <label class='lang_birthday regFormLabel'>";
    out += "                  </label>";
    out += "                         <br/>";
    out += "                     <input id='modify_datepicker' name='birthday' type='text' size='8' maxlength='10' />";
    out += "                      <label class='lang_datereference regFormLabel'>";
    out += "                        </label>";
    out += "                   </div>";
    out += "                   <div class='input'>";
    out += "                       <label class='lang_email regFormLabel'>";
    out += "                    </label>";
    out += "                     <br/>";
    out += "                     <input id='modify_email' name='email' type='text' size='30' maxlength='128' />";
    out += "                    <br/>";
    out += "                   </div>";
    out += "            </div>";
    out += "          </div>";
    out += "           <div>";
    out += "               <br/>";
    out += "                <input id='buttonOK' class='lang_accept' type='submit' value='' />";
    out += "            </div>";
    out += "        </form>";
	out += "        <div id='changepasswarning' class='hidden lang_changepasswarning'></div>";
    out += "        <form id='changePassForm' action=''>";
    out += "            <div id = 'changePass'>";
    out += "              <div class='lang_headerchangepass regFormHeader'>";
    out += "              </div>";
    out += "              <div class='regFormContent'>";
	out += "                 <div class='input'>";
    out += "                      <label class='lang_currentpassword regFormLabel'>";
    out += "                      </label>";
    out += "                      <br/>";
    out += "                      <input id='modify_currentpassword' name='currentpassword' type='password' size='20' maxlength='15' />";
    out += "                      <br/>";
    out += "                 </div>";
    out += "                 <div class='input'>";
    out += "                      <label class='lang_newpassword regFormLabel'>";
    out += "                      </label>";
    out += "                      <br/>";
    out += "                      <input id='modify_passwordInput' name='password' type='password' size='20' maxlength='15' />";
    out += "                      <br/>";
    out += "                 </div>";
    out += "                 <div class='input'>";
    out += "                    <label class='lang_confirmnewpassword regFormLabel'>";
    out += "                    </label>";
    out += "                    <br/>";
    out += "                    <input name='password_again' type='password' size='20' maxlength='15' />";
    out += "                    <br/>";
    out += "                </div>";
    out += "             </div>";
    out += "        </div>";
    out += "        <div>";
    out += "            <br/>";
    out += "             <input id='buttonOK' class='lang_accept' type='submit' value='' />";
    out += "         </div>";
    out += "     </form>";
    out += "  </div>";
    out += "  <div id='tabsPref'>";
    out += "      <form id='themeForm' action=''>";
    out += "          <p>";
    out += "              <label class='lang_selectTheme'>";
    out += "              </label><br /><br />";
    out += "               <label class='labeltheme'><input type='radio' name='theme' checked='checked' value='theme1' />Orangejuice</label><br /><br />";
    out += "               <label class='labeltheme'><input type='radio' name='theme' value='theme2' />Goldenhammer</label>";
    out += "               <br/>";
    out += "               <input id='account_buttonOK' class='lang_accept' type='submit' value='' />";
    out += "           </p>";
    out += "        </form>";
    out += "      </div>";
    out += "   </div>";
    out += " </div>";
    $("#content").html(out);
    
    $(".prefTabs").tabs();
    slideHeaderUp();
    translateSettings();
}

function toLocalDate(date){
    var re = /^\d{4}-\d{1,2}-\d{1,2}$/;
    if (!re.test(date)) 
        return date;
    var ans;
    var adata = date.split('-');
    var dd, mm, aaaa;
    aaaa = parseInt(adata[0], 10);
    mm = parseInt(adata[1], 10);
    dd = parseInt(adata[2], 10);
    if (currentLang == $EN) {
        ans = mm + "/" + dd + "/" + aaaa;
    }
    else 
        if (currentLang == $ES) {
            ans = dd + "/" + mm + "/" + aaaa;
        }
    return ans;
}
