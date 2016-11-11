//MODEL maintains data and handles business logic
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

	//mark item specified by id as complete and  notify observers
	completeItem: function (id){

		var item = this.list[id];

			item.isActive= !item.isActive;
			this.listModifiedEvent.notify(this.list);
		
	},

	//show list with all items, complete and active
	showAll: function(){

		for (var i=0; i<this.list.length; i++){
			this.list[i].visible=true;
		}
		this.listModifiedEvent.notify(this.list);
	},

	//sets the visible property of items to true if active, false otherwise. notifies observers
	showActive: function(){

		for (var i=0; i<this.list.length; i++){

			var item = this.list[i];
			if (item.isActive)item.visible=true;
			else item.visible=false;
		}
		this.listModifiedEvent.notify(this.list);
	},

	//sets the visiblity property of items to true if complete, false otherwise. notifies observers
	showComplete: function(){

		for (var i=0; i<this.list.length; i++){

			var item = this.list[i];
			if (!item.isActive)item.visible=true;
			else item.visible=false;
		}
		this.listModifiedEvent.notify(this.list);
	},

	clear: function(){

		this.list.length = 0;
		this.listModifiedEvent.notify(this.list);
	},

	saveToLocal: function(){
		console.log("save: " + JSON.stringify(this.list));
		localStorage.setItem("todoItemsList", JSON.stringify(this.list));
	},

	remember: function(){

		var localStore = localStorage.getItem("todoItemsList");
		if (localStore){
			this.list = JSON.parse(localStore);
			
		}
	}

}