const notaForm = document.querySelector("#nota-form");
const notaInput = document.querySelector("#nota-input");
const tasksList = document.querySelector("#Tasks-list");
const editForm = document.querySelector("#edit-form");
const editinput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const saveNota = (text) => {

    const nota = document.createElement("div");
    nota.classList.add("tasks");

    const notaTitle = document.createElement("h3");
    notaTitle.innerText = text;
    nota.appendChild(notaTitle);

    /* botão de concluído */
    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-tasks")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    nota.appendChild(doneBtn)

    /* botão de editar */
    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-tasks")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    nota.appendChild(editBtn)

    /* botão de excluir */
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-tasks")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    nota.appendChild(deleteBtn)

    tasksList.appendChild(nota)
}

/* envio de formulário */
notaForm.addEventListener("submit", (e) =>{

    e.preventDefault();

    const inputValue = notaInput.value

    if(inputValue){
       saveNota(inputValue)
    }
});