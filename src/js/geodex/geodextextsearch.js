var indexesParentElement = "textSearchPanel2";

function initializeTextSearchPanel(){

	//Create text fields
    $("#textSearchValueField").jqxInput({ width: '100%', height: componentHeight });
	
    //Create buttons
    $("#textSearchSubmitButton").jqxButton({ width: '100%', height: componentHeight });
    
    //Add event listeners
    $('#textSearchSubmitButton').on('click', function (event) {
    	
    		document.getElementById("geodexWaitWindowMessage").innerHTML = "Please wait while data is loaded from Geodex.org.";
		$('#geodexWaitWindow').jqxWindow('open');
    	
    		var keyArray = ["q", "s", "n"];
    		var valueArray = [$("#textSearchValueField").jqxInput("val"), "0", "100"];
		performWebServiceCall(WebServiceActions.TEXTINDEX_SEARCHSET, keyArray, valueArray, updateAfterTextindexSearchset);
		
	});
    
    //Create wait window 
    $('#geodexWaitWindow').jqxWindow({  
    		title: 'Please Wait...',
    		width: 400,
        height: 140, 
        resizable: true,
        autoOpen: false,
        isModal: true,
        //position: { x: containerWidth/2 - 200, y: 300 - 70},
    });
    
    //Call and get current providers list
    var keyArray = [];
   	var valueArray = [];
    performWebServiceCall(WebServiceActions.TYPEAHEAD_PROVIDERS, keyArray, valueArray, updateAfterTypeaheadProviders);
    
}

function updateAfterTypeaheadProviders(data){
	initializeIndexCheckBoxes(data);
}

function updateAfterTextindexSearchset(data){
	
}

function updateAfterTextindexSearch(data){
	
}