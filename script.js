const addTodoBtn = document.querySelector('#btn-add');

const newTodoInput = document.querySelector('#new-todo');
newTodoInput.placeholder = 'Vad behöver du göra?';

const todoList = document.querySelector('#todo-list');
const timeInput = document.querySelector('#time-input');
timeInput.placeholder = 'Beräknad tid';

let SubmittedMinutes = [];

//uppdaterar i countern hur många todos som är kvar att göra
function updateToDoCount(){
    const todos = document.querySelectorAll('.todo-item'); //hela todo-itemen
    const todoCount = document.querySelector('#todo-count'); //själva de som skriv ut

    const uncheckedCount = _.filter(Array.from(todos), (todoElement) => { //array.from(todos) omvandlar till vanlig array för att kunn använda lodash _filter
    return !todoElement.querySelector('input[type="checkbox"]').checked;}).length; //_.filter returnerar en ny array där bara de med rätt villkor returneras. i detta fall de med icke icheckade checkboxar

    const checkedCount = todos.length - uncheckedCount;    

    todoCount.innerHTML = `Kvar att göra: ${uncheckedCount} st (${checkedCount} färdiga)`;
}

//räkna ut tiden
const timeContainer = document.querySelector('#time-container');
const totalTime = document.createElement('p');

totalTime.classList.add('total-time');
timeContainer.append(totalTime);

function updateTotalTime(){
    const totalMinutes = _.sum(SubmittedMinutes); 
    totalTime.innerHTML = `Total tid kvar: ${totalMinutes} minuter`;
}


//lägga till todo
function addTodo(){
    const currentValue = newTodoInput.value;
    const currentTime = timeInput.value;
    if(currentValue,currentTime){

        SubmittedMinutes.push(Number(currentTime)); //pushar in det man skriver i inputfältet in i arrayen
        createTodoElement(currentValue, currentTime, false);
        newTodoInput.value = '';
        timeInput.value = null;

        updateTotalTime();
    }
}

function createTodoElement(todoText, todoTime, checked){
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
    labelDiv.append(spanText,timeElement)

    const spanCheck = document.createElement('span');
    spanCheck.classList.add('checkmark');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'delete');
    deleteBtn.innerHTML = '<span class="material-symbols-outlined trash">delete</span>';

    label.append(spanCheck,checkbox,labelDiv);
    li.append(label,deleteBtn);

    checkbox.addEventListener('change', ()=>{
        const listItem = checkbox.parentNode.parentNode;
        const todoTime = Number(listItem.dataset.time);


        if(checkbox.checked === true){
        
            todoList.removeChild(listItem);
            todoList.appendChild(listItem);

            _.remove(SubmittedMinutes, (minute) => minute === todoTime);
        }else{
            todoList.removeChild(listItem);
            todoList.prepend(listItem);
            SubmittedMinutes.push(todoTime);
        }
        updateToDoCount();
        updateTotalTime();
    });

    deleteBtn.addEventListener('click', () =>{

        _.remove(SubmittedMinutes, (minute) => minute === Number(li.dataset.time) ); //lodash tar bort från arrayen

        todoList.removeChild(li);
        updateToDoCount();
        updateTotalTime();
    })

    todoList.append(li);
    updateToDoCount();
}

addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTodo();
});



