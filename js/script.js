// declare variables
const inputField = document.querySelector('#task');
const submitTask = document.querySelector('#task-button');
const taskForm = document.querySelector('#task-form')
const taskList = document.querySelector('.tasks');
const taskListItem = document.querySelectorAll('.task-list-item');
const emptyListNotice = document.querySelector('.notice');

// manipulate button style
const manipulateButton = () => {
    if (inputField.value && inputField.value != ' ') {
        submitTask.classList.remove('disabled')
    } else {
        submitTask.classList.add('disabled');
    }
}
manipulateButton();
inputField.addEventListener('input', () => {
    manipulateButton();
});

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
const taskListSectionDisplay = (listItemCount === 0) ? removeTaskList() : displayTaskList();

// append inputted data to the list
taskForm.addEventListener('submit', (e) => {
    let inputFieldValue = inputField.value.trim();
    let taskListItemMarkup = `<li class="task-list-item list-group-item d-flex justify-content-between align-items-start">
<span>${inputFieldValue}</span>
<div class="task-controls text-end text-white">
    <button class="complete d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Task Completed</small><i class="bi bi-check-lg"></i></button>
    <button class="delete d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Delete Task</small><i class="bi bi-trash"></i></button>
    <button class="edit d-inline-flex justify-content-center align-items-center align-middle" type="button"><small class="visually-hidden">Edit Task</small><i class="bi bi-pencil-square"></i></button>
</div>
</li>`;
    taskList.insertAdjacentHTML('beforeend', taskListItemMarkup);
    displayTaskList();
    e.preventDefault();
    inputField.value = '';
    manipulateButton();
});