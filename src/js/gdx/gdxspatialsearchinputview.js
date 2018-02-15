function initializeSpatialSearchInputView(){
	
	indexesParentElement = "spatialSearchInputPanel3";
	
	document.getElementById("spatialSearchResultsView").style.display = "none";
	
	//Set initial location to Boulder, CO.
	currentLocation = [40.0150, -105.2705]
	
    //Create Leaflet Map
    inputMap = L.map('spatialSearchInputMap').setView(currentLocation, 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWxpbmdlcmYiLCJhIjoiY2pjamhlZTl1NGRxazJxbzU0OHE5d3ZxNyJ9.n7A_BBoZxnpA2izU3McwSQ', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZWxpbmdlcmYiLCJhIjoiY2pjamhlZTl1NGRxazJxbzU0OHE5d3ZxNyJ9.n7A_BBoZxnpA2izU3McwSQ'
    }).addTo(inputMap);
    
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
    marker = L.marker(currentLocation, {icon: greenIcon}).addTo(inputMap);
    
    //Create fields for location entry
   	$("#spatialSearchInputLatField").jqxInput({height: componentHeight, width: '100%'});
    $("#spatialSearchInputLonField").jqxInput({height: componentHeight, width: '100%'});
    
    //Initialize field values 
    $("#spatialSearchInputLatField").jqxInput('val', currentLocation[0].toFixed(precision));
    $("#spatialSearchInputLonField").jqxInput('val', currentLocation[1].toFixed(precision));
    
    //Create buttons
    $("#spatialSearchInputUpdateButton").jqxButton({ width: '100%', height: componentHeight });
	$("#spatialSearchInputAddButton").jqxButton({ width: '100%', height: componentHeight });
    $("#spatialSearchInputRemoveButton").jqxButton({ width: '100%', height: componentHeight });
    $("#spatialSearchInputSubmitButton").jqxButton({ width: '100%', height: componentHeight });
   
    //Add event listeners to buttons
    $("#spatialSearchInputUpdateButton").on('click', spatialSearchInputUpdateButtonClicked);
	$("#spatialSearchInputAddButton").on("click", spatialSearchInputAddButtonClicked);
	$("#spatialSearchInputRemoveButton").on("click", spatialSearchInputRemoveButtonClicked);
	$("#spatialSearchInputSubmitButton").on("click", spatialSearchInputSubmitButtonClicked);
	
	//Create list for holding locations
    $("#spatialSearchInputListBox").jqxListBox({height: '100%', width: '100%'});
    
	//Create error window 
    $('#gdxErrorWindow').jqxWindow({  
    		title: 'Attention!',
    		width: 400,
        height: 140, 
        resizable: true,
        autoOpen: false,
        isModal: true
    });
    $("#gdxErrorWindowOKButton").jqxButton({ width: 75, height: 30 });
    $("#gdxErrorWindowOKButton").on("click", gdxErrorWindowOKButtonClicked);
    
    //Create wait window 
    $('#gdxWaitWindow').jqxWindow({  
    		title: 'Please Wait...',
    		width: 400,
        height: 140, 
        resizable: true,
        autoOpen: false,
        isModal: true
    });
    
}

function badLocation(){
	var lat = $("#spatialSearchInputLatField").jqxInput('val');
	var lon = $("#spatialSearchInputLonField").jqxInput('val');
	return isNaN(lat) || isNaN(lon);
}

function gdxErrorWindowOKButtonClicked(){
	$('#gdxErrorWindow').jqxWindow('close');
}

function spatialSearchInputUpdateButtonClicked(){
	//Update the location of the current marker
	var lat = $("#spatialSearchInputLatField").jqxInput('val');
	var lon = $("#spatialSearchInputLonField").jqxInput('val');
	if(!badLocation()){
		$("#spatialSearchInputLatField").jqxInput('val', parseFloat(lat).toFixed(precision));
    		$("#spatialSearchInputLonField").jqxInput('val', parseFloat(lon).toFixed(precision));
		currentLocation = [lat, lon];
		var latlng = L.latLng(lat, lon);
		marker.setLatLng(latlng);
		redrawMap();
	}else{
		document.getElementById("gdxErrorWindowMessage").innerHTML = "Please enter numeric values for Latitude and Longitude.";
		$('#gdxErrorWindow').jqxWindow('open');
	}
}

