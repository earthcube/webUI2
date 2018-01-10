function createComponents(){
	
	//Create tabs for spatial and text search
    $('#tabbedPanel').jqxTabs({ width: '100%', height: 600, position: 'top'});

    var buttonWidth = 300;
    
    //Create buttons for spatial search functions
    $("#spatialRemoveButton").jqxButton({ width: buttonWidth, height: 40 });
	$("#spatialAddButton").jqxButton({ width: buttonWidth, height: 40 });
    $("#spatialUpdateButton").jqxButton({ width: buttonWidth, height: 40 });
    $("#spatialSubmitButton").jqxButton({ width: buttonWidth, height: 40 });
    
    //Create buttons for text search functions
    $("#textSubmitButton").jqxButton({ width: buttonWidth, height: 40 });
    
  	//Get dimensional properties 
    var container = $('#main');
    var containerOffset = container.offset();
    var containerWidth = container.width();
    var containerHeight = container.height();
    
}

function initialize(){

	//SPATIAL SEARCH BUTTON FUNCTIONS//////////////////////////
	$('#spatialUpdateButton').on('click', function (event) {

	});
	$('#spatialAddButton').on('click', function (event) {

	});
	$('#spatialRemoveButton').on('click', function (event) {

	});
	$('#spatialSubmitButton').on('click', function (event) {

	});
	
	//TEXT SEARCH BUTTON FUNCTIONS//////////////////////////////
	$('#textSubmitButton').on('click', function (event) {
		
	});
	
}

function performRESTCall(action, keyArray, valueArray){
	
	if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {

		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			var data = null
			if(xmlhttp.responseText!=""){
				data = JSON.parse(xmlhttp.responseText);
			}

			/*if(data!=null && data.hasOwnProperty('error')){
				document.getElementById("errorWindow_message").innerHTML = data.error;
				$('#errorWindow').jqxWindow('open');
				return;
			}*/
			
			//PARSE JSON RETURNED DATA HERE
			
		}
	
	};
	
	//CREATE POST TO WEB SERVICE
	var post = "ACTION=" + action;
	for(i=0; i<keyArray.length; i++){
		post += "&" + keyArray[i] + "=" + valueArray[i];
	}

	//SEND TO WEB SERVICE
	xmlhttp.open("POST", "../php/geodex.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(post);
	
}