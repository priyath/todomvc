
//Event Dispatcher. maintains a list of observers for a particular event.
function Event(notifier){

	this.notifier = notifier;
	this.listeners = [];

}

//methods to attach and notify listeners
Event.prototype = {

	attach: function(listener){this.listeners.push(listener);
	},
	notify: function(val){
				for (var i=0; i<this.listeners.length; i++){
					(this.listeners[i])(val);}
			}
}

//MODEL maintains data
function Model(){

	//maintains items added to the list
	this.list = [];

	//Item addition event. Contains observers (controller)
	this.ListModifiedEvent = new Event(this);

}

Model.prototype = {

	//add item to list and notify observers
	addItem: function (item){

	this.list.push(item);
	this.ListModifiedEvent.notify(this.list);

	},

	removeItem: function (id){
		this.list.splice(id,1);
		this.ListModifiedEvent.notify(this.list);
	}
}
 
//maintains the view. handles rendering
function View(){

	//button events. can attach listeners which will be notified once the event occurs
	this.addButtonEvent = new Event(this);
	this.removeButtonEvent = new Event(this);

	this.addButton = document.getElementById("addButton");
	this.listContainer = document.getElementById("mainList");

	//onclick listener triggers button event and notifies all observers. passses text input as args
	this.addButton.addEventListener('click', (function(){this.addButtonEvent.notify(this.userInput())}).bind(this));

	//parent ul element used to capture li element to be deleted. concept of event propogation
	this.listContainer.addEventListener('click', 
		(function(event){
			var el = event.target; //element that caused event propogation
			if (el.nodeName=="BUTTON"){
				this.removeButtonEvent.notify(el.id)
			}
		}).bind(this));

	//function to extract text input
	this.userInput = function(){
		return document.getElementById("input").value;
	}
}
 
//method to render the view. whole list is re-rendered everytime this method is called
View.prototype.render = function(list){

	var ul = (document.getElementsByTagName("ul"))[0];
	ul.innerHTML = "";

	for (var i=0; i<list.length; i++){

		var value = list[i].item;
		var li = document.createElement("li");
		li.innerHTML = value + "<button id=" + i + ">x</button>";
		ul.appendChild(li);
	}
}

//fascilitates communication between the view and the model 
function Controller(model,view){

	//if the item is valid, adds it to the model
	this.addItem = 
	function (item){
		if(item){
			model.addItem(new TodoItem(item));
		}
	};

	//remove item from model
	this.removeItem =
	function (id){
		model.removeItem(id);
	}

	//item is added to the model. update the view
	this.listModified = 
	function(list){
		view.render(list);
	}
 
	//Controller added as observer to events in the view and the model
	view.addButtonEvent.attach(this.addItem);
	view.removeButtonEvent.attach(this.removeItem);

	//listener on model. fired when the model is modified
	model.ListModifiedEvent.attach(this.listModified);
}

function TodoItem(item){

	this.item = item;
	this.isActive = true;

}

//initialize app
var model = new Model();
var view = new View(model);
var controller = new Controller(model,view);