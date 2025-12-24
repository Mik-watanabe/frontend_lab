type InputTofoProps = {
  todoTitle: string;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

const style = {
  boxSizing: "border-box",
  background: "#c6e5d9",
  width: "100%",
  padding: "8px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
} as const;

const btn = {
  fontSize: "14px",
  marginLeft: "4px",
};

const InputTodo = ({
  todoTitle,
  onClick,
  onChange,
  disabled,
}: InputTofoProps) => {
  return (
    <div style={style}>
      <input
        id="add-text"
        type="text"
        placeholder="TODOを入力"
        value={todoTitle}
        onChange={onChange}
        disabled={disabled}
      />
      <button style={btn} onClick={onClick} disabled={disabled}>
        追加
      </button>
    </div>
  );
};

export default InputTodo;
