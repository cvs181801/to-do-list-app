//grab elements from the DOM

const inputTodo = document.querySelector(".todo__input");
const addBtn = document.querySelector(".add__button");
const listParent = document.querySelector(".list__container");
let draggables = [...document.querySelectorAll(".draggable")];
const deleteBtn = document.querySelector(".delete__button");

//test area
console.log(draggables);

//make the 'add' button work

addBtn.addEventListener('click', function(e) {
    const newItem = document.createElement('p');
    newItem.textContent = inputTodo.value;
    newItem.className = "draggable";
    const attribute = document.createAttribute('draggable');
    attribute.value = "true";
    newItem.setAttributeNode(attribute);
    listParent.append(newItem);
    draggables.push(newItem);
    console.log('newItem:',newItem);
    console.log('pushed draggables:', draggables);

//make each item draggable if user adds new items
    draggables.forEach( element => {
        element.addEventListener('dragstart', function(e) {
            element.classList.add("dragging");
        })
        element.addEventListener('dragend', function(e) {
            element.classList.remove("dragging");
        })
        
        listParent.addEventListener('dragover', function(e) {
            e.preventDefault();
            const afterElement = getDragAfterElement(listParent, e.clientY);
            const draggable = document.querySelector(".dragging");
            console.log('afterElement:', afterElement);
            if(afterElement === null) {
                listParent.appendChild(draggable)
            } else {
                listParent.insertBefore(draggable, afterElement);
            }  
        })
    })
})

//make each list item drag - and - droppable even if user does not add new items

draggables.forEach( element => {
    element.addEventListener('dragstart', function(e) {
        element.classList.add("dragging");
    })
    element.addEventListener('dragend', function(e) {
        element.classList.remove("dragging");
    })
    
    listParent.addEventListener('dragover', function(e) {
        e.preventDefault();
        const afterElement = getDragAfterElement(listParent, e.clientY);
        const draggable = document.querySelector(".dragging");
        console.log('afterElement:', afterElement);
        if(afterElement === null) {
            listParent.appendChild(draggable)
        } else {
            listParent.insertBefore(draggable, afterElement);
        }  
    })
})

function getDragAfterElement(listParent, y) {
    const draggableElements = [...listParent.querySelectorAll('.draggable:not(.dragging)')]; //element:not(element) syntax is CSS selector syntax rather than JS syntax
    //The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.
    return draggableElements.reduce((closest , child) => {
    const box = child.getBoundingClientRect();
    console.log(box);
    const offset = y - box.top - box.height / 2;
    console.log('offset:', offset );
    console.log('closest :', closest);
    console.log('closest.offset:', closest.offset);
    if (offset < 0 && offset > closest.offset) {
        return {offset: offset, element: child}
    } else {
       return closest;
    }
    
    }, {offset: Number.NEGATIVE_INFINITY}).element //positive infinity is here so that every number possible in the sortable list will be smaller than it.
}


deleteBtn.addEventListener('dragend', function(e) {
    e.preventDefault;
    console.log('dragging over delete');
})