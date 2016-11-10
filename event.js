//Event Dispatcher. maintains a list of observers for a particular event.
//Used for communication between view-controller and model-controller
function Event(notifier){

	this.notifier = notifier;
	this.listeners = [];

}

//methods to attach and notify listeners
Event.prototype = {

	attach: function(listener){this.listeners.push(listener);
	},
	notify: function(val1,val2){
				for (var i=0; i<this.listeners.length; i++){
					(this.listeners[i])(val1,val2);}
			}
}
