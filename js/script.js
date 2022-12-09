// declare variables
const inputField = document.querySelector('#task');
const submitTask = document.querySelector('#task-button');
const taskForm = document.querySelector('#task-form')
const taskList = document.querySelector('.tasks');
const taskListItem = document.querySelectorAll('.task-list-item');
const emptyListNotice = document.querySelector('.notice');
const taskGeneralControls = document.querySelector('.tasks-general-controls');

// handler: check if value only has spaces
const onlySpaces = (value) => {return value.trim().length === 0};

// manipulate button style
const manipulateButton = () => {
    if (inputField.value && onlySpaces(inputField.value) == false) {
        submitTask.removeAttribute('disabled')
    } else {
        submitTask.setAttribute('disabled', '');
    }
}
manipulateButton();
inputField.addEventListener('input', () => {
    manipulateButton();
});

 // disable control buttons when one item is clicked
 let disableButtons = (targetArr) => {
    const itemControlButtons = targetArr.querySelectorAll('button');
    itemControlButtons.forEach((item) => {
        item.setAttribute('disabled', '');
    });
}

// localstorage data
(localStorage.getItem('tasks') == null) ? localStorage.setItem('tasks', '[]') : null;
let initialData = JSON.parse(localStorage.getItem('tasks'));

// get and display data from localstorage
const displayTasks = (item) => {
        let taskListItemMarkup = `<li class="task-list-item list-group-item d-flex flex-wrap flex-md-nowrap justify-content-between align-items-start">
        <span class="text-center text-md-start">${item}</span>
        <div class="task-controls text-md-end text-center text-white mt-3 mt-md-0">
            <button class="complete d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Task Completed</small><i class="bi bi-check-lg"></i></button>
            <button class="delete d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Delete Task</small><i class="bi bi-trash"></i></button>
            <button class="edit d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Edit Task</small><i class="bi bi-pencil-square"></i></button>
        </div>
        </li>`;
        taskList.insertAdjacentHTML('beforeend', taskListItemMarkup);
}
initialData.forEach(displayTasks);

// task list section display
let listItemCount = taskListItem.length;
const removeTaskList = () => {
    taskGeneralControls.classList.add('d-none');
    taskGeneralControls.classList.remove('d-flex');
    taskList.classList.add('d-none');
    taskList.classList.remove('d-flex');
    taskList.setAttribute('aria-hidden', true);
    emptyListNotice.setAttribute('aria-hidden', false);
    emptyListNotice.classList.remove('d-none');
    emptyListNotice.classList.add('d-block');
};
const displayTaskList = () => {
    taskGeneralControls.classList.add('d-flex');
    taskGeneralControls.classList.remove('d-none');
    taskList.classList.add('d-flex');
    taskList.classList.remove('d-none');
    taskList.setAttribute('aria-hidden', false);
    emptyListNotice.setAttribute('aria-hidden', true);
    emptyListNotice.classList.remove('d-block');
    emptyListNotice.classList.add('d-none');
};
(listItemCount === 0 && initialData.length === 0) ? removeTaskList() : displayTaskList();

// task completed
let completeButton = document.querySelectorAll('.complete');

let completeTrigger = (item) => {
    item.addEventListener('click', (e) => {
        let element = e.currentTarget;
        let parentLi = element.parentNode.closest('.task-list-item');
        parentLi.classList.add('completed');
        let taskText = parentLi.querySelector('span').textContent;
        disableButtons(parentLi);
        setTimeout(function() {
            let index = initialData.indexOf(taskText);
            (index >= 0) ? initialData.splice(index, 1) : null;
            localStorage.setItem('tasks', JSON.stringify(initialData));
            parentLi.remove();
            (listItemCount === 0 && initialData.length === 0) ? removeTaskList() : displayTaskList();
        }, 1800);
    })
}

completeButton.forEach(completeTrigger);

// delete task
let deleteButton = document.querySelectorAll('.delete');

let deleteTrigger = (item) => {
    item.addEventListener('click', (e) => {
        let element = e.currentTarget;
        let parentLi = element.parentNode.closest('.task-list-item');
        parentLi.classList.add('deleted');
        let taskText = parentLi.querySelector('span').textContent;
        disableButtons(parentLi);
        setTimeout(function() {
            let index = initialData.indexOf(taskText);
            (index >= 0) ? initialData.splice(index, 1) : null;
            localStorage.setItem('tasks', JSON.stringify(initialData));
            parentLi.remove();
            (listItemCount === 0 && initialData.length === 0) ? removeTaskList() : displayTaskList();
        }, 1800);
    })
}

deleteButton.forEach(deleteTrigger);

// edit an already existing task
let editButton = document.querySelectorAll('.edit');

let editTrigger = (item) => {
    item.addEventListener('click', (e) => {
        let element = e.currentTarget;
        let parentLi = element.parentNode.closest('.task-list-item');
        let taskText = parentLi.querySelector('span').textContent;
        // to be continued...
    });
};

// empty list button
let emptyListButton = document.querySelector('.empty-the-list');

let emptyListTrigger = () => {
    emptyListButton.addEventListener('click', () => {
        let currentTaskListItems = document.querySelectorAll('.task-list-item');
        let AllControlButtons = document.querySelectorAll('.task-controls');
        AllControlButtons.forEach((item) => {
            disableButtons(item);
        });
        currentTaskListItems.forEach((item) => {
            item.classList.add('deleted');
        });
        setTimeout(function() {
            initialData.length = 0;
            localStorage.setItem('tasks', JSON.stringify(initialData));
            currentTaskListItems.forEach((item) => {
                item.remove();
            });
            (listItemCount === 0 && initialData.length === 0) ? removeTaskList() : displayTaskList();
        }, 1800);
        console.log(taskListItem.length)
    });
}
emptyListTrigger();

// append inputted data to the list
taskForm.addEventListener('submit', (e) => {
    let inputFieldValue = inputField.value.trim();
    const appendElement = () => {
        initialData.push(inputFieldValue);
        let taskListItemMarkup = `<li class="task-list-item list-group-item d-flex flex-wrap flex-md-nowrap justify-content-between align-items-start">
        <span class="text-center text-md-start">${inputFieldValue}</span>
        <div class="task-controls text-md-end text-center text-white mt-3 mt-md-0">
            <button class="complete d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Task Completed</small><i class="bi bi-check-lg"></i></button>
            <button class="delete d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Delete Task</small><i class="bi bi-trash"></i></button>
            <button class="edit d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Edit Task</small><i class="bi bi-pencil-square"></i></button>
        </div>
        </li>`;
        taskList.insertAdjacentHTML('beforeend', taskListItemMarkup);
        localStorage.setItem('tasks', JSON.stringify(initialData));
    }
    (initialData.indexOf(inputFieldValue) == -1) ? appendElement() : null;

    // empty the input field after submit
    inputField.value = '';

    // to disable button after successful submit
    manipulateButton();

    // completed task
    let completeButton = document.querySelectorAll('.complete');
    completeButton.forEach(completeTrigger);

    // deleted task
    let deleteButton = document.querySelectorAll('.delete');
    deleteButton.forEach(deleteTrigger);
    
    (listItemCount === 0 && initialData.length === 0) ? removeTaskList() : displayTaskList();
    e.preventDefault();
});