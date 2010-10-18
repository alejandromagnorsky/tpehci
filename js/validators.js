function configureValidators(){
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
    
    jQuery.validator.addMethod("checkCurrent", function(value, element){
        var check;
        if (value == session.password) {
            check = true;
        }
        else 
            check = false;
        return this.optional(element) || check;
    }, "");
    
}

function configureRegValidator(){
    if (currentLang == $EN) 
        registerValidator.settings.rules = {
            name: "required",
            birthday: {
                required: true,
                dateUSA: true
            },
            country: "required",
            username: "required",
            password: {
                required: true,
                minlength: 8
            },
            password_again: {
                equalTo: "#passwordInput"
            },
            email: {
                required: true,
                email: true
            }
        };
    else 
        if (currentLang == $ES) 
            registerValidator.settings.rules = {
                name: "required",
                birthday: {
                    required: true,
                    dateARG: true
                },
                country: "required",
                username: "required",
                password: {
                    required: true,
                    minlength: 8
                },
                password_again: {
                    equalTo: "#passwordInput"
                },
                email: {
                    required: true,
                    email: true
                }
            };
    
    registerValidator.settings.messages = {
        name: Language.clientnamewarning,
        birthday: Language.birthdaywarning,
        country: Language.countrywarning,
        username: Language.usernamewarning,
        password: Language.passwordwarning,
        password_again: Language.passwordagainwarning,
        email: {
            required: Language.emailreqwarning,
            email: Language.emailwarning
        }
    };
}

function configureModValidator(){
    if (currentLang == $EN) 
        modifyValidator.settings.rules = {
            name: "required",
            birthday: {
                required: true,
                dateUSA: true
            },
            email: {
                required: true,
                email: true
            }
        };
    else 
        if (currentLang == $ES) 
            modifyValidator.settings.rules = {
                name: "required",
                birthday: {
                    required: true,
                    dateARG: true
                },
                email: {
                    required: true,
                    email: true
                }
            };
    
    modifyValidator.settings.messages = {
        name: Language.clientnamewarning,
        birthday: Language.birthdaywarning,
        email: {
            required: Language.emailreqwarning,
            email: Language.emailwarning
        }
    };
}

function configurePassValidator(){
    passwordValidator.settings.rules = {
        currentpassword: {
            checkCurrent: session.password
        },
        password: {
            required: true,
            minlength: 8
        },
        password_again: {
            equalTo: "#modify_passwordInput"
        }
    };
    
    passwordValidator.settings.messages = {
        currentpassword: Language.currentpasswordwarning,
        password: Language.passwordwarning,
        password_again: Language.passwordagainwarning
    };
}


function configureAddressValidator(){
    addressValidator.settings.rules = {
        fullname: "required",
        primaryaddress: "required",
        country: "required",
        city: "required",
        zipcode: "required",
        phonenumber: "required"
    };
    
    addressValidator.settings.messages = {
        fullname: Language.fullnamewarning,
		primaryaddress: Language.primaryaddresswarning,
        country: Language.countrywarning,
        city: Language.citywarning,
        zipcode: Language.zipcodewarning,
        phonenumber: Language.phonenumberwarning
    };
}



function initializeRegValidator(){
    registerValidator = $("#registerForm").validate({
    
        errorElement: "div",
        
        submitHandler: register
    
    });
}

function initializeModValidator(){
    modifyValidator = $("#modifyForm").validate({
    
        errorElement: "div",
        
        submitHandler: updateAccount
    });
}


function initializePassValidator(){
    passwordValidator = $("#changePassForm").validate({
    
        errorElement: "div",
        
        submitHandler: changePassword
    });
}


function initializeAddressValidator(){
    addressValidator = $("#addressForm").validate({
    
        errorElement: "div",
        
        submitHandler: createAddress
    });
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

function toLocalDate2(date){
    var re = /^\d{1,2}-\d{1,2}-\d{4}$/;
    if (!re.test(date)) 
        return date;
    var ans;
    var adata = date.split('-');
    var dd, mm, aaaa;
    aaaa = parseInt(adata[2], 10);
    mm = parseInt(adata[1], 10);
    dd = parseInt(adata[0], 10);
    if (currentLang == $EN) {
        ans = mm + "/" + dd + "/" + aaaa;
    }
    else 
        if (currentLang == $ES) {
            ans = dd + "/" + mm + "/" + aaaa;
        }
    return ans;
}




function toISODate(date){
    var adata = date.split('/');
    var dd, mm, aaaa;
    if (currentLang == $EN) {
        mm = parseInt(adata[0], 10);
        dd = parseInt(adata[1], 10);
    }
    else 
        if (currentLang == $ES) {
            dd = parseInt(adata[0], 10);
            mm = parseInt(adata[1], 10);
        }
    var aaaa = parseInt(adata[2], 10);
    return aaaa + "-" + mm + "-" + dd;
}



