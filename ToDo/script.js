
const form = document.getElementById('todo-form')
const taskInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')
const count = document.getElementById('task-count')
const clearButton = document.getElementById('clear-btn')
const emptyMessage = document.getElementById('empty-message')
const reloadButton = document.getElementById('reload-btn')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const value = taskInput.value
    const newTask = {
        text : value,
        isCompleted : false
    }
    tasks.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    form.reset()
    renderTasks()
})

function renderTasks(){
    todoList.innerHTML = ''
    count.textContent = tasks.length
    if ( tasks.length === 0){
        todoList.appendChild(emptyMessage)
        return
    }
    else {
        tasks.forEach( (task) => {
            const liElement = document.createElement('li')
            liElement.className = 'todo-item'
            const input = document.createElement('input')
            input.setAttribute('type', 'checkbox')
            input.checked = task.isCompleted
            input.addEventListener('change', () => {
                task.isCompleted = input.checked
                localStorage.setItem('tasks', JSON.stringify(tasks))
                renderTasks()
            })
            const span = document.createElement('span')
            span.textContent = task.text
            if (task.isCompleted === true){
                span.classList.add('completed')
                }
            liElement.appendChild(input)
            liElement.appendChild(span)

            todoList.appendChild(liElement)
        })
    }
}

clearButton.addEventListener('click', () => {
    tasks = []
    localStorage.setItem('tasks', JSON.stringify(tasks))    
    renderTasks()
})

reloadButton.addEventListener('click', () => {
    location.reload()
})

renderTasks()
