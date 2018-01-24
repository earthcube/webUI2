function initializeSpatialSearchPanel(){
	
	//Set initial location to Boulder, CO.
	var currentLocation = [40.0150, -105.2705]
	
    //Create Leaflet Map
    var map = L.map('spatialSearchMap').setView(currentLocation, 13);
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

    var marker = L.marker(currentLocation, {icon: greenIcon}).addTo(map);
    
    //Create fields for location entry
   	$("#spatialSearchLatField").jqxInput({height: 40, width: '100%'});
    $("#spatialSearchLonField").jqxInput({height: 40, width: '100%'});
    
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
	
	//IMPORTANT! This line of javascript must go last in this function or other JS breaks after this is called
	//Create list for holding locations
    $("#spatialSearchListBox").jqxListBox({height: '100%', width: '100%'});
    
    
	
}

function spatialSearchUpdateButtonClicked(){
	$("#spatialSearchLatField").jqxInput('val', 'HELP!');
}

function spatialSearchAddButtonClicked(){
	
}

function spatialSearchRemoveButtonClicked(){
	
}

function spatialSearchSubmitButtonClicked(){
	
}

