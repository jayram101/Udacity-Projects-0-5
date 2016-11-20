//GLOBAL VARIABLES.
//The following is an array of safeCenters which will eventually be an API to a state server resource.
//The marker attribute indicates whether the marker is visible or not.
var safeCenters = [

{"name" : "Huckleberry House", "type": "Shelter", "location": "Columbus",
"lat": 39.992232, "lng": -83.000780, "website" : "http://huckhouse.org", "marker" : "true"},

{"name" : "Turning point", "type": "Survivors", "location": "Columbus",
"lat" :39.886608, "lng": -82.921228, "website" : "turningpointdv.org", "marker" : "true"},

{"name": "Star house", "type": "Information", "location": "Columbus",
"lat" : 39.990021, "lng": -82.989634, "website" : "https://starhouse.ehe.osu.edu", "marker" : "true"},

{"name": "Gracehaven", "type": "Survivors", "location": "Columbus",
"lat" :40.014993, "lng": -82.999923, "website" : "https://starhouse.ehe.osu.edu", "marker" : "true"},

{"name": "Hands On Ohio", "type": "Collaboration", "location": "Columbus",
"lat" :39.967502, "lng": -82.992712, "website" : "https://handsoncentralohio.org", "marker" : "true"}
];

var map;
var markerM = []; //array of map markers
var contentS = []; //info content displayed for a marker
var l = safeCenters.length;
//var currentLocation = {"lat" : 39.98, "lng": -83.0};
var sCH = []; //safeCHosen center items
//Viewmodel is the data manipulated from the user interface.
//sC is a user interface view of the safeCenters above...can be combined, how in Knockoutjs?
var street, city, state, query, query1, query2 ='';
city = 'Columbus';
state = "Ohio";
query = city + ','+ state;
query1 = 'human trafficking';
query2 = "crime";


//This view model can be eventually derived algorithmically from the safeCenters strucutre above.

var viewModel = {
  sC : ko.observableArray([
{"type": "Shelter", names : ["Huckleberry House"]},
{"type": "Survivors", names : ["Turning point", "Gracehaven"]},
{"type": "Information", names: ["Star house"]},
{"type": "Collaboration", names: ["Hands On Ohio"]}
]),
  chosenItems: ko.observableArray(),

  dataRef: function(){        // dataRefresh on submit, now the user wants more detailed info.
  sCH = viewModel.chosenItems();
  var m = sCH.length;

//Display the filteres safe centers on the map

//First initialize the marker array associated with the map to false making all markes invisible.
for (var i = 0; i<l; i++) {
  markerM[i].marker='false';
  markerM[i].setMap(null);
}
//Turn on the flags to visible to reflect filtered locations and place on map using 'setMap'
isVisible(markerM);

for (var i = 0; i<l; i++) {
  if (markerM[i].marker == "true") {
     markerM[i].setMap(map);
     attachNewContent(markerM[i]); //Provides marker functionality.
  } else {
    markerM[i].marker = "false";
  }; }

//Function to make invisible all markers that are not in sCH
function isVisible(marks) {
for (var i = 0; i<l; i++) {
  for(var s = 0; s<m; s++) {
    if (markerM[i].title === sCH[s]){
    markerM[i].marker = "true";
  }; };
}
}

  //loadData();.....have moved this to implement dynamic content example
  }
};

ko.applyBindings(viewModel);

//Functions that process the marker objects relating to the map

function attachNewContent(Marker) {
  console.log("attachNewContent", Marker.title);
  Marker.setAnimation(google.maps.Animation.BOUNCE);
  Marker.addListener('click', toggleBounce) ; //addresses events and closure
  }

function toggleBounce() {
  console.log('toggleBounce', Marker.setAnimation());
  if (Marker.setAnimation() !== null){
    Marker.setAnimation(null);
  } else {
  Marker.setAnimation(google.maps.Animation.BOUNCE);
  //construct and attach the display dynamic content
  //attachContent(Marker);
  };
}


//Initialize map with markers. initMap is the callback associated with map load.
    function initMap() {
      //center the map
        map = new google.maps.Map(document.getElementById('map'), {
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
          }
     }


//This ensures each event is associated with the different content window by calling a function.
  function attachContent(Marker) {
        var infowindow = new google.maps.InfoWindow({
          content: contentString(Marker, summary)
        });
        Marker.addListener('click', function() {  //Marker copy
        infowindow.open(Marker.get('map'), Marker);
        });
    }


function contentString (Marker, summary){
            loadData();
            summary = Marker.name;
          //contentS[i] = '<div id="content"><h1 id="firstHeading" class="firstHeading">'+
          //safeCenters[i].name + '</h1>' +
          //'<div id="bodyContent">' + '<p>' + safeCenters[i].type + '</p>' +
          //'<h1><a href ="'+safeCenters[i].website +' " >Visit website</a></h1>' + '</p>' +
          //'</div>';

            return  summary;
}


function loadData(summary) {

    //var $body = $('body');
    var summary = "number of entries";
    var $wikiElem = $('#wikipedia-links');
    var $nytElem = $('#nytimes-articles');
    var $nsfElem = $('#nsf-links');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    $nsfElem.text("");

//clear markers

console.log('query', query);

    //var streetStr = $('#street').val();
    //var cityStr = $('#city').val();
    //var address = query;


// Built by NYT LucyBot. www.lucybot.com
//Article Search API key: 020cabcb3a92b8c411f8f88110edb095:13:38869805
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "020cabcb3a92b8c411f8f88110edb095:13:38869805",
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
if (articles[i].abstract !== null) {
  $nytElem.append('<p>' + articles[i].abstract + '</p>');  }
}
})
.fail(function(jqXHR, exception) {
// Our error logic here
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        $nytElem.append('<p>' + msg + '<p/>');
    })
    //.always(function () {alert("NYT complete");})
    ;

var nsfURL = 'http://api.nsf.gov/services/v1/awards.json?keyword='+ query1;
var nsfRequestTimeout = setTimeout(function(){
        $nsfElem.text("No relevant resources");
    }, 8000);
//console.log(nsfURL);
 $.ajax({
  url: nsfURL,
  dataType: "jsonp",
  jsonp: "callback",
  success: function (response) {
    var awardList = response;
    for (var i in awardList.response.award) {
      if(awardList.response.award[i].awardeeCity == city){
        $nsfElem.append('<li>' + awardList.response.award[i].title + '</li>');}
    };
  }
    //error: function (jqXHR, textStatus, errorThrown){
    //alert('request failed');
  //clearTimeout(nsfRequestTimeout);
});

//Retrive relevant info from wikipedia.
   var wikiURL='https://en.wikipedia.org/w/api.php?action=opensearch&search=' + query1 + '&format=json';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("No relevant wikipedia resources");
    }, 8000);
//console.log(wikiURL);
    $.ajax({
        url: wikiURL,
        dataType:"jsonp",
        jsonp: "callback",
        success: function(response) {
            var articleList = response[1];
            var articleStr = '';
            for (var i = 0; i < articleList.length; i++) {
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');}
     //   error: function(xhr, textStatus, errorThrown){
     //     alert('request failed');
            clearTimeout(wikiRequestTimeout);
          }
            });
 return false;
}