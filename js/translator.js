var Language = new Object();

Language.es = function(){
    //User panel
    Language.register = "Registrarse";
    Language.login = "Iniciar sesión";
    Language.logout = "Cerrar sesión";
    Language.settings = "Configuración";
    Language.selectlanguage = "Idioma:";
    
    //Login
    Language.username = "Nombre de usuario";
    Language.password = "Contraseña";
    Language.loginwarning = "Usuario o contraseña inválidos";
    
    
    //Register
    Language.personaldata = "Datos personales";
    Language.clientname = "Nombre/s y Apellido/s";
    Language.clientnamewarning = "Introduzca al menos un nombre o apellido";
    Language.birthday = "Fecha de nacimiento";
    Language.birthdaywarning = "Fecha inválida";
    Language.datereference = "dd/mm/yyyy";
    Language.country = "País";
    Language.countrywarning = "Debe seleccionar el país donde reside";
    Language.countryselection = "Seleccione país";
    Language.state = "Provincia";
    Language.usernamewarning = "Introduzca un nombre de usuario";
	Language.usernametaken = "El nombre de usuario elegido no se encuentra disponible. Introduzca otro";
    Language.passwordwarning = "Introduzca una contraseña de al menos 8 caracteres";
    Language.confirmpassword = "Confirmar contraseña";
    Language.email = "Correo electrónico";
    Language.emailreqwarning = "Introduzca una dirección de correo electrónico";
    Language.emailwarning = "Su dirección de correo electrónico debe ser de la forma nombre@dominio.com";
    Language.mandatorydata = "*Datos obligatorios";
	Language.welcome = "Se ha completado de forma exitosa la registración.";
    Language.accept = "Aceptar";
    Language.cancel = "Cancelar";
    
    Language.allCategories = "Todas";
    Language.selectCategory = "Seleccione categoría";
    Language.search = "Buscar...";
    
    //Account
    Language.modifyData = "Modificar información";
    Language.headermodify = "Cambiar información personal";
    Language.headerchangepass = "Cambiar la contraseña";
    Language.newpassword = "Nueva contraseña";
    Language.confirmnewpassword = "Confirmar nueva contraseña";
    Language.personalize = "Personalización";
    Language.selectTheme = "Seleccione un tema:";
    
    //Footer
    Language.copyright = "Todos los derechos reservados.";
    /*
     
     //Menu:
     Language.home = "Inicio";
     Language.catalog = "Catálogo";
     Language.sitemap = "Mapa del Sitio";
     Language.contact = "Contáctenos";
     Language.welcome = "Bienvenido";
     Language.loggedout = "Todavía no has ingresado a tu cuenta.";
     
     //Content:
     Language.promo = "Las mejores ofertas!";
     Language.promoImg = "imgs/publi2.png";
     Language.highlights = "Destacados";
     Language.categories = "Categorías de los productos";
     Language.price = "Precio";
     Language.conversionMoney = 3.85;
     Language.moneySign = "$";
     Language.language = "Lenguaje";
     Language.subtitles = "Subtítulos";
     Language.categories2 = "Categorías";
     Language.tx_catalog_recommendation = "Elija una categoría del menú.";
     Language.salesrank = "Ranking de Ventas";
     Language.seeMore = " + Ver más";
     Language.addToCart = "Adherir al Carrito";
     Language.category = "Categoría";
     Language.subcategory = "Subcategoría";
     
     Language.actors = "Actores";
     Language.format = "Formato";
     Language.language = "Lenguaje";
     Language.subititles = "Subtítulos";
     Language.region = "Región";
     Language.aspectratio = "Relación de aspecto";
     Language.numberdiscs = "Número de discos";
     Language.releasedate = "Fecha de lanzamiento";
     Language.runtime = "Duración";
     Language.ASIN = "ASIN";
     
     Language.authros = "Autores";
     Language.publisher = "Editor";
     Language.publisheddate = "Publicación";
     
     Language.search = "Busqueda";
     Language.error_search = "No se han encontrado coincidencias";
     //LogForm:
     Language.close = "Cerrar";
     
     //Forms:
     Language.createaddress = "Agregar una nueva dirección";
     Language.createaddressintro = "Agregue una nueva dirección para luego usarla a la hora de hacer un pedido.";
     Language.createaccount = "Crear una cuenta nueva";
     Language.changepassword = "Cambiar la contraseña actual";
     Language.updateaccount = "Actualizar la información personal";
     Language.mandatoryfields = "Por favor no olvide completar todos los campos con un asterisco rojo.";
     Language.terms = "He leído y acepto los Términos de Uso."
     Language.name = "Nombre";
     Language.fullname = "Nombre completo";
     Language.username = "Nombre de usuario";
     Language.password = "Contraseña";
     Language.confirmpassword = "Confirme contraseña";
     Language.currentpassword = "Contraseña actual";
     Language.newpassword = "Nueva contraseña";
     Language.email = "Email";
     Language.birthdate = "Fecha de nacimiento (AAAA-MM-DD)";
     Language.address1 = "Dirección (línea 1)";
     Language.address2 = "Dirección (línea 2)";
     Language.country = "País";
     Language.state = "Estado";
     Language.city = "Ciudad";
     Language.zipcode = "Código postal";
     Language.phonenumber = "Número telefónico";
     Language.submit = "Enviar";
     Language.reset = "Borrar";
     Language.update_address = "Cambiar dirección";
     Language.noaddress = "Todavía no has creado direcciones";
     
     Language.questionAddToCart = "¿Seguro desea añadir este producto a su carrito?";
     Language.ctyOfProduct = "Introduzca la cantidad que desea llevar";
     Language.addToCartErrorCty = "Solo se permiten cantidades entre 0 y 100";*/
    //Footer:
    
    
    /*
     //Cart:
     Language.cart = "Carrito";
     Language.quantity = "Cant.";
     Language.description = "Descripción";
     Language.error_no_login = "Debe estar logueado para acceder a su carrito.";
     Language.order = "Orden";
     Language.status = "Estado";
     Language.adress = "Dirección";
     Language.created = "Creado";
     Language.no_products_cart = "No se han adherido productos al carrito.";
     
     Language.created = "Creada";
     Language.confirmed = "Confirmada";
     Language.transported = "Transportada";
     Language.delivered = "Entregada";
     
     Language.selectAddress = "Seleccione la dirección de destino";*/
    updateLanguage();
}

