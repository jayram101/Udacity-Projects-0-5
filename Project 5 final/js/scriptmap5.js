//GLOBAL VARIABLES.
//The following is an array of safeCenters which will eventually be an API to a state server resource.

var safeCenters = [

{"name" : "Huckleberry House", "type": "Shelter", "location": "Columbus",
"lat": 39.992232, "lng": -83.000780, "website" : "http://huckhouse.org", "marker" : "true"},

{"name" : "Turning point", "type": "Survivors", "location": "Columbus",
"lat" :39.886608, "lng": -82.921228, "website" : "turningpointdv.org", "marker" : "true"},

{"name": "Star house", "type": "Information", "location": "Columbus",
"lat" : 39.990021, "lng": -82.989634, "website" : "https://starhouse.ehe.osu.edu", "marker" : "turningpointdv"},

{"name": "Gracehaven", "type": "Survivors", "location": "Columbus",
"lat" :40.014993, "lng": -82.999923, "website" : "https://starhouse.ehe.osu.edu", "marker" : "true"},

{"name": "Hands On Ohio", "type": "Collaboration", "location": "Columbus",
"lat" :39.967502, "lng": -82.992712, "website" : "https://handsoncentralohio.org", "marker" : "true"}
];

var map;
var markerM = []; //array of map markers
var contentS = []; //info content displayed for a marker
var l = safeCenters.length;
var currentLocation = {"lat" : 39.98, "lng": -83.0};
var sCH = []; //safe chosen items
//Viewmodel is the data manipulated from the user interface.
//sC is a user interface view of the safeCenters above...can be combined, how in Knockoutjs?
var query='';

//this view model can be derived algorithmically from the safeCenters strucutre above.
var viewModel = {
  streetC : ko.observable('High'),
  cityC : ko.observable('Columbus'),
  stateC : ko.observable ('Ohio'),
  sC : ko.observableArray([
{"type": "Shelter", names : ["Huckleberry House"]},
{"type": "Survivors", names : ["Turning point", "Gracehaven"]},
{"type": "Information", names: ["Star house"]},
{"type": "Collaboration", names: ["Hands On Ohio"]}
]),
  chosenItems: ko.observableArray(),
  dataRef: function(){        // dataRefresh on submit, now the user wants more detailed info.
  sCH = viewModel.chosenItems();
  street = viewModel.streetC();
  city = viewModel.cityC();
  state = viewModel.stateC();
  query = city + ','+ state;
  query1 = 'sex trafficking';
  query2 = "crime";

//Display safe centers on the map
//Note handling of events and closures as indicated below.
for (var s in sCH) {
  for (var i = 0; i<l; i++){
  if (markerM[i].title === sCH[s]) {
  attachNewContent(markerM[i]);}
    };
  };
  loadData();
 }
}
ko.applyBindings(viewModel);


function attachNewContent(markerM){
  console.log(markerM);
  markerM.setAnimation(google.maps.Animation.BOUNCE);
  markerM.addListener('click', function(){  //addresses events and closure
  toggleBounce(markerM);
  });
};


function toggleBounce(markerM) {
  if (markerM.getAnimation() !== null) {
   markerM.setAnimation(null); }
   else {
  markerM.setAnimation(google.maps.Animation.BOUNCE);
  }
  }


//Initialize map with markers. initMap is the callback associated with map load.
    function initMap() {
      //center the map
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: {lat: 39.98, lng: -83.0}
        });

          for (var i = 0; i < l; i++) {
            markerM[i] = new google.maps.Marker({
            position: {lat: safeCenters[i].lat, lng: safeCenters[i].lng},
            title: safeCenters[i].name,
            animation: google.maps.Animation.DROP,
            map: map
            });
            attachContent(markerM[i], contentString(i));
          };
     }

//This ensures each event is associated with the different content window by calling a function.
  function attachContent(markerM, content) {
        var infowindow = new google.maps.InfoWindow({
          content: content
        });

        markerM.addListener('click', function() {  //markerM copy
          infowindow.open(markerM.get('map'), markerM)

        });
    }


function contentString (i){

          contentS[i] = '<div id="content"><h1 id="firstHeading" class="firstHeading">'+
          safeCenters[i].name + '</h1>' +
          '<div id="bodyContent">' + '<p>' + safeCenters[i].type + '</p>' +
          '<h1><a href ="'+safeCenters[i].website +' " >Visit website</a></h1>' + '</p>' +
          '</div>';
          return  contentS[i];
}


function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytElem = $('#nytimes-articles');
    var $nsfElem = $('#nsf-links');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    $nsfElem.text("");

    //var streetStr = $('#street').val();
    //var cityStr = $('#city').val();
    var address = query;


// Built by NYT LucyBot. www.lucybot.com
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "c07dd24a9be14a27a450d6394973776e",
  'q': query,
  'fl': "abstract"
});
$.ajax({
  url: url,
  method: 'GET',
  dataType: 'json',
}).done(function(result) {
 var articles = [];
 articles =  result.response.docs;
 for(var i in articles){
if (articles[i].abstract != null) {
  $nytElem.append('<p>' + articles[i].abstract + '</p>');  }
}
}).fail(function(err) {
  throw err;
});

    //var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&q=Columbus+Ohio&begin_date=20150101&end_date=20160101&sort=newest&api-key=c07dd24a9be14a27a450d6394973776e';
    //var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch/json?q=new+york+times&fq='+ address + '&sort=newest&api-key='+keyNYT;

    //The pattern is jQuery.getJSON( url [, data ] [, success ] )

var nsfURL = 'http://api.nsf.gov/services/v1/awards.json?keyword='+ query1;
var nsfRequestTimeout = setTimeout(function(){
        $nsfElem.text("failed to get nsf resources");
    }, 8000);
 $.ajax({
  url: nsfURL,
  dataType: "jsonp",
  jsonp: "callback",
  success: function (response) {
    var awardList = response;
    for (var i in awardList.response.award) {
      if(awardList.response.award[i].awardeeCity == city){
        $nsfElem.append('<li>' + awardList.response.award[i].title + '</li>');};
    };
    clearTimeout(nsfRequestTimeout);
  }
});

//Retrive relevant info from wikipedia.
   var wikiURL='https://en.wikipedia.org/w/api.php?action=opensearch&search=' + query1 + '&format=json';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiURL,
        dataType:"jsonp",
        jsonp: "callback",
        success: function(response) {
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
            clearTimeout(wikiRequestTimeout);
            }
        });

 return false;
}


