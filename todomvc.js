
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
	this.listModifiedEvent = new Event(this);

}

Model.prototype = {

	//add item to list and notify observers
	addItem: function (item){

	this.list.push(item);
	this.listModifiedEvent.notify(this.list);

	},
 
	//remove item from list and notify observers
	removeItem: function (id){
		this.list.splice(id,1);
		this.listModifiedEvent.notify(this.list);
	},

	//mark items as complete and  notify observers
	completeItem: function (id){

		var item = this.list[id];
		if (item.isActive){
			item.isActive=false;
			this.listModifiedEvent.notify(this.list);
		}
	}


}
 
//maintains the view. handles rendering
function View(){

	//button events. can attach listeners which will be notified once the event occurs
	this.addButtonEvent = new Event(this);
	this.listButtonEvent = new Event(this);

	this.addButton = document.getElementById("addButton");
	this.listContainer = document.getElementById("mainList");

	//add item event. notifies all observers. passses text input as args
	this.addButton.addEventListener('click', (function(){this.addButtonEvent.notify(this.userInput())}).bind(this));

	//parent ul element used to capture list button events. concept of event propogation
	this.listContainer.addEventListener('click', 
		(function(event){
			var el = event.target; //element that caused event propogation
			if (el.nodeName=="BUTTON"){
				this.listButtonEvent.notify(el)
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

		//build li element and append to ul
		var listItem = list[i];
		var value = listItem.item;
		var li = document.createElement("li");
		li.innerHTML = value + "<button name='remove' id=" + i + ">x</button>" + "<button name='complete' id=" + i + ">&#10003;</button>";
		
		//cross out completed items
		if (!listItem.isActive)
			li.style.setProperty("text-decoration", "line-through");
		ul.appendChild(li);
	}
}

//fascilitates communication between the view and the model, data processing
function Controller(model,view){

	//process list button events. delete/complete
	this.processListButtonEvent = 
	function(el){

		//remove item from model
		if (el.name=="remove")model.removeItem(el.id);

		//mark items as complete
		else if (el.name=="complete"){
			model.completeItem(el.id);}
	}

	//if the item is valid, create an item object and add it to the model
	this.addItem = 
	function (item){
		if(item){
			model.addItem(new TodoItem(item));
		}
	};

	//model modified. update the view
	this.listModified = 
	function(list){
		view.render(list);
	}
 
	//Controller added as observer to events in the view and the model
	view.addButtonEvent.attach(this.addItem);
	view.listButtonEvent.attach(this.processListButtonEvent);

	//listener on model. fired when the model is modified
	model.listModifiedEvent.attach(this.listModified);
}

//object representation of an item
function TodoItem(item){

	this.item = item;
	this.isActive = true;

}

//initialize app
var model = new Model();
var view = new View(model);
var controller = new Controller(model,view);