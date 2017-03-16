(function(){ //Immediately-Invoked Function Expression (IIFE)

'use strict';

var todos = localStorage.getItem('todos');
if(todos){
	todos = JSON.parse(todos);
}else{
	todos = [];
};

var todoForm = document.getElementById('todo-form');
var todoList = document.getElementById('todo-list');
var todoInput = document.querySelector('#todo-form input');

var addItem = function(event){
		/*We can cancel the default by using"event.preventDefault();".
		For example, "submit" tries to transit but "event.preventDefault();"
		do not allow to do so.*/

		event.preventDefault();

		//If there is no item in the form, do not do anything!
		if (!todoInput.value){
			return;
		}; //end if

		/* In this area, try to add items into todos(array).
	 	We neeed to add contents, including exact items and also whether items are 
	 	completed or not.
	 	"text is key." "Done: false" means items are not completed. */
		
		todos.push({text: todoInput.value, done: false});
		render();

		/*After adding items into the list, do not allow 
	 	the list to add space.*/
	 	
	 	todoInput.value = '';
}; //end of addItem function
 
var render = function(){
		/*To reset the list.
	 	"innerHTML" means elemetns inside HTML.*/
		todoList.innerHTML ='';
	
			/* To see each elements in an array, we use forEach.
	 		"forEach" allow us to check each element in array.
	 		"todo" is parameter. */
			todos.forEach(function(todo){

				var span = document.createElement('span');
				// span.textContent = todoInput.value;
				span.textContent = todo.text;

				//By making label, we can click the item.
				var label = document.createElement('label');
				label.appendChild(span);

			


				/* This is a delete button, which can remove the 
				   item we don't want.*/
				var deleteButton = document.createElement('button');
				deleteButton.textContent = 'delete';
 				deleteButton.addEventListener('click', function(){
 				//In todos(array), todo is which number?
 				//"indexOf" 
 				todos.splice();
 				var index = todos.indexOf(todo);
 				todos.splice(index,1);
 				render();

 				});

		

 		//This is the place where items are added.
		var listItem = document.createElement('li');

		/* For example, "appendChild" means that we can 
	 	put "label" as a child for listItem.*/
		listItem.appendChild(label);
		listItem.appendChild(deleteButton);

		todoList.appendChild(listItem);

		/*We need to change from array to strign, 
	 	so we use "JSON.stringify".*/
		localStorage.setItem('todos', JSON.stringify(todos));
	
 			}); //end todos.forEach
};

	var deleteItem = function(event){
		/*"event.target.parentElement" can pick up the 
	 	parent element of "delete button"(We can pick up the item we want to delete)*/
		var listItem = event.target.parentElement;
		/*If the item(listItem, a kind of element) we want to delete in todoList(), delete the item.
	 	removeChild is a kind of method.*/
		todoList.removeChild(listItem);

	}; //var deleteItem



/*By using "submit" instead of "click", we can also add items 
 to the list by using both "click" and "pressing Enter(return)."*/
todoForm.addEventListener('submit', addItem);
render();


}());

