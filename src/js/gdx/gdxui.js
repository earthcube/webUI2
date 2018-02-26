function initializeIndexCheckBoxes(){
	
	var columnCounter = 0;
	var rowCounter = 0;
	var providers = mainData.getProviders();
	var parentDiv = document.getElementById(indexesParentElement);
	
	for(var i=0; i<providers.length; i++){
		
		var provider = providers[i];
		var newBoxDiv = document.createElement("div"); 
		newBoxDiv.id = provider.getIndex();
 		parentDiv.appendChild(newBoxDiv); 

 		$("#" + newBoxDiv.id).jqxCheckBox({ width: 120, height: 25, checked: true, theme: "darkblue"});

 		columnCounter++;
 		
 		var newLabelDiv = document.createElement("div"); 
		newLabelDiv.id = "label_" + provider.getIndex();
 		parentDiv.appendChild(newLabelDiv); 
 		newLabelDiv.innerHTML = provider.getName();
 		newLabelDiv.style.marginTop = "5px";
		newLabelDiv.style.fontSize = "13px"; 
		newLabelDiv.style.fontFamily = "Verdana"; 
		newLabelDiv.style.textAlign = "left";
 		
 		columnCounter++;
 		
 		if(columnCounter==8){
 			columnCounter = 0;
 			rowCounter++;
 		}
 		
	}
	
	var gridTemplateRows = "";
	for(var i=0; i<rowCounter; i++){
		if(i==(rowCounter-1)){
			gridTemplateRows += "auto";
		}else{
			gridTemplateRows += "auto ";
		}
	}
	
	parentDiv.style.display = "grid";
	parentDiv.style.gridRowGap = "10px";
	parentDiv.style.gridColumnGap = "10px";
	parentDiv.style.gridTemplateColumns = "20px 230px 20px 230px 20px 230px 20px 230px";
	parentDiv.style.gridTemplateRows = gridTemplateRows;
	
}