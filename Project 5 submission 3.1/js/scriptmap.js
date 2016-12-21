
//I have used example in github https://github.com/laurendev/Neighborhood-Map-Project/blob/master/js/script.js to completely restucture original submissions!!
//The code has been refactored to the model-view-view model paradigm, to the fullest....

//Model

var map;
var markerM = []; //array of map markers

var safeCenters = [

    {name: "Huckleberry house", type: "Shelter", location: "Columbus",
    position: {"lat": 39.992232, "lng": -83.000780}, website: "http://huckhouse.org"},

    {name: "Turning point", type: "Survivors", location: "Columbus",
    position: {lat: 39.886608, lng: -82.921228}, website: "http://turningpoint.org"},

    {name: "Star house", type: "Resources", location: "Columbus",
    position: {lat: 39.990021, lng: -82.989634}, website: "https://starhouse.ehe.osu.edu"},

    {name: "Gracehaven", type: "Survivors", location: "Columbus",
    position: {lat: 40.014993, lng: -82.999923}, website: "https://starhouse.ehe.osu.edu"},

    {name: "Hands-on-Ohio", type: "Collaboration", location: "Columbus",
    position: {"lat": 39.967502, "lng": -82.992712}, website: "https://handsoncentralohio.org"}
];


//Initialize a new map and the model.
function initMap() {
    //center the map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {lat: 39.98, lng: -83.0},
        mapTypeId: 'roadmap'
    });

    ko.applyBindings(new ViewModel()); //initializes the model along with the map
}

//Define the model as observables and methods.
   var ViewModel = function() {
        var self = this;

        self.searchInput = ko.observable(''); //result of the search input
        self.safeCenters = ko.observableArray(safeCenters); //all the centers
        self.safeChosen = ko.observableArray();  //these are checked items
        self.contents = ko.observableArray(); //addtl contents related to selected items

        var largeInfoWindow = new google.maps.InfoWindow();

// searchInput to console
        self.writeToConsole = ko.computed(function(){
            console.log("searchInput",self.searchInput());
        });

//Populates the map with all markers or just filtered markers.
        self.populateMap = ko.computed(function() {
        var searchQuery = self.searchInput().toLowerCase();
            if (!searchQuery) {
            return fullyPopulateMap();
            } else {
            //console.log ("attempt to repopulate map");
            deleteMarkers();
            populateFilteredMap(searchQuery);
             };
        });

    // Manages the list of current locations on the map

        self.selectCenters = ko.computed (function() {
        var searchQuery = self.searchInput().toLowerCase();

            if (!searchQuery) {
            //console.log('selectCenters all centers', self.safeCenters());

            return self.safeCenters(); //displays all centers
            } else {
            //console.log ('selectCenters reached else based on search input');
            self.safeChosen([]);  //sets all previous safeChosen to null!!
            self.safeCenters().forEach(function(center) {
            var name = center.name.toLowerCase();
            if (name.indexOf(searchQuery) !== -1 ) {
                self.safeChosen.push(center);
                //console.log("safe chosen", center);
            }
            })
            return self.safeChosen();
            }
        });

    //Handles opening a marker when list item is clicked
        self.listItemClicked = function(data){
        //console.log("listItemClicked", data.type, data.marker);
            populateInfoWindow(data.marker, largeInfoWindow);
            loadData(data.type); //loads additional content from external sources
        };

        self.selectContent = ko.computed(function(){
            return self.contents();
        });

//Adds content to info window when marker is clicked.
//Only one info window can be open at any time.

function populateInfoWindow(marker, infoWindow) {
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;

        infoWindow.setContent('<div>' + marker.title +  ', see below for more' + '</div>');
        infoWindow.open(map, marker);
        infoWindow.marker.setAnimation(google.maps.Animation.BOUNCE);
        infoWindow.addListener('closeclick', function(){
        infoWindow.marker = null;
        marker.setAnimation(null);
        });
        stopAnimation(marker);
    }
}

function stopAnimation(marker) {
    setTimeout(function () {
        marker.setAnimation(null);
    }, 2000);
}

function fullyPopulateMap () {
    self.safeCenters().forEach(function(center) {
        var name = center.name;
        var position = center.position;
        var type = center.type;

    //Create a marker for each center
    var marker = new google.maps.Marker({
        map:map,
        position: position,
        title: name,
        animation: google.maps.Animation.DROP,
        id: center
    });
    // Add each marker to the marker array and add click listener

    markerM.push(marker);

    marker.addListener("click", function(){
        populateInfoWindow(this, largeInfoWindow);
        loadData(type);
    });

    center.marker = marker; //re-assign newly constructed marker

    });
    console.log('Putting all markers on map', markerM);
    showMarkers();
}


