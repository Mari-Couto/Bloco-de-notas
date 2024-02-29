const notaForm = document.querySelector("#nota-form");
const notaInput = document.querySelector("#nota-input");
const tasksList = document.querySelector("#tasks-list");
const editForm = document.querySelector("#edit-form");
const editinput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");


notaForm.addEventListener("submit", (e) =>{

    e.preventDefault();

    const inputValue = notaInput.value

    if(inputValue){
        console.log(inputValue)
    }
});