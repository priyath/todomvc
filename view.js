//maintains the view. handles rendering
function View(){

	//user interaction events. Event object used to implement observer pattern
	//listeners attached to event object notified once event occurs
	//observer pattern used for communication between view and controller
	this.addButtonEvent = new Event(this);
	this.listButtonEvent = new Event(this);

	//retrieve dom elements 
	this.addButton = document.getElementById("addButton");
	this.listContainer = document.getElementById("mainList");
	this.bodyElement = document.body;

	//add item event. onclick, addButtonEvent notifies all attached listeners
	this.addButton.addEventListener('click', (function(){this.addButtonEvent.notify(this.userInput())}).bind(this));

	//list modification events. delete/complete/show lists
	//concept of event propogation used to catch button events at the body element
	this.bodyElement.addEventListener('click',(function(event){
			var el = event.target; //element that caused event propogation
			if (el.nodeName=="BUTTON"){
				console.log("element " + el);
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

		//only build elements that are visible. controls active and complete task visibility
		if (listItem.visible){
			var value = listItem.item;
			var li = document.createElement("li");
			li.innerHTML = value + "<button name='remove' id=" + i + ">x</button>" + "<button name='complete' id=" + i + ">&#10003;</button>";
			
			//cross out completed items
			if (!listItem.isActive)
				li.style.setProperty("text-decoration", "line-through");
			ul.appendChild(li);
		}
	}
}