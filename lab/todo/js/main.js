"use strict"

{
    let todos;

    try {
        const saved = localStorage.getItem("todos");
        todos = saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Failed to parse todos from localStorage", e);
        todos = [];
    }

    const todosListEl = document.querySelector("#todos");
    const formEl = document.querySelector("#add-form");
    const formInputEl = formEl.querySelector("input");
    const deleteAllButton = document.querySelector("#delete-all");


    const updateLocalStorage = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const renderTodo = (todo) => {
        /*
        - li
            - label
                - input 
                - span
            - button
        */

        const inputEl = document.createElement("input");
        inputEl.type = "checkbox";
        inputEl.checked = todo.isCompleted;
        inputEl.addEventListener("change", () => {
            todos.forEach((item) => {
                if (item.id === todo.id) {
                    item.isCompleted = !item.isCompleted;
                }
            })
            updateLocalStorage();
        })

        const spanEl = document.createElement("span");
        spanEl.textContent = todo.title;

        const labelEl = document.createElement("label");
        labelEl.appendChild(inputEl);
        labelEl.appendChild(spanEl);

        const buttonEl = document.createElement("button");
        buttonEl.textContent = "x";
        buttonEl.addEventListener("click", () => {
            if (!confirm("Are you sure deleting the todo?")) return;
            liEl.remove();

            todos = todos.filter((item) => {
                return item.id !== todo.id;
            })
            updateLocalStorage();
        })

        const liEl = document.createElement("li");
        liEl.appendChild(labelEl);
        liEl.appendChild(buttonEl);

        todosListEl.appendChild(liEl);
    }



    const renderTodos = () => {
        todosListEl.innerHTML = "";
        todos.forEach((todo) => {
            renderTodo(todo);
        })
    };

    formEl.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = formInputEl.value.trim();
        if (!title) return;

        const todo = {
            id: Date.now(),
            title,
            isCompleted: false,
        };

        renderTodo(todo);
        todos.push(todo);
        updateLocalStorage();

        formInputEl.value = "";
        formInputEl.focus();
    })

    deleteAllButton.addEventListener("click", () => {

        const hasCheckedTodo = todos.some(todo => todo.isCompleted);
        if (!hasCheckedTodo) {
            alert("No todos are selected.");
            return;
        }

        if (!confirm("Are you sure deleting checked todos?")) return;

        todos = todos.filter(todo => !todo.isCompleted);
        updateLocalStorage();
        renderTodos();
    })
    renderTodos();
}