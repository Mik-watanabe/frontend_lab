import { useState } from "react";
import "./App.css";
import InputTodo from "./components/InputTodo";
import IncompleteTodos from "./components/IncompleteTodos";
import CompleteTodos from "./components/CompleteTodos";

function Todo() {
  const [todoTitle, setTodoTitle] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);
  const [completeTodos, setCompleteTodos] = useState<string[]>([]);

  const onChangeTodoTitle = (event: any) => setTodoTitle(event.target.value);

  const onClickAdd = () => {
    if (!todoTitle) return;
    const newTodos = [...incompleteTodos, todoTitle];
    setIncompleteTodos(newTodos);
    setTodoTitle("");
  };

  const onClickComplete = (i: number) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(i, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[i]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickDelete = (i: number) => {
    const todoList = [...incompleteTodos];
    todoList.splice(i, 1);
    setIncompleteTodos(todoList);
  };

  const onClickBack = (i: number) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(i, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[i]];

    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  const isIncompleteLimitReached = incompleteTodos.length >= 5;

  return (
    <>
      <InputTodo
        todoTitle={todoTitle}
        onClick={onClickAdd}
        onChange={onChangeTodoTitle}
        disabled={isIncompleteLimitReached}
      />
      {isIncompleteLimitReached && (
        <p style={{ color: "red", margin: "16px 0 0" }}>
          You can add up to 5 tasks. Please complete or remove some before
          adding more.
        </p>
      )}
      <IncompleteTodos
        todoList={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos todoList={completeTodos} onClick={onClickBack} />
    </>
  );
}

export default Todo;
