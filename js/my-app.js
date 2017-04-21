var myApp = new Framework7({
                           modalTitle: 'Footprints',
                           animateNavBackIcon: true,
                           swipeBackPage : false

                           });


var $$ = Dom7;

Template7.registerHelper('dayOfWeek', function (date) {
                         date = new Date(date);
                         var days = ('Monday Tuesday Wednesday Thursday Friday Saturday Sunday').split(' ');
                         return days[date.getDay()];
                         });

// Add main view
var mainView = myApp.addView('.view-main', {
                             // Enable Dynamic Navbar for this view

                             });
document.addEventListener("offline",offline, false);
//document.addEventListener("online", onOnline, false);
document.addEventListener('deviceready', function () {
                          document.addEventListener("backbutton",onbackclick, false);
                          // 1 Slide Per View, 50px Between
                          // Enable to debug issues.
                          // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
                          var networkState = navigator.connection.type;
                          //alert(networkState);

                          if (networkState == Connection.NONE) {
                          myApp.alert('please Check your internet Connection', 'Footprints', function () {
                                      navigator.splashscreen.show();
                                      });
                          }
                          var notificationOpenedCallback = function(jsonData) {
                          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                          };

                          window.plugins.OneSignal
                          .startInit("cb5e125d-d97f-4749-acd1-79cedfacc48c", "1089540026895")
                          .handleNotificationOpened(notificationOpenedCallback)
                          .endInit();

                          // Sync hashed email if you have a login system or collect it.
                          //   Will be used to reach the user at the most optimal time of day.
                          // window.plugins.OneSignal.syncHashedEmail(userEmail);
                          }, false);
getmenu();
mainView.router.loadPage('Home.htm');
Lcheck();
function Lcheck(){
    console.log(localStorage.getItem("testObject"));
    if(localStorage.getItem("testObject")== null)
    {
        $$('#myprofile').hide();
        $$('#headermyprofile').hide();
    }
    else{
     var JSONObject = localStorage.getItem('testObject');
        JSONObject=JSON.parse(JSONObject);
        console.log(JSONObject['FirstName']);
        $$('#loggedinas').html(JSONObject["FirstName"]);
        $$('#login').hide();
        $$('#myprofile').show();
        $$('#headerlogin').hide();
        $$('#headermyprofile').show();
    }

}
function offline(){
    myApp.alert('please Check your Network Connection', 'Footprints', function () {

                });
}
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}


//		$$('#login').show();
//		$$('#myprofilemenu').hide();
//		$$('#logout').hide();
//		$$('#home_news').hide();

//localStorage.removeItem("email");
// if(localStorage.getItem("email") === null)
// console.log('hhh='+storedData1);
// if(storedData1 === undefined)
// {
// // myApp.alert('No Web Storage support');
//  $$('#signupmenu').show();
//  $$('#myprofilemenu').hide();
//  $$('#comment-panel').hide();
//  $$('#home_news').show();
//  $$('#latestnews').hide();
// }else{
//  $$('#signupmenu').hide();
// $$('#myprofilemenu').show();
// $$('#comment-panel').show();
// $$('#home_news').hide();
//  $$('#latestnews').show();
// }

// function Checklogin(){
// 1 Slide Per View, 50px Between
// }
// Checklogin();
function englishToarabic()
{
    mainView.router.loadPage('Home.htm');
}
var exitcount = 0;
function onbackclick(){
    var att = $$(".page-on-center").attr("data-page");
    var att1 = $$(".page-on-left").attr("data-page");
    if(att=="home"){
        console.log("home");

        $("#0").hide();
                exitcount = exitcount+1

                if(exitcount == 2){
                 myApp.confirm('Are you sure want to quit?',
                      function () {
                        navigator.app.exitApp();
                      },
                      function () {
                        exitcount =0;
                      }
                    );


                }

    }else if(att !="home"){
        mainView.router.back();
    }
    if(att1 == index){

//        mainView.router.loadPage('Home.htm');
//        setTimeout(function(){
//        homepagefun();
//        },2000);
//        Lcheck();

    }

}
function arabicToenglish()
{

    $$('.menuar').hide();
    $$('.navbarar').hide();
    $$('.menuen').show();
    $$('.navbaren').show();
    getmenu();
				mainView.router.loadPage('home_news.html');
}

function gotossections(id){
    // alert(id);
    mainView.router.loadPage('sections.html?id='+id);


}
function getnews() {
    // Compile and render
    var storedData1 = myApp.formGetData('logged_userId');
    var compiledTemplate = Template7.compile($$("#news-template").html());
    //alert("hi")


    var start = $$('#news_limit_start').val();
    //var end = $$('#news_limit_end').val();

    if(start=="")
    {
        $$('#news_limit_start').val(10);
        //$$('#news_limit_end').val(10);

        start = $$('#news_limit_start').val();
        //end = $$('#news_limit_end').val();
        var limit = start;
    }else{

        start = parseInt(start)+parseInt(10);
        //alert(start);
        $$('#news_limit_start').val(start);
        //$$('#news_limit_end').val(end);
        //alert(start);
        limit = start;
    }
    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=news&userid='+storedData1['userId']+'&limit='+limit+'&format=json', function (json) {

                // Insert rendered template
                $$('#content-wrap').html(compiledTemplate(json));

                });
};
var fcount = 0 ;
function addfields(){
    var att = $("input:radio[name='friends']:checked").val();
    if(att == "false"){
        $$("#af").css("display","block");
    }
    else
    {
        $$("#af").css("display","none");
        $$("#memberinfo").attr("data-number",fcount);
    }
}
function addtextfields(){
    fcount++;
    var data ='<li id="'+fcount+'"><div class="item-content"> <div class="item-media"><i onclick="remove('+fcount+')" id="'+fcount+'c" class="fa fa-minus-circle" aria-hidden="true"></i></div><div class="item-inner">'+
    '<div class="item-input">'+
    '<input type="text" id="'+fcount+'N"  placeholder="Name">'+
    '</div>'+
    '<div class="item-input">'+
    '<input type="number" id="'+fcount+'M" placeholder="Mobile">'+
    '</div></li>'
    $("#add").append(data);
    $$("#memberinfo").attr("data-number",fcount);
}

function caluclete(){
    var feecount =0;
    var att2 = $("input:radio[name='friends']:checked").val();
    var att = $$("#memberinfo").attr("data-number");
    var flist = "";
     myApp.showPreloader();
    if(att < 1){
        //myApp.alert("Amount to be Paid , 21$","Amount");
        flist=null;
        feecount = 0
    }
    var att1 = $$("#Ppay").attr("data-id");
    var JSONObject = localStorage.getItem('testObject');
    JSONObject=JSON.parse(JSONObject)
    var Uname=JSONObject['Username']
    
    
    if(att>0){
        for(i=1;i<=att;i++){
            var idx = "#"+i+"N";
            var idy = "#"+i+"M";
            var name= $$(idx).val();
            var num = $$(idy).val();
            if(name!=""||num!=""){
                flist = flist+name+"_"+num+"|"
                feecount=feecount+1;
                
            }
            
        }
        if(feecount<att){
           // myApp.alert("please Enter  Name and phone number of everperson");
        }
    }
    var URL= "http://footprintsnatureclub.com/Service/FootprintsService.asmx/JoinEvent";
    $$.ajax({
            method: 'POST',
            url: "http://footprintsnatureclub.com/Service/FootprintsService.asmx/JoinEvent",
            data: {username:Uname,eventid:att1,comingAlone:att2,FriendsList:flist},
            success: function(response){
            
            //feecount=0;
            debugger;
            var cost = 21+(feecount*21) ;
            myApp.alert("Amount to be Paid :"+cost+"$","Amount");
            feecount = 0;
            fcount = 0;
            myApp.hidePreloader();
            myApp.alert("Payment Success","Footprints");
            $$("#memberinfo").attr("data-number","0");
            mainView.router.loadPage('Home.htm');
            }});
    
}
function remove(id){
    var idz = "#"+id
    $(idz).remove();
    var att = $$("#memberinfo").attr("data-number");
    //debugger;
    if(id != att ){
        for(var i=id;i<att;i++){
            var temp= i+1
            $("#"+temp).attr("id","i");
            var idq =att-1
            $$("#"+temp+"c").attr("onclick","remove("+idq+")");
        }
    }
    else{
    }
    $$("#memberinfo").attr("data-number",att-1);
    fcount--;
    
}
function share(id){
    var link = "http://monthlymagazine.com/article-desc_"+id+"_"
    window.plugins.socialsharing.share('News Magzine', null, null, link);
}
function forgetpasswordemail(){
    var email = $$('#forget-email').val();

    var url = "http://monthlymagazine.com/ws.php?type=resetpassword&format=json&emailid="+email;
    $$.getJSON (url, function (json) {
                myApp.alert("Please check your email for the password",'Success');
                mainView.router.loadPage('login.html');

                });
}
function searchnews(){
    $$('#content-wrap').html("");
    var compiledTemplate = Template7.compile($$("#search-template").html());
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=search&keyword='+$$("#searc").val()+'&format=json', function (json) {

                // Insert rendered template
                $$('#content-wrap1').html(compiledTemplate(json));
                });
}

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="news"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                //myApp.alert('Here comes news page');
                // Loading flag
                getnews();
                var loading = false;
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=homenews&format=json', function (json) {
                            firstid = json['posts'][0]['id'];

                            // Insert rendered template
                            });
                var ptrContent = $$('.pull-to-refresh-content');

                // Add 'refresh' listener on it
                ptrContent.on('refresh', function (e) {
                              // Emulate 2s loading
                              setTimeout(function () {
                                         $$.getJSON ('http://monthlymagazine.com/ws.php?type=newnews&format=json&aaid='+firstid, function (json) {
                                                     firstid = json['posts'][0]['id'];
                                                     $$('#content-wrap').html(compiledTemplate(json));
                                                     // Insert rendered template
                                                     });
                                         // When loading done, we need to reset it
                                         myApp.pullToRefreshDone();
                                         }, 2000);
                              });
                // Attach 'infinite' event handler
                // Attach 'infinite' event handler
                $$('.infinite-scroll').on('infinite', function () {

                                          // Exit, if loading in progress
                                          if (loading) return;

                                          // Set loading flag
                                          loading = true;

                                          // Emulate 1s loading
                                          setTimeout(function (){
                                                     // Reset loading flag
                                                     loading = false;
                                                     //alert("scrolled")
                                                     getnews();

                                                     }, 1000);
                                          });
                });


function gethomeNews111(){
    // Compile and render
    var compiledTemplate = Template7.compile($$("#homenews-template111").html());



    var start = $$('#home_news_limit_start111').val();
    //var end = $$('#news_limit_end111').val();

    if(start==""){
        $$('#home_news_limit_start111').val(10);
        //$$('#news_limit_end111').val(10);

        start = $$('#home_news_limit_start111').val();
        //end = $$('#news_limit_end111').val();
        var limit = start;
    }else{
        start = parseInt(start)+parseInt(10);
        //alert(start);
        $$('#home_news_limit_start111').val(start);
        //$$('#news_limit_end111').val(end);
        //alert(start);
        limit = start;

    }
    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=homenews111&limit='+limit+'&format=json', function (json) {

                // Insert rendered template
                $$('#content-wrapnews111').html(compiledTemplate(json));
                });
};

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="home_news111"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                //myApp.alert('Here comes news page');
                // Loading flag
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=homenews&format=json', function (json) {
                            firstid = json['posts'][0]['id'];

                            // Insert rendered template
                            });
                var ptrContent = $$('.pull-to-refresh-content');

                // Add 'refresh' listener on it
                ptrContent.on('refresh', function (e) {
                              // Emulate 2s loading
                              setTimeout(function () {
                                         $$.getJSON ('http://monthlymagazine.com/ws.php?type=newnews&format=json&aaid='+firstid, function (json) {
                                                     firstid = json['posts'][0]['id'];
                                                     $$('#content-wrapnews111').html(compiledTemplate(json));
                                                     // Insert rendered template
                                                     });
                                         // When loading done, we need to reset it
                                         myApp.pullToRefreshDone();
                                         }, 2000);
                              });

                gethomeNews111();
                var loading = false;

                // Attach 'infinite' event handler
                // Attach 'infinite' event handler
                $$('.infinite-scroll').on('infinite', function () {

                                          // Exit, if loading in progress
                                          if (loading) return;

                                          // Set loading flag
                                          loading = true;

                                          // Emulate 1s loading
                                          setTimeout(function () {
                                                     // Reset loading flag
                                                     loading = false;

                                                     gethomeNews111();

                                                     }, 1000);
                                          });
                });


