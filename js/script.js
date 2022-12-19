/*
*   TABLE OF CONTENTS
*   
*   - declare variables
*   - handler: check if value only has spaces
*   - manipulate "add task" button
*   - disable control buttons when one item is clicked
*   - localstorage data
*   - get and display data from localstorage on page load
*   - task list section display functions
*   - task completed
*   - delete task
*   - edit task: close
*   - edit an already existing task
*   - empty list button
*   - append inputted data to the list
*
*/

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

// manipulate "add task" button 
const manipulateButton = () => {
    (inputField.value && onlySpaces(inputField.value) == false) ? submitTask.removeAttribute('disabled') : submitTask.setAttribute('disabled', '');
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

// get and display data from localstorage on page load
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

// task list section display functions
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

// edit task: close
let closeEdit = (item) => {
    let closeButton = item.querySelector('.edit-close');
    closeButton.removeAttribute('disabled');
    closeButton.addEventListener('click', () => {
        let taskTextWrapper = item.querySelector('span');
        let itemTaskControls = item.querySelector('.task-controls');
        let editForm = item.querySelector('.edit-form');
        taskTextWrapper.classList.remove('d-none');
        taskTextWrapper.classList.add('d-inline-block');
        itemTaskControls.classList.remove('d-none');
        itemTaskControls.classList.add('d-inline-block');
        editForm.remove();
    });
};

// edit an already existing task
let editButton = document.querySelectorAll('.edit');

let editTrigger = (item) => {
    item.addEventListener('click', (e) => {
        let element = e.currentTarget;
        let parentLi = element.parentNode.closest('.task-list-item');
        let taskTextWrapper = parentLi.querySelector('span');
        let taskText = taskTextWrapper.textContent;
        let itemTaskControls = parentLi.querySelector('.task-controls');
        let inputMarkup = `<form class="edit-form w-100 d-flex justify-content-between align-items-start" method="post" action="#"><input type="text" class="edit-task-text d-inline-block" value="${taskText}" aria-hidden="true"></input>
        <div class="edit-controls text-white d-flex justify-content-end align-items-start">
        <button type="submit" class="edit-submit d-inline-flex justify-content-center flex-column align-items-center" aria-hidden="true"><i class="bi bi-plus-square"></i></button>
        <button type="button" class="edit-close d-inline-flex justify-content-center flex-column align-items-center" aria-hidden="true"><i class="bi bi-x-circle"></i></button>
        </div>
        </form>`;
        taskTextWrapper.classList.add('d-none');
        taskTextWrapper.classList.remove('d-inline-block');
        itemTaskControls.classList.add('d-none');
        itemTaskControls.classList.remove('d-inline-block');
        parentLi.insertAdjacentHTML('afterbegin', inputMarkup);
        closeEdit(parentLi);
        saveEdit(parentLi, taskText);
    });
};

editButton.forEach(editTrigger);

// edit task: save
let saveEdit = (item, oldText) => {
    let taskTextWrapper = item.querySelector('span');
    let itemTaskControls = item.querySelector('.task-controls');
    let editForm = item.querySelector('.edit-form');
    let editField = editForm.querySelector('.edit-task-text');
    let editSubmit = item.querySelector('.edit-submit');
    const manipulateSubmit = () => {
        (editField.value && onlySpaces(editField.value) == false && editField.value != oldText) ? editSubmit.removeAttribute('disabled') : editSubmit.setAttribute('disabled', '');
    }
    manipulateSubmit();
    editField.addEventListener('input', () => {
        manipulateSubmit();
    });
    let initialData = JSON.parse(localStorage.getItem('tasks'));
    editForm.addEventListener('submit', (e) => {
        let replaceOldValue = () => {
            let itemIndex = initialData.indexOf(oldText);
            let newTaskText = editField.value;
            initialData.splice(itemIndex, 1, newTaskText);
            localStorage.setItem('tasks', JSON.stringify(initialData));
            taskTextWrapper.textContent = newTaskText;
        }
        e.preventDefault();
        (initialData.indexOf(editField.value) == -1) ? replaceOldValue() : null;
        taskTextWrapper.classList.remove('d-none');
        taskTextWrapper.classList.add('d-inline-block');
        itemTaskControls.classList.remove('d-none');
        itemTaskControls.classList.add('d-inline-block');
        editForm.remove();
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

    // edit task
    let editButton = document.querySelectorAll('.edit');
    editButton.forEach(editTrigger);
    
    (listItemCount === 0 && initialData.length === 0) ? removeTaskList() : displayTaskList();
    e.preventDefault();
});