function spatialSearchInputAddButtonClicked(){
	//Add the current location
	var lat = $("#spatialSearchInputLatField").jqxInput('val');
	var lon = $("#spatialSearchInputLonField").jqxInput('val');
	if(!badLocation()){
		$("#spatialSearchInputListBox").jqxListBox('addItem', parseFloat(lat).toFixed(precision) + ", " + parseFloat(lon).toFixed(precision));
		redrawMap();
	}else{
		document.getElementById("gdxErrorWindowMessage").innerHTML = "Please enter numeric values for Latitude and Longitude.";
		$('#gdxErrorWindow').jqxWindow('open');
	}
}

function spatialSearchInputRemoveButtonClicked(){
	//Remove the selected location
	var item = $("#spatialSearchInputListBox").jqxListBox('getSelectedItem'); 
	$("#spatialSearchInputListBox").jqxListBox('removeItem', item);
	redrawMap();
}

function spatialSearchInputSubmitButtonClicked(){
	document.getElementById("gdxWaitWindowMessage").innerHTML = "Please wait while data is loaded from Geodex.org.";
	$('#gdxWaitWindow').jqxWindow('open');
	var keyArray = ["geowithin"];
    	var valueArray = [getGeoJSONString()];
	performWebServiceCall(WebServiceActions.SPATIAL_SEARCH_OBJECT, keyArray, valueArray, updateAfterSpatialSearchObject);
}

function getGeoJSONString(){
	var locations = $("#spatialSearchInputListBox").jqxListBox('getItems');
 	var data = [];
    if(locations){
	    for(var i = 0; i<locations.length; i++){
			var location = locations[i];
			var locationLabel = location.label;
			var locationLabelArray = locationLabel.split(",");
			var lat = parseFloat(locationLabelArray[0]);
			var lon = parseFloat(locationLabelArray[1]);
			data.push({"lat": lat, "lon": lon});
	    }
    }
    var geojson = GeoJSON.parse(data, {Point: ['lat', 'lon']});
    return JSON.stringify(geojson);
}

function gotoSpatialSearchResultsView(){
	document.getElementById("spatialSearchInputInputView").style.display = "none";
	document.getElementById("spatialSearchInputResultsView").style.display = "block";
	initializeSpatialSearchResultsView();
}

function updateAfterSpatialSearchObject(data){
	$('#gdxWaitWindow').jqxWindow('close');
	mainData.populateSpatialResults(data);
	gotoSpatialSearchResultsView();
}

function setFitBounds(){

	//Calculate a bounding box that will include all markers
	var lat = $("#spatialSearchInputLatField").jqxInput('val');
	var lon = $("#spatialSearchInputLonField").jqxInput('val');
	
	neLocationLat = parseFloat(lat);
    neLocationLon = parseFloat(lon);
    swLocationLat = parseFloat(lat);
    swLocationLon = parseFloat(lon);
    
    var locations = $("#spatialSearchInputListBox").jqxListBox('getItems');
    
    if(locations){
    
	    for(var i = 0; i<locations.length; i++){
			
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
    
    inputMap.fitBounds([swLocation, neLocation]);
    
}

function redrawMap(){

	//Remove all current markers
	for(var i = 0; i<oldMarkers.length; i++){
		inputMap.removeLayer(oldMarkers[i]);
	}
	
	//Remove all current lines
	for(var i = 0; i<oldLines.length; i++){
		inputMap.removeLayer(oldLines[i]);
	}
	
	//Create new markers for each location
	var locations = $("#spatialSearchInputListBox").jqxListBox('getItems');
	
	if(locations){
	
		for(var i = 0; i<locations.length; i++){
			
			var location = locations[i];
			var locationLabel = location.label;
			var locationLabelArray = locationLabel.split(",");
			var lat = locationLabelArray[0];
			var lon = locationLabelArray[1];
	
			var marker = L.marker([lat, lon]).addTo(inputMap);
			oldMarkers.push(marker);
			
		}
		
		//Draw lines and polygons
		if(locations.length>1){
			
			var latlngs = [];
			var points = [];
			
			for(var i = 0; i<locations.length; i++){
				
				var location = locations[i];
				var locationLabel = location.label;
				var locationLabelArray = locationLabel.split(",");
				var lat = parseFloat(locationLabelArray[0]);
				var lon = parseFloat(locationLabelArray[1]);
		
				points.push(new Point(lat, lon));
				
			}
			
			upper = upperLeft(points);
			points.sort(pointSort);
			
			for(var i = 0; i<points.length; i++){
				var latlng = L.latLng(parseFloat(points[i].lat), parseFloat(points[i].lon));
				latlngs.push(latlng);
			}
			latlng = L.latLng(parseFloat(points[0].lat), parseFloat(points[0].lon));
			latlngs.push(latlng);
			
			var polyline = L.polyline(latlngs).addTo(inputMap);
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