Language.en = function(){
    //User panel
    Language.register = "Register";
    Language.login = "Login";
    Language.logout = "Logout";
    Language.settings = "Settings";
    Language.selectlanguage = "Language:";
    
    //Login
    Language.username = "Username";
    Language.password = "Password";
    Language.loginwarning = "Invalid username or password";
    
    Language.allCategories = "All";
    Language.selectCategory = "Select category";
    Language.search = "Search...";
    
    //Register
    Language.personaldata = "Personal data";
    Language.clientname = "Name/s and Lastname/s";
    Language.clientnamewarning = "Enter at least one name or lastname";
    Language.birthday = "Birthday";
    Language.birthdaywarning = "Invalid date";
    Language.datereference = "mm/dd/yyyy";
    Language.country = "Country";
    Language.countrywarning = "You must select the country where you live";
    Language.countryselection = "Select country";
    Language.state = "State";
    Language.usernamewarning = "Enter a username";
	Language.usernametaken = "The username choosed is already taken. Enter another username";
    Language.passwordwarning = "Enter a password with at least 8 characters";
    Language.confirmpassword = "Confirm password";
    Language.email = "E-mail";
    Language.emailreqwarning = "Enter an e-mail";
    Language.emailwarning = "Your email address must be in the format of name@domain.com";
    Language.mandatorydata = "*Must be filled";
	Language.welcome = "The registration has completed succesfully."
    Language.accept = "Accept";
    Language.cancel = "Cancel";
    
    //Account
    Language.modifyData = "Modify data";
    Language.headermodify = "Change personal data";
    Language.headerchangepass = "Change password";
    Language.newpassword = "New password";
    Language.confirmnewpassword = "Confirm new password";
    Language.personalize = "Personalize";
    Language.selectTheme = "Select theme:";
    
    
    
    //Footer:
    Language.copyright = "All rights reserved.";
    /*
     //Topper:
     Language.go = "Go!";
     Language.login = "Login";
     Language.logout = "Logout";
     Language.register = "Register";
     Language.settings = "Settings";
     
     //Menu:
     Language.home = "Home";
     Language.catalog = "Catalog";
     Language.sitemap = "SiteMap";
     Language.contact = "Contact Us";
     Language.welcome = "Welcome";
     Language.loggedout = "You haven't logged in yet.";
     
     //Content:
     Language.promo = "The best deals!";
     Language.promoImg = "imgs/publi1.png";
     Language.highlights = "Highlights";
     Language.categories = "Product categories";
     Language.price = "Price";
     Language.conversionMoney = 1;
     Language.moneySign = "U$S";
     Language.categories2 = "Categories";
     Language.tx_catalog_recommendation = "Choose a category from the menu.";
     Language.salesrank = "Sales Rank";
     Language.seeMore = " + See More";
     Language.addToCart = "Add to Cart";
     Language.category = "Category";
     Language.subcategory = "Subcategory";
     
     Language.actors = "Actors";
     Language.format = "Format";
     Language.language = "Language";
     Language.subititles = "Subtitles";
     Language.region = "Region";
     Language.aspectratio = "Aspect ratio";
     Language.numberdiscs = "Number of discs";
     Language.releasedate = "Release date";
     Language.runtime = "Movie length";
     Language.ASIN = "ASIN";
     
     Language.authros = "Authors";
     Language.publisher = "Publisher";
     Language.publisheddate = "Publishead date";
     
     Language.quantity = "Quantity";
     
     Language.cart = "Cart";
     
     Language.search = "Search";
     Language.error_search = "No matches found";
     
     //LogForm:
     Language.close = "Close";
     
     //Forms:
     Language.createaddress = "Add a new address";
     Language.createaddressintro = "Adding a new address allows you to use it later on when making an order.";
     Language.createaccount = "Create a new account";
     Language.changepassword = "Change your current password";
     Language.updateaccount = "Update your personal information";
     Language.mandatoryfields = "Please note all fields with a red asterisk must be completed.";
     Language.terms = "I have read and accept the Terms of Use."
     Language.name = "Name";
     Language.fullname = "Full name";
     Language.username = "User name";
     Language.password = "Password";
     Language.confirmpassword = "Confirm password";
     Language.currentpassword = "Current password";
     Language.newpassword = "New password";
     Language.email = "Email";
     Language.birthdate = "Birth date (YYYY-MM-DD)";
     Language.address1 = "Address (line 1)";
     Language.address2 = "Address (line 2)";
     Language.country = "Country";
     Language.state = "State";
     Language.city = "City";
     Language.zipcode = "Zip Code";
     Language.phonenumber = "Phone Number";
     Language.submit = "Submit";
     Language.reset = "Reset";
     Language.update_address = "Update address";
     
     Language.noaddress = "You haven't created any adresses";
     
     Language.questionAddToCart = "Are you sure you want to add this product to your cart?";
     Language.ctyOfProduct = "Enter the amount you want to take";
     Language.addToCartErrorCty = "Quantities are allowed only between 0 and 100";*/
    /* 
     //Cart:
     Language.cart = "Cart";
     Language.quantity = "Qty.";
     Language.description = "Description";
     Language.error_no_login = "You must be logged to access to your cart.";
     Language.no_products_cart = "No products have been added to your cart.";
     
     Language.order ="Order";
     Language.status = "Status";
     Language.adress = "Adress";
     Language.created = "Created at";
     
     
     Language.created = "Created";
     Language.confirmed = "Confirmed";
     Language.transported = "Transportated";
     Language.delivered = "Delivered";
     Language.selectAddress = "Select address destination";*/
    updateLanguage();
}

