class MainData{
	
	constructor(){
		this.providers = [];
		this.selectedProviders = [];
		this.spatialResults = [];
		this.textResults = [];
	}
	
	processDetails(data){
		var s = data["S"];
		var aname = data["Aname"];
		var name = data["Name"];
		var url = data["URL"];
		var description = data["Description"];
		var citation = data["Citation"];
		var datePublished = data["Datepublished"];
		var curl = data["Curl"];
		var keywords = data["Keywords"];
		var license = data["License"];
		return new Details(s, aname, name, url, description, citation, datePublished, curl, keywords, license);
	}
	
	processProviders(data){
		for(var i=0; i<data.length; i++){
			var index = 			data[i]["index"];
			var name = 			data[i]["name"];
			var description = 	data[i]["description"];
			var provider = new Provider(index, name, description);
			this.providers.push(provider);
		}
	}
	
	populateSelectedProviderTextResults(data){
		for(var i=0; i<data.length; i++){
			var dataProviderIndex = 		data[i]["index"];
			var dataProviderHighScore = 	data[i]["highscore"];
			var dataResultSetObject = 	data[i]["or"];
			var provider = this.getSelectedProviderByIndex(dataProviderIndex);
			if(provider){
				provider.setHighScore(dataProviderHighScore);
				provider.populateTextResults(dataResultSetObject);
			}
		}
	}
	
	populateSpatialResults(data){
		this.clearSpatialResults();
		var features = data["features"]
		for(var i=0; i<features.length; i++){
			var feature = 		features[i];
			var url = 			feature["properties"]["URL"];
			var spatialResult = this.getSpatialResult(url);
			if(spatialResult != null){
				spatialResult = this.getSpatialResult(url);
			}else{
				spatialResult = new SpatialResult(url);
				this.addSpatialResult(spatialResult);
			}
			var type = 			feature["geometry"]["type"];
			var coordinates = 	feature["geometry"]["coordinates"];
			var spatialFeature = new SpatialFeature(feature, url, type, coordinates);
			spatialResult.addSpatialFeature(spatialFeature);
		}
	}
	
	populateTextResults(data){
		this.clearTextResults();
		for(var i=0; i<data.length; i++){
			var position = 	data[i]["position"];
			var score = 		data[i]["score"];
			var url = 		data[i]["URL"];
			var textResult = new TextResult(position, score, url);
			this.addTextResult(textResult);
		}
	}
	
	addSpatialResult(spatialResult){
		this.spatialResults.push(spatialResult);
	}
	
	getSpatialResult(url){
		for(var i=0; i<this.spatialResults.length; i++){
			var spatialResult = this.spatialResults[i];
			if(spatialResult.getURL() == url){
				return spatialResult;
			}
		}
		return null;
	}
	
	getSpatialResults(){
		return this.spatialResults;
	}
	
	getSelectedProviderByIndex(index){
		for(var i=0; i<this.selectedProviders.length; i++){
			var provider = this.selectedProviders[i];
			if(provider.getIndex()==index){
				return provider;
			}
		}
	}
	
	addSelectedProvider(provider){
		this.selectedProviders.push(provider);
	}
	
	clearSelectedProviders(){
		this.selectedProviders = [];
	}
	
	getProviders(){
		return this.providers;
	}
	
	getSelectedProviders(){
		return this.selectedProviders;
	}
	
	clearSpatialResults(){
		this.spatialResults = [];
	}
	
	clearTextResults(){
		this.textResults = [];
	}
	
	getTextResults(){
		return this.textResults;
	}
	
	addTextResult(textResult){
		this.textResults.push(textResult);
	}
	
}

class Provider{
	
	constructor(index, name, description){
		this.index = index;
		this.name = name;
		this.description = description;
		this.textResults = [];
	}
	
	populateTextResults(data){
		this.clearTextResults();
		for(var i=0; i<data.length; i++){
			var position = 	data[i]["position"];
			var score = 		data[i]["score"];
			var url = 		data[i]["URL"];
			var textResult = new TextResult(position, score, url);
			this.addTextResult(textResult);
		}
	}
	
	getIndex(){
		return this.index;
	}
	
	getName(){
		return this.name;
	}
	
	getDescription(){
		return this.description;
	}
	
	setHighScore(highScore){
		this.highScore = highScore;
	}
	
