//grab elements from the DOM

const inputTodo = document.querySelector(".todo__input");
const addBtn = document.querySelector(".add__button");
const listParent = document.querySelector(".list__container");
const draggables = document.querySelectorAll(".draggable");
const listContainer1 = document.querySelector("#list__1");

//test area
console.log(draggables);

//make the 'add' button work

addBtn.addEventListener('click', function(e) {
    const newContainer = document.createElement('li');
    const newItem = document.createElement('p');
    newItem.textContent = inputTodo.value;
    newItem.className = "draggable";
    const attribute = document.createAttribute('draggable');
    attribute.value = "true";
    newItem.setAttributeNode(attribute);
    newContainer.append(newItem);
    listParent.append(newContainer);
    console.log(newItem);
    console.log(newContainer);
})

//make each list item drag - and - droppable

// let dragged;

// document.addEventListener("drag", function(e) {

// }, false)
// //1/2
// addEventListener(type: "drag", listener: (this: Document, ev: DragEvent) => any, options?: boolean | AddEventListenerOptions): void
// Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
// The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.
// When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.
// When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.
// When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed.
// The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.

// document.addEventListener("dragstart", function(e) {
//     dragged = e.target;
//     e.target.style.backgroundColor = "light-grey";
// }, false)

// document.addEventListener("dragend", function(e) {
//     e.target.style.backgroundColor = "";
// }, false)

// document.addEventListener("dragover", function(e) {
//     e.preventDefault();
// }, false);

// document.addEventListener("dragenter", function(e) {
//     if(e.target.className == "dropzone") {
//         e.target.style.backgroundColor = "blue";
//     }
// }, false)

// document.addEventListener("dragleave", function(e) {
//     if(e.target.className == "dropzone") {
//         e.target.style.backgroundColor = "";
//     }
// }, false)

// document.addEventListener("drop", function(e) {
//     e.preventDefault();
//     if (e.target.className == "dropzone") {
//         e.target.style.backgroundColor = "";
//         dragged.parentNode.removeChild(dragged);
//         e.target.appendChild(dragged);
//     }

// }, false)

draggables.forEach( draggable => {
    draggable.addEventListener('dragstart', function(e) {
        draggable.classList.add("dragging");
    })
    draggable.addEventListener('dragend', function(e) {
        draggable.classList.remove("dragging");
    })
    listContainer1.addEventListener('dragover', function(e) {
        e.preventDefault();
        const dragging= document.querySelector(".dragging");
        listContainer1.appendChild(dragging);
    })
})

