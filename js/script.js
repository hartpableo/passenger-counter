// declare variables
const taskInput = document.getElementById( 'task' );
const addTaskButton = document.getElementById( 'add-task-button' );
const editTaskButton = document.getElementById( 'edit-task-button' );
const tasksContainer = document.querySelector( '.tasks' );
const saveIndex = document.getElementById( 'save-index' );
const tasksGeneralControls = document.querySelector( '.tasks-general-controls' );
const removeAllButton = tasksGeneralControls.querySelector( '.empty-the-list' );
let todoArray = [];

// Display saved tasks
let tasks = localStorage.getItem( 'tasks' );

if ( tasks != null ) {
    displayTasksList();
}

// handler: check if value only has spaces
const onlySpaces = ( value ) => { return value.trim().length === 0 };

// Add task
addTaskButton.addEventListener( 'click', (e) => {

    e.preventDefault();

    // do NOT add task if spaces only
    if ( onlySpaces( taskInput.value ) == false ) {
        null;
    } else {
        return;
    }

    let tasks = localStorage.getItem( 'tasks' );
    ( tasks === null ) ? todoArray = [] : todoArray = JSON.parse( tasks );
    todoArray.push( taskInput.value );

    taskInput.value = '';

    localStorage.setItem( 'tasks', JSON.stringify( todoArray ) );

    displayTasksList();

});

// Display the tasks list
function displayTasksList() {

    let tasks = localStorage.getItem( 'tasks' );
    ( tasks === null ) ? todoArray = [] : todoArray = JSON.parse( tasks );

    let htmlCode = "";

    todoArray.forEach( ( listName, index ) => {
        htmlCode += `<li class="task-list-item list-group-item d-flex flex-wrap flex-md-nowrap justify-content-between align-items-start'" data-item="${index}">
        <span class="text-center text-md-start">${listName}</span>
        <div class="task-controls text-md-end text-center text-white mt-3 mt-md-0">
            <button onclick="done(${index})" class="complete d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Task Completed</small><i class="bi bi-check-lg"></i></button>
            <button onclick="deleteTodo(${index})" class="delete d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Delete Task</small><i class="bi bi-trash"></i></button>
            <button onclick="edit(${index})" class="edit d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Edit Task</small><i class="bi bi-pencil-square"></i></button>
        </div>
        </li>`;
    });

    tasksContainer.innerHTML = htmlCode;

    ( todoArray.length > 0 ) ? tasksGeneralControls.removeAttribute( 'style' ) : tasksGeneralControls.setAttribute( 'style', 'display: none !important;' );

}

// Delete task
function deleteTodo( index ) {
    let tasks = localStorage.getItem( 'tasks' );
    todoArray = JSON.parse( tasks );
    todoArray.splice( index, 1 );
    localStorage.setItem( 'tasks', JSON.stringify( todoArray ) );
    displayTasksList();
    ( todoArray.length > 0 ) ? tasksGeneralControls.removeAttribute( 'style' ) : null;
}

// Edit task
function edit( index ) {
    saveIndex.value = index;
    let tasks = localStorage.getItem( 'tasks' );
    todoArray = JSON.parse( tasks );
    taskInput.value = todoArray[ index ];
    addTaskButton.style.display = 'none';
    addTaskButton.setAttribute( 'disabled', '' );
    editTaskButton.style.display = 'block';
    editTaskButton.removeAttribute( 'disabled' );
}

// Done task
function done( index ) {

    let tasks = localStorage.getItem( 'tasks' );
    todoArray = JSON.parse( tasks );
    todoArray.splice( index, 1 );

    localStorage.setItem( 'tasks', JSON.stringify( todoArray ) );
    displayTasksList();
    ( todoArray.length > 0 ) ? tasksGeneralControls.removeAttribute( 'style' ) : tasksGeneralControls.setAttribute( 'style', 'display: none !important;' );

}

// Edit task: save
editTaskButton.addEventListener( 'click', () => {

    // do NOT add task if spaces only
    if ( onlySpaces( taskInput.value ) == false ) {
        null;
    } else {
        return;
    }

    let tasks = localStorage.getItem( 'tasks' );
    todoArray = JSON.parse( tasks );
    let id = saveIndex.value;
    todoArray[ id ] = taskInput.value;

    addTaskButton.style.display = 'block';
    addTaskButton.removeAttribute( 'disabled' );
    editTaskButton.style.display = 'none';
    editTaskButton.setAttribute( 'disabled', '' );

    taskInput.value = '';
    
    localStorage.setItem( 'tasks', JSON.stringify( todoArray ) );
    displayTasksList();

})

// Remove all tasks
removeAllButton.addEventListener( 'click', () => {
    let tasks = localStorage.getItem( 'tasks' );
    todoArray = JSON.parse( tasks );
    todoArray = [];
    localStorage.setItem( 'tasks', JSON.stringify( todoArray ) );
    displayTasksList();
    tasksGeneralControls.setAttribute( 'style', 'display: none !important;' );
})