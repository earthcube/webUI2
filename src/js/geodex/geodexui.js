var selectedIndexes = [];
var componentHeight = 30;

function initializeIndexCheckBoxes(data){
	
	var columnCounter = 0;
	var rowCounter = 0;

	for(i=0; i<data.length; i++){
		
		var parentDiv = document.getElementById(indexesParentElement);
		
		var newDiv = document.createElement("div"); 
		newDiv.id = data[i]["index"];
 		parentDiv.appendChild(newDiv); 

 		
 		$('#' + newDiv.id).jqxCheckBox({ width: 120, height: 25, checked: true});
 		selectedIndexes.push(newDiv.id);
 		
 		$('#' + newDiv.id).on('change', function(event){
            var checked = event.args.checked;
            if(checked){
               	selectedIndexes.push(newDiv.id);
            }else{
                remove(selectedIndexes, newDiv.id);
            }
        });
 		
 		columnCounter++;
 		
 		var newDiv = document.createElement("div"); 
		newDiv.id = data[i]["index"] + '_label';
 		parentDiv.appendChild(newDiv); 
 		newDiv.innerHTML = data[i]["name"];
 		newDiv.style.marginTop = "5px";
		newDiv.style.fontSize = "13px"; 
		newDiv.style.fontFamily = "Verdana"; 
		newDiv.style.textAlign = "left";
 		
 		columnCounter++;
 		
 		if(columnCounter==8){
 			columnCounter = 0;
 			rowCounter++;
 		}
 		
	}
	
	var gridTemplateRows = "";
	for(i=0; i<rowCounter; i++){
		if(i==(rowCounter-1)){
			gridTemplateRows += "auto";
		}else{
			gridTemplateRows += "auto ";
		}
	}
	
	parentDiv.style.display = "grid";
	parentDiv.style.gridRowGap = "10px";
	parentDiv.style.gridColumnGap = "10px";
	parentDiv.style.gridTemplateColumns = "25px 225px 25px 225px 25px 225px 25px 225px";
	parentDiv.style.gridTemplateRows = gridTemplateRows;
	
}

function remove(array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
    }
}