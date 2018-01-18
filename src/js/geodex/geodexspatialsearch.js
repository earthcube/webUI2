function createComponents(){
    
    //SPATIAL SEARCH COMPONENTS///////////////////////////////
    //Create buttons
    $("#spatialSearchRemoveButton").jqxButton({ width: 300, height: 40 });
	$("#spatialSearchAddButton").jqxButton({ width: 300, height: 40 });
    $("#spatialSearchUpdateButton").jqxButton({ width: 300, height: 40 });
    $("#spatialSearchSubmitButton").jqxButton({ width: 300, height: 40 });
    
    //Create fields for location entry
    $("#spatialSearchLatField").jqxInput({height: 40, width: 200});
    $("#spatialSearchLonField").jqxInput({height: 40, width: 200});
    
    //Create list for holding locations
    $("#spatialSearchListBox").jqxListBox({width: 200, height: 250 });
    
    //Create Leaflet Map
    var mymap = L.map('spatialSearchMap').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWxpbmdlcmYiLCJhIjoiY2pjamhlZTl1NGRxazJxbzU0OHE5d3ZxNyJ9.n7A_BBoZxnpA2izU3McwSQ', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    
}

function initialize(){
	
	//SPATIAL SEARCH BUTTON FUNCTIONS//////////////////////////
	$('#spatialSearchUpdateButton').on('click', function (event) {

	});
	$('#spatialSearchAddButton').on('click', function (event) {

	});
	$('#spatialSearchRemoveButton').on('click', function (event) {

	});
	$('#spatialSearchSubmitButton').on('click', function (event) {

	});
	
}