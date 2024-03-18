const notaForm = document.querySelector("#nota-form");
const notaInput = document.querySelector("#nota-input");
const tasksList = document.querySelector("#Tasks-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");  
const eraseBtn = document.querySelector("#erase-button");  
const filterBtn = document.querySelector("#filter-select");  


let oldInputValue; 

const saveNota = (text, done = 0, save = 1) => {

    const nota = document.createElement("div");
    nota.classList.add("tasks");

    const notaTitle = document.createElement("h3");
    notaTitle.innerText = text;
    nota.appendChild(notaTitle);

    // botão de concluído 
    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-tasks")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    nota.appendChild(doneBtn)

    // botão de editar 
    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-tasks")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    nota.appendChild(editBtn)

    // botão de excluir 
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-tasks")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    deleteBtn.addEventListener("click", () => {
        nota.remove();
        removeTasksLocalStorage(text);
    });
    nota.appendChild(deleteBtn);

    // localStorage
    if (done) {
       nota.classList.add("done");
    }

    if (save) {
        saveTasksLocalStorage({ text, done });
    }

    tasksList.appendChild(nota);

    notaInput.value = "";
    notaInput.focus();
};


// envio de formulário 
notaForm.addEventListener("submit", (e) =>{

    e.preventDefault();

    const inputValue = notaInput.value

    if(inputValue){
       saveNota(inputValue)
    }
});

// Esconde/mostra formulário de editar
const toggleForms = () => {
    editForm.classList.toggle("hide");
    notaForm.classList.toggle("hide");
    tasksList.classList.toggle("hide");
}

//edição 
const updateTodo = (text) => {

    const todos = document.querySelectorAll(".tasks")
    todos.forEach((tasks) => {
        let todoTitle = tasks.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }

    })

}

//busca
const getSearchtasks = (search) => {
    const todos = document.querySelectorAll(".tasks")
    todos.forEach((tasks) => {
        let todoTitle = tasks.querySelector("h3").innerText.toLowerCase();

        const normalizedSearch = search.toLowerCase();

        tasks.style.display = "flex";

        if(!todoTitle.includes(normalizedSearch)) {
            tasks.style.display = "none";
        }
    })
}

const filterTasks = (filterValue) => {

    const todos = document.querySelectorAll(".tasks");

    switch(filterValue) {
        case "all":
           todos.forEach((todo) => todo.style.display = "flex")
        break

        case "done":
           todos.forEach((todo) => todo.classList.contains("done")
        ? (todo.style.display = "flex")
        : (todo.style.display = "none"))
        break

        case "Tasks":
          !todos.forEach((todo) => todo.classList.contains("done")
        ? (todo.style.display = "flex")
        : (todo.style.display = "none"))
        break;

        default:
            break;
    }
}


// Funcionalidades dos botões 
document.addEventListener("click", (e) => {

    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;''
    }

    if(targetEl.classList.contains("finish-tasks")){
        parentEl.classList.toggle("done");

        updateTasksStatusLocalStorage(todoTitle);
        
    }

    if(targetEl.classList.contains("remove-tasks")) {
        parentEl.remove();

        removeTasksLocalStorage(todoTitle);
    }

    if(targetEl.classList.contains("edit-tasks")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

// evento do cancelamento do editar 
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

// envio edição
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){ 
       updateTodo(editInputValue)
    }

    toggleForms()
});

//busca
searchInput.addEventListener("keyup", (e) => {

    const search = e.target.value;

    getSearchtasks(search);
});

//botão apagar
eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
})

//filtragem
filterBtn.addEventListener("change", (e) =>{
    const filterValue = e.target.value;

    filterTasks(filterValue);

})


//local storage
const getTasksLocalStorage = () => {
    const saveTasks = JSON.parse(localStorage.getItem("saveTasks")) || [];

    return saveTasks;
};

const loadTasks = () => {
    const  saveTasks = getTasksLocalStorage();

    saveTasks.forEach((tasks) => {
        saveNota(tasks.text, tasks.done, 0)
    })
}

const saveTasksLocalStorage = (tasks) => {
    const saveTasks = getTasksLocalStorage()

    saveTasks.push(tasks)

    localStorage.setItem("saveTasks", JSON.stringify(saveTasks));

};

const removeTasksLocalStorage = (tasksText) => {

    const saveTasks = getTasksLocalStorage();

    const filteredTasks = saveTasks.filter((tasks) => tasks.text !== tasksText)

    localStorage.setItem("saveTasks", JSON.stringify(filteredTasks));
};

const updateTasksStatusLocalStorage = (tasksText) => {

    const saveTasks = getTasksLocalStorage();

    saveTasks.map((tasks) => tasks.text === tasksText ? tasks.done = !tasks.done : null);

    localStorage.setItem("saveTasks", JSON.stringify(saveTasks));

}

const updateTasksLocalStorage = (tasksOldText, tasksNewText) => {

    const saveTasks = getTasksLocalStorage();

    saveTasks.map((tasks) =>
     tasks.text === tasksOldText ? tasks.done = !tasks.done : null);

    localStorage.setItem("saveTasks", JSON.stringify(saveTasks));

}

loadTasks();