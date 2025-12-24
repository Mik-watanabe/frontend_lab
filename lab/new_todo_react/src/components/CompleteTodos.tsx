type CompleteTodosProps = {
    todoList: string[];
    onClick: (i: number) => void;
}

const CompleteTodos = ({todoList, onClick}: CompleteTodosProps) => {
  return (
    <div className="area complete-area">
        <p className="title">完了のTODO</p>
        <ul id="complete-list">
          {
            todoList.map((todoTitle, i) => (
              <li key={todoTitle + i}>
                <div className='todo'>
                  <p className='todo-title'>{todoTitle}</p>
                  <button onClick={() => onClick(i)}>back</button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
  )
}

export default CompleteTodos