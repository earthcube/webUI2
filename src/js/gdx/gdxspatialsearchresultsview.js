function initializeSpatialSearchResultsView(){
	currentLocation = [40.0150, -105.2705]
	
    //Create Leaflet Map
    resultsMap = L.map('spatialSearchResultsMap').setView(currentLocation, 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWxpbmdlcmYiLCJhIjoiY2pjamhlZTl1NGRxazJxbzU0OHE5d3ZxNyJ9.n7A_BBoZxnpA2izU3McwSQ', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZWxpbmdlcmYiLCJhIjoiY2pjamhlZTl1NGRxazJxbzU0OHE5d3ZxNyJ9.n7A_BBoZxnpA2izU3McwSQ'
    }).addTo(resultsMap);
   
}

function gotoSpatialSearchInputView(){
	document.getElementById("spatialSearchResultsView").style.display = "none";
	document.getElementById("spatialSearchInputView").style.display = "grid";
}

function setFitBounds(){

	//Calculate a bounding box that will include all markers
	/*var lat = $("#spatialSearchInputLatField").jqxInput('val');
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
    
    resultsMap.fitBounds([swLocation, neLocation]);*/
    
}

function redrawMap(){

	//Remove all current markers
	for(var i = 0; i<oldMarkers.length; i++){
		resultsMap.removeLayer(oldMarkers[i]);
	}
	
	//Remove all current lines
	for(var i = 0; i<oldLines.length; i++){
		resultsMap.removeLayer(oldLines[i]);
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
	
			var marker = L.marker([lat, lon]).addTo(resultsMap);
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
			
			var polyline = L.polyline(latlngs).addTo(resultsMap);
			oldLines.push(polyline);
			
		}
	
	}
	
	var spatialResults = mainData.getSpatialResults();
    for(var i=0; i<spatialResults.length; i++){
    		L.geoJSON(spatialResults[i].getFeature()).addTo(resultsMap);
    }
	
	//setFitBounds();
	
}