// declare variables
const inputField = document.querySelector('#task');
const submitTask = document.querySelector('#task-button');
const taskForm = document.querySelector('#task-form')
const taskList = document.querySelector('.tasks');
const taskListItem = document.querySelectorAll('.task-list-item');
const emptyListNotice = document.querySelector('.notice');

// handler: check if value only has spaces
const onlySpaces = (value) => {return value.trim().length === 0};

// manipulate button style
const manipulateButton = () => {
    if (inputField.value && onlySpaces(inputField.value) == false) {
        submitTask.classList.remove('disabled')
    } else {
        submitTask.classList.add('disabled');
    }
}
manipulateButton();
inputField.addEventListener('input', () => {
    manipulateButton();
});

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
const listItemCount = taskListItem.length;
const removeTaskList = () => {
    taskList.classList.add('d-none');
    taskList.classList.remove('d-flex');
    taskList.setAttribute('aria-hidden', true);
    emptyListNotice.setAttribute('aria-hidden', false);
    emptyListNotice.classList.remove('d-none');
    emptyListNotice.classList.add('d-block');
};
const displayTaskList = () => {
    taskList.classList.add('d-flex');
    taskList.classList.remove('d-none');
    taskList.setAttribute('aria-hidden', false);
    emptyListNotice.setAttribute('aria-hidden', true);
    emptyListNotice.classList.remove('d-block');
    emptyListNotice.classList.add('d-none');
};
(listItemCount === 0 && initialData.length === 0) ? removeTaskList() : displayTaskList();

// append inputted data to the list
taskForm.addEventListener('submit', (e) => {
    let inputFieldValue = inputField.value.trim();
    const testFunc = () => {
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
        // displayTaskList();
        localStorage.setItem('tasks', JSON.stringify(initialData));
    }
    (initialData.indexOf(inputFieldValue) == -1) ? testFunc() : null;

    // empty the input field after submit
    inputField.value = '';

    // to disable button after successful submit
    manipulateButton();

    // completed task
    let completeButton = document.querySelectorAll('.complete');
    completeButton.forEach(completeTrigger);

    // deleted task
    // const deleteButton = document.querySelectorAll('.delete');
    // deleteButton.forEach(deleteTrigger);
    
    (listItemCount === 0 && initialData.length === 0) ? removeTaskList() : displayTaskList();
    e.preventDefault();
});

// task completed
let completeButton = document.querySelectorAll('.complete');

const completeTrigger = (item) => {
    item.addEventListener('click', (e) => {
        let element = e.currentTarget;
        let parentLi = element.parentNode.closest('.task-list-item');
        parentLi.classList.add('completed');
        let taskText = parentLi.querySelector('span').textContent;
        setTimeout(function() {
            let index = initialData.indexOf(taskText);
            (index >= 0) ? initialData.splice(index, 1) : null;
            // initialData.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(initialData));
            parentLi.remove();
            (listItemCount === 0 && initialData.length === 0) ? removeTaskList() : displayTaskList();
        }, 1800);
        console.log(element)
    })
}

completeButton.forEach(completeTrigger);

// delete task
// let deleteButton = document.querySelectorAll('.delete');

// const deleteTrigger = (item) => {
//     item.addEventListener('click', (e) => {
//         let element = e.target;
//         let parentLi = element.parentNode.closest('.task-list-item');
//         parentLi.classList.add('deleted');
//         let taskText = parentLi.querySelector('span').textContent;
//         let index = initialData.indexOf(taskText);
//         setTimeout(function() {
//             (index >= 0) ? initialData.splice(index, 1) : null;
//             localStorage.setItem('tasks', JSON.stringify(initialData));
//             parentLi.remove();
//             (listItemCount === 0 && initialData.length === 0) ? removeTaskList() : displayTaskList();
//         }, 1800);
//         return;
//     })
// }

// deleteButton.forEach(deleteTrigger);