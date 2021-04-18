const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
    let input = document.getElementById("input").value
    var htmlToAppend = document.createElement("LI")
    htmlToAppend.className = classNames.TODO_ITEM
    htmlToAppend.innerHTML = `<input type='checkbox' class=${classNames.TODO_CHECKBOX}/> ${input}`
    list.appendChild(htmlToAppend)

    itemCountSpan.innerHTML = parseInt(itemCountSpan.innerHTML) + 1

    const allCheckbox = document.querySelectorAll("input[type='checkbox']")
    const checked = document.querySelectorAll('input:checked')
    uncheckedCountSpan.innerHTML = allCheckbox.length - checked.length 
    
    allCheckbox.forEach(a => {
        a.onchange = () => {    
            uncheckedCountSpan.innerHTML = allCheckbox.length - document.querySelectorAll('input:checked').length        
        }
    })
}
