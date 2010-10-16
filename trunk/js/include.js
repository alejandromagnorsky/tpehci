/* API Services **************************************************** */
$COMMON = '/service/Common.groovy?method=';
$SECURITY = '/service/Security.groovy?method=';
$CATALOG = '/service/Catalog.groovy?method=';
$ORDER = '/service/Order.groovy?method=';
/* ***************************************************************** */

/* CATALOG & SHOPPING CART ***************************************** */
$ITEM_CONTAINER_TAG = 'ul';

// Cart
var cart;
$CART = 'cart';
$CART_HEADER = 'product-header';
$CART_DEFAULT = 'state-default';
$CART_HIGHLIGHT = 'state-highlight';

// Product in catalog
$CATALOG_ITEM = 'li';
$CATALOG_ITEM_HEADER = 'product-header';
$CATALOG_CONTAINER_ID = 'products';
$CATALOG_ITEM_DESCRIPTION = 'description';
$CATALOG_ITEM_QUANTITY = 'quantity';
$IMG_WIDTH	= 250*0.68;	$THUMB_WIDTH  = 20;
$IMG_HEIGHT	= 360*0.68;	$THUMB_HEIGHT = 90;

// Product in cart
$CART_ITEM_WIDTH = '100px';
$CART_ITEM_HEIGHT = '90px';
/* ***************************************************************** */

/* ICON CLASSES **************************************************** */
$ICON = 'icon';
$ICON_CART = 'icon-cart';
$ICON_INFO = 'icon-zoom';
$ICON_PLUS = 'icon-plus';
$ICON_MINUS = 'icon-minus';
$ICON_REMOVE = 'icon-remove';
/* ***************************************************************** */

/* REGISTER ******************************************************** */
var registerValidator;
/* ***************************************************************** */

/* ACCOUNT ********************************************************* */
var modifyValidator;
var currentTheme;
var session;
/* ***************************************************************** */

/* MISC ************************************************************ */
$EN = 1;
$ES = 2;
var currentLang = $EN;
$JS_OFF = 'JAVASCRIPT_IS_OFF';
/* ***************************************************************** */