var firstid = 0;

function gethomeNews(){
    // Compile and render
    var compiledTemplate = Template7.compile($$("#homenews-template").html());



    var start = $$('#home_news_limit_start').val();
    //var end = $$('#news_limit_end').val();

    if(start==""){
        $$('#home_news_limit_start').val(10);
        //$$('#news_limit_end').val(10);

        start = $$('#home_news_limit_start').val();
        //end = $$('#news_limit_end').val();
        var limit = start;
    }else{
        start = parseInt(start)+parseInt(10);
        //alert(start);
        $$('#home_news_limit_start').val(start);
        //$$('#news_limit_end').val(end);
        //alert(start);
        limit = start;

    }
    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=homenews&limit='+limit+'&format=json', function (json) {
                firstid = json['posts'][0]['id'];

                // Insert rendered template
                $$('#content-wrap2').html(compiledTemplate(json));
                });
};



var firstid = 0;

function gethomeNewsar(){
    // Compile and render
    var compiledTemplate = Template7.compile($$("#homenewsar-template").html());



    var start = $$('#home_newsar_limit_start').val();
    //var end = $$('#news_limit_end').val();

    if(start==""){
        $$('#home_newsar_limit_start').val(10);
        //$$('#news_limit_end').val(10);

        start = $$('#home_newsar_limit_start').val();
        //end = $$('#news_limit_end').val();
        var limit = start;
    }else{
        start = parseInt(start)+parseInt(10);
        //alert(start);
        $$('#home_newsar_limit_start').val(start);
        //$$('#news_limit_end').val(end);
        //alert(start);
        limit = start;

    }
    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=homenewsar&limit='+limit+'&format=json', function (json) {
                firstid = json['posts'][0]['id'];

                // Insert rendered template
                $$('#contentar-wrap2').html(compiledTemplate(json));
                });
};


var firstid = 0;

function getsectionarticles(x){
    // Compile and render

    var compiledTemplate = Template7.compile($$("#sectionarticles-template").html());



    var start = $$('#sectionarticles_limit_start').val();
    //var end = $$('#news_limit_end').val();

    if(start==""){
        $$('#sectionarticles_limit_start').val(10);
        //$$('#news_limit_end').val(10);

        start = $$('#sectionarticles_limit_start').val();
        //end = $$('#news_limit_end').val();
        var limit = start;
    }else{
        start = parseInt(start)+parseInt(10);
        //alert(start);
        $$('#sectionarticles_limit_start').val(start);
        //$$('#news_limit_end').val(end);
        //alert(start);
        limit = start;

    }
    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=sectionarticles&limit='+limit+'&format=json&id='+x, function (json) {
                firstid = json['posts'][0]['id'];

                // Insert rendered template
                $$('#sectionarticles-content').html(compiledTemplate(json));
                });
};

var firstid = 0;

function getsectionarticlesar(x){
    // Compile and render

    var compiledTemplate = Template7.compile($$("#sectionarticlesar-template").html());



    var start = $$('#sectionarticlesar_limit_start').val();
    //var end = $$('#news_limit_end').val();

    if(start==""){
        $$('#sectionarticlesar_limit_start').val(10);
        //$$('#news_limit_end').val(10);

        start = $$('#sectionarticlesar_limit_start').val();
        //end = $$('#news_limit_end').val();
        var limit = start;
    }else{
        start = parseInt(start)+parseInt(10);
        //alert(start);
        $$('#sectionarticlesar_limit_start').val(start);
        //$$('#news_limit_end').val(end);
        //alert(start);
        limit = start;

    }
    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=sectionarticlesar&limit='+limit+'&format=json&id='+x, function (json) {
                firstid = json['posts'][0]['id'];

                // Insert rendered template
                $$('#sectionarticlesar-content').html(compiledTemplate(json));
                });
};


var firstid = 0;

function getmagazines(x){
    // Compile and render

    var compiledTemplate = Template7.compile($$("#magazines-template").html());



    var start = $$('#magazines_limit_start').val();
    //var end = $$('#news_limit_end').val();

    if(start==""){
        $$('#magazines_limit_start').val(10);
        //$$('#news_limit_end').val(10);

        start = $$('#magazines_limit_start').val();
        //end = $$('#news_limit_end').val();
        var limit = start;
    }else{
        start = parseInt(start)+parseInt(10);
        //alert(start);
        $$('#magazines_limit_start').val(start);
        //$$('#news_limit_end').val(end);
        //alert(start);
        limit = start;

    }
    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=magazines&limit='+limit+'&format=json&id='+x, function (json) {
                firstid = json['posts'][0]['id'];

                // Insert rendered template
                $$('#magazines-content').html(compiledTemplate(json));
                });
};

var firstid = 0;

function getmagazinesar(x){
    // Compile and render

    var compiledTemplate = Template7.compile($$("#magazinesar-template").html());



    var start = $$('#magazinesar_limit_start').val();
    //var end = $$('#news_limit_end').val();

    if(start==""){
        $$('#magazinesar_limit_start').val(10);
        //$$('#news_limit_end').val(10);

        start = $$('#magazinesar_limit_start').val();
        //end = $$('#news_limit_end').val();
        var limit = start;
    }else{
        start = parseInt(start)+parseInt(10);
        //alert(start);
        $$('#magazinesar_limit_start').val(start);
        //$$('#news_limit_end').val(end);
        //alert(start);
        limit = start;

    }
    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=magazinesar&limit='+limit+'&format=json&id='+x, function (json) {
                firstid = json['posts'][0]['id'];

                // Insert rendered template
                $$('#magazinesar-content').html(compiledTemplate(json));
                });
};


function getmenu() {

    var url= "http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetMenus";
    $$.getJSON (url, function (events) {
                $$.each(events, function(key,value) {
                        var Children = value['Children'];
                        var Name = value['Name'];
                        var PageUrl= value['PageUrl'];
                        //	var EventDate= value['EventDate'];
                        //	var Summary= value['Summary'];
                        //	var x=EventDate.split("/");
                        //	EventDate=x[0]+'/'+x[1];
                        var $accordionclass='';
                        var $closemenuclass='';
                        if(Children.length==0)$accordionclass='';else $accordionclass='accordion-item';
                        if(Children.length==0)$closemenuclass='close-panel';else $closemenuclass='';
                        var data="<li class='"+$accordionclass+"'><a class='"+$closemenuclass+" item-link'   href='"+PageUrl+"' id='"
                        +key+"'><div class='item-content'><div class='item-inner'><div class='item-title white'>"+Name+"</div></div></div></a>";
                        //var data=Name;
                        for (i = 0; i < Children.length; i++) {

                        var sublink=Children[i]['PageUrl'];
                        var subname=Children[i]['Name'];
                        var id=Children[i]['Id'];

                        if(sublink.startsWith("?")==true){sublink="pages.htm"+sublink;}
                        if(id==5){sublink="howtoprepare.html";}

                        data +="<div class='accordion-item-content'><div class='list-block'><ul><li><a class=' item-link' href='"+sublink+"'><div class='item-content '><div class='item-inner submenupage'><div class='item-title dynamicmenusubtitle'>"+subname+"</div></div></div></a></li></ul></div></div>";
                        }

                        data +="</li>";
                        $$('#menu-content').append(data);

                        });
                });
    var att = $$(".page-on-center").attr("data-page");
    if(att=="home"){
        $("#0").hide();

    }

};
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="events"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                myApp.closePanel();
                var url= "http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetCalendarOfEvents";
                calendarA();
                $$.getJSON (url, function (events) {
                            $$.each(events, function(key,value) {
                                    var id = value['Id'];
                                    var title = value['Title'];
                                    var PicturePath= value['PicturePath'];
                                    var EventDate= value['EventDate'];
                                    var Summary= value['Summary'];
                                    var x=EventDate.split("/");
                                    EventDate=x[0]+'/'+x[1];
                                    var data = "<div class='card facebook-card no-border'><div class='card-header no-border'><div class='facebook-name'><i class='fa fa-map-marker' aria-hidden='true'></i> <a href='event-desc.htm?id="+id+"' class='black'>"+title+"</a></div></div><div class='card-content'><a href='event-desc.htm?id="+id+"'><div class='color-white no-border cardimage' style='background-image:url("+PicturePath+")' valign='bottom'><mark class='event-date'>"+EventDate+"</mark ></div></a></div><div class='card-footer no-border'><p>"+Summary+"</p></div></div></div>";
                                    //alert	http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetEventDetails?id=2399
                                    $$('#events-content').append(data);

                                    });
                            });

                });
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="home"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                // calendarA();
                var url1 = "http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetUpComingEvents";
                var url ="http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetEventsOfTheWeek "
                var att = $$(".page-on-center").attr("data-page");
                setTimeout(function(){$$("#0").hide()},3000);;

                $$.getJSON (url, function (events) {

                            var $last = events[events.length - 1];
                            var len = events.length;
                            var mySwiper1 = myApp.swiper('.swiper-1', {
                                                         pagination:'.swiper-1 .swiper-pagination',
                                                         spaceBetween: 00,
                                                         autoplay:false,
                                                         speed: 5000
                                                         });
                            $$.each(events, function(key,value) {
                                    key=key+1;
                                    var srcz = "#"+key+"s";
                                    var hed = "#h"+key;
                                    var anch = "#a"+key;
                                    var id = value['Id'];
                                    var link = "event-desc.htm?id="+id;
                                    console.log(srcz)
                                    //                                    $$(srcz).attr("src",value['PicturePath']);
                                    //                                    $$(hed).html(value['Title']);
                                    //                                    $$(anch).attr("href",link)
                                    mySwiper1.appendSlide('<div  class="swiper-slide" id="s2" ><a href="'+link+'" id="a2"><img id="2s"  src="'+value['PicturePath']+'" class="img-responsive imgoftheweek"></a><span id="h2" style="position: absolute;bottom: 3%;margin: 10px 3px;background-color: #ff0;opacity: 0.7;color: #000;font-size: 5vw;padding: 3px 10px;">'+value['Title']+'</span></div>');




                                    var title = value['Title'];
                                    var PicturePath= value['PicturePath'];
                                    var EventDate= value['EventDate'];
                                    var Summary= value['Summary'];
                                    var x=EventDate.split("/");
                                    EventDate=x[0]+'/'+x[1];
                                    if($last.Id==value['Id']){
                                    var data = "<div class='card facebook-card no-border'><div class='card-header no-border'><div class='facebook-name'><i class='fa fa-map-marker' aria-hidden='true'></i> <a href='event-desc.htm?id="+id+"' class='black'>"+title+"</a></div></div><div class='card-content'><a href='event-desc.htm?id="+id+"'><div class='color-white no-border cardimage' style='background-image:url("+PicturePath+")' valign='bottom'><mark class='event-date'>"+EventDate+"</mark ></div></a></div></div></div>";
                                    }else{data='';}
                                    //alert	http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetEventDetails?id=2399
                                    $$('#upcomingevents-home').append(data);


                                    });
                            });

                });

