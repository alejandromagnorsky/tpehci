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
    
    var link = getHref() + "/service/Security.groovy";
    $.ajax({
        type: "POST",
        url: link,
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
    var link = getHref() + "/service/Security.groovy";
    
    $.ajax({
        type: "POST",
        url: link,
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
    requestFromServer('GetAccount', 'username=' + session.username +
    '&authentication_token=' +
    session.token);
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
            out += "<p class='spanprofile'><span class='lang_username'></span>: " +
            session.username +
            "</p>";
            out += "<p class='spanprofile'><span class='lang_clientname'></span>: " +
            $(response).find('name').text() +
            "</p>";
            out += "<p class='spanprofile'><span class='lang_birthday'></span>: " +
            toLocalDate($(response).find('birth_date').text()) +
            "</p>";
            out += "<p class='spanprofile'><span class='lang_email'></span>: " +
            $(response).find('email').text() +
            "</p>";
            out += "<p class='spanprofile'><span class='lang_createddate'></span>: " +
            toLocalDate($(response).find('created_date').text()) +
            "</p>";
            out += "<p class='spanprofile'><span class='lang_lastlogindate'></span>: " +
            toLocalDate($(response).find('last_login_date').text()) +
            "</p>";
            $("#tabsProfile").html(out);
        }
    }
    else {
        alert('Error: ' + request.statusText);
    }
}

function loadPreferences(){
    requestFromServer('GetAccountPreferences', 'username=' + session.username +
    '&authentication_token=' +
    session.token);
    return false;
}

function savePreferences(){
    if ($("input[value='theme1']").attr("checked") == true) 
        session.preferences.theme = $ORANGE;
    else 
        session.preferences.theme = $GOLDEN;
    requestFromServer('SetAccountPreferences', 'username=' + session.username +
    '&authentication_token=' +
    session.token +
    '&value=' +
    $.toJSON(session.preferences));
    return false;
}

function getAccountPreferences(parameters){
    var url = $COMMON + 'GetAccountPreferences' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
        request.send();
    if (request.status == 200) {
                var response = request.responseXML;
                if ($(response).find("response").attr('status') == 'ok') {
                        var value = $(response).find('value').text();
                        if (value != "interface java.sql.Clob") 
                                session.preferences = $.secureEvalJSON(value);
                }
        }
        else {
                alert("Error: " + $(response).find("error").attr('message'))
        }    
}

function setAccountPreferences(parameters){
    var url = $COMMON + 'SetAccountPreferences' + '&' + parameters;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200) {
                var response = request.responseXML;
                if ($(response).find("response").attr('status') == 'ok') {
                    setCookie("session", $.toJSON(session), undefined, '/', '', false);
                    applyPreferences();
                }
            }
            else {
                alert('Error: ' + request.statusText);
            }
        }
    };
    request.send();
}

