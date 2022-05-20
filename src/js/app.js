const taskContainer = document.querySelector('#task-group');
const form = document.querySelector('#input-area');
const task = document.querySelector('#task-card');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];


localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userInput = document.querySelector('#task-input');
    if(userInput.value != "") {
        taskContainer.innerHTML += createTask(userInput.value);
        itemsArray.push(userInput.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        userInput.value = "";
    }
})

function deleteTask(e) {
    const itemValue =  e.parentNode.parentNode.closest('div').querySelector('p').textContent;
    const itemIndex = itemsArray.indexOf(itemValue)
    console.log(itemIndex)
    itemsArray.splice(itemIndex, 1)
    localStorage.setItem('items', JSON.stringify(itemsArray));
    
    e.parentNode.parentNode.remove();
}

function checkTask(e) {
    const paragraphs = e.parentNode.parentNode;
    if(paragraphs.firstElementChild.style.textDecoration != "line-through") {
        paragraphs.firstElementChild.style.textDecoration = "line-through"
    }
    else {
        paragraphs.firstElementChild.style.textDecoration = "none"
    }
}

data.forEach(item => {
    taskContainer.innerHTML += createTask(item);
  });

function createTask(input) {
    return `
    <div id="task-card">
        <p id="text">${input}</p>
        <div id="buttons">
            <button id="delete" onclick="deleteTask(this)">
                <svg id="delete-svg" width="48" height="48" viewBox="0 0 48 48">
                    <path
                        d="M15 39H33Q33 39 33 39Q33 39 33 39V15H15V39Q15 39 15 39Q15 39 15 39ZM10.5 11V8H17.2L19.2 6H28.8L30.8 8H37.5V11ZM15 42Q13.8 42 12.9 41.1Q12 40.2 12 39V12H36V39Q36 40.2 35.1 41.1Q34.2 42 33 42ZM15 39H33Q33 39 33 39Q33 39 33 39H15Q15 39 15 39Q15 39 15 39Z">
                    </path>
                </svg>
            </button>
            <button id="checked" onclick="checkTask(this)">
                <svg id="checked-svg" width="48" height="48" viewBox="0 0 48 48">
                    <path
                        d="M19.05 35.9 41.7 13.25 39.55 11.1 19.05 31.6 8.5 21.05 6.35 23.2ZM19.05 40.15 2.1 23.2 8.5 16.8 19.05 27.35 39.55 6.85 45.95 13.25Z">
                    </path>
                </svg>
            </button>
        </div>
    </div>`
}