function homepagefun(){
alert("hi")
 var url1 = "http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetUpComingEvents";
                var url ="http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetEventsOfTheWeek "
                var att = $$(".page-on-center").attr("data-page");
                setTimeout(function(){$$("#0").hide()},3000);;

                $$.getJSON (url, function (events) {

                            var $last = events[events.length - 1];
                            var len = events.length;
                            var mySwiper1 = myApp.swiper('.swiper-1', {
                                                         pagination:'.swiper-1 .swiper-pagination',
                                                         spaceBetween: 00,
                                                         autoplay:false,
                                                         speed: 5000
                                                         });
                            $$.each(events, function(key,value) {
                                    key=key+1;
                                    var srcz = "#"+key+"s";
                                    var hed = "#h"+key;
                                    var anch = "#a"+key;
                                    var id = value['Id'];
                                    var link = "event-desc.htm?id="+id;
                                    console.log(srcz)
                                    //                                    $$(srcz).attr("src",value['PicturePath']);
                                    //                                    $$(hed).html(value['Title']);
                                    //                                    $$(anch).attr("href",link)
                                    mySwiper1.appendSlide('<div  class="swiper-slide" id="s2" ><a href="'+link+'" id="a2"><img id="2s"  src="'+value['PicturePath']+'" class="img-responsive imgoftheweek"></a><span id="h2" style="position: absolute;top: 55%;background-color: #ff0;opacity: 0.7;color: #000;font-size: 5vw;padding: 3px 10px;">'+value['Title']+'</span></div>');




                                    var title = value['Title'];
                                    var PicturePath= value['PicturePath'];
                                    var EventDate= value['EventDate'];
                                    var Summary= value['Summary'];
                                    var x=EventDate.split("/");
                                    EventDate=x[0]+'/'+x[1];
                                    if($last.Id==value['Id']){
                                    var data = "<div class='card facebook-card no-border'><div class='card-header no-border'><div class='facebook-name'><i class='fa fa-map-marker' aria-hidden='true'></i> <a href='event-desc.htm?id="+id+"' class='black'>"+title+"</a></div></div><div class='card-content'><a href='event-desc.htm?id="+id+"'><div class='color-white no-border cardimage' style='background-image:url("+PicturePath+")' valign='bottom'><mark class='event-date'>"+EventDate+"</mark ></div></a></div></div></div>";
                                    }else{data='';}
                                    //alert	http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetEventDetails?id=2399
                                    $$('#upcomingevents-home').append(data);


                                    });
                            });
}
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="upcomingevents"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                myApp.closePanel();
                // calendarA();
                var url= "http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetUpComingEvents";
                $$.getJSON (url, function (events) {
                            $$.each(events, function(key,value) {
                                    var id = value['Id'];
                                    var title = value['Title'];
                                    var PicturePath= value['PicturePath'];
                                    var EventDate= value['EventDate'];
                                    var Summary= value['Summary'];
                                    var x=EventDate.split("/");
                                    EventDate=x[0]+'/'+x[1];
                                    var data = "<div class='card facebook-card no-border'><div class='card-header no-border'><div class='facebook-name'><i class='fa fa-map-marker' aria-hidden='true'></i> <a href='event-desc.htm?id="+id+"' class='black'>"+title+"</a></div></div><div class='card-content'><a href='event-desc.htm?id="+id+"'><div class='color-white no-border cardimage' style='background-image:url("+PicturePath+")' valign='bottom'><mark class='event-date'>"+EventDate+"</mark ></div></a></div><div class='card-footer no-border'><p>"+Summary+"</p></div></div></div>";
                                    //alert	http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetEventDetails?id=2399
                                    $$('#upcomingevents-content').append(data);

                                    });
                            });

                });


// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="event-desc"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"

                var page = e.detail.page;
                var parray = [];

                var compiledTemplate = Template7.compile($$("#event-desc-template").html());
                var x = page.query.id;
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetEventDetails?id='+x, function (json) {
                            //alert(x);
                            // Insert rendered template

                            var edate = json['EventDate'];
                            var parts =edate.split('/');
                            var Evdate = new Date(parts[2],parts[1]-1,parts[0]);
                            console.log(Evdate);
                            var today = new Date();
                            console.log(today);

                            parray =json['PicturesList']
                            var mySwiper2 = myApp.swiper('.swiper-3', {
                                                         pagination:'.swiper-3 .swiper-pagination',
                                                         spaceBetween: 00,
                                                         autoplay:true,
                                                         speed: 5000
                                                         });
                            console.log(parray)
                            $.each(parray,function(index,value){
                                   mySwiper2.appendSlide('<div class="swiper-slide"><img id="1m" src="'+value+'" class="img-responsive"></div>');
                                   })
                            setTimeout(function(){
                                       },1000);
                            console.log(parray);

                            document.getElementById('event-desc-content').innerHTML = compiledTemplate(json);
                            if(Evdate < today){
                            console.log(today);
                            $$("#join").hide();
                            }
                            });
                var compiledTemplate1 = Template7.compile($$("#event-banner-template").html());
                var x = page.query.id;
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetEventDetails?id='+x, function (json) {
                            //alert(x);
                            // Insert rendered template
                            // document.getElementById('event-banner-content').innerHTML = compiledTemplate1(json);
                            });





                });


function logincheck(id){
    console.log(localStorage.getItem("testObject"));
    if (localStorage.getItem("testObject") == null) {
        myApp.alert("please Login to join");
        mainView.router.loadPage('login.html');
    }
    else{
        mainView.router.loadPage('payment.html');
        $$.getJSON ('http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetEventDetails?id='+id, function (json) {
                    $$("#titlez").html(json['Title'])
                    $$("#Eid").html(json['StartDate']);
                    $$("#Loc").html(json['GatheringLocation']);
                    $$("#Ppay").attr("data-id",json['Id'])
                    });
    }

}
$$(document).on('pageInit', '.page[data-page="dynamicpages"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                myApp.closePanel();
                var page = e.detail.page;


                var compiledTemplate = Template7.compile($$("#dynamicpages-template").html());
                var x = page.query.id;
                // Get JSON Data from UrbanDictionary API
                var url='';
                if(x==3){url="http://footprintsnatureclub.com/Service/WebService.asmx/GetWhyFootprints";}
                if(x==7){url="http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetMenuDetails?id=7";}
                if(x==5){url="http://footprintsnatureclub.com/Service/WebService.asmx/GetHowToPrepare";}
                if(x==1013){url="http://footprintsnatureclub.com/Service/WebService.asmx/GetHikingTips";}

                $$.getJSON (url, function (json) {
                            //alert(x);
                            // Insert rendered template
                            document.getElementById('dynamicpages-content').innerHTML = compiledTemplate(json);
                            });


                });

$$(document).on('pageInit', '.page[data-page="ourguides"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                myApp.closePanel();


                var compiledTemplate = Template7.compile($$("#ourguides-template").html());

                $$.getJSON ("http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetOurGuides", function (json) {
                            //alert(x);
                            // Insert rendered template
                            document.getElementById('ourguides-content').innerHTML = compiledTemplate(json);
                            });


                });
$$(document).on('pageInit', '.page[data-page="ouractivities"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                myApp.closePanel();


                var compiledTemplate = Template7.compile($$("#ouractivities-template").html());

                $$.getJSON ("http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetOurActivities", function (json) {
                            //alert(x);
                            // Insert rendered template
                            document.getElementById('ouractivities-content').innerHTML = compiledTemplate(json);
                            });


                });

function submitcontactform(){
    var names = $("#contact-name").val();
    var Email = $("#contact-email").val();
    var phone = $("#contact-phone").val();
    var message = $("#contact-message").val();
    console.log(message);
    if(names&&Email&&message){
        $$.ajax({
                method: 'POST',
                url: 'http://footprintsnatureclub.com/Service/FootprintsService.asmx/ContactUsMessage',
                data: {name:names,email:Email,telephone:phone,comments:message},
                success: function(response){
                console.log(response)}});
        myApp.alert("Thank you for contacting us , we will get back to you soon","Contact Us");
        $("#contact-name").val('');
        $("#contact-email").val('');
        $("#contact-phone").val('');
        $("#contact-message").val('');
        mainView.router.loadPage('Home.htm');


    }
    else{
        console.log("all fields enter")
    }
}
$$(document).on('pageInit', '.page[data-page="home"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"

                var page = e.detail.page;


                var compiledTemplate = Template7.compile($$("#home-template").html());
                var x = page.query.id;
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetHomeBanners', function (json) {
                            //alert(x);
                            // Insert rendered template
                            document.getElementById('home-content').innerHTML = compiledTemplate(json);
                            });

                });

$$(document).on('pageInit', function (e) {
                var page = e.detail.page;
                $$("#0").show();
                // Code for About page
                if (page.name === 'home') {
                $$("#0").hide();
                // 1 Slide Per View, 50px Between

                }

                });

$$(document).on('pageInit', function (e) {
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'event-desc') {

                // 1 Slide Per View, 50px Between



                }

                });

function getmenuar() {
    // Compile and render
    var compiledTemplate = Template7.compile($$("#menuar-template").html());

    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=menusectionsar&format=json', function (json) {

                // Insert rendered template
                document.getElementById('menuar-content').innerHTML = compiledTemplate(json);
                });
};


function getsubsections() {
    // Compile and render
    var compiledTemplate = Template7.compile($$("#subsections-template").html());
    var x = page.query.id;
    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=subsections&format=json&id='+x, function (json) {

                // Insert rendered template
                document.getElementById('subsections-content').innerHTML = compiledTemplate(json);
                });
};


function getbreakingnews() {
    // Compile and render
    var compiledTemplate = Template7.compile($$("#newsmarquee-template").html());

    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=breakingnews&format=json', function (json) {

                // Insert rendered template
                document.getElementById('newsmarquee-content').innerHTML = compiledTemplate(json);
                });
};
function getbreakingnewsar() {
    // Compile and render
    var compiledTemplate = Template7.compile($$("#newsmarqueear-template").html());

    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=breakingnewsar&format=json', function (json) {

                // Insert rendered template
                document.getElementById('newsmarqueear-content').innerHTML = compiledTemplate(json);
                });
};


function getbannernews() {
    // Compile and render
    var compiledTemplate = Template7.compile($$("#bannernews-template").html());

    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=bannernews&format=json', function (json) {

                // Insert rendered template
                document.getElementById('bannernews-content').innerHTML = compiledTemplate(json);
                });
};
function getbannernewsar() {
    // Compile and render
    var compiledTemplate = Template7.compile($$("#bannernewsar-template").html());

    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=bannernewsar&format=json', function (json) {

                // Insert rendered template
                document.getElementById('bannernewsar-content').innerHTML = compiledTemplate(json);
                });
};

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="sections"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"

                var page = e.detail.page;


                var compiledTemplate = Template7.compile($$("#subsections-template").html());
                var x = page.query.id;
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=subsections&format=json&id='+x, function (json) {

                            // Insert rendered template
                            document.getElementById('subsections-content').innerHTML = compiledTemplate(json);
                            });


                });

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="sectionsar"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"

                var page = e.detail.page;


                var compiledTemplate = Template7.compile($$("#subsectionsar-template").html());
                var x = page.query.id;
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=subsectionsar&format=json&id='+x, function (json) {

                            // Insert rendered template
                            document.getElementById('subsectionsar-content').innerHTML = compiledTemplate(json);
                            });


                });


// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="settings"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"




                var compiledTemplate = Template7.compile($$("#settings-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=menusections&format=json', function (json) {

                            // Insert rendered template
                            document.getElementById('settings-content').innerHTML = compiledTemplate(json);
                            });


                });

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="settingsar"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"




                var compiledTemplate = Template7.compile($$("#settingsar-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=menusectionsar&format=json', function (json) {

                            // Insert rendered template
                            document.getElementById('settingsar-content').innerHTML = compiledTemplate(json);
                            });


                });


$$(document).on('pageInit', '.page[data-page="sectionarticles"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                //myApp.alert('Here comes news page');
                // Loading flag

                var page = e.detail.page;
                var x = page.query.id;

                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=sectionarticles&format=json&id='+x, function (json) {
                            firstid = json['posts'][0]['id'];

                            // Insert rendered template
                            });
                getsectionarticles(x);

                var ptrContent = $$('.pull-to-refresh-content');

                // Add 'refresh' listener on it
                ptrContent.on('refresh', function (e) {
                              // Emulate 2s loading
                              setTimeout(function () {
                                         $$.getJSON ('http://monthlymagazine.com/ws.php?type=sectionarticles&format=json&aaid='+firstid, function (json) {
                                                     firstid = json['posts'][0]['id'];
                                                     $$('#sectionarticles-content').html(compiledTemplate(json));
                                                     // Insert rendered template

                                                     });
                                         // When loading done, we need to reset it
                                         myApp.pullToRefreshDone();
                                         }, 2000);
                              });
                var loading = false;

                // Attach 'infinite' event handler
                // Attach 'infinite' event handler
                $$('.infinite-scroll').on('infinite', function () {

                                          // Exit, if loading in progress
                                          if (loading) return;

                                          // Set loading flag
                                          loading = true;

                                          // Emulate 1s loading
                                          setTimeout(function () {
                                                     // Reset loading flag
                                                     loading = false;

                                                     getsectionarticles(x);

                                                     }, 1000);
                                          });
                });