//Sorts centers that match search query into a new array

function populateFilteredMap(searchQuery) {
self.safeCenters().forEach(function(center){
    var title = center.name;
    var nameToSearch =  center.name.toLowerCase();
    var searchQueryLower = searchQuery.toLowerCase();
    var position = center.position;
    var type = center.type;

        if (nameToSearch.indexOf(searchQueryLower) !== -1) {
          // Create a marker
          //console.log("populateFileredMap creating marker", searchQueryLower);
          var marker = new google.maps.Marker({
            map: map,
            position: center.position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: center
          });

        markerM.push(marker);

        marker.addListener('click', function(){
        populateInfoWindow(this, largeInfoWindow);
        loadData(type);
        });
        center.marker = marker;
      }
    });
    //console.log('Putting searchInput markers on map', markerM );
    showMarkers();

}


    function setMapOnAll(map) {
    for (var i = 0; i<markerM.length; i++){
    markerM[i].setMap(map);
    }
}

// Delete all markers in the array
    function deleteMarkers(){
    setMapOnAll(null);
    markerM = [];
}

    function showMarkers() {
    setMapOnAll(map);
}

    function clearMarkers() {
    setMapOnAll(null);
}


//Load data assembles the new content from information sources (e.g. NYT) based on the type passed.
//However, these sources do not fully support queries based on type. The dynamic content is respSummary.

function loadData(type) {

//Form queries that are acceptable to different external sources based on user selected 'type'
var query = 'human trafficking' + ' ' + type;
var city = 'Columbus';
var state = "OH";

    $(".contents").empty(); //empty out previous contents

    self.contents.push('<h3> More on ' + type + '</h3>');

    //console.log("In loadData", type, query, city, state); // am not able to get this to work thus have hardwired query parameters.

// Built by NYT LucyBot. www.lucybot.com
    //Article Search API key: 020cabcb3a92b8c411f8f88110edb095:13:38869805
    var nytRequestTimeout = setTimeout(function() {
        $nsfElem.text("No relevant resources");
    }, 8000);

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "020cabcb3a92b8c411f8f88110edb095:13:38869805",
        'q': 'human trafficking ohio',
        'fl': "abstract"
    });

    $.ajax({
        url: url,
        method: 'GET'
    }).done(function(result) {
        var articles = [];
        var length = 0;
        articles = result.response.docs;

        for (var i in articles) {
            if (articles[i].abstract !== null) {
            self.contents.push('<p>NYT: ' + articles[i].abstract + '</p>');
            }
        }
        //console.log("nyt", self.contents());
    }).fail(function(jqXHR, exception) {
        // Our error logic here
        var msg = 'err';
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
    });

    clearTimeout(nytRequestTimeout);

  //Globl research related to human trafficking; local parameters are OH

    var nsfURL = 'http://api.nsf.gov/services/v1/awards.json?keyword=' + 'human trafficking' ;
    var nsfRequestTimeout = setTimeout(function() {
        $nsfElem.text("No relevant resources");
    }, 8000);
    $.ajax({
        url: nsfURL,
        dataType: "jsonp",
        jsonp: "callback",
    }).done(function(response) {
        clearTimeout(nsfRequestTimeout);
        var awardList = response;
        for (var i in awardList.response.award) {
            if (awardList.response.award[i].awardeeStateCode == 'OH') {
                 self.contents.push('<p>' + " NSF: " + awardList.response.award[i].title + '</p>');
                //console.log(self.contents());
            }
        }
    }).fail(function(jqXHR, exception) {
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
        self.contents.push('<p>' + msg + '<p/>');
    });
    clearTimeout(nsfRequestTimeout);


    //Retrive relevant info from wikipedia.
    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + 'human trafficking' + '&format=json';
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("No relevant wikipedia resources");
    }, 8000);
    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        jsonp: "callback",
    }).done(function(response) {
        var articleList = response[1];
        var articleStr = '';
        //console.log(articleList);
        for (var i = 0; i < articleList.length; i++) {
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            self.contents.push('<p>' + " Wiki: " + '<a href="' + url + '">' + articleStr + '</a></p>');
     }
        //console.log("wiki", wikiURL, self.articleList);
    }).fail(function(jqXHR, exception) {
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
       self.contents.push('<p>' + msg + '<p/>');
    });
    clearTimeout(wikiRequestTimeout);



};
}
var mapsError = function() {
alert("Google Maps failed to load");
}