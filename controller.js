//fascilitates communication between the view and the model, data processing
function Controller(model,view){

	//process list button events. delete/complete/show lists
	this.processListButtonEvent = 
	function(el,input){

		var buttonName = el.name;

		//if input is valid, create an item object and add it to the model
		if (buttonName=="add"){
			if(input){
				model.addItem(new TodoItem(input));
			}
		}
		//remove item from model
		else if (buttonName=="remove")model.removeItem(el.id);

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

		//clear list
		else if (buttonName=="reset"){
			model.clear();
		}
	}
	

	//model modified. update the view
	this.listModified = 
	function(list){
		view.render(list);
	}

	//Controller added as observer to events in the view and the model
	//controller notified via observer pattern on view events and model modification
	view.listButtonEvent.attach(this.processListButtonEvent);
	model.listModifiedEvent.attach(this.listModified);
}