$$(document).on('pageInit', '.page[data-page="sectionarticlesar"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                //myApp.alert('Here comes news page');
                // Loading flag

                var page = e.detail.page;
                var x = page.query.id;

                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=sectionarticlesar&format=json&id='+x, function (json) {
                            firstid = json['posts'][0]['id'];

                            // Insert rendered template
                            });
                getsectionarticlesar(x);

                var ptrContent = $$('.pull-to-refresh-content');

                // Add 'refresh' listener on it
                ptrContent.on('refresh', function (e) {
                              // Emulate 2s loading
                              setTimeout(function () {
                                         $$.getJSON ('http://monthlymagazine.com/ws.php?type=sectionarticlesar&format=json&aaid='+firstid, function (json) {
                                                     firstid = json['posts'][0]['id'];
                                                     $$('#sectionarticlesar-content').html(compiledTemplate(json));
                                                     // Insert rendered template

                                                     });
                                         // When loading done, we need to reset it
                                         myApp.pullToRefreshDone();
                                         }, 2000);
                              });
                var loading = false;

                // Attach 'infinite' event handler
                // Attach 'infinite' event handler
                $$('.infinite-scroll').on('infinite', function () {

                                          // Exit, if loading in progress
                                          if (loading) return;

                                          // Set loading flag
                                          loading = true;

                                          // Emulate 1s loading
                                          setTimeout(function () {
                                                     // Reset loading flag
                                                     loading = false;

                                                     getsectionarticlesar(x);

                                                     }, 1000);
                                          });
                });



$$(document).on('pageInit', '.page[data-page="magazines"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                //myApp.alert('Here comes news page');
                // Loading flag

                var page = e.detail.page;
                var x = page.query.id;

                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=magazines&format=json&id='+x, function (json) {
                            firstid = json['posts'][0]['id'];

                            // Insert rendered template
                            });
                getmagazines(x);

                var ptrContent = $$('.pull-to-refresh-content');

                // Add 'refresh' listener on it
                ptrContent.on('refresh', function (e) {
                              // Emulate 2s loading
                              setTimeout(function () {
                                         $$.getJSON ('http://monthlymagazine.com/ws.php?type=magazines&format=json&aaid='+firstid, function (json) {
                                                     firstid = json['posts'][0]['id'];
                                                     $$('#magazines-content').html(compiledTemplate(json));
                                                     // Insert rendered template

                                                     });
                                         // When loading done, we need to reset it
                                         myApp.pullToRefreshDone();
                                         }, 2000);
                              });
                var loading = false;

                // Attach 'infinite' event handler
                // Attach 'infinite' event handler
                $$('.infinite-scroll').on('infinite', function () {

                                          // Exit, if loading in progress
                                          if (loading) return;

                                          // Set loading flag
                                          loading = true;

                                          // Emulate 1s loading
                                          setTimeout(function () {
                                                     // Reset loading flag
                                                     loading = false;

                                                     getmagazines(x);

                                                     }, 1000);
                                          });
                });



$$(document).on('pageInit', '.page[data-page="magazinesar"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                //myApp.alert('Here comes news page');
                // Loading flag

                var page = e.detail.page;
                var x = page.query.id;

                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=magazinesar&format=json&id='+x, function (json) {
                            firstid = json['posts'][0]['id'];

                            // Insert rendered template
                            });
                getmagazinesar(x);

                var ptrContent = $$('.pull-to-refresh-content');

                // Add 'refresh' listener on it
                ptrContent.on('refresh', function (e) {
                              // Emulate 2s loading
                              setTimeout(function () {
                                         $$.getJSON ('http://monthlymagazine.com/ws.php?type=magazinesar&format=json&aaid='+firstid, function (json) {
                                                     firstid = json['posts'][0]['id'];
                                                     $$('#magazinesar-content').html(compiledTemplate(json));
                                                     // Insert rendered template

                                                     });
                                         // When loading done, we need to reset it
                                         myApp.pullToRefreshDone();
                                         }, 2000);
                              });
                var loading = false;

                // Attach 'infinite' event handler
                // Attach 'infinite' event handler
                $$('.infinite-scroll').on('infinite', function () {

                                          // Exit, if loading in progress
                                          if (loading) return;

                                          // Set loading flag
                                          loading = true;

                                          // Emulate 1s loading
                                          setTimeout(function () {
                                                     // Reset loading flag
                                                     loading = false;

                                                     getmagazinesar(x);

                                                     }, 1000);
                                          });
                });





// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="home_news"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                //myApp.alert('Here comes news page');
                // Loading flag
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=homenews&format=json', function (json) {
                            firstid = json['posts'][0]['id'];

                            // Insert rendered template
                            });
                getbreakingnews();
                getbannernews();
                gethomeNews();

                var ptrContent = $$('.pull-to-refresh-content');

                // Add 'refresh' listener on it
                ptrContent.on('refresh', function (e) {
                              // Emulate 2s loading
                              setTimeout(function () {
                                         $$.getJSON ('http://monthlymagazine.com/ws.php?type=newnews&format=json&aaid='+firstid, function (json) {
                                                     firstid = json['posts'][0]['id'];
                                                     $$('#content-wrap2').html(compiledTemplate(json));
                                                     // Insert rendered template

                                                     });
                                         // When loading done, we need to reset it
                                         myApp.pullToRefreshDone();
                                         }, 2000);
                              });
                var loading = false;

                // Attach 'infinite' event handler
                // Attach 'infinite' event handler
                $$('.infinite-scroll').on('infinite', function () {

                                          // Exit, if loading in progress
                                          if (loading) return;

                                          // Set loading flag
                                          loading = true;

                                          // Emulate 1s loading
                                          setTimeout(function () {
                                                     // Reset loading flag
                                                     loading = false;

                                                     gethomeNews();

                                                     }, 1000);
                                          });
                });


// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="home_newsar"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                //myApp.alert('Here comes news page');
                // Loading flag

                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=homenewsar&format=json', function (json) {
                            firstid = json['posts'][0]['id'];

                            // Insert rendered template
                            });
                getbreakingnewsar();
                getbannernewsar();
                gethomeNewsar();

                var ptrContent = $$('.pull-to-refresh-content');

                // Add 'refresh' listener on it
                ptrContent.on('refresh', function (e) {
                              // Emulate 2s loading
                              setTimeout(function () {
                                         $$.getJSON ('http://monthlymagazine.com/ws.php?type=newnewsar&format=json&aaid='+firstid, function (json) {
                                                     firstid = json['posts'][0]['id'];
                                                     $$('#contentar-wrap2').html(compiledTemplate(json));
                                                     // Insert rendered template

                                                     });
                                         // When loading done, we need to reset it
                                         myApp.pullToRefreshDone();
                                         }, 2000);
                              });
                var loading = false;

                // Attach 'infinite' event handler
                // Attach 'infinite' event handler
                $$('.infinite-scroll').on('infinite', function () {

                                          // Exit, if loading in progress
                                          if (loading) return;

                                          // Set loading flag
                                          loading = true;

                                          // Emulate 1s loading
                                          setTimeout(function () {
                                                     // Reset loading flag
                                                     loading = false;

                                                     gethomeNewsar();

                                                     }, 1000);
                                          });
                });






var Fstart =0;
var temp  =0;

function getfeatures() {
    // Compile and render
    var compiledTemplate = Template7.compile($$("#features-template").html());

    var start = $$('#feature_news_limit_start').val();

    if(Fstart==0){
        $$('#feature_news_limit_start').val(10);
        //$$('#news_limit_end').val(10);

        start = $$('#feature_news_limit_start').val();
        Fstart=10;
        //end = $$('#news_limit_end').val();
        var limit = start;
    }else{
        start = parseInt(start)+parseInt(10);
        Fstart =Fstart+10;


        //alert(start);
        $$('#feature_news_limit_start').val(start);
        //$$('#news_limit_end').val(end);
        //alert(start);
        limit = start;

        limit =Fstart;


    }

    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=features&limit='+temp+','+limit+'&format=json', function (json) {
                // Insert rendered template
                temp= limit;
                document.getElementById('features-content').innerHTML = compiledTemplate(json);

                });
};

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="features"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                //myApp.alert('Here comes news page');
                // myApp.alert(localStorage.name);

                getfeatures();
                var loading = false;

                // Attach 'infinite' event handler
                // Attach 'infinite' event handler
                $$('.infinite-scroll').on('infinite', function () {

                                          // Exit, if loading in progress
                                          if (loading) return;

                                          // Set loading flag
                                          loading = true;

                                          // Emulate 1s loading
                                          setTimeout(function () {
                                                     // Reset loading flag
                                                     loading = false;

                                                     getfeatures();

                                                     }, 1000);
                                          });
                });


function getblogs() {
    // Compile and render
    var compiledTemplate = Template7.compile($$("#blogs-template").html());

    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=blogs&format=json', function (json) {

                // Insert rendered template
                document.getElementById('blogs-content').innerHTML = compiledTemplate(json);
                });
};
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="blogs"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                //myApp.alert('Here comes news page');
                getblogs();
                })

$$(document).on('pageInit', function (e) {

                var page = e.detail.page;
                // Code for About page
                if (page.name === 'poll') {



                }});
// Execute to list UrbanDictionary Definitions

$$(document).on('pageInit', function (e) {

                var page = e.detail.page;
                // Code for About page
                if (page.name === 'news-details') {
                //$$(".navbaren").hide();
                $$(".back").show();
                var x = page.query.id;
                var compiledTemplate = Template7.compile($$("#news-details-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=selectarticle&format=json&condition= id='+x, function (json) {

                            // Insert rendered template
                            document.getElementById('content-details').innerHTML = compiledTemplate(json);

                            $$(".desc img").each(function () {
                                                 var x= $$(this).attr("src");
                                                 var n = x.indexOf("http");
                                                 var y = "";
                                                 if(n<0){
                                                 y='http://www.monthlymagazine.com'+x;
                                                 $$(this).attr("src", y)
                                                 }
                                                 else{
                                                 y = x
                                                 $$(this).attr("src", y)
                                                 }
                                                 console.log(y);


                                                 // changing src
                                                 $$(this).attr('data-delaySrc', $$(this).attr("src")); ;// you can use 'data-' for having a valid attribute
                                                 });
                            $$(".desc a").each(function () {

                                               $$(this).attr("class", 'desclink')// changing src
                                               // you can use 'data-' for having a valid attribute
                                               });
                            $$(".desc a").each(function () {

                                               $$(this).attr("class", 'external')// changing src
                                               // you can use 'data-' for having a valid attribute
                                               });


                            if(localStorage.getItem("email") === null)
                            {
                            // myApp.alert('No Web Storage support');
                            $$('#commentbutton').hide();
                            }else{
                            $$('#commentbutton').show();
                            }

                            var srcDesc = "http://monthlymagazine.com/article-desc-"+x+"_";

                            //$$('#Socilalsharing').append('<div class="item-content"><div class="item-media"></div><div class="item-inner" style="text-align: center;"><div class="item-title label" style="width: 20%;" onclick="share(\''+srcDesc+'\')"><i class="fa fa-share-alt-square" style="font-size: 45px;"></i><p><b>share</b></p></div></div></div>');
                            $$('#Socialsharing').append(' <a href="#" onclick="share(\''+srcDesc+'\')" class="link icon-only" style="color:white"><i class="fa fa-share-alt"></i>Share</a>');
                            });
                }
                });

// Execute to list UrbanDictionary Definitions
//
//$$(document).on('pageInit', function (e){
//
//var page = e.detail.page;
//// Code for About page
//	if (page.name === 'news-details') {
//
//		var x = page.query.id;
//		var compiledTemplate = Template7.compile($$("#news-details-template1").html());
//			// Get JSON Data from UrbanDictionary API
//			$$.getJSON ('http://www.monthlymagazine.com/ws.php?type=relatednews&format=json&keywords=loan,bridging&limit='+x, function (json) {
//
//				// Insert rendered template
//				document.getElementById('content-details').innerHTML = compiledTemplate(json);
//
//				$$(".desc img").each(function () {
//						var x= $$(this).attr("src");
//						var y='http://www.monthlymagazine.com'+x;
//						console.log(y);
//						$$(this).attr("src", y)// changing src
//						.attr('data-delaySrc', $$(this).attr("src")); ;// you can use 'data-' for having a valid attribute
//				});
//				if(localStorage.getItem("email") === null)
//				{
//					// myApp.alert('No Web Storage support');
//					$$('#commentpanel').hide();
//				}else{
//					$$('#commentpanel').show();
//				}
//			});
//	}
//});



// Execute to list UrbanDictionary Definitions

$$(document).on('pageInit', function (e) {

                var page = e.detail.page;
                // Code for About page
                if (page.name === 'news-comment') {
                var x = page.query.id;
                $$('#article-id').val(x);
                }
                });

// Execute to list UrbanDictionary Definitions

