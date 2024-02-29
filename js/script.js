const notaForm = document.querySelector("#nota-form");
const notaInput = document.querySelector("#nota-input");
const tasksList = document.querySelector("#tasks-list");
const editForm = document.querySelector("#edit-form");
const editinput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const saveNota = (text) => {

    const nota = document.createElement("div");
    nota.classList.add("nota");

    const notaTitle = document.createElement("h3");
    notaTitle.innerText = text;
    nota.appendChild(notaTitle);

    console.log(nota)
}


notaForm.addEventListener("submit", (e) =>{

    e.preventDefault();

    const inputValue = notaInput.value

    if(inputValue){
       saveNota(inputValue)
    }
});