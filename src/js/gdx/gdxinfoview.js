function initializeInfoView(){

	//Create error window 
    $('#gdxErrorWindow').jqxWindow({  
    		title: 'Attention!',
    		width: 400,
        height: 140, 
        resizable: true,
        autoOpen: false,
        isModal: true,
        theme: "darkblue"
    });
    $("#gdxErrorWindowOKButton").jqxButton({ width: 75, height: 30, theme: "darkblue" });
    $("#gdxErrorWindowOKButton").on("click", gdxErrorWindowOKButtonClicked);
    
    //Create wait window 
    $('#gdxWaitWindow').jqxWindow({  
    		title: 'Please Wait...',
    		width: 400,
        height: 140, 
        resizable: true,
        autoOpen: false,
        isModal: true,
        theme: "darkblue"
    });
    
}