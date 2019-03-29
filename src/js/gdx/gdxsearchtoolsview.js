function initializeSearchToolsView(){
    
    //Create buttons
    $("#searchToolsTextSearchButton").jqxButton({ width: "333px", height: "50px", theme: "darkblue" });
    $("#searchToolsSpatialSearchButton").jqxButton({ width: "333px", height: "50px", theme: "darkblue" });
    
     //Add event listeners
    $('#searchToolsTextSearchButton').on('click', function (event) {
    		window.open("textSearch.html"); 
    });
    
    $('#searchToolsSpatialSearchButton').on('click', function (event) {
    		window.open("spatialSearch.html"); 
    });
    
}