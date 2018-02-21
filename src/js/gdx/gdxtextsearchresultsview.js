function initializeTextSearchResultsView(){

	if(!textSearchResultsViewInitialized){
		
		//Create buttons
	    $("#textSearchResultsBackButton").jqxButton({ width: "333px", height: componentHeight, theme: "darkblue" });
		
	    $('#textSearchResultsBackButton').on('click', function (event) {
	    		gotoTextSearchInputView();
		});
	    
		$("#textSearchResultsSplitter").jqxSplitter({  width: "100%", height: 800, panels: [{ size: '40%'}], theme: "darkblue" });
		
		$("#textSearchResultsProviderListBox").on("select", function (event) {
   			var provider = selectedProvidersWithTextResults[event.args.index];
			updateResultsListBox(provider);
		});
   	
   		$("#textSearchResultsResultsListBox").jqxListBox({ width: "100%", height: 800, theme: "darkblue" });
		
		textSearchResultsViewInitialized = true;
	}
	
	var selectedProvidersWithTextResults = [];
	for(var i=0; i<mainData.getSelectedProviders().length; i++){
		var provider = mainData.getSelectedProviders()[i];
		if(provider.getTextResults().length>0){
			selectedProvidersWithTextResults.push(provider);
		}
	}
	
	var providerListBoxData = [];
	for(var i=0; i<selectedProvidersWithTextResults.length; i++){
		var provider = selectedProvidersWithTextResults[i];
		var providerArray = {};
		providerArray["Index"] = provider.getIndex();
		providerArray["Name"] = provider.getName();
		providerArray["NumResults"] = provider.getTextResults().length;
		providerArray["Description"] = provider.getDescription();
		providerArray["HighScore"] = provider.getHighScore();
		providerListBoxData.push(providerArray);
	}
    var providerListBoxDataSource = {localdata: providerListBoxData, datatype: "array"};
    var providerListBoxDataAdapter = new $.jqx.dataAdapter(providerListBoxDataSource);

    $("#textSearchResultsProviderListBox").jqxListBox({ selectedIndex: 0, source: providerListBoxDataAdapter, 
    		displayMember: "Name", valueMember: "Index", itemHeight: 100, width: "100%", height: 800, theme: "darkblue",
	    	renderer: function (index, label, value){
	    		var providerListBoxDataRecord = providerListBoxData[index];
	    		var name = 			providerListBoxDataRecord["Name"];
	    		var description = 	providerListBoxDataRecord["Description"];
	    		var numResults = 	providerListBoxDataRecord["NumResults"];
	    		var highScore = 		parseFloat(providerListBoxDataRecord["HighScore"]).toFixed(5);
	    		var table = '<table>' 
	    					+ '<tr><td>' 
	    					+ '<b>' + name + "</b>"
	    					+ '</td></tr>' 
	    					+ '<tr><td>' 
	    					+ description
	    					+ '</td></tr>'
	    					+ '<tr><td>Number of Results: ' 
	    					+ numResults
	    					+ '</td></tr>'
	    					+ '<tr><td>High Score: ' 
	    					+ highScore
	    					+ '</td></tr>'
	    					+ '</table>';
	    		return table;
	    	}
    });
     
   	updateResultsListBox(selectedProvidersWithTextResults[0]);
}

function updateResultsListBox(provider){
	
	$("#textSearchResultsResultsListBox").jqxListBox('clear'); 
	$("#textSearchResultsResultsListBox").jqxListBox('beginUpdate'); 
	
	var results = provider.getTextResults();
	var resultsListBoxData = [];
	for(var i=0; i<results.length; i++){
		var result = results[i];
		var resultArray = [];
		resultArray["Score"] = 	result.getScore();
		resultArray["URL"] = 	result.getURL();
		resultsListBoxData.push(resultArray);
	}
	
	for(var i=0; i<resultsListBoxData.length; i++){
		console.log(resultsListBoxData[i]);
	}
	
    var resultsListBoxDataSource = {localdata: resultsListBoxData, datatype: "array"};
    var resultsListBoxDataAdapter = new $.jqx.dataAdapter(resultsListBoxDataSource);
    
	$("#textSearchResultsResultsListBox").jqxListBox({ selectedIndex: 0, source: resultsListBoxDataAdapter, displayMember: "URL", valueMember: "URL", itemHeight: 70, 
		renderer: function (index, label, value){
	    		var resultsListBoxDataRecord = resultsListBoxData[index];
	    		var url = 		resultsListBoxDataRecord["URL"];
	    		var score = 		parseFloat(resultsListBoxDataRecord["Score"]).toFixed(5);
	    		var table = '<table cellpadding="5">' 
	    					+ '<tr><td>' 
	    					+ '<b><a target="_blank" href="' + url + '">' + url + "</a></b>"
	    					+ '</td></tr>' 
	    					+ '<tr><td>Score: ' 
	    					+ score
	    					+ '</td></tr>'
	    					+ '</table>';
	    		return table;
	    	}
	});
	
	$("#textSearchResultsResultsListBox").jqxListBox('endUpdate'); 
	
}

function gotoTextSearchInputView(){
	document.getElementById("textSearchResultsView").style.display = "none";
	document.getElementById("textSearchInputView").style.display = "grid";
}

