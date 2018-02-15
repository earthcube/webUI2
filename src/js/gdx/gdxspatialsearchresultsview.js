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
    
    var spatialResults = mainData.getSpatialResults();
    for(var i=0; i<spatialResults.length; i++){
    		L.geoJSON(spatialResults[i].getFeature()).addTo(resultsMap);
    }
   
}

function gotoSpatialSearchInputView(){
	document.getElementById("spatialSearchResultsView").style.display = "none";
	document.getElementById("spatialSearchInputView").style.display = "grid";
}