function updateLanguage(){
    //User panel
    updateText("register", Language.register);
    updateText("login", Language.login);
    updateText("logout", Language.logout);
    updateText("settings", Language.settings);
    updateText("selectlanguage", Language.selectlanguage);
    
    //Login
    updateText("username", Language.username);
    updateText("password", Language.password);
    updateButton("loginsubmit", Language.login);
    updateText("loginwarning", Language.loginwarning);
    
    
    //Register
    updateText("personaldata", Language.personaldata);
    updateText("clientname", Language.clientname);
    updateText("birthday", Language.birthday);
    updateText("datereference", Language.datereference);
    updateText("country", Language.country);
    updateText("state", Language.state);
    updateText("confirmpassword", Language.confirmpassword);
    updateText("email", Language.email);
    updateText("mandatorydata", Language.mandatorydata);
	updateText("welcome", Language.welcome);
	updateText("usernametaken", Language.usernametaken);
    updateButton("accept", Language.accept);
    updateButton("cancel", Language.cancel);
    
    
    //Account
    updateText("modifyData", Language.modifyData);
    updateText("headermodify", Language.headermodify);
    updateText("headerchangepass", Language.headerchangepass);
    updateText("newpassword", Language.newpassword);
    updateText("confirmnewpassword", Language.confirmnewpassword);
    updateText("personalize", Language.personalize);
    updateText("selectTheme", Language.selectTheme);
    
    // Search
    updateButton("search", Language.search);
    
    //Footer
    updateText("copyright", Language.copyright);
    
    
    requestFromServer('GetCategories', 'language_id=' + currentLang);
    injectCategories();
    
    
    $("#menuCategorias").accordion("destroy");
    $("#menuCategorias").accordion();
    
    
    if (registerValidator == undefined) 
        initializeRegValidator();
    //if (modifyValidator == undefined)
    //	initializeModValidator();
    configureRegValidator();
    //configureModValidator();


}

function updateText(name, text){
    var currentTag = $(".lang_" + name);
    currentTag.empty();
    currentTag.append(text);
}

function updateButton(name, text){
    var currentTag = $(".lang_" + name);
    currentTag.attr("value", text);
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
