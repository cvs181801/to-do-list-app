//grab elements from the DOM

const inputTodo = document.querySelector(".todo__input");
const addBtn = document.querySelector(".add__button");

//make the 'add' button work

addBtn.addEventListener('click', function(e) {
    const newItem = document.createElement('li');
    newItem.textContent = inputTodo.value;

})

