"use strict"

{
    const onClickAdd = () => {
        /* 
            - li
                - div
                    - p
                    - button
                    - button
       */
        const inputText = document.getElementById("add-text").value.trim();
        if (!inputText) return;

        document.getElementById("add-text").value = "";

        createIncompleteTodo(inputText);
    }

    const createIncompleteTodo = (todoTitle) => {
        const liEl = document.createElement("li");
        const divEl = document.createElement("div");
        divEl.className = "todo";

        const pEl = document.createElement("p");
        pEl.className = "todo-title";
        pEl.innerText = todoTitle;

        const completeBtn = document.createElement("button");
        completeBtn.innerText = "完了";
        completeBtn.addEventListener("click", () => {
            const target = completeBtn.closest("li");
            completeBtn.nextElementSibling.remove();
            completeBtn.remove();

            const backBtn = document.createElement("button");
            backBtn.innerText = "戻す";
            backBtn.addEventListener("click", () => {
                const text = backBtn.previousElementSibling.innerText;
                createIncompleteTodo(text);
                backBtn.closest("li").remove();
            });
            target.firstElementChild.appendChild(backBtn);

            document.getElementById("complete-list").appendChild(target);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "削除";
        deleteBtn.addEventListener("click", () => {
            const target = deleteBtn.closest("li");
            document.getElementById("incomplete-list").removeChild(target);
        });

        divEl.appendChild(pEl);
        divEl.appendChild(completeBtn);
        divEl.appendChild(deleteBtn);
        liEl.appendChild(divEl);

        document.getElementById("incomplete-list").appendChild(liEl);
    }

    document.getElementById("add-button").addEventListener("click", onClickAdd);
}

