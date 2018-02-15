class MainData{
	
	constructor(){
		this.providers = [];
		this.selectedProviders = [];
		this.spatialResults = [];
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
			provider.setHighScore(dataProviderHighScore);
			provider.populateTextResults(dataResultSetObject);
		}
	}
	
	populateSpatialResults(data){
		var features = data["features"]
		for(var i=0; i<features.length; i++){
			var feature = 		features[i];
			var url = 			feature["properties"]["URL"];
			var type = 			feature["geometry"]["type"];
			var coordinates = 	feature["geometry"]["coordinates"];
			var spatialResult = new SpatialResult(url, type, coordinates);
			this.addSpatialResult(spatialResult);
		}
	}
	
	addSpatialResult(spatialResult){
		this.spatialResults.push(spatialResult);
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
	
	removeSelectedProvider(provider){
		remove(this.providers, provider);
	}
	
	getProviders(){
		return this.providers;
	}
	
	getSelectedProviders(){
		return this.selectedProviders;
	}
	
	addSpatialResult(spatialResult){
		this.spatialResults.push(spatialResult);
	}
	
	clearSpatialResults(){
		this.spatialResults = [];
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
		for(var i=0; i<data.length; i++){
			var position = 	data[i]["Position"];
			var score = 		data[i]["Score"];
			var id = 		data[i]["ID"];
			var textResult = new TextResult(position, score, id);
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
	
}

class SpatialResult{
	
	constructor(url, type, coordinates){
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
	
	getType(){
		return this.type;
	}
	
}

class TextResult{
	
	constructor(position, score, id){
		this.position = position;
		this.score = score;
		this.id = id;
	}
	
	getPosition(){
		return this.position;
	}
	
	getScore(){
		return this.score;
	}
	
	getID(){
		return this.id;
	}
	
}