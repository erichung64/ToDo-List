let todoItems = [];

//creates new todo object that is pushed into array
function addTodo(text){
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };
    
    todoItems.push(todo);
    renderTodo(todoItems);
}
//select element
const form = document.querySelector('.js-form');
//add submit
form.addEventListener('submit', event => {
    //prevent page refresh
    event.preventDefault();
    //select the text input
    const input = document.querySelector('.js-todo-input')

    //get value of input and remove whitespace
    const text = input.nodeValue.trim();
    if (text !== ''){
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

function renderTodo(todo) {
    const list = document.querySelector('.js-todo-list');
    list.insertAdjacentHTML('beforeend', `
      <li class="todo-item" data-key="${todo.id}">
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo js-delete-todo">
          <svg><use href="#delete-icon"></use></svg>
        </button>
      </li>
    `);
  }

// Select the entire list
const list = document.querySelector('.js-todo-list');
// Add a click event listener to the list and its children
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});
function toggleDone(key) {
    // findIndex is an array method that returns the position of an element
    // in the array.
    const index = todoItems.findIndex(item => item.id === Number(key));
    // Locate the todo item in the todoItems array and set it's checked
    // property to the opposite. That means, `true` will become `false` and vice
    // versa.
    todoItems[index].checked = !todoItems[index].checked;
  
    // Find the todo item in the DOM using the `data-key` attribute
    const item = document.querySelector(`[data-key='${key}']`);
    // Add or remove the `done` class based on the value of the `checked` property
    if (todoItems[index].checked) {
      item.classList.add('done');
    } else {
      item.classList.remove('done');
    }
  }
//deletes items
function deleteTodo(key) {
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
  
    // select the list element and trim all whitespace if there are no todo items left
    const list = document.querySelector('.js-todo-list');
    if (todoItems.length === 0) list.innerHTML = '';
  }
const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  // add this `if` block
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});
