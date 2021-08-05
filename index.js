//grab elements from the DOM

const inputTodo = document.querySelector(".todo__input");
const addBtn = document.querySelector(".add__button");
const listParent = document.querySelector(".list__container");
let children = document.querySelectorAll(".draggable");
let draggables = [...children];
const deleteContainer = document.querySelector(".delete__contain");

//make the 'add' button work

addBtn.addEventListener('click', function(e) {
    const newItem = document.createElement('p');
    newItem.textContent = inputTodo.value;
    inputTodo.value = "";
    newItem.className = "draggable";
    const attribute = document.createAttribute('draggable');
    attribute.value = "true";
    newItem.setAttributeNode(attribute);
    listParent.append(newItem);
    draggables.push(newItem);


//make each item drag and droppable if user adds new items
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
        let draggable = document.querySelector(".dragging");
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
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
        return {offset: offset, element: child}
    } else {
       return closest;
    }
    
    }, {offset: Number.NEGATIVE_INFINITY}).element //positive infinity is here so that every number possible in the sortable list will be smaller than it.
}


//tried with a function, didn't work
// function findTheIndex() {
//     const findDraggable = draggables.findIndex((element) => element.classList.contains("dragging"));
//     draggables.splice(findDraggable, 1);
// }

//tried with a for loop, didnt work
// function removeByClass(array, cls) {
//     for(let i=0; i<array.length; i++) {
//         if (array[i].class == cls ) {
//             array.splice(i, 1)
//         }
//     }
// }

    deleteContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        let draggable = document.querySelector(".dragging"); 
        listParent.removeChild(draggable);
})    

