# todomvc
a raw javascript implementation of a todo-list following mvc concepts

The view communicates user interactions to the controller via the observer pattern. The controller notifies the model.
The model updates the data representation and notifies the controller of the change. The controller then asks the view
to re-render itself

View
Listeners attached to handle user interactions. Communicates with the controller via the observer pattern.
Renders the view once notified by the controller.

Model
Maintains an array of items. Handles the data and the business logic. Notifies the controller of model modification
through the observer pattern

Controller
Fascilitates communication between the view and the model. Contains references to both the view and the model. Subscribed as an
observer to both. (retrieves user interactions from the view and communicates them to the model. Notifies the view to render
itself when the model changes)

basic functionality includes adding items, delete, mark as completed, view completed tasks, active tasks
