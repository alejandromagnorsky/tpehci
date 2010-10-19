var Language = new Object();

Language.es = function() {
	Language.loading = "Cargando...";

	// User panel
	Language.register = "Registrarse";
	Language.login = "Iniciar sesi�n";
	Language.vieworders = "Ver �rdenes";
	Language.logout = "Cerrar sesi�n";
	Language.settings = "Perfil y Configuraci�n";
	Language.selectlanguage = "Idioma:";

	// Login
	Language.username = "Nombre de usuario";
	Language.password = "Contrase�a";
	Language.loginwarning = "Usuario o contrase�a inv�lidos";
	Language.welcomeuser = "Bievenido usuario";

	// Register
	Language.personaldata = "Datos personales";
	Language.clientname = "Nombre/s y Apellido/s";
	Language.clientnamewarning = "Introduzca al menos un nombre o apellido";
	Language.birthday = "Fecha de nacimiento";
	Language.birthdaywarning = "Fecha inv�lida";
	Language.datereference = "dd/mm/aaaa";
	Language.country = "Pa�s";
	Language.countrywarning = "Debe seleccionar el pa�s donde reside";
	Language.countryselection = "Seleccione pa�s";
	Language.state = "Provincia";
	Language.usernamewarning = "Introduzca un nombre de usuario";
	Language.usernametaken = "El nombre de usuario elegido no se encuentra disponible. Introduzca otro";
	Language.passwordwarning = "Introduzca una contrase�a de al menos 8 caracteres";
	Language.confirmpassword = "Confirmar contrase�a";
	Language.passwordagainwarning = "Introduzca el mismo valor que el del campo superior";
	Language.email = "Correo electr�nico";
	Language.emailreqwarning = "Introduzca una direcci�n de correo electr�nico";
	Language.emailwarning = "Su direcci�n de correo electr�nico debe ser de la forma nombre@dominio.com";
	Language.mandatorydata = "*Datos obligatorios";
	Language.registerOK = "La registraci�n se ha completado de forma exitosa";
	Language.accept = "Aceptar";
	Language.cancel = "Cancelar";

	Language.allCategories = "Todas";
	Language.selectCategory = "Seleccione categor�a";
	Language.search = "Buscar...";

	// Account
	Language.myaccount = "Mi cuenta";
	Language.profile = "Perfil";
	Language.modifyData = "Modificar datos";
	Language.createddate = "Fecha de creaci�n";
	Language.lastlogindate = "�ltima vez que inici� sesi�n";
	Language.headermodify = "Cambiar informaci�n personal";
	Language.modifydatawarning = "Sus datos han sido modificados de forma exitosa";
	Language.changepasswarning = "Su contrase�a ha sido modificada de forma exitosa";
	Language.headerchangepass = "Cambiar contrase�a";
	Language.newpassword = "Nueva contrase�a";
	Language.currentpassword = "Contrase�a actual";
	Language.currentpasswordwarning = "Contrase�a incorrecta";
	Language.confirmnewpassword = "Confirmar nueva contrase�a";
	Language.personalize = "Personalizar";
	Language.selectTheme = "Seleccione un tema:";

	// Footer
	Language.copyright = "Thor - Todos los derechos reservados &copy;";
	Language.watchmotto = "Ver lema";
	
	// Menu:
	Language.home = "Inicio";
	Language.catalog = "Cat�logo";
	Language.sitemap = "Mapa del Sitio";
	Language.contact = "Cont�ctenos";
	Language.loggedout = "Todav�a no has ingresado a tu cuenta.";

	// Content:
	Language.highlights = "Destacados";
	Language.categories = "Categor�as de los productos";
	Language.price = "Precio";
	Language.conversionMoney = 3.85;
	Language.moneySign = "$";
	Language.subtitles = "Subt�tulos";
	Language.categories2 = "Categor�as";
	Language.tx_catalog_recommendation = "Elija una categor�a del men�.";
	Language.salesrank = "Ranking de Ventas";
	Language.seeMore = " + Ver m�s";
	Language.addToCart = "Adherir al Carrito";
	Language.category = "Categor�a";
	Language.subcategory = "Subcategor�a";

	Language.actors = "Actores";
	Language.format = "Formato";
	Language.language = "Lenguaje";
	Language.subititles = "Subt�tulos";
	Language.region = "Regi�n";
	Language.aspectratio = "Relaci�n de aspecto";
	Language.numberdiscs = "N�mero de discos";
	Language.releasedate = "Fecha de lanzamiento";
	Language.runtime = "Duraci�n";
	Language.ASIN = "ASIN";

	Language.authors = "Autores";
	Language.publisher = "Editor";
	Language.publisheddate = "Publicaci�n";

	// Address
	Language.createaddress = "Agregar una nueva direcci�n";
	Language.createaddressintro = "Agregue una nueva direcci�n para luego usarla a la hora de hacer un pedido.";
	Language.fullname = "Nombre completo";
	Language.primaryaddress = "Direcci�n principal";
	Language.secondaryaddress = "Direcci�n secundaria";
	Language.city = "Ciudad";
	Language.zipcode = "C�digo postal";
	Language.phonenumber = "N�mero telef�nico";
	Language.fullnamewarning = "Introduzca un nombre completo";
	Language.primaryaddresswarning = "Introduzca un direcci�n principal";
	Language.secondaryaddresswarning = "Introduzca un direcci�n secundaria";
	Language.citywarning = "Introduzca un ciudad";
	Language.zipcodewarning = "Introduzca un c�digo postal";
	Language.phonenumberwarning = "Introduzca un n�mero telef�nico";
	
	Language.update_address = "Cambiar direcci�n";
	Language.noaddress = "Todav�a no has creado direcciones";

	Language.questionAddToCart = "�Seguro desea a�adir este producto a su carrito?";
	Language.ctyOfProduct = "Introduzca la cantidad que desea llevar";
	Language.addToCartErrorCty = "Solo se permiten cantidades entre 0 y 100";

	// Cart:
	Language.cart = "Carrito";
	Language.quantity = "Cant.";
	Language.description = "Descripci�n";
	Language.mustbelogged = "Debe estar logueado para acceder a su carrito.";
	Language.order = "Orden";
	Language.status = "Estado";
	Language.created = "Creado";
	Language.no_products_cart = "No se han adherido productos al carrito.";

	Language.created = "Creada";
	Language.confirmed = "Confirmada";
	Language.transported = "Transportada";
	Language.delivered = "Entregada";

	Language.selectAddress = "Seleccione la direcci�n de destino";
	updateLanguage();
}

