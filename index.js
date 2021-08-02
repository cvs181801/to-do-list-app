//grab elements from the DOM

const inputTodo = document.querySelector(".todo__input");
const addBtn = document.querySelector(".add__button");
const listParent = document.querySelector(".list__container");
let draggables = document.querySelectorAll(".draggable");


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
    console.log('newItem:',newItem);
})

//make each list item drag - and - droppable
// addEventListener(type: "drag", listener: (this: Document, ev: DragEvent) => any, options?: boolean | AddEventListenerOptions): void
// Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
// The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.
// When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.
// When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.
// When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed.
// The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.



function dragTheItems() {
    draggables = document.querySelectorAll(".draggable");
    let newDraggables = [...draggables];
    console.log(newDraggables);
draggables.forEach( draggable => {
    draggable.addEventListener('dragstart', function(e) {
        draggable.classList.add("dragging");
    })
    draggable.addEventListener('dragend', function(e) {
        draggable.classList.remove("dragging");
    })
    listParent.addEventListener('dragover', function(e) {
        e.preventDefault();
        const afterElement = getDragAfterElement(listParent, e.clientY);
        const dragging = document.querySelector(".dragging");
        console.log('afterElement:', afterElement);
        if(afterElement === null) {
            listParent.appendChild(dragging)
        } else {
            listParent.insertBefore(dragging, afterElement);
        }  
    })
})
}

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
