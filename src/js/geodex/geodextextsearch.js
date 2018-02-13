var indexesParentElement = "textSearchPanel2";

function initializeTextSearchPanel(){

	//Create text fields
    $("#textSearchValueField").jqxInput({ width: '100%', height: componentHeight });
	
    //Create buttons
    $("#textSearchSubmitButton").jqxButton({ width: '100%', height: componentHeight });
    
    //Add event listeners
    $('#textSearchSubmitButton').on('click', function (event) {
    		var keyArray = ["q", "s", "n"];
    		var valueArray = [$("#textSearchValueField").jqxInput("val"), "0", "100"];
		performWebServiceCall(WebServiceActions.TEXTINDEX_SEARCHSET, keyArray, valueArray);
	});
    
    //Call and get current providers list
    var keyArray = [];
   	var valueArray = [];
    performWebServiceCall(WebServiceActions.TYPEAHEAD_PROVIDERS, keyArray, valueArray);
    
}