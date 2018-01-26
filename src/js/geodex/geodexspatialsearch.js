//Global variables
var marker;
var oldMarkers = [];
var oldLines = [];
var map;
var currentLocation;
var upper;

function initializeSpatialSearchPanel(){
	
	//Set initial location to Boulder, CO.
	currentLocation = [40.0150, -105.2705]
	
    //Create Leaflet Map
    map = L.map('spatialSearchMap').setView(currentLocation, 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWxpbmdlcmYiLCJhIjoiY2pjamhlZTl1NGRxazJxbzU0OHE5d3ZxNyJ9.n7A_BBoZxnpA2izU3McwSQ', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZWxpbmdlcmYiLCJhIjoiY2pjamhlZTl1NGRxazJxbzU0OHE5d3ZxNyJ9.n7A_BBoZxnpA2izU3McwSQ'
    }).addTo(map);
    
    //Create an initial marker and set color to green for current location
    var greenIcon = new L.Icon({
	    	iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
	    	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	    	iconSize: [25, 41],
	    	iconAnchor: [12, 41],
	    	popupAnchor: [1, -34],
	    	shadowSize: [41, 41]
    });

    //Add marker to map
    marker = L.marker(currentLocation, {icon: greenIcon}).addTo(map);
    
    //Create fields for location entry
   	$("#spatialSearchLatField").jqxInput({height: 40, width: '100%'});
    $("#spatialSearchLonField").jqxInput({height: 40, width: '100%'});
    
    //Initialize field values 
    $("#spatialSearchLatField").jqxInput('val', currentLocation[0]);
    $("#spatialSearchLonField").jqxInput('val', currentLocation[1]);
    
    //Create buttons
    $("#spatialSearchUpdateButton").jqxButton({ width: '100%', height: 40 });
	$("#spatialSearchAddButton").jqxButton({ width: '100%', height: 40 });
    $("#spatialSearchRemoveButton").jqxButton({ width: '100%', height: 40 });
    $("#spatialSearchSubmitButton").jqxButton({ width: '100%', height: 40 });
   
    //Add event listeners
    $("#spatialSearchUpdateButton").on('click', spatialSearchUpdateButtonClicked);
	$("#spatialSearchAddButton").on("click", spatialSearchAddButtonClicked);
	$("#spatialSearchRemoveButton").on("click", spatialSearchRemoveButtonClicked);
	$("#spatialSearchSubmitButton").on("click", spatialSearchSubmitButtonClicked);
	
	//Create list for holding locations
    $("#spatialSearchListBox").jqxListBox({height: '100%', width: '100%'});
	
}

function spatialSearchUpdateButtonClicked(){
	//Update the location of the current marker
	var lat = $("#spatialSearchLatField").jqxInput('val');
	var lon = $("#spatialSearchLonField").jqxInput('val');
	currentLocation = [lat, lon];
	var latlng = L.latLng(lat, lon);
	marker.setLatLng(latlng);
	redrawMap();
}

function spatialSearchAddButtonClicked(){
	//Add the current location
	var lat = $("#spatialSearchLatField").jqxInput('val');
	var lon = $("#spatialSearchLonField").jqxInput('val');
	$("#spatialSearchListBox").jqxListBox('addItem', lat + ", " + lon);
	redrawMap();
}

function spatialSearchRemoveButtonClicked(){
	//Remove the selected location
	var item = $("#spatialSearchListBox").jqxListBox('getSelectedItem'); 
	$("#spatialSearchListBox").jqxListBox('removeItem', item);
	redrawMap();
}

function spatialSearchSubmitButtonClicked(){
	//Go get data!
}



function setFitBounds(){

	//Calculate a bounding box that will include all markers
	var lat = $("#spatialSearchLatField").jqxInput('val');
	var lon = $("#spatialSearchLonField").jqxInput('val');
	
	neLocationLat = parseFloat(lat);
    neLocationLon = parseFloat(lon);
    swLocationLat = parseFloat(lat);
    swLocationLon = parseFloat(lon);
    
    var locations = $("#spatialSearchListBox").jqxListBox('getItems');
    
    if(locations){
    
	    for(i = 0; i<locations.length; i++){
			
			var location = locations[i];
			var locationLabel = location.label;
			var locationLabelArray = locationLabel.split(",");
			var lat = parseFloat(locationLabelArray[0]);
			var lon = parseFloat(locationLabelArray[1]);
			
			if (lat < swLocationLat){
				swLocationLat = parseFloat(lat);
			}
			if (lon < swLocationLon){
				swLocationLon = parseFloat(lon);
			}
	
			if (lat > neLocationLat){
				neLocationLat = parseFloat(lat);
			}
			if (lon > neLocationLon){
				neLocationLon = parseFloat(lon);
			}
			
	    }
    
    }
    
    swLocation = [swLocationLat, swLocationLon]
    neLocation = [neLocationLat, neLocationLon]
    
    map.fitBounds([swLocation, neLocation]);
    
}