$$(document).on('pageInit', function (e) {

                var page = e.detail.page;
                // Code for About page
                if (page.name === 'lender-details') {
                var x = page.query.id;
                var compiledTemplate = Template7.compile($$("#lender-details-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=select&format=json&table=lenders&columns=id,name,expertise,fundingLines,fsaRegulated,maxLtv,minLoan,maxLoan,term,geoArea,logo,website&condition=active=1 and id='+x, function (json) {

                            // Insert rendered template
                            document.getElementById('content-details').innerHTML = compiledTemplate(json);

                            });

                }

                });

// Execute to list UrbanDictionary Definitions

$$(document).on('pageInit', function (e) {

                var page = e.detail.page;
                // Code for About page
                if (page.name === 'blogger-details') {
                var x = page.query.id;
                var compiledTemplate = Template7.compile($$("#blogger-details-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=bloggerarticles&format=json&condition=blogger_id='+x, function (json) {

                            // Insert rendered template
                            document.getElementById('blogger-details').innerHTML = compiledTemplate(json);
                            $$(".desc img").each(function () {
                                                 var x= $$(this).attr("src");
                                                 var y='http://www.monthlymagazine.com'+x;
                                                 $$(this).attr("src", y)       // changing src
                                                 .attr('data-delaySrc', $$(this).attr("src")); ;      // you can use 'data-' for having a valid attribute
                                                 });

                            });

                }

                });




// Execute to list UrbanDictionary Definitions

$$(document).on('pageInit', function (e) {

                var page = e.detail.page;
                // Code for About page
                if (page.name === 'blog-details') {
                var x = page.query.id;
                var compiledTemplate = Template7.compile($$("#blog-details-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=select&format=json&table=blogs&columns=id,title,insert_date,content&condition=active=1 and id='+x, function (json) {


                            // Insert rendered template
                            document.getElementById('blog-details').innerHTML = compiledTemplate(json);
                            });

                }

                });

function getpoll() {
    // Compile and render
    var compiledTemplate = Template7.compile($$("#poll-template").html());

    // Get JSON Data from UrbanDictionary API
    $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=poll&format=json', function (json) {

                // Insert rendered template
                document.getElementById('poll-content').innerHTML = compiledTemplate(json);
                //alert ($$('#pollquestion').val());
                $$('#pollquestionplacement').html($$('#pollquestion').val());
                $$('#pollID').val( json['posts']['0']['poll_question_id'] );
                var voteid= json['posts']['0']['poll_question_id'] ;
                if(localStorage.getItem("vote"+voteid)){
                $$('#btn').css("display","none");
                }
                });

};
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="poll"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                //myApp.alert('Here comes news page');
                getpoll();

                })
$$('.page[data-page=Ãƒâ€šÃ¢â‚¬Å“pollÃƒâ€šÃ¢â‚¬Â] li').on('change','input[type=radio]',function(e){
                                            console.log(this.checked, this.value);
                                            })
$$('.indicators').on('click','input[type=radio]',function (e) {

                     var li = $$(this).val();

                     console.log(li);

                     })
function ValidateForm()
{
    var opts = $$('input[name="opt"]');
    var found = false;
    var voteid= $$('#pollquestionId').val();
    //alert(localStorage.getItem("vote"+voteid));
    if(!localStorage.getItem("vote"+voteid))
        for(var i=0;i<opts.length;i++){
            if(opts[i].checked == true)
            {
                var y='#opt'+i;
                var x=$$(y).val();
                found=true;
                //alert(x);
                makeVote(x);
            }

            if(found ==false)
                myApp.alert("Select your vote!",'Attention');
        }
    else{
        myApp.alert("Already Submitted your Vote")
    }
}
function stripslashes(str) {
    //       discuss at: http://phpjs.org/functions/stripslashes/
    //      original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Ates Goral (http://magnetiq.com)
    //      improved by: marrtins
    //      improved by: rezna
    //         fixed by: Mick@el
    //      bugfixed by: Onno Marsman
    //      bugfixed by: Brett Zamir (http://brett-zamir.me)
    //         input by: Rick Waldron
    //         input by: Brant Messenger (http://www.brantmessenger.com/)
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    //        example 1: stripslashes('Kevin\'s code');
    //        returns 1: "Kevin's code"
    //        example 2: stripslashes('Kevin\\\'s code');
    //        returns 2: "Kevin\'s code"

    return (str + '')
    .replace(/\\(.?)/g, function(s, n1) {
             switch (n1) {
             case '\\':
             return '\\';
             case '0':
             return '\u0000';
             case '':
             return '';
             default:
             return n1;
             }
             });
}

function makeVote(x) {
    // Get JSON Data from UrbanDictionary API

    var url = "http://www.monthlymagazine.com/ws.php?type=insert&format=json&table=poll_results&columns=poll_question_id,poll_answer_id&values="+$$('#pollquestionId').val()+","+x;
    $$.getJSON (url, function (json) {
                var voteid= $$('#pollquestionId').val();
                myApp.alert("Thank you for participating in our Poll. Your vote has been successfully cast.",'Success');
                Results();
                mainView.router.loadPage('pollresults.html');
                //alert(x);
                localStorage.setItem("vote"+voteid, "submitted");
                });
}

// Execute to list UrbanDictionary Definitions
/*
 $$(document).on('pageInit', function (e) {

 var page = e.detail.page;

 if (page.name === 'lender-index') {
 var compiledTemplate = Template7.compile($$("#lender-index-template").html());
	// Get JSON Data from UrbanDictionary API
 $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=lenders&format=json', function (json) {


	// Insert rendered template
	document.getElementById('lender-index-content').innerHTML = compiledTemplate(json);
 });

 }

 });*/
$$(document).on('pageInit', function (e) {

                var page = e.detail.page;
                // Code for About page
                if (page.name === 'bridge-doctor') {
                var compiledTemplate = Template7.compile($$("#bridge-doctor-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=bridge-doctor&format=json', function (json) {


                            // Insert rendered template
                            document.getElementById('bridge-doctor-content').innerHTML = compiledTemplate(json);
                            });

                }

                });

$$(document).on('pageInit', function (e) {

                var page = e.detail.page;
                // Code for About page
                if (page.name === 'doctors') {
                var compiledTemplate = Template7.compile($$("#doctors-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=doctors&format=json', function (json) {


                            // Insert rendered template
                            document.getElementById('doctors-content').innerHTML = compiledTemplate(json);
                            });

                }

                });

$$(document).on('pageInit', function (e) {

                var page = e.detail.page;
                // Code for About page
                if (page.name === 'commercial-clinic') {
                var compiledTemplate = Template7.compile($$("#commercial-clinic-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=commercial-clinic&format=json', function (json) {


                            // Insert rendered template
                            document.getElementById('commercial-clinic-content').innerHTML = compiledTemplate(json);
                            });

                }

                });

$$(document).on('pageInit', function (e) {
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'personal-profile') {
                //var compiledTemplate = Template7.compile($$("#bridge-doctor-template").html());
                // Get JSON Data from UrbanDictionary API

                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=select&format=json&table=appcustomers&columns=id,udid,system,s1,s2,s3,s4,s5,s6,s7&condition=udid', function (json) {
                            //myApp.alert(json['posts'][0].propertynews);
                            if(json['posts'][0].bridgingfinance=='false'){$$('#si-bridging-finance').prop('checked',false);}else{$$('#si-bridging-finance').prop('checked',true);}
                            if(json['posts'][0].developmentfinance=='false'){$$('#si-development-finance').prop('checked',false);}else{$$('#si-development-finance').prop('checked',true);}
                            if(json['posts'][0].commercialfinance=='false'){$$('#si-commercial-finance').prop('checked',false);}else{$$('#si-commercial-finance').prop('checked',true);}
                            if(json['posts'][0].propertynews=='false'){$$('#si-property-news').prop('checked',false);}else{$$('#si-property-news').prop('checked',true);}
                            if(json['posts'][0].alternativefinance=='false'){$$('#si-alternative-finance').prop('checked',false);}else{$$('#si-alternative-finance').prop('checked',true);}
                            if(json['posts'][0].bankingnews=='false'){$$('#si-banking-news').prop('checked',false);}else{$$('#si-banking-news').prop('checked',true);}
                            if(json['posts'][0].blogs=='false'){$$('#si-blogs').prop('checked',false);}else{$$('#si-blogs').prop('checked',true);}

                            // Insert rendered template
                            //document.getElementById('bridge-doctor-content').innerHTML = compiledTemplate(json);
                            });
                }

                });
function newsletter(){
    var subscribemail = $("#subscribe-email").val();

 $$.ajax({
            method: 'POST',
            url: 'http://footprintsnatureclub.com/Service/FootprintsService.asmx/SubscribeToNewsletter',
            data: {email:subscribemail},
            success: function(response){
            myApp.alert("Subscribed Successfully","Subscription")
            },
            error: function(response){
            Myapp.alert("please enter valid EmailId");

            }});


}
function signin1() {
    var eurlcheck = " http://www.monthlymagazine.com/ws.php?type=select_one&format=json&table=appcustomers&columns=id&condition=email=%27"+$$('#si-email').val()+"%27";
    $$.getJSON (eurlcheck, function (json) {

                if(json['posts'][0]==0){

                var url = "http://www.monthlymagazine.com/ws.php?type=insert&format=json&table=appcustomers&columns=name,email,password,notification,newsletter&values=%27"+$$('#si-name').val()+"%27,%27"+$$('#si-email').val()+"%27,%27"+$$('#si-password').val()+"%27,%27"+$$('#si-notification').prop('checked')+"%27,%27"+$$('#si-newsletter').prop('checked')+"%27";
                {$$.getJSON (url, function (json) {
                             if(typeof(Storage) !== "undefined") {
                             // Code for localStorage/sessionStorage.
                             //myApp.alert('storage support');
                             localStorage.email=$$('#si-email').val();
                             } else {
                             // Sorry! No Web Storage support..
                             myApp.alert('No Web Storage support','Attention');
                             }
                             //myApp.alert(localStorage.email);
                             $$('#signupmenu').show();
                             $$('#myprofilemenu').hide();
                             $$('#commentbutton').hide();

                             });

                var url1 = "http://www.monthlymagazine.com/ws.php?type=emailverification&format=json&email="+$$('#si-email').val()+"&name="+$$('#si-name').val();
                $$.getJSON (url1, function (json) {
                            myApp.alert("An email has been send to "+$$('#si-email').val()+" for verification ",'Thank you for signing up to the B&C News app');
                            document.activeElement.blur();
                            mainView.router.loadPage('home_news1.html');

                            });}


                }
                else{
                myApp.alert("Your email address already exist in our database please try to login first","B&C")

                }
                });
    // Get JSON Data from UrbanDictionary API

}
function gethikinghistory(){
    $$("#Hhistory").html('');
    var JSONObject = localStorage.getItem('testObject');
    JSONObject=JSON.parse(JSONObject)
    console.log(JSONObject);
    var usernamez = JSONObject["Username"];
    $$.ajax({
            method: 'POST',
            url: 'http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetMemberEvents',
            data: {username:usernamez },
            success: function(response){
            var JSONObject1 = JSON.parse(response);
            console.log(JSONObject1);
            $.each(JSONObject1, function (index, value) {
                   var il = '<li class="item-content" id="li_'+index+'">'+
                   ' <div class="item-inner"><a href="event-desc.htm?id='+value['Event']['Id']+'" style="color:#000">'+value['Event']['Title']+
                   '</a></div></li>';
                   $$("#Hhistory").append(il);


                   console.log(value['Event']['Title']);
                   });
            }
            });

}
$$('#tab2').on('tab:show', function () {
               gethikinghistory()
               });
function Logout(){
    mainView.router.loadPage('Home.htm');
    localStorage.removeItem("testObject");
    $$('#login').show();
    $$('#myprofile').hide();
    $$('#headerlogin').show();
    $$('#headermyprofile').hide();

}
function updatememberProfile(){
    $$('#name').val();
    $$('#BloodType').val();
    $$('#Nationality').val();
    $$('#Profession').val();
    $$('#DateOfBirth').val();
    $$('#MobileNo').val();
    $$('#NumberOfFreeTrips').val();
    $$('#CurrentPoints').val();
    $$('#pusername').val();
    $$('#ppassword').val();
    $$.ajax({
            method: 'POST',
            url: 'http://footprintsnatureclub.com/Service/FootprintsService.asmx/LoginMember',
            data: {username: username, password : password},
            success: function(response){



            }
            });


}

