function initializeTextSearchResultsView(){

	$("#textSearchResultsSplitter").jqxSplitter({  width: "100%", height: 800, panels: [{ size: '25%'}] });
	
	var providerListBoxData = [];
	for(var i=0; i<mainData.getSelectedProviders().length; i++){
		var provider = mainData.getSelectedProviders()[i];
		providerListBoxData.push(provider.getName());
	}
		
    $("#textSearchResultsProviderListBox").jqxListBox({ selectedIndex: 0, source: providerListBoxData, width: "100%", height: 800 });
    $("#textSearchResultsResultsListBox").jqxListBox({ width: "100%", height: 800 });
            
   	$("#textSearchResultsProviderListBox").on("select", function (event) {
   		var provider = mainData.getSelectedProviders()[event.args.index];
		updateResultsListBox(provider);
	});
   	
   	updateResultsListBox(mainData.getSelectedProviders()[0]);
}

function updateResultsListBox(provider){
	
	var results = provider.getTextResults();
	var resultsListBoxData = [];
	
	for(var i=0; i<results.length; i++){
		var result = results[i];
		resultsListBoxData.push(result.getURL());
	}
	
	$("#textSearchResultsResultsListBox").jqxListBox({source: resultsListBoxData});
	$("#textSearchResultsResultsListBox").jqxListBox({selectedIndex: 0 });
	
}

function gotoTextSearchInputView(){
	document.getElementById("textSearchResultsView").style.display = "none";
	document.getElementById("textSearchInputView").style.display = "grid";
}

