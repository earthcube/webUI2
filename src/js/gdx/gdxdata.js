class MainData{
	
	constructor() {
		this.providers = [];
		this.selectedProviders = [];
	}
	
	processProviders(data){
		
		for(i=0; i<data.length; i++){
			var index = 			data[i]["index"];
			var name = 			data[i]["name"];
			var description = 	data[i]["description"];
			var provider = new Provider(index, name, description);
			this.providers.push(provider);
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