function redrawMap(){

	//Remove all current markers
	for(i = 0; i<oldMarkers.length; i++){
		map.removeLayer(oldMarkers[i]);
	}
	
	//Remove all current lines
	for(i = 0; i<oldLines.length; i++){
		map.removeLayer(oldLines[i]);
	}
	
	//Create new markers for each location
	var locations = $("#spatialSearchListBox").jqxListBox('getItems');
	
	if(locations){
	
		for(i = 0; i<locations.length; i++){
			
			var location = locations[i];
			var locationLabel = location.label;
			var locationLabelArray = locationLabel.split(",");
			var lat = locationLabelArray[0];
			var lon = locationLabelArray[1];
	
			var marker = L.marker([lat, lon]).addTo(map);
			oldMarkers.push(marker);
			
		}
		
		//Draw lines and polygons
		if(locations.length>1){
			
			var latlngs = [];
			var points = [];
			
			for(i = 0; i<locations.length; i++){
				
				var location = locations[i];
				var locationLabel = location.label;
				var locationLabelArray = locationLabel.split(",");
				var lat = parseFloat(locationLabelArray[0]);
				var lon = parseFloat(locationLabelArray[1]);
		
				points.push(new Point(lat, lon));
				
			}
			
			upper = upperLeft(points);
			points.sort(pointSort);
			
			for(i = 0; i<points.length; i++){
				var latlng = L.latLng(parseFloat(points[i].lat), parseFloat(points[i].lon));
				latlngs.push(latlng);
			}
			latlng = L.latLng(parseFloat(points[0].lat), parseFloat(points[0].lon));
			latlngs.push(latlng);
			
			var polyline = L.polyline(latlngs).addTo(map);
			oldLines.push(polyline);
			
		}
	
	}
	
	setFitBounds();
	
}

// A representation of a location.
function Point(lat, lon) {

	
	this.lat = lat;
	this.lon = lon;
    this.x = (lon + 180) * 360;
    this.y = (lat + 90) * 180;

    this.distance=function(that) {
        var dX = that.x - this.x;
        var dY = that.y - this.y;
        return Math.sqrt((dX*dX) + (dY*dY));
    }

    this.slope=function(that) {
        var dX = that.x - this.x;
        var dY = that.y - this.y;
        return dY / dX;
    }
}

// A custom sort function that sorts p1 and p2 based on their slope
// that is formed from the upper most point from the array of points.
function pointSort(p1, p2) {
	
    // Exclude the 'upper' point from the sort (which should come first).
    if(p1 == upper) return -1;
    if(p2 == upper) return 1;

    // Find the slopes of 'p1' and 'p2' when a line is 
    // drawn from those points through the 'upper' point.
    var m1 = upper.slope(p1);
    var m2 = upper.slope(p2);

    // 'p1' and 'p2' are on the same line towards 'upper'.
    if(m1 == m2) {
        // The point closest to 'upper' will come first.
        return p1.distance(upper) < p2.distance(upper) ? -1 : 1;
    }

    // If 'p1' is to the right of 'upper' and 'p2' is the the left.
    if(m1 <= 0 && m2 > 0) return -1;

    // If 'p1' is to the left of 'upper' and 'p2' is the the right.
    if(m1 > 0 && m2 <= 0) return 1;

    // It seems that both slopes are either positive, or negative.
    return m1 > m2 ? -1 : 1;
}

// Find the upper most point. In case of a tie, get the left most point.
function upperLeft(points) {
    var top = points[0];
    for(var i = 1; i < points.length; i++) {
        var temp = points[i];
        if(temp.y > top.y || (temp.y == top.y && temp.x < top.x)) {
            top = temp;
        }
    }
    return top;
}