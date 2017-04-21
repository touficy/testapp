var myApp = new Framework7({
//precompileTemplates: true
});

var $$ = Dom7;

// Select Template
var template = document.getElementById('news-template').innerHTML;

// Compile and render
var compiledTemplate = Template7.compile(template);

// Defined as function "getrandom"
function getnews() {
	// Get JSON Data from UrbanDictionary API 
	$$.getJSON ('http://www.bridgingandcommercial.co.uk/ws.php?type=select&format=json&table=articles&columns=id,title,publish_date,brief&condition=active=1', function (json) {

	// Insert rendered template
	document.getElementById('content-wrap').innerHTML = compiledTemplate(json);
	});
};
// Execute to list UrbanDictionary Definitions
getnews();

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});
//setTimeout(function(){mainView.router.loadPage('news.html')},1);
//var anotherView = myApp.addView('.home-view');