// declare variables
const inputField = document.querySelector('#task');
const submitTask = document.querySelector('#task-button');
const taskList = document.querySelector('.tasks');
const taskListItem = document.querySelectorAll('.task-list-item');
const emptyListNotice = document.querySelector('.notice');

// manipulate button style
addEventListener('input', () => {
    if (inputField.value != '') {
        submitTask.classList.remove('disabled');
    } else {
        submitTask.classList.add('disabled');
    }
});

// task list section display
const listItemCount = taskListItem.length;
const removeTaskList = () => {
    taskList.classList.add('d-none');
    taskList.classList.remove('d-flex');
    emptyListNotice.setAttribute('aria-hidden', false);
    emptyListNotice.classList.remove('d-none');
    emptyListNotice.classList.add('d-block');
};
const displayTaskList = () => {
    taskList.classList.add('d-flex');
    taskList.classList.remove('d-none');
    emptyListNotice.setAttribute('aria-hidden', true);
    emptyListNotice.classList.remove('d-block');
    emptyListNotice.classList.add('d-none');
};
const taskListSectionDisplay = (listItemCount === 0) ? removeTaskList() : displayTaskList();

// append inputted data to the list
// ...