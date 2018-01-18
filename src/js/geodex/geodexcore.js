

/*function performRESTCall(action, keyArray, valueArray){
	
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

			if(data!=null && data.hasOwnProperty('error')){
				document.getElementById("errorWindow_message").innerHTML = data.error;
				$('#errorWindow').jqxWindow('open');
				return;
			}
			
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
	
}*/