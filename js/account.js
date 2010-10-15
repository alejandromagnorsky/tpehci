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
    
        document.getElementById("linkmyaccount").className = 'lang_login text_link_clicked';
        document.getElementById("spanmyaccount").className = 'clicked';
        
        $("#divmyaccount").show("slide", {
            direction: "up"
        }, 250);
        
        myaccountShowing = true;
    }
    else {
    
        document.getElementById("divmyaccount").style.display = 'none';
        document.getElementById("linkmyaccount").className = 'lang_login text_link';
        document.getElementById("spanmyaccount").className = 'unclicked';
        
        $("#divmyaccount").hide("slide", {
            direction: "up"
        }, 250);
        
        myaccountShowing = false;
    }
    return false;
}

function initializeModValidator(){
    modifyValidator = $("#modifyForm").validate({
    
        errorElement: "div",
        
        
        submitHandler: register
    
        /*
         invalidHandler: function(form, validator){
         $(".regWarning").css("visibility", "visible");
         }
         */
    });
}



function loadAccount(){
    requestFromServer('GetAccount', 'username=' + username + '&authentication_token=' + authenticationToken);
}

function getAccount(parameters){
    var url = $COMMON + 'GetAccount' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200) {
                var response = request.responseXML;
                if ($(response).find("response").attr('status') == 'ok') {
                    $("#modify_clientname").attr("value", "$(response).find('name').text()");
                    $("#modify_datepicker").attr("value", "$(response).find('birth_date').text()");
                    $("#modify_email").attr("value", "$(response).find('email').text()");
                }
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}


function loadPreferences(){
    requestFromServer('GetAccountPreferences', 'username=' + username + '&authentication_token=' + authenticationToken);
}

function savePreferences(){
    if ($("input[value='Orange']").attr("checked") == true) 
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
                
                $("input[value='Twitter']").attr("checked", "checked");
                $("input[value='Orange']").attr("checked", "");
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
                }
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}


function displayPreferences(){

    var out = "";
    out += "<div id='preferences'>";
    out += "   <div class='prefTabs'>";
    out += "      <ol>";
    out += "           <li>";
    out += "              <a class='lang_modifyData' href='#tabsData'></a>";
    out += "          </li>";
    out += "         <li>";
    out += "             <a class='lang_personalize' href='#tabsPref'></a>";
    out += "              </li>";
    out += "            </ol>";
    out += "            <div id='tabsData'>";
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
    out += "        <form id='changePassForm' action=''>";
    out += "            <div id = 'changePass'>";
    out += "               <div class='lang_headerchangepass regFormHeader'>";
    out += "              </div>";
    out += "              <div class='regFormContent'>";
    out += "                  <div class='input'>";
    out += "                      <label class='lang_newpassword regFormLabel'>";
    out += "                      </label>";
    out += "                      <br/>";
    out += "                      <input id='passwordInput' name='password' type='password' size='20' maxlength='15' />";
    out += "                     <br/>";
    out += "                 </div>";
    out += "                   <div class='input'>";
    out += "                    <label class='lang_confirmnewpassword regFormLabel'>";
    out += "                     </label>";
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
    out += "              </label>";
    out += "               <input type='radio' name='theme' checked='checked' value='Orange' />Orange<input type='radio' name='theme' value='Twitter' />Twitter";
    out += "             <br/>";
    out += "               <input id='account_buttonOK' class='lang_accept' type='submit' value='' />";
    out += "           </p>";
    out += "        </form>";
    out += "      </div>";
    out += "   </div>";
    out += " </div>";
    $("#content").html(out);
    
    $(".prefTabs").tabs();
    //updateLanguage();
}