function updateprofile(){
    var JSONObject = localStorage.getItem('testObject');
    JSONObject=JSON.parse(JSONObject)
    var   firstname = JSONObject["FirstName"]
    var Lastname  = JSONObject["LastName"]
    $$('#BloodType').val();
    $$('#Nationality').val();
    $$('#Profession').val();
    $$('#DateOfBirth').val();
    $$('#MobileNo').val();
    $$('#NumberOfFreeTrips').val();
    $$('#CurrentPoints').val();
    $$('#pusername').val();
    $$('#ppassword').val();
    if($$('#ppassword').val() !=""&& $$('#pusername').val() !=""){
        $.ajax({
               method: 'POST',
               url: 'http://footprintsnatureclub.com/Service/FootprintsService.asmx/UpdateMemberProfile',
               data: {username:$$('#pusername').val(), newPassword: $$('#ppassword').val(),email:JSONObject["Email"],lastname:Lastname,fathername:JSONObject["FatherName"],dateOfBirth: $$('#DateOfBirth').val(),bloodtype: $$('#BloodType').val(),address:JSONObject["Address"],mobileNo:$$('#MobileNo').val(),profession: $$('#Profession').val(),telephone:$$('#MobileNo').val(),nationality:$$('#Nationality').val()
               },
               success: function(response){
               myApp.alert("profile Updated");
                $$.ajax({
                           method: 'POST',
                           url: 'http://footprintsnatureclub.com/Service/FootprintsService.asmx/LoginMember',
                           data: {username: $$('#pusername').val(), password : $$('#ppassword').val()},
                           success: function(response){
                           var JSONObject = JSON.parse(response);
                           console.log(JSONObject);
                           if(JSONObject["Id"] != -1){
                           // alert( "Data Loaded: " + datatogetback);
                           $$('#login').hide();
                           $$('#myprofile').show();
                           $$('#headerlogin').hide();
                           $$('#headermyprofile').show();
                           // alert(datatogetback['Username'])
                           // Dump all data of the Object in the console
                           // alert(JSONObject["Email"]);
                           localStorage.removeItem("testObject");
                           localStorage.setItem('testObject',JSON.stringify(JSONObject));
                           var name = JSONObject["FirstName"] +" "+JSONObject["LastName"]
                           //mainView.router.loadPage('myprofile.html');
                           myApp.showPreloader();
                           setTimeout(function(){

                                       $$('#loggedinas').html(JSONObject["FirstName"]);

                                      $$('#name').val(name);
                                      $$('#BloodType').val(JSONObject["BloodType"]);
                                      $$('#Nationality').val(JSONObject["Nationality"]);
                                      $$('#Profession').val(JSONObject["Profession"]);
                                      $$('#DateOfBirth').val(JSONObject["DateOfBirth"]);
                                      $$('#MobileNo').val(JSONObject["MobileNo"]);
                                      $$('#NumberOfFreeTrips').val(JSONObject["NumberOfFreeTrips"]);
                                      $$('#CurrentPoints').val(JSONObject["CurrentPoints"]);
                                      $$('#pusername').val(JSONObject["Username"]);
                                      $$('#ppassword').val();
                                      myApp.hidePreloader();
                                      },3000);
                           }
                           else{
                           myApp.alert("Details not updated","Update Error");

                           }



                           },
                           error : function(Error){
                           myApp.alert("Network Error","Update Problem")}
                           });
              //Logout()
               }});
    }
    else {
        myApp.alert("Please enter UserName and Password to update ");

    }


}


function loginsubmit()
{
    var username = $$('#username').val();
    var password = $$('#password').val();


    $$.ajax({
            method: 'POST',
            url: 'http://footprintsnatureclub.com/Service/FootprintsService.asmx/LoginMember',
            data: {username: username, password : password},
            success: function(response){
            var JSONObject = JSON.parse(response);
            console.log(JSONObject);
            if(JSONObject["Id"] != -1){
            // alert( "Data Loaded: " + datatogetback);
            $$('#login').hide();
            $$('#myprofile').show();
            $$('#headerlogin').hide();
            $$('#headermyprofile').show();
            // alert(datatogetback['Username'])
            // Dump all data of the Object in the console
            // alert(JSONObject["Email"]);
            localStorage.setItem('testObject',JSON.stringify(JSONObject));
            var name = JSONObject["FirstName"] +" "+JSONObject["LastName"]
            mainView.router.loadPage('myprofile.html');
            myApp.showPreloader();
            setTimeout(function(){

                        $$('#loggedinas').html(JSONObject["FirstName"]);

                       $$('#name').val(name);
                       $$('#BloodType').val(JSONObject["BloodType"]);
                       $$('#Nationality').val(JSONObject["Nationality"]);
                       $$('#Profession').val(JSONObject["Profession"]);
                       $$('#DateOfBirth').val(JSONObject["DateOfBirth"]);
                       $$('#MobileNo').val(JSONObject["MobileNo"]);
                       $$('#NumberOfFreeTrips').val(JSONObject["NumberOfFreeTrips"]);
                       $$('#CurrentPoints').val(JSONObject["CurrentPoints"]);
                       $$('#pusername').val(JSONObject["Username"]);
                       $$('#ppassword').val();
                       myApp.hidePreloader();
                       },3000);
            }
            else{
            myApp.alert("please make sure of your credentials","Login Problem");
            
            }
            
            
            
            },
            error : function(Error){
            myApp.alert("please make sure of your credentials","Login Problem")}
            });
    
    /*var url = "http://www.monthlymagazine.com/ws.php?type=login&format=json&table=appcustomers&condition=email='"+email+"' and password='"+password+"' and active=1";
     $$.getJSON (url, function (json) {
     if(json['posts']['0']==0){
     //myApp.alert("invalid login");
     myApp.alert('Username or password are incorrect',"Invalid Login");
     
     }
     else{
     if( json['posts']['0']['id'] ){
     var storedData = myApp.formStoreData('logged_userId', {
     'userId': json['posts']['0']['id']
     });
     
     
     storedData1 = myApp.formGetData('logged_userId');
     storedData1['userId']
     //myApp.alert("Login Sucessfully",'Success');
     $$('#home_news').show();
     $$('#myprofilemenu').show();
     $$('#logout').show();
     $$('#login').hide();
     $$('#whylogin').hide();
     
     mainView.router.loadPage('news.html');
     }else{
     $$('#email_error').html('Enter Valid Details');
     return false;
     }
     }
     });
     */
}
function getmyprofiledetails(){
    
    var JSONObject = localStorage.getItem('testObject');
    JSONObject=JSON.parse(JSONObject)
    console.log(JSONObject);
    myApp.showPreloader();
    setTimeout(function(){
               $$('#name').val(JSONObject["FirstName"]);
               $$('#BloodType').val(JSONObject["BloodType"]);
               $$('#Nationality').val(JSONObject["Nationality"]);
               $$('#Profession').val(JSONObject["Profession"]);
               $$('#DateOfBirth').val(JSONObject["DateOfBirth"]);
               $$('#MobileNo').val(JSONObject["MobileNo"]);
               $$('#NumberOfFreeTrips').val(JSONObject["NumberOfFreeTrips"]);
               $$('#CurrentPoints').val(JSONObject["CurrentPoints"]);
               $$('#pusername').val(JSONObject["Username"]);
               $$('#ppassword').val();
               myApp.hidePreloader();
               },4000);
    
}
function myprofilesubmit() {
    // Get JSON Data from UrbanDictionary API
    var url = "http://www.monthlymagazine.com/ws.php?type=insert&format=json&table=appcustomers&columns=udid,system,s1,s2,s3,s4,s5,s6,s7&values=%27"+device.uuid+"%27,%27"+device.platform+"%27,'"+$$('#s1').prop('checked')+"','"+$$('#s2').prop('checked')+"','"+$$('#s3').prop('checked')+"','"+$$('#s4').prop('checked')+"','"+$$('#s5').prop('checked')+"','"+$$('#s6').prop('checked')+"','"+$$('#s7').prop('checked')+"'";
    $$.getJSON (url, function (json) {
                
                //myApp.alert(localStorage.email);
                
                myApp.alert("Your profile has been updated",'Success');
                mainView.router.loadPage('home_news.html')
                
                });
};

function submitbdform() {
    // Get JSON Data from UrbanDictionary API
    var url = "http://www.monthlymagazine.com/ws.php?type=insert&format=json&table=bridge_doctors&columns=name,email,phone,question&values='"+$$('#bd-name').val()+"','"+$$('#bd-email').val()+"','"+$$('#bd-phone').val()+"','"+$$('#bd-question').val()+"'";
    $$.getJSON (url, function (json) {
                myApp.alert("Thank you for your question. One of the panel will be in touch shortly and your question and answer will be published on the app within a week.",'Success');
                mainView.router.loadPage('bridge-doctor.html')
                //alert(x);
                
                });
};

function submitcommentform() {
    // Get JSON Data from UrbanDictionary API
    var url = "http://www.monthlymagazine.com/ws.php?type=insert&format=json&table=comments&columns=name,email,comment,articleid,type&values='"+$$('#comment-name').val()+"','"+$$('#comment-email').val()+"','"+$$('#comment-question').val()+"','"+$$('#article-id').val()+"','article'";
    $$.getJSON (url, function (json) {
                myApp.alert("Thank you for submitting your comment which has been successfully sent to the site administrators. All comments are subject to potential moderation and libellous and abusive comments are not allowed.",'Success');
                mainView.router.loadPage('home_news.html')
                //alert(x);
                
                });
};


function submitcmform() {
    // Get JSON Data from UrbanDictionary API
    var url = "http://www.monthlymagazine.com/ws.php?type=insert&format=json&table=commercial_clinic&columns=name,email,phone,question&values='"+$$('#cm-name').val()+"','"+$$('#cm-email').val()+"','"+$$('#cm-phone').val()+"','"+$$('#cm-question').val()+"'";
    $$.getJSON (url, function (json) {
                myApp.alert("Thank you for your enquiry which has been successfully sent. A member of our team will be contact with you shortly.",'success');
                mainView.router.loadPage('commercial-clinic.html')
                //alert(x);
                
                });
};
$$(document).on('pageInit', function (e) {
                
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'contactus') {
                var compiledTemplate = Template7.compile($$("#contactus-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('', function (json) {
                            
                            
                            // Insert rendered template
                            document.getElementById('contactus-content').innerHTML = compiledTemplate(json);
                            
                            $$(".static-content img").each(function () {
                                                           var x= $$(this).attr("src");
                                                           var y='http://www.monthlymagazine.com/'+x;
                                                           $$(this).attr("src", y)       // changing src
                                                           .attr('data-delaySrc', $$(this).attr("src")); ;      // you can use 'data-' for having a valid attribute
                                                           });
                            
                            
                            });
                
                }
                
                });

function callSomeone(mobileNumber){
    
    // alert(parseInt(mobileNumber));
    // console.log(mobileNumber);
    window.open('tel:'+mobileNumber, '_system');
    // navigator.app.loadUrl('tel:+919999999999', { openExternal:true });
    
}

$$(document).on('pageInit', function (e) {
                
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'contactusar') {
                var compiledTemplate = Template7.compile($$("#contactusar-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=contactusar&format=json', function (json) {
                            
                            
                            // Insert rendered template
                            document.getElementById('contactusar-content').innerHTML = compiledTemplate(json);
                            
                            $$(".static-content img").each(function () {
                                                           var x= $$(this).attr("src");
                                                           var y='http://www.monthlymagazine.com/'+x;
                                                           $$(this).attr("src", y)       // changing src
                                                           .attr('data-delaySrc', $$(this).attr("src")); ;      // you can use 'data-' for having a valid attribute
                                                           });
                            
                            
                            });
                
                }
                
                });

function showtext(textid,hid){
    var x=$$('#'+textid).text();
    var y=$$('#'+hid).text();
    myApp.alert(x,y);
    
    
}
$$(document).on('pageInit', function (e) {
                
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'hikingtips') {
                var compiledTemplate = Template7.compile($$("#hikingtips-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://footprintsnatureclub.com/Service/WebService.asmx/GetHikingTips', function (json) {
                            
                            // Insert rendered template
                            document.getElementById('hikingtips-content').innerHTML = compiledTemplate(json);
                            
                            });
                
                }
                
                });



$$(document).on('pageInit', function (e) {
                
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'howtoprepare') {
                myApp.closePanel();
                
/*                var compiledTemplate = Template7.compile($$("#howtoprepare-template").html());
 */                // Get JSON Data from UrbanDictionary API
                /* $$.getJSON ('http://footprintsnatureclub.com/Service/WebService.asmx/GetHowToPrepare', function (json) {
                 
                 // Insert rendered template
                 document.getElementById('howtoprepare-content').innerHTML = compiledTemplate(json);
                 
                 });
                 */
                }
                
                });


