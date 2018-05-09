function initializeDetailsView(){

	url = getQueryVariable("url");
    
    //Call and get current providers list
    var keyArray = ["r"];
   	var valueArray = [url];
    performWebServiceCall(WebServiceActions.GRAPH_DETAILS, keyArray, valueArray, updateAfterGraphDetails);
}

function updateAfterGraphDetails(data){
	details = mainData.processDetails(data);
	populateDetailsView(details);
}

function populateDetailsView(details){
	
	var displayElement = document.getElementById("detailsViewURLLabel");
	displayElement.innerHTML = "<b>Dataset Webpage URL: </b><a target=\"_blank\" href=\"" + details.getURL() + "\">" + details.getURL() + "</a>";
	
	var displayElement = document.getElementById("detailsViewSLabel");
	displayElement.innerHTML = "<b>URI: </b>" + details.getS();
	
	var displayElement = document.getElementById("detailsViewNameLabel");
	displayElement.innerHTML = "<b>Name: </b>" + details.getName();
	
	var displayElement = document.getElementById("detailsViewAnameLabel");
	displayElement.innerHTML = "<b>Alternate Name: </b>" + details.getAname();
	
	var displayElement = document.getElementById("detailsViewDescriptionLabel");
	displayElement.innerHTML = "<b>Description: </b>" + details.getDescription();
	
	var displayElement = document.getElementById("detailsViewCitationLabel");
	displayElement.innerHTML = "<b>Citation: </b>" + details.getCitation();
	
	var displayElement = document.getElementById("detailsViewDatePublishedLabel");
	displayElement.innerHTML = "<b>Date Published: </b>" + details.getDatePublished();
	
	var displayElement = document.getElementById("detailsViewCurlLabel");
	displayElement.innerHTML = "<b>Dataset Download Link: </b><a target=\"_blank\" href=\"" + details.getCurl() + "\">" + details.getCurl() + "</a>";
	
	if(details.getCurl()==""){
		displayElement.innerHTML = "<b>Dataset Download Link: </b>Not Available";
	}
	
	var displayElement = document.getElementById("detailsViewKeywordsLabel");
	displayElement.innerHTML = "<b>Keywords: </b>" + details.getKeywords();
	
	var displayElement = document.getElementById("detailsViewLicenseLabel");
	displayElement.innerHTML = "<b>License: </b>" + details.getLicense();
	
}