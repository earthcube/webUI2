function initializeTextSearchPanel(){

	indexesParentElement = "textSearchPanel2";
	
	//Create text fields
    $("#textSearchValueField").jqxInput({ width: '100%', height: componentHeight });
    
    //Create buttons
    $("#textSearchSubmitButton").jqxButton({ width: '100%', height: componentHeight });
    
    //Add event listeners
    $('#textSearchSubmitButton').on('click', function (event) {
    	
    		document.getElementById("gdxWaitWindowMessage").innerHTML = "Please wait while data is loaded from Geodex.org.";
		$('#gdxWaitWindow').jqxWindow('open');
    	
		if(totalNumIndexes==selectedIndexes.length){
			var keyArray = ["q", "s", "n"];
    			var valueArray = [$("#textSearchValueField").jqxInput("val"), "0", "100"];
			performWebServiceCall(WebServiceActions.TEXTINDEX_SEARCHSET, keyArray, valueArray, updateAfterTextindexSearchset);
		}else{
			for(i=0; i<selectedIndexes.length; i++){
				var keyArray = ["q", "s", "n", "i"];
    				var valueArray = [$("#textSearchValueField").jqxInput("val"), "0", "100", selectedIndexes[i]];
				performWebServiceCall(WebServiceActions.TEXTINDEX_SEARCH, keyArray, valueArray, updateAfterTextindexSearch);
			}
		}
		
	});
    
    //Create wait window 
    $('#gdxWaitWindow').jqxWindow({  
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
	mainData.processProviders(data);
	initializeIndexCheckBoxes();
}

function updateAfterTextindexSearchset(data){
	$('#gdxWaitWindow').jqxWindow('close');
	document.getElementById('output').innerHTML = JSON.stringify(data);
	
}

function updateAfterTextindexSearch(data){
	$('#gdxWaitWindow').jqxWindow('close');
	document.getElementById('output').innerHTML = JSON.stringify(data);
}