$$(document).on('pageInit', function (e) {
                
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'Why-Footprints') {
                var compiledTemplate = Template7.compile($$("#Why-Footprints-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://footprintsnatureclub.com/Service/WebService.asmx/GetWhyFootprints', function (json) {
                            
                            // Insert rendered template
                            document.getElementById('Why-Footprints-content').innerHTML = compiledTemplate(json);
                            
                            
                            
                            });
                
                }
                
                });

$$(document).on('pageInit', function (e) {
                
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'mission') {
                var compiledTemplate = Template7.compile($$("#mission-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://footprintsnatureclub.com/Service/WebService.asmx/GetOurMission', function (json) {
                            
                            // Insert rendered template
                            document.getElementById('mission-content').innerHTML = compiledTemplate(json);
                            
                            
                            
                            });
                
                }
                
                });

$$(document).on('pageInit', function (e) {
                
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'activities') {
                var compiledTemplate = Template7.compile($$("#activities-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://footprintsnatureclub.com/Service/WebService.asmx/GetOurActivities', function (json) {
                            
                            // Insert rendered template
                            document.getElementById('activities-content').innerHTML = compiledTemplate(json);
                            
                            });
                
                }
                
                });




$$(document).on('pageInit', function (e) {
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'home') {
                
                // 1 Slide Per View, 50px Between
                
                
                }
                
                });

$$(document).on('pageInit', function (e) {
                
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'aboutusar') {
                var compiledTemplate = Template7.compile($$("#aboutusar-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=aboutusar&format=json', function (json) {
                            
                            
                            // Insert rendered template
                            document.getElementById('aboutusar-content').innerHTML = compiledTemplate(json);
                            
                            $$(".static-content img").each(function () {
                                                           var x= $$(this).attr("src");
                                                           var y='http://www.monthlymagazine.com/'+x;
                                                           $$(this).attr("src", y)       // changing src
                                                           .attr('data-delaySrc', $$(this).attr("src")); ;      // you can use 'data-' for having a valid attribute
                                                           });
                            
                            
                            });
                
                }
                
                });


$$(document).on('pageInit', function (e) {
                
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'subscribe') {
                var compiledTemplate = Template7.compile($$("#subscribe-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=subscribe&format=json', function (json) {
                            
                            
                            // Insert rendered template
                            document.getElementById('subscribe-content').innerHTML = compiledTemplate(json);
                            
                            $$(".static-content img").each(function () {
                                                           var x= $$(this).attr("src");
                                                           var y='http://www.monthlymagazine.com/'+x;
                                                           $$(this).attr("src", y)       // changing src
                                                           .attr('data-delaySrc', $$(this).attr("src")); ;      // you can use 'data-' for having a valid attribute
                                                           });
                            
                            
                            });
                
                }
                
                });

$$(document).on('pageInit', function (e) {
                
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'subscribear') {
                var compiledTemplate = Template7.compile($$("#subscribear-template").html());
                // Get JSON Data from UrbanDictionary API
                $$.getJSON ('http://www.monthlymagazine.com/ws.php?type=subscribear&format=json', function (json) {
                            
                            
                            // Insert rendered template
                            document.getElementById('subscribear-content').innerHTML = compiledTemplate(json);
                            
                            $$(".static-content img").each(function () {
                                                           var x= $$(this).attr("src");
                                                           var y='http://www.monthlymagazine.com/'+x;
                                                           $$(this).attr("src", y)       // changing src
                                                           .attr('data-delaySrc', $$(this).attr("src")); ;      // you can use 'data-' for having a valid attribute
                                                           });
                            
                            
                            });
                
                }
                
                });



//$$('.input.switch-settings').prop('checked', true);
function datesplit(str)
{
    var res = str.split(" ");
    var d=res.split("-");
    var x=d[2]+" "+d[1]+" "+d[0];
    
    return x;
}
var mainView = myApp.addView('.view-main', {
                             dynamicNavbar: false
                             });
// setTimeout(function(){mainView.router.loadPage('home_news.html')},1000);

function searchResults(){
    var popupHTML = '<div class="popup popup1">'+
    ' <p style=" position: absolute;right: 0;top: -17px;"><a href="#" class="close-popup" style="color:black;"><i class="fa fa-times-circle fa-2x"></i></a></p>'+
    
    '<div class="page"><form class="searchbar"><div class="searchbar-input">'+
    ' <input type="search" placeholder="Search">'+
    ' <a href="#" class="searchbar-clear"></a>'+
    '</div>'+
    '<a href="#" class="searchbar-cancel">Cancel</a>'+
    '</form>'+
    
    ' <div class="searchbar-overlay"></div>'+
    
    '<div class="page-content">'+
    '<div class="content-block searchbar-not-found">'+
    'Nothing found'+
    ' </div> <div class="list-block list-block-search searchbar-found">'+
    '<ul>  <li class="item-content"><div class="item-inner"><div class="item-title">Audi</div></div></li><li class="item-content"><div class="item-inner"><div class="item-title">Audi 2</div></div></li><li class="item-content"><div class="item-inner"><div class="item-title">Audi 1</div></div></li></ul>'+
    
    '</div>'+
    '</div>'+
    '</div></div>';
    myApp.popup(popupHTML);
    
}
var compiledTemplatesearch1;
$$(document).on('pageInit', function (e) {
                
                var page = e.detail.page;
                // Code for About page
                if (page.name === 'search') {
                compiledTemplatesearch1 = Template7.compile($$("#news-template").html());
                
                }});
function getSearchResults(){
    var $$ =Dom7;
    var Search_value = document.getElementById('search_value').value;
    // var url="http://www.monthlymagazine.com/ws.php?type=search&format=json&condition=keyword="+value;
    
    //var compiledTemplate = Template7.compile($$("#news-template").html());
    
    // Get JSON Data from UrbanDictionary API
    $$.getJSON ("http://www.monthlymagazine.com/ws.php?type=search&format=json&keyword="+Search_value, function (json) {
                console.log("entered");
                // Insert rendered template
                document.getElementById('content-wrap1').innerHTML = compiledTemplatesearch1(json);
                });
}

// Get weather by using coordinates
function selectcity(){
    if($( "#sc option:selected" ).text() == "Cedars"){
        var queryString ='http://api.apixu.com/v1/forecast.json?key=ad5b8ddd4c8a49d2849100909172801&days=4&q=34.247100, 36.049695'
        $$(".tempz").html('');
        $.getJSON(queryString, function (results) {
                  var temperat = results.current.temp_c;
                  var Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
                  '<table style="width:100%;font-size: 3vw">'+
                  '<tr>'+
                  '<td>'+
                  '<p><span id="temp'+i+'">Temperature'+temperat+'</span>&#8451;</p>'+
                  '<p id="description'+i+'">City :Cedars</p>'+
                  '<p id="wind'+i+'">Wind:'+results.current.wind_kph+'</p>'+
                  '<p id="humidity'+i+'">Humidity:'+results.current.humidity+'</p>'+
                  '</td>'+
                  '<td>'+
                  '<img src="http:'+results.current.condition.icon+'" width=50%><br><span>'+results.current.condition.text+'</span>'+
                  '</td>'+
                  '</tr>'+
                  '</table>'+
                  '</div>';
                  //$$('div .tempz').append(Dhtml)
                  Dhtml  = "";
                  var ar = [];
                  ar = results.forecast.forecastday
                  var forcastlength = 4;
                  for(var i = 0 ; i< 4 ; i++){
                  
                  Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
                  '<table style="width:100%;font-size: 3vw">'+
                  '<tr>'+
                  '<td>'+
                  '<p id="date'+i+'">Date :'+ar[i].date+'</p>'+
                  '<p><span id="temp'+i+'">Max|MinTemperature :'+ar[i].day.maxtemp_c+' | '+ar[i].day.mintemp_c+'</span>&#8451;</p>'+
                  
                  '<p id="wind_'+i+'">Wind:'+ar[i].day.maxwind_kph+'</p>'+
                  '<p id="humidity'+i+'">Humidity:'+ar[i].day.avghumidity+'</p>'+
                  '</td>'+
                  '<td>'+
                  '<img src="http:'+ar[i].day.condition.icon+'" width=50%><br><span>'+ar[i].day.condition.text+'</span>'+
                  '</td>'+
                  '</tr>'+
                  '</table>'+
                  '</div>';
                  $$('div .tempz').append(Dhtml)
                  
                  }
                  });
        
    }
    else if($( "#sc option:selected" ).text() == "Ehden Town"){
        var queryString ='http://api.apixu.com/v1/forecast.json?key=ad5b8ddd4c8a49d2849100909172801&days=4&q=34.311904, 35.987902'
        $$(".tempz").html('');
        $.getJSON(queryString, function (results) {
                  var temperat = results.current.temp_c;
                  var Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
                  '<table style="width:100%;font-size: 3vw">'+
                  '<tr>'+
                  '<td>'+
                  '<p><span id="temp'+i+'">Temperature'+temperat+'</span>&#8451;</p>'+
                  '<p id="description'+i+'">City :Ehden Town</p>'+
                  '<p id="wind'+i+'">Wind:'+results.current.wind_kph+'</p>'+
                  '<p id="humidity'+i+'">Humidity:'+results.current.humidity+'</p>'+
                  
                  '</td>'+
                  '<td>'+
                  '<img src="http:'+results.current.condition.icon+'" width=50%><br><span>'+results.current.condition.text+'</span>'+
                  '</td>'+
                  '</tr>'+
                  '</table>'+
                  '</div>';
                  // $$('div .tempz').append(Dhtml)
                  Dhtml ="";
                  var ar = [];
                  ar = results.forecast.forecastday
                  var forcastlength = 4;
                  for(var i = 0 ; i< 4 ; i++){
                  
                  Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
                  '<table style="width:100%;font-size: 3vw">'+
                  '<tr>'+
                  '<td>'+
                  '<p id="date'+i+'">Date :'+ar[i].date+'</p>'+
                  '<p><span id="temp'+i+'">Max|MinTemperature :'+ar[i].day.maxtemp_c+' | '+ar[i].day.mintemp_c+'</span>&#8451;</p>'+
                  
                  '<p id="wind_'+i+'">Wind:'+ar[i].day.maxwind_kph+'</p>'+
                  '<p id="humidity'+i+'">Humidity:'+ar[i].day.avghumidity+'</p>'+
                  '</td>'+
                  '<td>'+
                  '<img src="http:'+ar[i].day.condition.icon+'" width=50%><br><span>'+ar[i].day.condition.text+'</span>'+
                  '</td>'+
                  '</tr>'+
                  '</table>'+
                  '</div>';
                  $$('div .tempz').append(Dhtml)
                  
                  }
                  });
        
        
    }
    else if($( "#sc option:selected" ).text() == "Laqlouq"){
        var queryString ='http://api.apixu.com/v1/forecast.json?key=ad5b8ddd4c8a49d2849100909172801&days=4&q=34.132890, 35.865626'
        $$(".tempz").html('');
        $.getJSON(queryString, function (results) {
                  var temperat = results.current.temp_c;
                  var Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
                  '<table style="width:100%;font-size: 3vw">'+
                  '<tr>'+
                  '<td>'+
                  '<p><span id="temp'+i+'">Temperature'+temperat+'</span>&#8451;</p>'+
                  '<p id="description'+i+'">City :Laqlouq</p>'+
                  '<p id="wind'+i+'">Wind:'+results.current.wind_kph+'</p>'+
                  '<p id="humidity'+i+'">Humidity:'+results.current.humidity+'</p>'+
                  '</td>'+
                  '<td>'+
                  '<img src="http:'+results.current.condition.icon+'" width=50%><br><span>'+results.current.condition.text+'</span>'+
                  '</td>'+
                  '</tr>'+
                  '</table>'+
                  '</div>';
                  Dhtml =  "";
                  //$$('div .tempz').append(Dhtml)
                  var ar = [];
                  ar = results.forecast.forecastday
                  var forcastlength = 4;
                  for(var i = 0 ; i< 4 ; i++){
                  
                  Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
                  '<table style="width:100%;font-size: 3vw">'+
                  '<tr>'+
                  '<td>'+
                  '<p id="date'+i+'">Date:'+ar[i].date+'</p>'+
                  '<p><span id="temp'+i+'">Max|MinTemperature :'+ar[i].day.maxtemp_c+' | '+ar[i].day.mintemp_c+'</span>&#8451;</p>'+
                  
                  '<p id="wind_'+i+'">Wind:'+ar[i].day.maxwind_kph+'</p>'+
                  '<p id="humidity'+i+'">Humidity:'+ar[i].day.avghumidity+'</p>'+
                  '</td>'+
                  '<td>'+
                  '<img src="http:'+ar[i].day.condition.icon+'" width=50%><br><span>'+ar[i].day.condition.text+'</span>'+
                  '</td>'+
                  '</tr>'+
                  '</table>'+
                  '</div>';
                  $$('div .tempz').append(Dhtml)
                  
                  }
                  });
        
    }
    else if($( "#sc option:selected" ).text() == "Beirut"){
        var queryString ='http://api.apixu.com/v1/forecast.json?key=ad5b8ddd4c8a49d2849100909172801&days=4&q=33.892911,%2035.501629'
        $$(".tempz").html('');
        $.getJSON(queryString, function (results) {
                  var temperat = results.current.temp_c;
                  var Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
                  '<table style="width:100%;font-size: 3vw">'+
                  '<tr>'+
                  '<td>'+
                  
                  '<p><span id="temp'+i+'">Temperature'+temperat+'</span>&#8451;</p>'+
                  '<p id="description'+i+'">City :Beirut</p>'+
                  '<p id="wind'+i+'">Wind:'+results.current.wind_kph+'</p>'+
                  '<p id="humidity'+i+'">Humidity:'+results.current.humidity+'</p>'+
                  '</td>'+
                  '<td>'+
                  '<img src="http:'+results.current.condition.icon+'" width=50%><br><span>'+results.current.condition.text+'</span>'+
                  '</td>'+
                  '</tr>'+
                  '</table>'+
                  '</div>';
                  // $$('div .tempz').append(Dhtml)
                  Dhtml ="";
                  var ar = [];
                  ar = results.forecast.forecastday
                  var forcastlength = 4;
                  for(var i = 0 ; i< 4 ; i++){
                  
                  Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
                  '<table style="width:100%;font-size: 3vw">'+
                  '<tr>'+
                  '<td>'+
                  '<p id="date'+i+'">Date :'+ar[i].date+'</p>'+
                  '<p><span id="temp'+i+'">Max|MinTemperature :'+ar[i].day.maxtemp_c+' | '+ar[i].day.mintemp_c+'</span>&#8451;</p>'+
                  
                  '<p id="wind_'+i+'">Wind:'+ar[i].day.maxwind_kph+'</p>'+
                  '<p id="humidity'+i+'">Humidity:'+ar[i].day.avghumidity+'</p>'+
                  '</td>'+
                  '<td>'+
                  '<img src="http:'+ar[i].day.condition.icon+'" width=50%><br><span>'+ar[i].day.condition.text+'</span>'+
                  '</td>'+
                  '</tr>'+
                  '</table>'+
                  '</div>';
                  $$('div .tempz').append(Dhtml)
                  
                  }
                  //alert(ar);
                  });
    }
    
    
    
    
}

