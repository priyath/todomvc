//fascilitates communication between the view and the model, data processing
function Controller(model,view){

	//process list button events. delete/complete/show lists
	this.processListButtonEvent = 
	function(el){

		var buttonName = el.name;
		console.log(buttonName);
		//remove item from model
		if (buttonName=="remove")model.removeItem(el.id);

		//mark items as complete
		else if (buttonName=="complete"){
			model.completeItem(el.id);}

		//generate all tasks list
		else if (buttonName=="list"){
			model.showAll();
		}

		//generate active tasks list
		else if (buttonName=="activeList"){
			model.showActive();
		}

		//generate complete tasks list
		else if (buttonName=="completeList"){
			model.showComplete();
		}
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
	//controller notified via observer pattern on view events and model modification
	view.addButtonEvent.attach(this.addItem);
	view.listButtonEvent.attach(this.processListButtonEvent);
	model.listModifiedEvent.attach(this.listModified);
}
