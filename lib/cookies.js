/*
 PARAMETERS:
 name, value  - cookie name & value
 expires      - cookie expiration date (defaults to end of current session)
 path, domain - cookie path & domain (defaults to document's path & domain)
 secure       - cookie sent only over secure connection
 example CALLS:
 setCookie("counter", "1");
 setCookie("counter", "1", Date("January 01, 2010 00:00:01"));
 setCookie("counter", "1", undefined, '/');
 */
function setCookie(name, value, expires, path, domain, secure){
    document.cookie = name + "=" + escape(value) +
    (expires ? "; expires=" + expires.toUTCString() : "") +
    (path ? "; path=" + path : "") +
    (domain ? "; domain=" + domain : "") +
    (secure ? "; secure" : "");
}

// ***** setCookieLT *****

// PARAMETERS: lifetime - cookie lifetime in hours

function setCookieLT(name, value, lifetime, path, domain, secure){
    if (lifetime) 
        lifetime = new Date(Date.parse(new Date()) + lifetime * 1000 * 3600);
    setCookie(name, value, lifetime, path, domain, secure);
}

// ***** getCookie *****

function getCookie(name){
    var cookie, offset, end;
    cookie = " " + document.cookie;
    offset = cookie.indexOf(" " + name + "=");
    if (offset == -1) 
        return undefined;
    offset += name.length + 2;
    end = cookie.indexOf(";", offset)
    if (end == -1) 
        end = cookie.length;
    return unescape(cookie.substring(offset, end));
}

// ***** delCookie *****

// PARAMETERS:
//
// name         - cookie name
// path, domain - cookie path & domain (the same as those used to create cookie)

function delCookie(name, path, domain){
    if (getCookie(name)) 
        setCookie(name, "", new Date("January 01, 2000 00:00:01"), path, domain);
}