function getWeathers() {
    
    // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
    // var OpenWeatherAppKey = "65e7b82c18feb1a918b8491f1f3a91b0";
    var i = 0;
    var  queryString
    var htz = "";
    /*   var arr = ['Beirut','Arez','Ehden','Laqlouq']
     var eventz = [];
     */
    
    var queryString ='http://api.apixu.com/v1/forecast.json?key=ad5b8ddd4c8a49d2849100909172801&days=4&q=33.892911,%2035.501629'
    $.getJSON(queryString, function (results) {
              
              var temperat = results.current.temp_c
              
              
              var Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
              '<table style="width:100%;font-size: 3vw">'+
              '<tr>'+
              '<td>'+
              '<p><span id="temp'+i+'">Temperature'+temperat+'</span>&#8451;</p>'+
              '<p id="description'+i+'">City :Beirut</p>'+
              '<p id="wind'+i+'">Wind:'+results.current.wind_kph+'</p>'+
              '<p id="humidity'+i+'">Humidity:'+results.current.humidity+'</p>'+
              '</td>'+
              '<td>'+
              '<img src="http:'+results.current.condition.icon+'" width=50%><br><span>'+results.current.condition.text+'</span>'+
              '</td>'+
              '</tr>'+
              '</table>'+
              '</div>';
              $$('div .tempz').append(Dhtml)
              
              
              
              });
    
    var queryString ='http://api.apixu.com/v1/forecast.json?key=ad5b8ddd4c8a49d2849100909172801&days=4&q=34.132890, 35.865626'
    $.getJSON(queryString, function (results) {
              
              var temperat = results.current.temp_c
              
              
              var Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
              '<table style="width:100%;font-size: 3vw">'+
              '<tr>'+
              '<td>'+
              '<p><span id="temp'+i+'">Temperature'+temperat+'</span>&#8451;</p>'+
              '<p id="description'+i+'">City :Laqlouq</p>'+
              '<p id="wind'+i+'">Wind:'+results.current.wind_kph+'</p>'+
              '<p id="humidity'+i+'">Humidity:'+results.current.humidity+'</p>'+
              '</td>'+
              '<td>'+
              '<img src="http:'+results.current.condition.icon+'" width=50%><br><span>'+results.current.condition.text+'</span>'+
              '</td>'+
              '</tr>'+
              '</table>'+
              '</div>';
              $$('div .tempz').append(Dhtml)
              
              
              
              });
    var queryString ='http://api.apixu.com/v1/current.json?key=ad5b8ddd4c8a49d2849100909172801&q=34.247100, 36.049695'
    $.getJSON(queryString, function (results) {
              
              var temperat = results.current.temp_c
              
              
              var Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
              '<table style="width:100%;font-size: 3vw">'+
              '<tr>'+
              '<td>'+
              '<p><span id="temp'+i+'">Temperature'+temperat+'</span>&#8451;</p>'+
              '<p id="description'+i+'">City :Cedars</p>'+
              '<p id="wind'+i+'">Wind:'+results.current.wind_kph+'</p>'+
              '<p id="humidity'+i+'">Humidity:'+results.current.humidity+'</p>'+
              '</td>'+
              '<td>'+
              '<img src="http:'+results.current.condition.icon+'" width=50%><br><span>'+results.current.condition.text+'</span>'+
              '</td>'+
              '</tr>'+
              '</table>'+
              '</div>';
              $$('div .tempz').append(Dhtml)
              
              
              
              });
    var queryString ='http://api.apixu.com/v1/current.json?key=ad5b8ddd4c8a49d2849100909172801&q=34.311904, 35.987902'
    $.getJSON(queryString, function (results) {
              
              var temperat = results.current.temp_c
              
              
              var Dhtml='<div  style="padding:0 10px;background-color:#fbec36;border-radius:10px;margin:10px;box-shadow: 1px 3px 5px #888;">'+
              '<table style="width:100%;font-size: 3vw">'+
              '<tr>'+
              '<td>'+
              '<p><span id="temp'+i+'">Temperature'+temperat+'</span>&#8451;</p>'+
              '<p id="description'+i+'">City :Ehden</p>'+
              '<p id="wind'+i+'">Wind:'+results.current.wind_kph+'</p>'+
              '<p id="humidity'+i+'">Humidity:'+results.current.humidity+'</p>'+
              '</td>'+
              '<td>'+
              '<img src="http:'+results.current.condition.icon+'" width=50%><br><span>'+results.current.condition.text+'</span>'+
              '</td>'+
              '</tr>'+
              '</table>'+
              '</div>';
              $$('div .tempz').append(Dhtml)
              
              
              
              });
    
    
    
    
}



// Error callback

var x = 0;
function calendarA()
{
    var eventbit =0;
    var Clength = 0;
    var eventz = [];
    var eventx
    myApp.showPreloader();
    // var storedData1 = myApp.formGetData('logged_userId');
    $.getJSON( 'http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetCalendarOfEvents', function( data ) {
              var i = 0;
              Clength = data.length ;
              // console.log( data.length );
              $$.each(data, function(key,value) {
                      
                      //alert(value['EventDate']);
                      var str = value['EventDate'];
                      var day =str.slice(0, 2);
                      var month = str.slice(3,5)
                      var year = str.slice(6,10)
                      var dateev = year+"-"+month+"-"+day;
                      console.log(dateev);
                      eventz.push({"start":dateev,"title":value['Title'],"Id":value['Id']})
                      });
              
              }).done(function() {
                      console.log(eventz)
                      if (Clength>0) {
                      myApp.hidePreloader();
                      $('#CalendarPlace_event').fullCalendar({
                                                             header: {
                                                             left: 'prev',
                                                             center: 'title',
                                                             right: 'next'
                                                             },
                                                             editable: false,
                                                             events:eventz,
                                                             eventClick: function(event, jsEvent, view)
                                                             {
                                                             //alert(event.Id);
                                                             x = event.Id;
                                                             mainView.router.loadPage('event-desc.htm?id='+x);
                                                             var compiledTemplate = Template7.compile($$("#event-desc-template").html());
                                                             
                                                             //alert(x);
                                                             // Get JSON Data from UrbanDictionary API
                                                             $$.getJSON ('http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetEventDetails?id='+x, function (json) {
                                                                         //alert(x);
                                                                         // Insert rendered template
                                                                         document.getElementById('event-desc-content').innerHTML = compiledTemplate(json);
                                                                         });
                                                             var compiledTemplate1 = Template7.compile($$("#event-banner-template").html());
                                                             // var x = page.query.id;
                                                             // Get JSON Data from UrbanDictionary API
                                                             $$.getJSON ('http://footprintsnatureclub.com/Service/FootprintsService.asmx/GetEventDetails?id='+event['id'], function (json) {
                                                                         //alert(x);
                                                                         // Insert rendered template
                                                                         document.getElementById('event-banner-content').innerHTML = compiledTemplate1(json);
                                                                         });
                                                             
                                                             
                                                             var mySwiper3 = myApp.swiper('.swiper-3', {
                                                                                          pagination:'.swiper-3 .swiper-pagination',
                                                                                          spaceBetween: 00,
                                                                                          autoplay:true,
                                                                                          speed: 5000
                                                                                          });
                                                             
                                                             //$('jsEvent').addTouch();
                                                             
                                                             //                                                           $.ajax({
                                                             //                                                                  type: 'POST',
                                                             //                                                                  url: 'http://healthrecordspro.com/WS/wpevents.php?sectionid=dc_eventsdetails&iid='+event['id'],
                                                             //                                                                  success:function (data) {
                                                             //                                                                  var popupHTML = '<div class="popup" style="background: rgba(0, 0, 0, 0.5) none repeat scroll 0 0;">'+
                                                             //                                                                  '<div class="list-block popup-self">'+
                                                             //                                                                  '<div class="content-block-title" style="text-align:-webkit-center;"><h3 style="font-size: 5vw;margin: 10px 0;">Medication Calendar</h3></div>'+
                                                             //                                                                  '<div class="item-media"></div>'+
                                                             //                                                                  '<div class="item-inner item-inner1">'+
                                                             //                                                                  '<div class="item-input">'+
                                                             //                                                                  data+
                                                             //                                                                  '</div>'+
                                                             //                                                                  '</div>'+
                                                             //
                                                             //                                                                  '<p align="right"><a href="doctor_consultation.html" onclick="doctorsEdit('+event['id']+');" style="width:20%;" class="button close-popup" id="button_search">Edit</a></p>'+
                                                             //                                                                  '<p><a href="#" style="color:black;float:right; position:absolute;top:0;right:0;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                                             //                                                                  '</div>'+
                                                             //                                                                  '</div>'+
                                                             //                                                                  '</div>';
                                                             //
                                                             //                                                                  myApp.popup(popupHTML);
                                                             //                                                                  }
                                                             //                                                                  });
                                                             return false;
                                                             
                                                             }
                                                             });
                      }
                      else{
                      $('#CalendarPlace_event').fullCalendar({
                                                             header: {
                                                             left: 'prev',
                                                             center: 'title',
                                                             right: 'next'
                                                             },
                                                             editable: false,
                                                             events:[] ,
                                                             eventClick:  function(event, jsEvent, view)
                                                             {
                                                             //$('jsEvent').addTouch();
                                                             alert("clicked");
                                                             }
                                                             });
                      }
                      
                      })
    .fail(function() {
          myApp.alert("please check the Network connection");
          });
    
    setInterval(function(){
                //               var storedData1 = myApp.formGetData('logged_userId');
                
                
                //alert($("#CalendarPlace_Appoitment").length);
                
                },1000);
    
}

