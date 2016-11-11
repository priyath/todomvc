//initialize app
var model = new Model();
var view = new View();
var controller = new Controller(model,view);

window.onload = loadOnStart;
window.onbeforeunload = function(){ 
	saveOnExit();
	return null;
}

//load item list from local storage and render page
function loadOnStart(){
	model.remember();
	model.showAll();
}

//save item list to local storage on exit. remember state
function saveOnExit(){
	model.saveToLocal();
}