function logout(){
    requestFromServer('SignOut', 'username=' + session.username +
    '&authentication_token=' +
    session.token);
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
    out += "             <a id='toPersonalize' class='lang_personalize' href='#tabsPersonalize'></a>";
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
    out += "                         <div class='input'>";
    out += "                            <label class='lang_clientname regFormLabel'>";
    out += "                            </label>";
        out += "                         <label class='regFormLabel'> *:</label>";
    out += "                            <br/>";
    out += "                          <input id='modify_clientname' name='name' type='text' size='40' maxlength='40' />";
    out += "                          <br/>";
    out += "                      </div>";
    out += "                     <div class='input'>";
    out += "                         <label class='lang_birthday regFormLabel'>";
    out += "                         </label>";
        out += "                         <label class='regFormLabel'> *:</label>";                        
    out += "                         <br/>";
    out += "                     <input id='modify_datepicker' name='birthday' type='text' size='8' maxlength='10' />";
    out += "                      <label class='lang_datereference regFormLabel'>";
    out += "                        </label>";
    out += "                   </div>";
    out += "                   <div class='input'>";
    out += "                       <label class='lang_email regFormLabel'>";
    out += "                    </label>";
        out += "                     <label class='regFormLabel'> *:</label>";
    out += "                     <br/>";
    out += "                     <input id='modify_email' name='email' type='text' size='30' maxlength='128' />";
    out += "                    <br/>";
    out += "                   </div>";
    out += "            </div>";
    out += "          </div>";
    out += "           <div>";
        out += "        <label class='lang_mandatorydata regReference'></label>";
    out += "               <br/>";
    out += "                <input class='lang_accept modify_buttonOK' type='submit' value='' />";
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
        out += "                      <label class='regFormLabel'> *:</label>";
    out += "                      <br/>";
    out += "                      <input id='modify_currentpassword' name='currentpassword' type='password' size='20' maxlength='15' />";
    out += "                      <br/>";
    out += "                 </div>";
    out += "                 <div class='input'>";
    out += "                      <label class='lang_newpassword regFormLabel'>";
    out += "                      </label>";
        out += "                         <label class='regFormLabel'> *:</label>";
    out += "                      <br/>";
    out += "                      <input id='modify_passwordInput' name='password' type='password' size='20' maxlength='15' />";
    out += "                      <br/>";
    out += "                 </div>";
    out += "                 <div class='input'>";
    out += "                    <label class='lang_confirmnewpassword regFormLabel'>";
    out += "                    </label>";
        out += "                         <label class='regFormLabel'> *:</label>";
    out += "                    <br/>";
    out += "                    <input name='password_again' type='password' size='20' maxlength='15' />";
    out += "                    <br/>";
    out += "                </div>";
    out += "             </div>";
    out += "        </div>";
    out += "        <div>";
        out += "        <label class='lang_mandatorydata regReference'></label>";
    out += "            <br/>";
    out += "             <input class='lang_accept modify_buttonOK' type='submit' value='' />";
    out += "         </div>";
    out += "     </form>";
    out += "  </div>";
    out += "  <div id='tabsPersonalize'>";
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
    
    document.getElementById("themeForm").onsubmit = savePreferences;
    $(".prefTabs").tabs();
    showHideAccount();
    slideHeaderUp();
    
    $("#pageWrapper").css("height", 900);
    $("#footer").css("top", 900);
    
    translateSettings();
}

function applyPreferences(){
    if (session.preferences.theme == $ORANGE) {
    
        StyleAddr = "";
        StyleTextColor = "#fff";
        
        $("input[value='theme1']").attr("checked", "checked");
        $("input[value='theme2']").attr("checked", "");
        
        $("#header").css("background-color", "#ee7b0d");
        $("#headerContent").css("background-image", "url(../css/images/inicio/header_test.png)");
    }
    else {
    
        StyleAddr = "SilverTheme/";
        StyleTextColor = "#000";
        
        // Set theme
        $("input[value='theme2']").attr("checked", "checked");
        $("input[value='theme1']").attr("checked", "");
        
        // Change css!
        $("#linkmyaccount").css("color", "#fff");
        $("#headerContent").css("background-image", "url(../css/images/inicio/SilverTheme/header_test.png)");
        $("#header").css("background-color", "#919191");
        
        $("#divLoading").css("background-color", "#ccc");
    }
    
    
    $("#cartHeader").css("background-image", "url(../css/images/inicio/" + StyleAddr + "cart_header.png)");
    $("#cartHeader").css("color", StyleTextColor);
    $("#cartFooter").css("background-image", "url(../css/images/inicio/" + StyleAddr + "cart_footer.png)");
    
}

function showOrders(){
        var out = '';
        out +=  '<h3 class="order-header">Orders</h3>';
        out +=  '<div class="orderTable">';
        out +=          '<ul class="orderIdCol"><li class="orderTitle">Order ID</li></ul>';
        out +=          '<ul class="orderAddrIdCol"><li class="orderTitle">Address</li></ul>';
        out +=          '<ul class="statusCol"><li class="orderTitle">Status</li></ul>';
        out +=          '<ul class="createdCol"><li class="orderTitle">Created on</li></ul>';
        //out +=                '<ul class="confirmedCol"><li class="orderTitle">Confirmed on</li></ul>';
        //out +=                '<ul class="shippedCol"><li class="orderTitle">Shipped on</li></ul>';
        //out +=                '<ul class="deliveredCol"><li class="orderTitle">Delivered on</li></ul>';
        //out +=                '<ul class="latCol"><li class="orderTitle">Latitude</li></ul>';
        //out +=                '<ul class="lonCol"><li class="orderTitle">Longitude</li></ul>';
        out +=          '<ul class="confirmCol"><li class="orderTitle">Confirm</li></ul>';
        out +=          '<ul class="dropCol"><li class="orderTitle">Drop</li></ul>';
        out +=  '</div>';
        $("#content").html('<div class="product">' + out + '</div>');
        getOrderList('username=' + session.username + '&authentication_token=' + session.token, 'printAll');
        
        slideHeaderUp(null);
}