	getHighScore(){
		return this.highScore;
	}
	
	addTextResult(textResult){
		this.textResults.push(textResult);
	}
	
	clearTextResults(){
		this.textResults = [];
	}
	
	getTextResults(){
		return this.textResults;
	}
	
}

class SpatialResult{
	
	constructor(url){
		this.url = url;
		this.spatialFeatures = [];
	}
	
	addSpatialFeature(spatialFeature){
		this.spatialFeatures.push(spatialFeature);
	}
	
	getURL(){
		return this.url;
	}
	
	getSpatialFeatures(){
		return this.spatialFeatures;
	}
	
}

class SpatialFeature{
	
	constructor(feature, url, type, coordinates){
		this.feature = feature;
		this.url = url;
		this.type = type;
		this.coordinates = this.processCoordinates(coordinates);
	}
	
	processCoordinates(coordinates){
		var coordinateArray = [];
		var array = coordinates.toString().split(",");
		for(var i=0; i<array.length; i+=2){
			coordinateArray.push([array[i], array[i+1]]);
		}
		return coordinateArray;
	}
	
	getFeature(){
		return this.feature;
	}
	
	getURL(){
		return this.url;
	}
	
	getCoordinatesAsGeoJSON(){
		var data = [];
		for(var i=0; i<this.coordinates.length; i++){
			var lat = this.coordinates[i][0];
			var lon = this.coordinates[i][1];
			data = data.push({"lat": lat, "lon": lon});
		}
		var geojson = GeoJSON.parse(data, {Point: ['lat', 'lon']});
    		return JSON.stringify(geojson);
	}
	
	getCoordinatesAsString(){
		var string = "";
		var length = 0;
		if(this.type=="Point"){
			length = this.coordinates.length;
		}else if(this.type=="Polygon"){
			length = this.coordinates.length-1
		}
		for(var i=0; i<length; i++){
			var lat = this.coordinates[i][1];
			var lon = this.coordinates[i][0];
			string += "[" + lat + ", " + lon + "]";
			if(i<(this.coordinates.length-2)){
				string += ", ";
			}
		}
    		return string;
	}
	
	getCoordinatesAsArray(){
		var array = [];
		for(var i=0; i<this.coordinates.length; i++){
			var lat = this.coordinates[i][0];
			var lon = this.coordinates[i][1];
			array.push([lat, lon]);
		}
    		return array;
	}
	
	getCoordinates(){
		return this.coordinates;
	}
	
	getType(){
		return this.type;
	}
	
}

class TextResult{
	
	constructor(position, score, url){
		this.position = position;
		this.score = score;
		this.url = url;
	}
	
	getPosition(){
		return this.position;
	}
	
	getScore(){
		return this.score;
	}
	
	getURL(){
		return this.url;
	}
	
}

class Details{
	
	constructor(s, aname, name, url, description, citation, datePublished, curl, keywords, license){
		this.s = s;
		this.aname = aname;
		this.name = name;
		this.url = url;
		this.description = description;
		this.citation = citation;
		this.datePublished = datePublished;
		this.curl = curl;
		this.keywords = keywords;
		this.license = license;
		
		if(this.s==""){
			this.s="Not Available"
		}
		
		if(this.aname==""){
			this.aname="Not Available"
		}
		
		if(this.name==""){
			this.name="Not Available"
		}
		
		if(this.url==""){
			this.url="Not Available"
		}
		
		if(this.description==""){
			this.description="Not Available"
		}
		
		if(this.citation==""){
			this.citation="Not Available"
		}
		
		if(this.datePublished==""){
			this.datePublished="Not Available"
		}

		if(this.keywords==""){
			this.keywords="Not Available"
		}
		
		if(this.license==""){
			this.license="Not Available"
		}
	}
	
	getS(){
		return this.s;
	}
	
	getAname(){
		return this.aname;
	}
	
	getName(){
		return this.name;
	}
	
	getURL(){
		return this.url;
	}
	
	getDescription(){
		return this.description;
	}
	
	getCitation(){
		return this.citation;
	}
	
	getDatePublished(){
		return this.datePublished;
	}
	
	getCurl(){
		return this.curl;
	}
	
	getKeywords(){
		return this.keywords;
	}
	
	getLicense(){
		return this.license;
	}
}