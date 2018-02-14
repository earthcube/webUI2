class MainData{
	
	constructor() {
		this.providers = [];
		this.selectedProviders = [];
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
	
	populateSelectedProviderResults(data){
		for(var i=0; i<data.length; i++){
			var dataProviderName = 		data[i]["Name"];
			var dataProviderHighScore = 	data[i]["HighScore"];
			var dataResultSetObject = 	data[i]["OR"];
			var provider = this.getSelectedProviderByName(dataProviderName);
			provider.setHighScore(dataProviderHighScore);
			provider.populateResults(dataResultSetObject);
		}
	}
	
	getSelectedProviderByName(name){
		for(var i=0; i<this.selectedProviders.length; i++){
			var provider = this.selectedProviders[i];
			if(provider.getIndex()==name){
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
	
}

class Provider{
	
	constructor(index, name, description) {
		this.index = index;
		this.name = name;
		this.description = description;
		this.results = [];
	}
	
	populateResults(data){
		for(var i=0; i<data.length; i++){
			var position = 	data[i]["Position"];
			var score = 		data[i]["Score"];
			var id = 		data[i]["ID"];
			var result = new Result(position, score, id);
			this.addResult(result);
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
	
	addResult(result){
		this.results.push(result);
	}
	
	clearResults(){
		this.results = [];
	}
	
}

class Result{
	
	constructor(position, score, id) {
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