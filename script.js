import { translate } from "./translations.js";

const addTodoBtn = document.querySelector('#btn-add');

const newTodoInput = document.querySelector('#new-todo');
newTodoInput.placeholder = translate("placeholder");

const todoList = document.querySelector('#todo-list');
const timeInput = document.querySelector('#time-input');
timeInput.placeholder = translate("estimatedTime");



newTodoInput.addEventListener('input', function() {
    if(newTodoInput.value.length > 1){
        addTodoBtn.setAttribute('aria-disabled', 'false');
    } else{
        addTodoBtn.setAttribute('aria-disabled', 'true');
    }
})



//uppdaterar i countern hur många todos som är kvar att göra
function updateToDoCount() {
    const todos = document.querySelectorAll('.todo-item'); //hela todo-itemen
    const todoCount = document.querySelector('#todo-count'); //själva de som skriv ut

    const uncheckedCount = _.filter(Array.from(todos), (todoElement) => { //array.from(todos) omvandlar till vanlig array för att kunn använda lodash _filter
        return !todoElement.querySelector('input[type="checkbox"]').checked;
    }).length; //_.filter returnerar en ny array där bara de med rätt villkor returneras. i detta fall de med icke icheckade checkboxar

    const checkedCount = todos.length - uncheckedCount;

    todoCount.innerHTML = translate("todo", uncheckedCount, checkedCount);
}

//räkna ut tiden
const timeContainer = document.querySelector('#time-container p span');


function updateTotalTime() {
    const allItems = todoList.querySelectorAll("li");
    const submittedMinutes = Array.from(allItems)
    .filter(item => {
        return !item.querySelector('input[type="checkbox"]').checked;
    })
    .map((item) => Number(item.dataset.time));
    const totalMinutes = _.sum(submittedMinutes);
    timeContainer.textContent = totalMinutes;
}


//lägga till todo
function addTodo() {

    const currentValue = newTodoInput.value;
    const currentTime = timeInput.value;

    if (currentValue && currentTime) {
        
       // SubmittedMinutes.push(Number(currentTime)); //pushar in det man skriver i inputfältet in i arrayen
        createTodoElement(currentValue, currentTime, false);
        newTodoInput.value = '';
        timeInput.value = null;
        updateTotalTime();
    }
}

function createTodoElement(todoText, todoTime, checked) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.dataset.time = todoTime;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;

    const label = document.createElement('label');
    label.classList.add('check-container');

    const spanText = document.createElement('span');


    spanText.textContent = _.capitalize(todoText); //uppercase med lodash
    spanText.classList.add('label-text');

    const timeElement = document.createElement('p');
    timeElement.classList.add('submitted-time');
    timeElement.textContent = `(${todoTime} min)`;

    const labelDiv = document.createElement('div');
    labelDiv.classList.add('label-container');
    labelDiv.append(spanText, timeElement)

    const spanCheck = document.createElement('span');
    spanCheck.classList.add('checkmark');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'delete');
    //deleteBtn.ariaLabel = 'Ta bort';
    deleteBtn.setAttribute("aria-label","ta bort");
    deleteBtn.innerHTML = '<span class="material-symbols-outlined trash">delete</span>';
 

    label.append(spanCheck, checkbox, labelDiv);
    li.append(label, deleteBtn);

    checkbox.addEventListener('change', () => {
        const listItem = checkbox.parentNode.parentNode;
        if (checkbox.checked === true) {
            todoList.removeChild(listItem);
            todoList.appendChild(listItem);
        } else {
            todoList.removeChild(listItem);
            todoList.prepend(listItem);
        }
        updateToDoCount();
        updateTotalTime();
    });

    deleteBtn.addEventListener('click', () => {
        todoList.removeChild(li);
        updateToDoCount();
        updateTotalTime();
    })

    todoList.append(li);
    updateToDoCount();
}

addTodoBtn.addEventListener('click', () => {
    addTodo();
})








//accordion
const accordion = document.querySelector(".accordion");
const openAccordion = document.querySelector("open-accordion");