Language.en = function() {

	Language.loading = "Loading...";

	// User panel
	Language.register = "Register";
	Language.login = "Login";
	Language.vieworders = "View orders";
	Language.logout = "Logout";
	Language.settings = "Profile & Settings";
	Language.selectlanguage = "Language:";

	// Login
	Language.username = "Username";
	Language.password = "Password";
	Language.loginwarning = "Invalid username or password";
	Language.welcomeuser = "Welcome user";

	Language.allCategories = "All";
	Language.selectCategory = "Select category";
	Language.search = "Search...";

	// Register
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
	Language.passwordagainwarning = "Enter the same value of the field above";
	Language.confirmpassword = "Confirm password";
	Language.email = "E-mail";
	Language.emailreqwarning = "Enter an e-mail";
	Language.emailwarning = "Your email address must be in the format of name@domain.com";
	Language.mandatorydata = "*Must be filled";
	Language.registerOK = "The registration has completed succesfully"
	Language.accept = "Accept";
	Language.cancel = "Cancel";

	// Account
	Language.myaccount = "My account";
	Language.profile = "Profile";
	Language.modifyData = "Modify data";
	Language.createddate = "Created date";
	Language.lastlogindate = "Last login date";
	Language.headermodify = "Change personal data";
	Language.headerchangepass = "Change password";
	Language.modifydatawarning = "Your data has been modified succesfully";
	Language.changepasswarning = "Your password has been modified succesfully";
	Language.newpassword = "New password";
	Language.currentpassword = "Current password";
	Language.currentpasswordwarning = "Incorrect password";
	Language.confirmnewpassword = "Confirm new password";
	Language.personalize = "Personalize";
	Language.selectTheme = "Select theme:";

	// Footer:
	Language.copyright = "Thor - All rights reserved &copy;";
	Language.watchmotto = "Watch motto";

	// Menu:
	Language.home = "Home";
	Language.catalog = "Catalog";
	Language.sitemap = "SiteMap";
	Language.contact = "Contact Us";
	Language.loggedout = "You haven't logged in yet.";

	// Content:
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

	Language.authors = "Authors";
	Language.publisher = "Publisher";
	Language.publisheddate = "Publishead date";

	Language.quantity = "Quantity";

	Language.cart = "Cart";

	// Address
	Language.createaddress = "Add a new address";
	Language.createaddressintro = "Adding a new address allows you to use it later on when making an order.";
	Language.fullname = "Full name";
	Language.primaryaddress = "Main address";
	Language.secondaryaddress = "Secondary address";
	Language.city = "City";
	Language.zipcode = "Zip Code";
	Language.phonenumber = "Phone Number";
	Language.fullnamewarning = "Enter a full name";
	Language.primaryaddresswarning = "Enter a main address";
	Language.secondaryaddresswarning = "Enter a secondary address";
	Language.citywarning = "Enter a city";
	Language.zipcodewarning = "Enter a zip code";
	Language.phonenumberwarning = "Enter a phone number";
	
	Language.update_address = "Update address";
	Language.noaddress = "You haven't created any adresses";

	Language.questionAddToCart = "Are you sure you want to add this product to your cart?";
	Language.ctyOfProduct = "Enter the amount you want to take";
	Language.addToCartErrorCty = "Quantities are allowed only between 0 and 100";

	// Cart:
	Language.cart = "Cart";
	Language.quantity = "Qty.";
	Language.description = "Description";
	Language.mustbelogged = "You must be logged to access to your cart.";
	Language.no_products_cart = "No products have been added to your cart.";

	Language.order = "Order";
	Language.status = "Status";
	Language.adress = "Adress";
	Language.created = "Created at";

	Language.created = "Created";
	Language.confirmed = "Confirmed";
	Language.transported = "Transportated";
	Language.delivered = "Delivered";
	Language.selectAddress = "Select address destination";
	updateLanguage();
}

