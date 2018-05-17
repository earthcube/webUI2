function initializeSpatialSearchResultsView(){
	
	if(!spatialSearchResultsViewInitialized){
		
		//Create buttons
		$("#spatialSearchResultsPreviousButton").jqxButton({ width: '150px', height: componentHeight, theme: "darkblue", disabled: true });
		$("#spatialSearchResultsNextButton").jqxButton({ width: '150px', height: componentHeight, theme: "darkblue" });
		$("#spatialSearchResultsBackButton").jqxButton({ width: "333px", height: componentHeight, theme: "darkblue" });
		
	    $('#spatialSearchResultsBackButton').on('click', function (event) {
	    		gotoSpatialSearchInputView();
		});
		
		//Add action listeners
		$("#spatialSearchResultsPreviousButton").on('click', spatialSearchResultsPreviousButtonClicked);
		$("#spatialSearchResultsNextButton").on('click', spatialSearchResultsNextButtonClicked);
		
		//Give a dummy location to initialize map with
		currentLocation = [40.0150, -105.2705]
		
	    //Create Leaflet Map
		if(!resultsMap){
		    resultsMap = L.map('spatialSearchResultsMap').setView(currentLocation, 13);
		    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWxpbmdlcmYiLCJhIjoiY2pjamhlZTl1NGRxazJxbzU0OHE5d3ZxNyJ9.n7A_BBoZxnpA2izU3McwSQ', {
		        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		        maxZoom: 18,
		        id: 'mapbox.streets',
		        accessToken: 'pk.eyJ1IjoiZWxpbmdlcmYiLCJhIjoiY2pjamhlZTl1NGRxazJxbzU0OHE5d3ZxNyJ9.n7A_BBoZxnpA2izU3McwSQ'
		    }).addTo(resultsMap);
		}
		spatialSearchResultsViewInitialized = true;
	}
	
   	currentSpatialResultIndex = 0;
   	redrawResultsMap();
    updateResultDisplay();
}

function spatialSearchResultsPreviousButtonClicked(){
	$("#spatialSearchResultsNextButton").jqxButton({disabled: false });
	if(currentSpatialResultIndex>0){
		currentSpatialResultIndex--;
	}
	redrawResultsMap();
	updateResultDisplay();
	if(currentSpatialResultIndex==0){
		$("#spatialSearchResultsPreviousButton").jqxButton({disabled: true });
	}
}

function spatialSearchResultsNextButtonClicked(){
	$("#spatialSearchResultsPreviousButton").jqxButton({disabled: false });
	if(currentSpatialResultIndex<(mainData.getSpatialResults().length-1)){
		currentSpatialResultIndex++;
	}
	redrawResultsMap();
	updateResultDisplay();
	if(currentSpatialResultIndex==(mainData.getSpatialResults().length-1)){
		$("#spatialSearchResultsNextButton").jqxButton({disabled: true });
	}
}

function updateResultDisplay(){
	var spatialResult = mainData.getSpatialResults()[currentSpatialResultIndex];
	var url = spatialResult.getURL();
	var spatialFeatures = spatialResult.getSpatialFeatures();
	var displayElement = document.getElementById("spatialSearchResultsDisplayPanel");
	var table = '<table cellpadding="8">'
	table += '<tr><td align="center"><b>Result Number  '; 
	table += (currentSpatialResultIndex + 1) + " out of " + mainData.getSpatialResults().length;
	table += '</b></td></tr>';
	table += '<tr><td align="center">'; 
	table += '<b><a target="_blank" href="details.html?url=' + url + '">View Dataset Details</a></b>';
	table += '</td></tr>'; 
	table += '<tr><td align="center">'; 
	table += '<b><a target="_blank" href="' + url + '">' + url + '</a></b>';
	table += '</td></tr>'; 
	table += '<tr><td><b>Features:</b></td></tr>'; 
	for(var i = 0; i<spatialFeatures.length; i++){
		spatialFeature = spatialFeatures[i];
		var type = spatialFeature.getType();
		var coordinates = spatialFeature.getCoordinatesAsString();
		table += '<tr><td>Geometry - ';
		table += type;
		table += ', Coordinates - '; 
		table += coordinates;
		table += '</td></tr>';
	} 
	table += '</td></tr>';
	table +=  '</table>';
	displayElement.innerHTML = table;
}

function gotoSpatialSearchInputView(){
	document.getElementById("spatialSearchResultsView").style.display = "none";
	document.getElementById("spatialSearchInputView").style.display = "grid";
}

function redrawResultsMap(){
	
	var greenIcon = new L.Icon({
	    	iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
	    	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	    	iconSize: [25, 41],
	    	iconAnchor: [12, 41],
	    	popupAnchor: [1, -34],
	    	shadowSize: [41, 41]
    });
	
	//Remove all current markers
	for(var i = 0; i<oldMarkers.length; i++){
		resultsMap.removeLayer(oldMarkers[i]);
	}
	
	//Remove all current lines
	for(var i = 0; i<oldLines.length; i++){
		resultsMap.removeLayer(oldLines[i]);
	}
	
	//Remove all current spatial features
	for(var i = 0; i<oldGeoJSONLayers.length; i++){
		resultsMap.removeLayer(oldGeoJSONLayers[i]);
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
	spatialResult = spatialResults[currentSpatialResultIndex];
	spatialFeatures = spatialResult.getSpatialFeatures();
	for(var i = 0; i<spatialFeatures.length; i++){
		geoJSONLayer = L.geoJSON(spatialFeatures[i].getFeature(), {
			pointToLayer: function (feature, latlng) {
		        return L.marker(latlng, {icon: greenIcon});
		    }
		}).addTo(resultsMap);
		oldGeoJSONLayers.push(geoJSONLayer);
	}

	setFitBounds();
	
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
    
    var spatialResult = mainData.getSpatialResults()[currentSpatialResultIndex];
    var spatialFeatures = spatialResult.getSpatialFeatures();

    for(var i=0; i<spatialFeatures.length; i++){

    		var coordinates = spatialFeatures[i].getCoordinatesAsArray();

	    	for(var j=0; j<coordinates.length; j++){
	
	    		var lat = parseFloat(coordinates[j][1]);
	    		var lon = parseFloat(coordinates[j][0]);
	
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
    
    resultsMap.fitBounds([swLocation, neLocation]);
    
}