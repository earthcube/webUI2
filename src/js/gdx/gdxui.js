function initializeIndexCheckBoxes(){
	
	var columnCounter = 0;
	var rowCounter = 0;
	var providers = mainData.getProviders();
	
	for(var i=0; i<providers.length; i++){
		
		var provider = providers[i];
		var parentDiv = document.getElementById(indexesParentElement);
		
		var newDiv = document.createElement("div"); 
		newDiv.id = 'box_' + provider.getIndex();
 		parentDiv.appendChild(newDiv); 

 		$("#" + newDiv.id).jqxCheckBox({ width: 120, height: 25, checked: true});
 		mainData.addSelectedProvider(provider);
 		
 		$("#" + newDiv.id).on('change', function(event){
            var checked = event.args.checked;
            if(checked){
            		mainData.addSelectedProvider(provider);
            }else{
                mainData.removeSelectedProvider(provider);
            }
        });

 		columnCounter++;
 		
 		var newDiv = document.createElement("div"); 
		newDiv.id = "label_" + provider.getIndex();
 		parentDiv.appendChild(newDiv); 
 		newDiv.innerHTML = provider.getName();
 		newDiv.style.marginTop = "5px";
		newDiv.style.fontSize = "13px"; 
		newDiv.style.fontFamily = "Verdana"; 
		newDiv.style.textAlign = "left";
 		
 		columnCounter++;
 		
 		if(columnCounter==6){
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
	parentDiv.style.gridTemplateColumns = "20px 247px 20px 247px 20px 246px";
	parentDiv.style.gridTemplateRows = gridTemplateRows;
	
}