function updateLanguage() {
	// User panel
	updateText("register", Language.register);
	updateText("login", Language.login);
	updateText("myaccount", Language.myaccount);
	updateText("logout", Language.logout);
	updateText("settings", Language.settings);
	updateText("vieworders", Language.vieworders);
	updateText("selectlanguage", Language.selectlanguage);

	// Login
	updateText("username", Language.username);
	updateText("password", Language.password);
	updateButton("loginsubmit", Language.login);
	updateText("loginwarning", Language.loginwarning);
	updateText("welcomeuser", Language.welcomeuser);

	// Register
	updateText("personaldata", Language.personaldata);
	updateText("clientname", Language.clientname);
	updateText("birthday", Language.birthday);
	updateText("datereference", Language.datereference);
	updateText("country", Language.country);
	updateText("state", Language.state);
	updateText("confirmpassword", Language.confirmpassword);
	updateText("email", Language.email);
	updateText("mandatorydata", Language.mandatorydata);
	updateText("registerOK", Language.registerOK);
	updateText("usernametaken", Language.usernametaken);
	updateButton("accept", Language.accept);
	updateButton("cancel", Language.cancel);

	// Account
	translateSettings();

	// Search
	updateButton("search", Language.search);

	// Footer
	updateText("copyright", Language.copyright);
	updateText("watchmotto", Language.watchmotto);

	// Address
	updateText("createaddress", Language.createaddress);
	updateText("fullname", Language.fullname);
	updateText("createaddress", Language.createaddress);
	updateText("addressheader", Language.createaddress);
	updateText("primaryaddress", Language.primaryaddress);
	updateText("secondaryaddress", Language.secondaryaddress);
	updateText("city", Language.city);
	updateText("zipcode", Language.zipcode);	
	updateText("phonenumber", Language.phonenumber);
	updateText("no_products_cart", Language.no_products_cart);
	updateText("mustbelogged", Language.mustbelogged);
	$("#divLoading").text(Language.loading);

	injectCategories();

	$("#menuCategorias").accordion("destroy");
	$("#menuCategorias").accordion();

	if (registerValidator == undefined)
		initializeRegValidator();

	configureRegValidator();

	updateProductLanguage();

}

function updateText(name, text) {
	var currentTag = $(".lang_" + name);
	currentTag.empty();
	currentTag.append(text);
}

function updateButton(name, text) {
	var currentTag = $(".lang_" + name);
	currentTag.attr("value", text);
}

function translateSettings() {
	if (!document.getElementById("preferences"))
		return;

	initializeModValidator();
	configureModValidator();
	initializePassValidator();
	configurePassValidator();
	$("#modifyForm")[0].reset();

	loadAccount();
	applyPreferences();

	updateText("profile", Language.profile);
	updateText("modifyData", Language.modifyData);
	updateText("headermodify", Language.headermodify);
	updateText("username", Language.username);
	updateText("clientname", Language.clientname);
	updateText("birthday", Language.birthday);
	updateText("datereference", Language.datereference);
	updateText("email", Language.email);
	updateText("createddate", Language.createddate);
	updateText("lastlogindate", Language.lastlogindate);
	updateButton("accept", Language.accept);
	updateText("headerchangepass", Language.headerchangepass);
	updateText("modifydatawarning", Language.modifydatawarning);
	updateText("changepasswarning", Language.changepasswarning);
	updateText("newpassword", Language.newpassword);
	updateText("currentpassword", Language.currentpassword);
	updateText("confirmnewpassword", Language.confirmnewpassword);
	updateText("mandatorydata", Language.mandatorydata);
	updateText("personalize", Language.personalize);
	updateText("selectTheme", Language.selectTheme);
}