type IncompleteTodosProps = {
    todoList: string[];
    onClickComplete: (i: number) => void;
    onClickDelete: (i: number) => void;
}

const IncompleteTodos = ({
    todoList,
    onClickComplete,
    onClickDelete
}: IncompleteTodosProps) => {
    return (
        <div className="area incomplete-area">
            <p className="title">未完了のTODO</p>
            <ul id="incomplete-list">
                {
                    todoList.map((todoTitle, i) => (
                        <li key={i}>
                            <div className='todo'>
                                <p className='todo-title'>{todoTitle}</p>
                                <button onClick={() => onClickComplete(i)}>complete</button>
                                <button onClick={() => onClickDelete(i)}>delete</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default IncompleteTodos